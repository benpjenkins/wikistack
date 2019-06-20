const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('pages', {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false, isUrl: true },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: Sequelize.ENUM('open', 'closed'),
});

Page.beforeValidate(pageTitle => {
  // console.log('jfjfjfjfjfjfjfff', pageTitle);
  function generateSlug(title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  return generateSlug(pageTitle.dataValues.title);
});

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

module.exports = {
  db,
  Page,
  User,
};
