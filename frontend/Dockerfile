FROM node:20.11.1

WORKDIR /frontend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "run", "dev" ]