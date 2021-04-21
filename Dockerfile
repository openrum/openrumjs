#openrum/openrumjs
FROM node:12.18

ENV NPM_CONFIG_LOGLEVEL info

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g nodemon gulp-cli

RUN npm install

COPY . .

ADD . /home/node/app

EXPOSE 5000

CMD [ "npm", "start" ]
