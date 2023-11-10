'use strict'

const getOrganizerInventoryData = require('../../utils/organizer-inventory-data.js');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;
    
    return reply.view('organizer-inventory.pug', {...await getOrganizerInventoryData({ page, limit, search, categories, statuses})});
  });
}
