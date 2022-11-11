
# ============== Buld Stage =======================
FROM node:alpine as build-stage

WORKDIR /app

# We copy package.json first to help with caching npm install
COPY package.json /app
RUN npm install

COPY ./ /app/

RUN npm run build

# =============== Main Stage =======================
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.22

COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf