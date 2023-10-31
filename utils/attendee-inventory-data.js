const { fetch } = require('undici');
// These are the column headers for the table
const columns = ["Name", "Tag", "Category"/* , "Status" */];

const categoryOptions = ["PC", "VR Headset"];
const statusOptions = ["Checked-In", "Checked-Out", "Unavailable"];

// This is the data for the table
async function getData({ page, limit, search, filter}) {
    const queryString = `?page=${page}&limit=${limit}&search=${search}&filter=${filter}`;
    const hardware = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware' + queryString, {
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
async function getAttendeeInventoryData({ page = 1, limit = 20, search = '', categories = [], statuses = []}) {
    console.log(search);
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
        baseUrl: '/attendee-inventory'
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getAttendeeInventoryData;