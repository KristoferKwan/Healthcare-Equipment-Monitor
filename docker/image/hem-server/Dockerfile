FROM node:13-alpine3.10
EXPOSE 8080

LABEL maintainer="Mitchell Farrow, Owen Xie, Covenant Faluyi, Gary Xu, Kristofer Kwan"
LABEL description="Sample NodeJS API Application"


# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./server/package.json /app/package.json
RUN npm install --silent
RUN npm install --silent nodemon
COPY ./server /app
RUN npm run start
