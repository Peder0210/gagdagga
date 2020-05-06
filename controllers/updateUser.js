module.exports =  (req,res)=> {

    const User = require('../models/user');

    User.updateOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},{$set: JSON.parse(req.params.user_obj)}, (error, result) => {
        // tjekker at du er en custumer, bagefter ændrer den dine informationer.
        if (result) {
            console.log("result");
            if(error){
                res.send("error")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {
            res.send("error")
        }
    })
};