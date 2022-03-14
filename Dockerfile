# build stage
FROM node:13-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]

