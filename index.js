//const http = require('http'); // leila has been here :)
//const fs = require('fs'); //luka was here....
const express = require('express');
const app = new express();
//const path = require('path');
//const ejs = require('ejs');
//const joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
//const loginController = require('./controllers/logins');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const logoutController = require("./controllers/logout")
//const createLesson = require("./controllers/createLesson")
const Lesson = require("./models/lesson")
//const getInfo = require("./controllers/getInfo");
const loginAdministrator = require('./controllers/loginAdministrator');
//const mongotest = require('./controllers/mongo');
//const authMiddleware = require("./middleware/autMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");


/*const validateMiddleWare = (req,res,next) => {
    if(req.body.Navn == ''){
        console.log('User not created');
        return res.redirect('/register')
    }
    next()
};*/

app.use(expressSession({ //Opretter en session.
    secret: 'Temno Player'
}));

mongoose.connect('mongodb://localhost:27017/wow'), {useNewUrlParser:true};
var db = mongoose.connection;
app.set('view engine','ejs');
app.use(express.static('puplic'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use('/register/store',validateMiddleWare);



app.listen(3000,()=>{
   console.log("App listening on port 3000")
    });

app.get('/adminsite', (req,res) =>{
   res.render('adminsite')
});

app.get('/classSiteUser', /*authMiddleware,*/ (req,res)=>{
    res.render('classSiteUser')
});


app.get('/changelesson', /*authMiddleware,*/ (req,res)=>{
    res.render('changelesson')
});
app.get('/classSiteAdmin', /*authMiddleware,*/ ( req,res) => {
    res.render('classSiteAdmin')
});

/*app.get('/loggedIn', (req,res) =>{
    res.render('loggedIn')
});*/

app.get('/changeuserinfo', (req,res) =>{
    res.render('changeuserinfo')
});
/*app.get('/logoutAdmin', (req,res) =>{
    res.render('logoutAdmin')
}); */

/*app.get('/logoutUser', (req,res) =>{
    res.render('logoutUser')
}); */

app.get('/myClasses', /*authMiddleware*/ (req,res) =>{
    res.render('myClasses')
});

app.get('/register', redirectIfAuthenticatedMiddleware, (req,res) =>{ //Redirect if autheticated middleware gør at man må ikke komme ind på login eller register hvis man allerede er logget ind. Man bliver redirected til mypageuser i stedet.
    res.render('register')
});

app.get('/login',redirectIfAuthenticatedMiddleware, (req,res) =>{
    res.render('login')
});

app.get("/logout", logoutController)

app.get('/myPageUser', (req,res) =>{
    var id = req.params.id;
    res.render('myPageUser', {user: id});

});
app.post('/registerUser/:userInfo', (req,res) => {

    let userInfo = JSON.parse(req.params.userInfo);
 console.log(userInfo);
    User.create(userInfo);
    res.redirect('/login');





});


/*app.post('/register/store', (req,res) => {
    console.log(req.body);
const schema = joi.object().keys({
    Email : joi.string().trim().email().required(),
    Password : joi.string().min(3).max(50).required(),
    Navn : joi.string().required(),
    Birthday : joi.string().required(),
    Gender : joi.string().required(),
    MobilNummer : joi.string().min(8).max(8).required(),
    Username : joi.string().required()









});
joi.validate(req.body,schema,(err,result)=>{
    if(err) {
        console.log(err);
        res.send("Information is wrong or invalid")
    }
    console.log(result);
    UserData.create(req.body);


});
    res.redirect('/login')
});

*/
app.post('/lesson/store', (req,res) => {
    console.log(req.body);
    const schema = joi.object().keys({
        Title: joi.string().required(),
        Locales : joi.string().required(),
        Tid: joi.string().required(),
        Duration: joi.number().required(),
        Participants: joi.string().required(),
        Teachers: joi.string().required(),



    });
    joi.validate(req.body,schema,(error,result)=>{
        if(error) {
            console.log(error);
            let error = "Information is missing. Please make sure that you have entered all the fields correctly.";

            res.redirect('/classSiteAdmin?error=' + error);
        }

        console.log(result);
        Lesson.create(req.body);

    });

    res.redirect('/classSiteAdmin')

});


app.post('/login', loginUserController);

//app.get("/auth/login", logoutController);

app.post('/AdminSite', async (req,res) => {
    console.log(req.body);
    await Lesson.create(req.body,(error,lesson) =>{
        res.redirect('/AdminSite')
    })
});



app.get("/userInfo", (req,res) =>{

  User.findOne({Username:req.query.username},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
       if(result){
           if(req.session.userId == result._id)

                res.send(JSON.stringify(result))  // Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
           else
               res.send();
       }
       else{
           res.send("No profiles found")
       }
   })

});

 app.get("/lessonInfo", (req,res) =>{ //Vi finder lesson vha. dens titel som er dens unikke id.
    Lesson.findOne({Title:"g"},(error,result)=>{
        if(result){
            res.send(JSON.stringify(result))
        }
        else{
            res.send("No profiles found")
        }
    });
     })

 app.get('/classSiteAdmin', async (req,res)=>{   // Sætter variablen lessons ligmed hvad vi opretter på adminsite.
    const lessonposts = await Lesson.findOne({ })
    res.render('index', {
        lessonposts
    });
})

app.get('/lessonboard', (req,res)=> {
    Lesson.find({Duration: {$gt: 0}}, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find alle duration hvor man laver et null (det gør vi med alle).
});

app.get('/mylessonboard/:lesson', (req,res)=> {

    Lesson.find({Participantnames: req.params.lesson}, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find alle participant names hvor man laver et null
});





app.delete('/deletelesson/:lesson', (req,res)=> {
console.log(req.params.lesson);
    Lesson.deleteOne({Title: req.params.lesson}, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find en lesson hvor man laver et null og sletter denne bestemte lesson.
});


app.put('/booklesson/:lesson', (req,res)=> { // :lesson accepterer en hver string værdi under objektet.
    var username2 = req.params.lesson.split(',')[1];
    var lesson2 = req.params.lesson.split(',')[0];
    console.log(req.params.lesson);
    console.log(`hej+${username2}+${lesson2}`); //Vi tester at vores variabler virker.

    var myquery = {Title: lesson2};
    var newvalues = {$push: {Participantnames: username2}};
    Lesson.updateOne(myquery,newvalues, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find alle duration hvor man laver et null
});



app.put('/cancellesson/:lesson', (req,res)=> {
    var username2 = req.params.lesson.split(',')[1];
    var lesson2 = req.params.lesson.split(',')[0];
    console.log(req.params.lesson);
    console.log(`hej+${username2}+${lesson2}`);

    var myquery = {Title: lesson2};
    var newvalues = {$pull: {Participantnames: username2}};
    Lesson.updateOne(myquery,newvalues, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find alle duration hvor man laver et null
});

app.get("/changelessoninfo/:lesson", (req,res) =>{

    Lesson.findOne({Title:req.params.lesson},(error,result)=>{
        if(result) {


            res.send(JSON.stringify(result))  // Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
        }
        else{
            res.send("No profiles found")
        }
    })

});


app.put('/changeinfolesson/:lesson', (req,res)=> {


let lessondata = JSON.parse(req.params.lesson);

    var myquery = {Title: lessondata[0]};
    console.log(myquery);
    var newvalues = {$set: { Title: lessondata[1], Locales: lessondata[2], Time: lessondata[3], Duration: lessondata[4], Participants: lessondata[5], Teachers: lessondata[6]}};
    Lesson.updateOne(myquery,newvalues, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find alle duration hvor man laver et null
});


app.get("/getuserinfo/:lesson", (req,res) =>{

    User.findOne({Username:req.params.lesson},(error,result)=>{
        if(result) {


            res.send(JSON.stringify(result))  // Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
        }
        else{
            res.send("No profiles found")
        }
    })

});


app.put('/changeuserinfo/:userinfo', (req,res)=> {


   let value = req.params.userinfo;
   var values = JSON.parse(value);

    var myquery = {Username: values[0]};
    console.log(myquery);
    console.log(values[1]);
    var newvalues = {$set: { Navn: values[1], Gender: values[2], Email: values[3], Username: values[4]}};
    User.updateOne(myquery,newvalues, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result));
        } else {
            res.send("No profiles found")
        }
    }) //find alle duration hvor man laver et null
});

app.post('/login2', loginAdministrator);
app.use((req,res) =>res.render('notfound'))



