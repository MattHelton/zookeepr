const express = require('express');
const {animals} = require('../data/animals')
const fs = require('fs');
const path = require('path');

const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router