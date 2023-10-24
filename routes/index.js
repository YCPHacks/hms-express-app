require('dotenv').config();
const express = require('express');

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


module.exports = router;