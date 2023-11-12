const { fetch } = require('undici');
// These are the column headers for the table
const columns = ["Name", "Tag", "Category", "Status", "User ID", "Time"];

async function getCategoryOptions() {
    const categories = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    // console.log(categories.map(category => category.category));
    return categories.map(category => category.category);
}

const statusOptions = ["Checked-In", "Checked-Out", "Unavailable"];

// This is the data for the table
async function getData({ page, limit, search, categories, statuses}) {
    let queryString = `?pageNumber=${page}&pageSize=${limit}&search=${search}&`;
    if(categories.length > 0){
        categories.forEach(category => {
            queryString += `categories=${category}&`;
        });
    }
    if(statuses.length > 0){
        statuses.forEach(status => {
            queryString += `statuses=${status}&`;
        });
    }

    queryString = queryString.slice(0, -1);
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware_rentals_current' + queryString, {    
    // const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware' + queryString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    
    if (!hardware) {
        return [];
    }

    return hardware;
};

// This is compiling the data into a single object
async function getInventoryManagementData({ page = 1, limit = 20, search = '', categories = [], statuses = []}) {
    return {
        columns,
        data: await getData({ page, limit, search, categories, statuses}),
        currentPage: page,
        limit,
        search,
        categories,
        statuses,
        categoryOptions: await getCategoryOptions(),
        statusOptions,
        baseUrl: '/organizer-inventory'
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getInventoryManagementData;