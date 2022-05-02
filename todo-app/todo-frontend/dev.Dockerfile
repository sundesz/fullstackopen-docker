FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV REACT_APP_BACKEND_URL=http://localhost:3001

USER node

CMD ["npm", "start"]
