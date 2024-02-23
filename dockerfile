FROM node:19
ENV TZ="Asia/Baghdad"
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 4011
ENV PORT=4011

CMD [ "node", "server.js" ]
