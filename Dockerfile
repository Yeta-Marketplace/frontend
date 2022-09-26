
# ============== Buld Stage =======================
FROM node:alpine as build-stage

WORKDIR /app

COPY ./ /app/

RUN npm install

RUN npm run build

# =============== Main Stage =======================
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.22

COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf