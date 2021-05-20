FROM node:12


WORKDIR /nest-server

COPY package*.json ./ ./
COPY tsconfig*.json ./ ./
COPY ormconfig.json ./ ./

RUN npm install

COPY src ./src

RUN ls -a

RUN npm run build

EXPOSE 5000

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD dockerize -wait tcp://db:3306 -timeout 60m npm run start