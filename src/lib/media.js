// Helpers for Cloudinary delivery URLs. Non-Cloudinary URLs are returned unchanged.
const isCld = (url) => typeof url === 'string' && url.includes('res.cloudinary.com') && url.includes('/upload/');

// insert transformations right after "/upload/" (skip if the URL already has some)
function withTransform(url, t) {
  if (!isCld(url)) return url;
  const [head, tail] = url.split('/upload/');
  const first = tail.split('/')[0];
  const alreadyTransformed = /^[a-z]{1,3}_[^/]+/.test(first) && !/^v\d+$/.test(first);
  return alreadyTransformed ? url : `${head}/upload/${t}/${tail}`;
}

/** Optimised image: auto format + auto quality (+ optional max width). */
export function img(url, width) {
  if (!url) return '';
  return withTransform(url, width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto');
}

/** Optimised video: auto format + quality. */
export function vid(url) {
  if (!url) return '';
  return withTransform(url, 'f_auto,q_auto');
}

/** A still frame (first second) of a Cloudinary video - used as automatic poster. */
export function videoPoster(url, width = 1600) {
  if (!isCld(url) || !url.includes('/video/upload/')) return '';
  const [head, tail] = url.split('/upload/');
  const clean = tail.replace(/^(?:[a-z]{1,3}_[^/]+\/)+/, ''); // drop existing transformations
  return `${head}/upload/so_0,f_auto,q_auto,w_${width}/${clean.replace(/\.[a-z0-9]+$/i, '')}.jpg`;
}

/** Convert a YouTube / Vimeo link to an embeddable URL. */
export function embedUrl(u = '') {
  const url = String(u).trim();
  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return /^https?:\/\//.test(url) ? url : '';
}

export const isInternal = (href = '') => /^\/(?!\/)/.test(href);
