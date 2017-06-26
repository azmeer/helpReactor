const Sequelize = require('sequelize');
const fakeData = require('./fakeData');
const db = new Sequelize('helpReactor', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});

const Ticket = db.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  claimedAt: Sequelize.DATE,
  closedAt: Sequelize.DATE,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  status: Sequelize.STRING,
  claimedBy: Sequelize.INTEGER
});

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING },
  role: { type: Sequelize.ENUM('student', 'mentor', 'admin'), allowNull: false }
});

Ticket.belongsTo(User);

User.hasMany(Ticket, {
  foreignKey: 'userId',
  constraints: false
});

// db.sync({ force: true });
// User.sync({ force: true });
// Ticket.sync({ force: true });

User.bulkCreate(fakeData.fakeUsers).then(result => {
  console.log('created users: ', fakeData.fakeUsers);
});

module.exports = {
  Ticket: Ticket,
  User: User
};
