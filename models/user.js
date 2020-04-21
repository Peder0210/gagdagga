const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const userDataSchema = new Schema ({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: String,
    Birthday: String,
    Gender: String,
    Phonenumber: String,
    Email: String,

});

userDataSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.Password, 10, (error, hash) =>{
        user.Password = hash;
        next()
    })
});
const user = mongoose.model('user', userDataSchema);
module.exports = user;