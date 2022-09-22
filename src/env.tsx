const env = import.meta.env.VITE_ENV;

let envApiUrl = '';
let mapboxToken = '';

if (env === 'prod') {
  envApiUrl = `https://${import.meta.env.VITE_BACKEND_URL}.${import.meta.env.VITE_DOMAIN_PROD}`;
  mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN_PROD;
} else {
  envApiUrl = `http://${import.meta.env.VITE_BACKEND_URL}.${import.meta.env.VITE_DOMAIN_DEV}`;
  mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN_DEV;
}

export const apiUrl = envApiUrl;
export const appName = import.meta.env.VITE_NAME;

export const MAPBOX_TOKEN = mapboxToken;