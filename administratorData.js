const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const administratorDataSchema = new Schema ({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Navn: String,
    Birthday: String,
    Gender: String,
    MobilNummer: String,
    Email: String,

});

administratorDataSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.Password, 10, (error, hash) =>{
        user.Password = hash;
        next()
    })
});
const administratorData = mongoose.model('administratorData', administratorDataSchema);
module.exports = administratorData;