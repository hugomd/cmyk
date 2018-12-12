FROM node:10-alpine

COPY . /app

WORKDIR /app

RUN apk add git

RUN npm i

CMD ["npm", "start"]
