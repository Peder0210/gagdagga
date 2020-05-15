const User = require("../models/user");


//
// Her findes en bestemt 'customer' bruger.
// Dette anvendes til siden customerPage.ejs
// - der er en side til brugerens oplysninger.
//


module.exports = (req,res)=>{
  console.log(req.session);
  // Kontrollerer at det er den rigtige user samt Customer, der får adgang til MyPageUser
  User.findOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},(error,result)=>{
    // hvis rigtigt bruger vi JSON.stringify for at sende data
    if(result){
      console.log(result);
      res.send(JSON.stringify(result));
    }
    // hvis fejl, får vi udskrevet denne string
    else{
      res.send("No customer found");
    }
  })
};
