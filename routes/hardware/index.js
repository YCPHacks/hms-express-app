const { fetch } = require('undici');
const getHardwareData = require('../../utils/hardware-data.js');


module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const result = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(res => res.json());
    return reply.status(200).send(result);
  });

  fastify.get('/:id', async function (request, reply) {
    return reply.status(200).view('hardware.pug', {...await getHardwareData(request.params.id), title: "Hardware Details"});
  });


  
}