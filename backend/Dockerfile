FROM node:20.11.1

WORKDIR /backend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "npm", "run", "start" ]