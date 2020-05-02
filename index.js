//const http = require('http'); // leila has been here :)
//const fs = require('fs'); //luka was here....
const express = require('express');
const app = new express();
const bcrypt  = require('bcrypt');
//const path = require('path');
//const ejs = require('ejs');
//const joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const UserLesson = require(`./models/userlesson`)

const expressSession = require('express-session');
const logoutController = require("./controllers/logout")

const Lesson = require("./models/lesson")
const flash = require('connect-flash');

const cookieParser = require('cookie-parser')


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

app.use(flash());
app.use(cookieParser('secret'));

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

app.get('/register', (req,res) =>{ //Redirect if autheticated middleware gør at man må ikke komme ind på login eller register hvis man allerede er logget ind. Man bliver redirected til mypageuser i stedet.
    res.render('register')
});

app.get('/login', (req,res) =>{
    res.render('Login')
});

app.get("/logout", logoutController)

app.get('/myPageUser', (req,res) =>{
    var id = req.params.id;
    res.render('myPageUser', {user: id});

});
app.post('/registerUser/:userInfo', (req,res) => {

    let userInfo = JSON.parse(req.params.userInfo);
 console.log(userInfo);
    User.create(userInfo, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result));
        } else {
            console.log("User doesn't have an unique username");
            res.send("error")
        }
    }) //find alle duration hvor man laver et null
});

app.post('/registerlesson/:lessonInfo', (req,res) => {

    let lessonInfo = JSON.parse(req.params.lessonInfo);
    console.log(lessonInfo);
    Lesson.create(lessonInfo, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result));
        } else {
            console.log(error);
            console.log("Your lesson doesn't have an unique name");
            res.send("error")
        }
    }) //find alle duration hvor man laver et null
});
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



app.post("/loginuser", (req,res) => {
    //let userdata = JSON.parse(req.body);
    console.log(req.body);

    User.findOne({Username: req.body[0]}, (error, result) => {
        if (result) {
            bcrypt.compare(req.body[1], result.Password, (error, same) => {
                if (same) {
                    console.log(result._id);
                    req.session.userId = result._id;
                    console.log(req.session);
                    console.log("User info confirmed");

                    res.send(JSON.stringify([req.body[0],result.Usertype]))
                }
                else{
                  console.log("Password is wrong");
                    res.send("Password is wrong")
                }
            })
        } else {
            console.log("Username doesn't exist");
            res.send("Username doesn't exist")
        }
    })
});

app.get("/auth/login", logoutController);

app.post('/AdminSite', async (req,res) => {
    console.log(req.body);
    await Lesson.create(req.body,(error,lesson) =>{
        res.redirect('/AdminSite')
    })
});



app.get("/userInfo", (req,res) =>{
  User.findOne({Username:req.query.username},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
       if(result){
           if(req.session.userId == result._id){
               res.send(JSON.stringify(result)); // Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
       }  else {
               res.send();
           }} else{
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
    console.log(JSON.parse(req.params.lesson));

    Lesson.updateOne({Title: JSON.parse(req.params.lesson)[0]},
        {$push: {Participantnames: JSON.parse(req.params.lesson)[1]}},
        (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    }) //find alle duration hvor man laver et null
});



app.put('/cancellesson/:lesson', (req,res)=> {
    console.log(JSON.parse(req.params.lesson));

    Lesson.updateOne({Title: JSON.parse(req.params.lesson)[0]},
        {$pull: {Participantnames: JSON.parse(req.params.lesson)[1]}},
        (error, result) => {
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    })
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


app.put('/changelessoninfomation/:lesson', (req,res)=> {
    let value = req.params.lesson;
    var values = JSON.parse(value);
console.log("virker det")
    var myquery = {Title: values[0]};
    console.log(myquery);
    console.log(values[1]);
    var newvalues = {$set: values[1]};
    Lesson.updateOne(myquery,newvalues, (error, result) => {
        if (result) {
            console.log("ggg");
            if(error){
                res.send("error")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {

            res.send("error")
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
    var newvalues = {$set: values[1]};
    User.updateOne(myquery,newvalues, (error, result) => {
        if (result) {
            console.log("ggg");
            if(error){
                res.send("error")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {

            res.send("error")
        }
    }) //find alle duration hvor man laver et null
});


app.use((req,res) =>res.render('notfound'));



