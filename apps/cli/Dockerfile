FROM ubuntu:22.04

COPY . /apps/cli

WORKDIR /apps/cli

RUN apt-get -y update; apt-get -y install curl && curl -sSL -O https://bit.ly/get-lilypad && sudo install get-lilypad

RUN yarn 


EXPOSE 8081

