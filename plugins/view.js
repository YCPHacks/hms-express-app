'use strict'

const fp = require('fastify-plugin')
const path = require('path')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/view'), {
    engine: {
      pug: require('pug'),
    },
    root: path.join(__dirname, '../views'),
    defaultContext: {
      navLinks: {
        legacy_smms: process.env.LEGACY_SCHEDULED_MESSAGES_MANAGEMENT_URL,
        mvp: process.env.MVP_URL,
      }
    }
  })
})
