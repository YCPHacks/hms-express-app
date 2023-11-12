'use strict'

const getOrganizerInventoryData = require('../../utils/organizer-inventory-data.js');
const getAttendeeInventoryData = require('../../utils/attendee-inventory-data.js');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    return reply.redirect('/inventory/attendee');
  });

  fastify.get('/organizer', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    const locals = {
        ...await getOrganizerInventoryData({ page, limit, search, categories, statuses}),
        title: "Hardware Inventory"
    }

    return reply.view('organizer-inventory.pug', locals);
  });

  fastify.get('/attendee', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    const locals = {
        ...await getAttendeeInventoryData({ page, limit, search, categories, statuses}),
        title: "Hardware Inventory"
    }

    return reply.view('attendee-inventory.pug', locals);
  });

}

