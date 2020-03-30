# hem-frontend

LABEL maintainer="Mitchell Farrow, Owen Xie, Covenant Faluyi, Gary Xu, Kristofer Kwan"
LABEL description="Sample NodeJS API Application"

# compile react code in a separate image
FROM node:12-alpine as build
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY frontend/package.json /frontend/package.json
RUN npm install
RUN npm install -g react-scripts
COPY frontend /frontend
RUN npm run build

# production environment
FROM nginx:1-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY /frontend/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]