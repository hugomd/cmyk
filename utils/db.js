const Sequelize = require('sequelize');
const {POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD} = require('../config');

// eslint-disable-next-line no-unused-vars
const db = new Sequelize(POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD);
