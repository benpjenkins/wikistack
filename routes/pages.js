const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', async (req, res, next) => {
  res.send('hey beautiful');
})

//retrieves add a page form
router.get('/add', async (req, res, next) => {
  res.send(addPage())
})

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: generateSlug(req.body.title)
  })
  try {
   await page.save();
   res.redirect('/');
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;
