FROM node:alpine

RUN mkdir -p /usr/app/server
WORKDIR /usr/app/server

COPY package.json /usr/app/server
COPY package-lock.json /usr/app/server

RUN npm install

COPY . /usr/app/server

CMD ["npm", "start"]
