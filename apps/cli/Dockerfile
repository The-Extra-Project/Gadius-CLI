FROM node:lts-alpine


COPY package.json ./usr/src/apps/cli/

WORKDIR /usr/src/apps/cli
RUN npm install  


WORKDIR /
COPY . /usr/src/apps/cli
WORKDIR /usr/src/apps/cli

RUN npm i -g ts-node

## installing the lilypad tool: 



EXPOSE 8081
CMD [ "ts-node", " /usr/src/apps/cli/src/index.ts" ]

