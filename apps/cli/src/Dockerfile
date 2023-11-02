FROM --platform=x86_64 ubuntu:22.04
ARG DEBIAN_FRONTEND=noninteractive
##private key of the account consisting of the test ether.
ENV WEB3_PRIVATE_KEY=""
ENV SERVICE_SOLVER=""
ENV SERVICE_MEDIATORS=""


## installing 
RUN apt-get update && apt-get install -y curl && curl -sSL -o lilypad https://github.com/bacalhau-project/lilypad/releases/download/v2.0.0-6afc1cc/lilypad && \
chmod +x lilypad && \
 mv lilypad /usr/local/bin 

RUN mkdir -p /app/

COPY . /app/

RUN chmod +x /app/execute_lilypad.sh
ENTRYPOINT [ "/app/execute_lilypad.sh"]
