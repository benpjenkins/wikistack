const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');
const { wikiPage } = require('../views');

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', async (req, res, next) => {
  res.send('hey beautiful');
});

//retrieves add a page form
router.get('/add', async (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  //consider page.create();
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      slug: generateSlug(req.body.title),
    });

    // await page.save().then(function(result) {
    //   console.log(result.dataValues);
    // });
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikiPage(foundPage));
    // res.send(`hit dynamic route at ${req.params.slug}`);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
