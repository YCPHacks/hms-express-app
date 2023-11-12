'use strict'
const { fetch } = require('undici');

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        console.log(request.body)
        const result = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'rental-validation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.body)
        }).then(res => res.json());
        console.log(result);
        return reply.status(200).send(result);
    });
}