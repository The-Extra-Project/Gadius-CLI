FROM node:lts-alpine

## installing yarn in the docker envionrment
RUN npm install  

COPY package.json ./usr/src/apps/cli/



COPY . /usr/src/apps/cli
WORKDIR /usr/src/apps/cli


## installing the lilypad tool: 





EXPOSE 8081
CMD [ "/bin/bash -c ts-node", " src/index.ts" ]

