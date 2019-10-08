const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  menu: [String]
});

module.exports = Menu = mongoose.model('menu', MenuSchema)