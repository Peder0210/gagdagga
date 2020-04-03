const http = require('http');
const fs = require('fs');
const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
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
app.use('/register/store',validateMiddleWare);



app.listen(3001,()=>{
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

    UserData.create(req.body,(error,userdata) =>{
        res.redirect('/login')
    })
});


app.post('/login', loginUserController);

app.get("/auth/login", logoutController)

app.post('/AdminSite', (req,res) => {
    console.log(req.body);
    Lesson.create(req.body,(error,lesson) =>{
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

app.use((req,res) =>res.render('notfound'));

