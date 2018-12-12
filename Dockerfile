FROM node:8.14.0-alpine

ADD . /app
WORKDIR /app

CMD ["npm", "start"]
