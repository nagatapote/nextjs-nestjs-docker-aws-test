FROM node:13.7

RUN npm i -g @nestjs/cli

WORKDIR /api-server
COPY package*.json /api-server/

RUN npm i

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start"]
