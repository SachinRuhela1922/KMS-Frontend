import { apiUrl } from '../lib/api-base.js';

const TOKEN_KEY = 'jgu-admin-token';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
};
export const setToken = (t) => {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    /* ignore */
  }
};
export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
};

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) headers.Authorization = `Bearer ${getToken()}`;

  let res;
  try {
    res = await fetch(apiUrl(path), { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch {
    throw new Error('Cannot reach the server. Is it running?');
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (res.status === 401 && auth) {
    clearToken();
    window.dispatchEvent(new Event('admin-unauthorized'));
  }
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
  return data;
}

export const api = {
  login: (password) => request('/api/admin/login', { method: 'POST', body: { password }, auth: false }),
  status: () => request('/api/admin/status'),
  getContent: () => request('/api/content', { auth: false }),
  saveContent: (content) => request('/api/admin/content', { method: 'PUT', body: { content } }),
  reset: () => request('/api/admin/reset', { method: 'POST', body: {} }),
  sign: () => request('/api/admin/sign'),
  media: (type, cursor) => request(`/api/admin/media?type=${type}${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`),
  deleteMedia: (publicId, type) => request('/api/admin/media', { method: 'DELETE', body: { publicId, type } }),
};

export const LIMITS = { image: 10, video: 100 }; // MB (Cloudinary free plan limits)

/** Upload an image / video directly from the browser to Cloudinary (signed by our server). */
export async function uploadFile(file, onProgress) {
  const kind = file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : null;
  if (!kind) throw new Error(`"${file.name}" is not an image or video file`);
  if (file.size > LIMITS[kind] * 1024 * 1024) {
    throw new Error(`"${file.name}" is too big. Max ${LIMITS[kind]} MB for ${kind}s - compress it first.`);
  }

  const sig = await api.sign();
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.apiKey);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('folder', sig.folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${sig.cloudName}/${kind}/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onerror = () => reject(new Error('Upload failed - check your internet connection'));
    xhr.onload = () => {
      let res = {};
      try {
        res = JSON.parse(xhr.responseText);
      } catch {
        /* ignore */
      }
      if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
        resolve({ url: res.secure_url, publicId: res.public_id, kind });
      } else {
        reject(new Error(res?.error?.message || `Upload failed (${xhr.status})`));
      }
    };
    xhr.send(form);
  });
}
