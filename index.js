const express = require('express');
const app = new express();
const bcrypt  = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const UserLesson = require(`./models/userlesson`);
const expressSession = require('express-session');
const logoutController = require("./controllers/logout");
const Lesson = require("./models/lesson");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const registerLesson = require ("./controllers/registerLesson");
const loginUserController = require("./controllers/loginUser");
const registerUserController = require("./controllers/registerUser");
const userInfo = require("./controllers/userInfo");
const lessonBoard = require("./controllers/lessonBoard");
const lessonBoard2 = require("./controllers/lessonBoard2");
const myLessonBoard = require("./controllers/myLessonBoard");
const deleteLesson  = require("./controllers/deleteLesson");
const bookLesson = require("./controllers/bookLesson");
const cancelLesson = require("./controllers/cancelLesson");
const changeLessonInfo = require("./controllers/changeLessonInfo");
const changeLessonInformation = require("./controllers/changeLessonInformation");
const getUserInfo = require("./controllers/getUserInfo");
const changeUserInfo = require("./controllers/changeUserInfo");
app.use(expressSession({ //Opretter en session.
    secret: 'Temno Player'
}));

mongoose.connect('mongodb://localhost:27017/wow'), {useNewUrlParser:true};
var db = mongoose.connection;

app.set('view engine','ejs');
app.use(express.static('puplic'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(cookieParser('secret'));

app.listen(3000,()=>{
   console.log("App listening on port 3000")
    });
app.get('/adminsite', (req,res) =>{
   res.render('adminsite')
});
app.get('/classSiteUser', (req,res)=>{
    res.render('classSiteUser')
});
app.get('/changelesson', (req,res)=>{
    res.render('changelesson')
});
app.get('/classSiteAdmin', ( req,res) => {
    res.render('classSiteAdmin')
});
app.get('/changeuserinfo', (req,res) =>{
    res.render('changeuserinfo')
});
app.get('/myClasses',  (req,res) =>{
    res.render('myClasses')
});
app.get('/register', (req,res) =>{
    res.render('register')
});

app.post("/registerUser/:userInfo", registerUserController);

app.get("/login", (req,res) =>{
    res.render("login")
});

app.post('/loginuser', loginUserController);

app.get("/logout", logoutController);

app.get('/myPageUser', (req,res) =>{
    res.render('myPageUser')
});

app.post("/registerlesson/:lessonInfo", registerLesson);

app.get("/userInfo", userInfo);

app.get('/lessonboard', lessonBoard);

app.get('/lessonboard2', lessonBoard2);

app.get('/mylessonboard/:lesson', myLessonBoard);


app.delete('/deletelesson/:lesson', deleteLesson);

app.put('/booklesson/:lesson', bookLesson);

app.put('/cancellesson/:lesson', cancelLesson);

app.get("/changelessoninfo/:lesson", changeLessonInfo);

app.put('/changelessoninfomation/:lesson', changeLessonInformation);

app.get("/getuserinfo", getUserInfo);

app.put('/changeuserinfo/:userinfo', changeUserInfo);

app.use((req,res) =>res.render('notfound'));
