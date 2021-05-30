FROM node:alpine AS base
WORKDIR /var/www

FROM base AS dependencies
COPY package*.json ./
RUN npm install --only=production
RUN cp -R node_modules/ prod_node_modules/
RUN npm install

FROM dependencies AS test
COPY . .
RUN npm test

FROM base AS release
COPY . .
COPY --from=dependencies /var/www/prod_node_modules/ node_modules/
CMD ["npm", "start"]
