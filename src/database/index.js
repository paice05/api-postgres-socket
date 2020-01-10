const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Field = require('../models/Fields');
const Item = require('../models/Items');

const connection = new Sequelize(dbConfig);

const models = [User, Address, Field, Item];

models.map(model => model.init(connection) && model.associate(connection.models));

module.exports = connection;
