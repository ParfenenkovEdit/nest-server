FROM node:12


WORKDIR /nest-server

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY src /nest-server/src

RUN ls -a

RUN npm run build

EXPOSE 4000

CMD ["node", "./dist/main.js"]