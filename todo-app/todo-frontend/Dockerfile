FROM node:16 as base

WORKDIR /usr/src/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json

FROM base as test
RUN npm ci --only=production
COPY --chown=node:node . .
USER node
ENV CI=true
CMD ["npm", "run", "test"]


FROM base as prod
RUN npm ci --only=production
COPY --chown=node:node . .
USER node
ENV REACT_APP_BACKEND_URL=http://localhost:3001
CMD ["npm", "start"]