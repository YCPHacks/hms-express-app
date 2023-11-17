/**
 * 
 * @param {string} view - The view of the inventory
 * @returns {string[]} - The column names for the inventory table
 */
async function getColumns(view) {
    switch (view) {
        case 'organizer':
            return { columns: [
                " ",
                "Name", 
                "Tag", 
                "Category", 
                "Status", 
                "User Name", 
                "Time"
            ]}
        
        case 'attendee':
            return { columns: [
                "Name", 
                "Tag", 
                "Category", 
                "Status"
            ]}

        case 'manager': 
            return { columns: [
            "Name", 
            "Tag", 
            "Category", 
            "Status", 
            "User ID", 
            "Time"
        ]}
    }
}

module.exports = getColumns;