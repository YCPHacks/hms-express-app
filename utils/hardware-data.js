const { fetch } = require('undici')

async function getData(hardwareId) {
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware/' + hardwareId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    return hardware;
}

// This is compiling the data into a single object
async function getHardwareData(id) {
    const data = await getData(id);
    return {
        id: data.id,
        name: data.name,
        tag: data.tag,
        category: data.category,
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getHardwareData;