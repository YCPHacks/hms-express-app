const { fetch } = require('undici');
// These are the column headers for the table
const columns = [" ","Name", "Tag", "Category", "Status", "User", "Date"];

const categories = ["PC", "VR Headset"];
const statuses = ["Checked-In", "Checked-Out", "Unavailable"];

// This is the data for the table
async function getData({ page, limit, search, filter}) {
    const queryString = `?page=${page}&limit=${limit}&search=${search}&filter=${filter}`;
    // const equipment = await database.find('equipment');
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

// These are the options for the table
const sortable = true;
const searchable = true;
const filterable = true;

// This is compiling the data into a single object
async function getOrganizerInventoryData({ page = 1, limit = 20, search = null, filter = null}) {
    return {
        columns,
        data: await getData({ page, limit, search, filter}),
        currentPage: page,
        limit,
        search,
        filter,
        categories,
        statuses,
        sortable,
        searchable,
        filterable,
    };
}

// This is exporting the object as a module to be imported elsewhere
module.exports = getOrganizerInventoryData;