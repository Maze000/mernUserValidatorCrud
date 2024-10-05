const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  },
});


userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};


userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};


const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});


const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);




module.exports = { Task, User }






