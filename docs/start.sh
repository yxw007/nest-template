#!/bin/bash

# stop server
pm2 stop nest-template

# install dependencies
cd dist
npm install
cd ..

# start server
pm2 start pm2.config.js
