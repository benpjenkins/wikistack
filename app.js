const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout.js');
const Sequelize = require('sequelize');
const { db } = require('./models/index.js');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const Page = db.define('page', {
  title: Sequelize.STRING,
  slug: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: Sequelize.BOOLEAN
})

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

//remember to wrap

async function testDB() {
  await User.sync()
  await Page.sync()
}

testDB()

app.get('/', async (req, res, next) => {
  res.send(layout('a'));
});

const port = 1337;
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
