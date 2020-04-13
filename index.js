const http = require('http'); // leila has been here :)
const fs = require('fs'); //luka was here
const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserData = require('./models/userData');
const loginController = require('./controllers/logins');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const logoutController = require("./controllers/logout")
const createLesson = require("./controllers/createLesson")
const Lesson = require("./models/lesson")
const getInfo = require("./controllers/getInfo");
const loginAdministrator = require('./controllers/loginAdministrator');
const mongotest = require('./controllers/mongo');


const validateMiddleWare = (req,res,next) => {
    if(req.body.Navn == ''){
        console.log('User not created');
        return res.redirect('/register')
    }
    next()
};

app.use(expressSession({
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

app.get('/classSiteUser', (req,res) =>{
    res.render('classSiteUser')
});

app.get('/classSiteAdmin', (req,res) =>{
    res.render('classSiteAdmin')
});

app.get('/loggedIn', (req,res) =>{
    res.render('loggedIn')
});

app.get('/logoutAdmin', (req,res) =>{
    res.render('logoutAdmin')
});

app.get('/logoutUser', (req,res) =>{
    res.render('logoutUser')
});

app.get('/myClasses', (req,res) =>{
    res.render('myClasses')
});

app.get('/register', (req,res) =>{
    res.render('register')
});

app.get('/login', (req,res) =>{
    res.render('login')
});

app.get('/myPageUser', (req,res) =>{
    var id = req.params.id;
    res.render('myPageUser', {user: id});

});

app.post('/register/store', (req,res) => {
    console.log(req.body);
const schema = joi.object().keys({
    Email : joi.string().trim().email().required(),
    Password : joi.string().min(5).max(10).required(),
    Navn : joi.string().required(),
    Birthday : joi.string().required(),
    Gender : joi.string().required(),
    MobilNummer : joi.string().required(),
    Username : joi.string().required()









});
joi.validate(req.body,schema,(err,result)=>{
    if(err){
        console.log(err);
        res.send("An error has occured");
    }
    console.log(result);
    UserData.create(req.body);


});
    res.redirect('/login')
});


app.post('/login', loginUserController);

app.get("/auth/login", logoutController)

app.post('/AdminSite', async (req,res) => {
    console.log(req.body);
    await Lesson.create(req.body,(error,lesson) =>{
        res.redirect('/AdminSite')
    })
});



app.get("/userInfo", (req,res) =>{
  UserData.findOne({Username:req.query.username},(error,result)=>{
       if(result){
           res.send(JSON.stringify(result))
       }
       else{
           res.send("No profiles found")
       }
   })

});

 app.get("/lessonInfo", (req,res) =>{
    Lesson.findOne({Title:"g"},(error,result)=>{
        if(result){
            res.send(JSON.stringify(result))
        }
        else{
            res.send("No profiles found")
        }
    });
     })

 app.get('/classSiteAdmin', async (req,res)=>{
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
    }) //find alle duration hvor man laver et null
});


app.post('/login2', loginAdministrator);
app.use((req,res) =>res.render('notfound'))



