const env = import.meta.env.VITE_ENV;

let envApiUrl = '';

if (env === 'prod') {
  envApiUrl = `https://${import.meta.env.VITE_BACKEND_URL}.${import.meta.env.VITE_DOMAIN_PROD}`;
} else {
  envApiUrl = `http://${import.meta.env.VITE_BACKEND_URL}.${import.meta.env.VITE_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
export const appName = import.meta.env.VITE_NAME;
