const env = import.meta.env.VITE_ENV;

let envApiUrl = '';

if (env === 'prod') {
  envApiUrl = `https://api.${import.meta.env.VITE_DOMAIN_PROD}`;
} else {
  envApiUrl = `http://api.${import.meta.env.VITE_DOMAIN_DEV}`;
}

console.log(envApiUrl);

export const apiUrl = envApiUrl;
export const appName = import.meta.env.VITE_NAME;
