FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./prisma prisma

RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build

ENV NODE_ENV production 

EXPOSE 8080
CMD [  "npm", "run", "prisma generate && prisma migrate dev && node dist/index.js" ]
USER node