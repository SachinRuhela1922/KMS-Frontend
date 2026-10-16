import { createContext, useContext } from 'react';

// { status: { cloudinary, cloudName, storage, defaultPassword }, toast(msg, type) }
export const AdminContext = createContext({ status: {}, toast: () => {} });
export const useAdmin = () => useContext(AdminContext);
