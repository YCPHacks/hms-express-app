'use strict'

const getOrganizerInventoryData = require('../../utils/organizer-inventory-data.js');
const getAttendeeInventoryData = require('../../utils/attendee-inventory-data.js');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    return reply.redirect('/inventory/organizer-inventory');
  });

  fastify.get('/organizer', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    return reply.view('organizer-inventory.pug', {...await getOrganizerInventoryData({ page, limit, search, categories, statuses})});
  });

  fastify.get('/attendee', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    return reply.view('attendee-inventory.pug', {...await getAttendeeInventoryData({ page, limit, search, categories, statuses})});
  });

}

