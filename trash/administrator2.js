const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administratorSchema = new Schema ({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    }
});

const administrator = mongoose.model('administrator', administratorSchema);
module.exports = administrator;