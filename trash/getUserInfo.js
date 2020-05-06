
module.exports = (req,res) =>{

    const User = require('../models/user');

    User.findOne({_id:req.session.userId},(error,result)=>{
        if(result) { // før vi kan ændre på userinfo, skal vi hente dem.
            res.send(JSON.stringify(result))
        }
        else{
            res.send("No profiles found")
        }
    })
};


