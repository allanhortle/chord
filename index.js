require('dotenv').config({silent: true});
require('app-module-path').addPath('./src');
require('babel-register');
require('./src/chord/server/server.js');
