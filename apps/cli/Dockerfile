FROM node:lts-alpine

COPY . /usr/src/apps/cli

COPY package.json ./usr/src/apps/cli/
WORKDIR /usr/src/apps/cli






## installing yarn in the docker envionrment
RUN npm install  

EXPOSE 8081
CMD [ "/bin/bash -c ts-node", " src/index.ts" ]

