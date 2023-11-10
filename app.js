'use strict'
require('dotenv').config();
const Fastify = require('fastify');

const express = require('express');

const router = require('./routes/index.js');

// Fastify App

const path = require('path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

//  // Express App

// const app = express();

// app.use(router);

// const port = process.env.PORT;

// app.set('view engine', 'pug');
// app.set('views', './views');

// app.use('/static', express.static('./public'));

// app.get('/', (req, res) => {
//   res.status(200).send('OK');
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}...`);
// });
