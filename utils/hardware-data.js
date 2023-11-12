const { fetch } = require('undici')

async function getData(hardwareId) {
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware_rentals_current/' + hardwareId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    return hardware;
}

async function getRentalsHistory(hardwareId) { 
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'rentals_history/' + hardwareId, {
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
    const history = await getRentalsHistory(id);
    console.log(history, data);
    return {
        id: data.id,
        name: data.name,
        tag: data.tag,
        category: data.category,
        status: data.status,
        user: data.user_id,
        last_updated: data.last_updated,
        history: history,
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getHardwareData;