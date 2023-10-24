require('dotenv').config();
const getOrganizerInventoryData = require('../utils/organizer-inventory-data.js');
const getAttendeeInventoryData = require('../utils/attendee-inventory-data.js');
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

router.get('/organizer-inventory', async (req, res) => {
    const { page, limit, search, filter } = req.query;
    res.locals = { ...await getOrganizerInventoryData({ page, limit, search, filter}) };
    res.locals.title = "Hardware Inventory"
    res.status(200).render('organizer-inventory');
});

router.get('/attendee-inventory', async (req, res) => {
    const { page, limit, search, filter } = req.query;
    console.log(req.query);
    res.locals = { ...await getAttendeeInventoryData({ page, limit, search, filter}) };
    res.locals.title = "Hardware Inventory"
    res.status(200).render('attendee-inventory');
});

module.exports = router;