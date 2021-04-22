FROM node:13.7

WORKDIR /frontend
COPY package*.json /frontend/
RUN npm i

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start" ]
