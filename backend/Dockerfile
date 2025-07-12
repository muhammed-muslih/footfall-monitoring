FROM node:22.12-alpine

WORKDIR /app

COPY package*.json ./

# clean install
RUN npm ci 

COPY . ./

CMD [ "npm", "start" ]