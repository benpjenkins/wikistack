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

app.get('/', async (req, res, next) => {
  res.send(layout('a'));
});
