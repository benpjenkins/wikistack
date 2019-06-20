const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { User } = require('../models');
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
    const reqName = req.body.author;
    const reqEmail = req.body.email;
    // const databaseEmailResult = await User.findAll({
    //   where: { email: reqEmail },
    // });
    // // console.log('TCL: databaseEmailResult', databaseEmailResult);
    // if (!databaseEmailResult.length) {
    //   const newUser = await User.create({
    //     name: reqName,
    //     email: reqEmail,
    //   });
    // }
    const user = await User.findOrCreate({
      where: { name: reqName, email: reqEmail },
    });
    const userId = user[0].id;
    console.log('TCL: userId', userId);

    // let userId = await User.findOne({
    //   where: { email: reqEmail },
    //   attributes: ['id'],
    // });

    // userId = userId.dataValues.id;

    const page = await Page.create({
      // authorId: userId,
      title: req.body.title,
      content: req.body.content,
      slug: generateSlug(req.body.title),
    });

    page.setAuthor(userId)
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
