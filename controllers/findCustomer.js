const User = require("../models/user");
module.exports = (req,res) => {



    console.log(req.session);
    //Tjekker at det er den rigtige user, der får adgang til MyPageUser
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},(error,result)=>{
        if(result){ // hvis rigtigt bruger vi JSON.stringify for at afhente data
            console.log(result);
            res.send(JSON.stringify(result));
        } else{ //hvis fejl, får vi udskrevet denne string
            res.send("No profiles found")
        }
    })
};


