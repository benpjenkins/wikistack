const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage.js')

router.get('/', async (req, res, next) => {
  res.send('hey beautiful');
})

//retrieves add a page form
router.get('/add', async (req, res, next) => {
  res.send(addPage())
})

router.post('/', async (req, res, next) => {

})

module.exports = router;
