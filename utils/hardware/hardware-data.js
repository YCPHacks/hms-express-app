const { fetch } = require('undici');
const { DateTime } = require('luxon')

async function getData(hardwareId) {
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware_rentals_current/' + hardwareId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then((res) => {
        if(res.last_updated){
            res.last_updated = new Date(res.last_updated).toLocaleString(DateTime.DATETIME_SHORT);
        }
        return res;
    });
    return hardware;
}

async function getRentalsHistory(hardwareId) { 
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'rentals_history/' + hardwareId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json().then((res) => {
        res.forEach(hardware => {
            if(hardware.last_updated){
                hardware.last_updated = new Date(hardware.last_updated).toLocaleString(DateTime.DATETIME_SHORT);
            }
        });
        return res;
    }));
    return hardware;
}

// This is compiling the data into a single object
async function getHardwareData(id) {
    const data = await getData(id);
    const history = await getRentalsHistory(id);
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