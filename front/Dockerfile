FROM node:alpine as install

RUN apk add chromium

WORKDIR /app
COPY package.json package-lock.json /app/
RUN apk add python3 make g++ && npm install
COPY public  /app/public 
COPY src /app/src 
COPY tsconfig.json /app/
RUN npm run build
RUN rm -rf node_modules public src tsconfig.json package.json package-lock.json

WORKDIR /app/node_server
COPY server /app/node_server
RUN npm install
EXPOSE 3000

CMD npm start
