const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');
var uniqueValidator = require('mongoose-unique-validator')
const userDataSchema = new Schema ({
    Username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    Password: {
        type: String,
        required: [true, 'Please provide password'],
        unique: true
    },
    Name: String,
    Phonenumber: String,
    Gender: String,
    Birthday: String,
    Email: String,
    Timestamp: Date,
    Usertype: String,

});

userDataSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.Password, 10, (error, hash) =>{
        user.Password = hash;
        next()
    })
});

userDataSchema.plugin(uniqueValidator);
const user = mongoose.model('user', userDataSchema);
module.exports = user;