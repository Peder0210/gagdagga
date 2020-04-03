const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administratorSchema = new Schema ({
    Username: String,
    Password: String,


});

const administrator = mongoose.model('administrator', administratorSchema);
module.exports = administrator;