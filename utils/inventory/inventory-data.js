const { fetch } = require('undici');
const { DateTime } = require('luxon');

async function getCategoryOptions() {
    const categories = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    return categories.map(category => category.category);
}

const statusOptions = ["Checked-In", "Checked-Out", "Unavailable"];

// This is the data for the table
async function getData({ page, limit, search, categories, statuses}) {
    let baseQuery = `?pageNumber=1&pageSize=1000&search=${search}&`;
    let queryString = `?pageNumber=${page}&pageSize=${limit}&search=${search}&`;

    if(Array.isArray(categories) && categories.length > 0){
        categories.forEach(category => {
            queryString += `categories=${category}&`;
            baseQuery += `categories=${category}&`;
        });
    } else {
        queryString += `categories=${categories}&`;
        baseQuery += `categories=${categories}&`;
    }

    if(Array.isArray(statuses) && statuses.length > 0){
        statuses.forEach(status => {
            queryString += `statuses=${status}&`;
            baseQuery += `statuses=${status}&`;
        });
    } else {
        queryString += `statuses=${statuses}&`;
        baseQuery += `statuses=${statuses}&`;
    }

    // Remove trailing '&'
    queryString = queryString.slice(0, -1);
    baseQuery = baseQuery.slice(0, -1);

    // Get hardware with pagination
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware_rentals_current' + queryString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then((res) => {
        res.data.forEach(hardware => {
            if(hardware.last_updated){
                hardware.last_updated = new Date(hardware.last_updated).toLocaleString(DateTime.DATETIME_SHORT);
            }
        });
        return res;
    });

    // Get hardware without pagination
    const baseHardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware_rentals_current' + baseQuery, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    }).then(res => res.json()).then((res) => {
        const datalist = [];
        res.data.forEach(hardware => {
            datalist.push(hardware.name);
            datalist.push(hardware.tag);
        });
        res.datalist = datalist;
        return res;
    });

    if (!hardware) {
        return [];
    }

    // Add totalLength and datalist to hardware
    hardware.totalLength = baseHardware.length;
    hardware.datalist = baseHardware.datalist;

    return hardware;
};

// This is compiling the data into a single object
async function getInventoryData({ page = 1, limit = 20, search = '', categories = [], statuses = []}) {
    return {
        data: await getData({ page, limit, search, categories, statuses}),
        currentPage: page,
        limit,
        search,
        categories,
        statuses,
        categoryOptions: await getCategoryOptions(),
        statusOptions,
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getInventoryData;