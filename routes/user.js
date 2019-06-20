const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Page } = require('../models');
const { userList } = require('../views');
const { userPages } = require('../views');


router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(userList(allUsers));
  } catch (err) {
    console.log()
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.id
      }
    })

    res.send(userPages(user, pages));
  } catch(err) {
    console.error(err)
  }
})

module.exports = router;
