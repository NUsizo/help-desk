const Profiles = require('./userProfilesModel');
const Users = require('./userModel');
const Questions = require('./questionModel');
const Responses = require('./responseModel');
const QuestionStatus = require('./questionStatusModel');


const Sequelize = require('sequelize');
const connection = require('../pgConnection');

Users.hasOne(Profiles);
Users.hasMany(Questions);
Users.hasMany(Responses);
Questions.hasOne(QuestionStatus);

connection.sync();

module.exports = {
  Profiles,
  Users,
  Questions,
  Responses,
  QuestionStatus,
};
