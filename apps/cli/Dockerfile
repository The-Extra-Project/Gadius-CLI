FROM node:4-onbuild

WORKDIR /apps/cli
COPY . /apps/cli


## installing yarn in the docker envionrment
RUN npm install  

EXPOSE 8081

CMD [ "/bin/bash", "-c", "yarn start" ]

