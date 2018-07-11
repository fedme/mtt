FROM node:8-alpine

# Install git
RUN apk add --no-cache \
    git \
    openssh

# Install Ionic, Cordova and HTTP server
RUN npm i -g --unsafe-perm ionic cordova http-server && \
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

# Remove cordova platforms
# and build Ionic app
RUN ionic cordova platform rm android && \
    ionic cordova platform rm ios && \
    ionic cordova platform rm windows && \
    ionic cordova platform rm browser && \
    ionic cordova platform rm osx && \
    ionic build --prod

# Delete everything apart from the compiled web app
RUN mv www ../ && \
    rm -rf ./* && \
    mv ../www .

# Serve app
EXPOSE 80
CMD ["hs", "./www", "-p", "80", "--silent"]

