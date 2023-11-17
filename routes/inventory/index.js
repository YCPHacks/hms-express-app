'use strict'
const getInventoryData = require('../../utils/inventory/inventory-data.js');
const getColumns = require('../../utils/inventory/columns.js');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    return reply.redirect('/inventory/attendee');
  });

  fastify.get('/organizer', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    const locals = {
        ...await getInventoryData({ page, limit, search, categories, statuses}),
        ...await getColumns('organizer'),
        title: "Hardware Inventory"
    }

    return reply.view('organizer-inventory.pug', locals);
  });

  fastify.get('/attendee', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    const locals = {
        ...await getInventoryData({ page, limit, search, categories, statuses}),
        ...await getColumns('attendee'),
        title: "Hardware Inventory"
    }

    return reply.view('attendee-inventory.pug', locals);
  });

  fastify.get('/manager', async function (request, reply) {
    const { page, limit, search, categories, statuses } = request.query;

    const locals = {
        ...await getInventoryData({ page, limit, search, categories, statuses}),
        ...await getColumns('manager'),
        title: "Inventory Manager"
    }

    return reply.view('inventory-management.pug', locals);
  });

}

