FROM node:8.14.0-alpine

COPY . /app

WORKDIR /app

RUN npm i

CMD ["npm", "start"]
