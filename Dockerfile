FROM node:11

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# Set a working directory
WORKDIR /usr/src/app
ADD . /usr/src/app

EXPOSE 3000
CMD [ "node", "index.js" ]
