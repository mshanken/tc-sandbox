FROM node:alpine

RUN mkdir -p /usr/app/client
WORKDIR /usr/app/client

COPY package.json /usr/app/client
COPY package-lock.json /usr/app/client

RUN npm install

COPY . /usr/app/client

CMD ["npm", "start"]
