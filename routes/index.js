require('dotenv').config();
const getOrganizerInventoryData = require('../utils/organizer-inventory-data.js');
const getAttendeeInventoryData = require('../utils/attendee-inventory-data.js');
const getHardwareData = require('../utils/hardware-data.js');
const express = require('express');
const { fetch } = require('undici');

const router = express.Router();

router.get('/hardware', async (req, res) => {
    const result = await fetch(process.env.HARDWARE_MANAGEMENT_URL + 'hardware', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    res.status(200).send(result);
});

router.get('/attendee-inventory', async (req, res) => {
    const { page, limit, search } = req.query;
    const categories = [req.query.categories];
    const statuses = [req.query.statuses];

    console.log(req.query);
    res.locals = { ...await getAttendeeInventoryData({ page, limit, search, categories, statuses}) };
    res.locals.title = "Hardware Inventory"
    res.status(200).render('attendee-inventory');
});

router.get('/organizer-inventory', async (req, res) => {
    const { page, limit, search } = req.query;
    const categories = [req.query.categories];
    const statuses = [req.query.statuses];
    
    res.locals = { ...await getOrganizerInventoryData({ page, limit, search, categories, statuses}) };
    res.locals.title = "Hardware Inventory"
    res.status(200).render('organizer-inventory');
});

router.get('/hardware/:id', async (req, res) => {
    res.locals = { ...await getHardwareData(req.params.id) };
    res.locals.title = "Hardware Details"
    res.status(200).render('hardware');
});

// router.get('/inventory-management', async (req, res) => {
//     const { page, limit, search } = req.query;
//     const categories = [req.query.categories];
//     const statuses = [req.query.statuses];
    
//     res.locals = { ...await getOrganizerInventoryData({ page, limit, search, categories, statuses}) };
//     res.locals.title = "Inventory Management"
//     res.status(200).render('inventory-management');
// });

module.exports = router;