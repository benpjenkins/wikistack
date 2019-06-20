const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout.js');
const Sequelize = require('sequelize');
const models = require('./models/index.js');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// db.authenticate().then(() => {
//   console.log('connected to the database');
// });
const page = require('./routes/pages.js')
console.dir('page:', page);
//remember to wrap
const port = 1337;
const init = async () => {
  try {
    await models.db.sync();
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
  });
};

init();

app.use('/wiki', require('./routes/pages'));
// app.use('/user', require('./routes/user.js'));

app.get('/', async (req, res, next) => {
  res.send(layout('a'));
});
