const { fetch } = require('undici');
// These are the column headers for the table
const columns = ["Name", "Tag", "Category", "Status", "User ID", "Time"];

const categoryOptions = ["PC", "VR Headset"];
const statusOptions = ["Checked-In", "Checked-Out", "Unavailable"];

// This is the data for the table
async function getData({ page, limit, search, filter}) {
    const queryString = `?page=${page}&limit=${limit}&search=${search}&filter=${filter}`;
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware_rentals_current' + queryString, {
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
        categoryOptions,
        statusOptions,
        baseUrl: '/organizer-inventory'
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getInventoryManagementData;