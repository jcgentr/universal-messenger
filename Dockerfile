FROM node:16

# create app directory
WORKDIR /usr/src/app

# install app deps
# copy over package.json AND package-lock.json
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

ENV NODE_ENV production

USER node

CMD ["node", "app.js"]