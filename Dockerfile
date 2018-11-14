FROM node:8-alpine

# Install git
RUN apk add --no-cache \
    git \
    openssh

# Install Ionic and HTTP server
# TODO: Remove @rc when Ionic CLI 4 is out!
RUN npm i -g --unsafe-perm ionic@rc http-server && \
    ionic --no-interactive config set -g daemon.updates false

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Copy app source
COPY . .

# Build Ionic app
RUN ionic build --prod

# Delete everything apart from the compiled web app
RUN mv www player/ && \
    mv player ../ && \
    rm -rf ./* && \
    mv ../player .

# Serve app
EXPOSE 80
CMD ["hs", "./player", "-p", "80", "--silent"]

