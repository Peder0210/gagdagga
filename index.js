const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const createUser = require("./controllers/createUser");
const createLesson = require ("./controllers/createLesson");
const createBooking = require("./controllers/createBooking");

const findCustomer = require("./controllers/findCustomer");
const findLessonsCustomer = require("./controllers/findLessonsCustomer");
const findLessonsAdmin = require("./controllers/findLessonsAdmin");
const findBookings = require("./controllers/findBookings");
const findOneLesson = require("./controllers/findOneLesson");
const logged = require('./middleware2/logged');
const updateLesson = require("./controllers/updateLesson");
const updateUser = require("./controllers/updateUser");

const deleteLesson  = require("./controllers/deleteLesson");
const deleteBooking = require("./controllers/deleteBooking");
const deleteUser = require("./controllers/deleteUser");
const team  = require("./controllers/team");
const login = require("./controllers/login");
const logout = require("./controllers/logout");




app.use(expressSession({ //Opretter en session.
    secret: 'Temno Player'
}));

mongoose.connect('mongodb://localhost:27017/danseskole'), {useNewUrlParser:true};


app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(cookieParser('secret'));
//hej

app.listen(3000,()=>{
   console.log("App listening on port 3000")
    });
app.get('/adminPage', (req,res) =>{
   res.render('adminPage')
});

app.get('/findPart', (req,res) =>{
    res.render('findPart')
});
app.get('/lessonsCustomer', (req,res)=>{
    res.render('lessonsCustomer')
});
app.get('/updateLesson', (req,res)=>{
    res.render('updateLesson')
});
app.get('/lessonsAdmin', ( req,res) => {
    res.render('lessonsAdmin')
});
app.get('/updateUser', (req,res) =>{
    res.render('updateUser')
});
app.get('/myBookings',  (req,res) =>{
    res.render('myBookings')
});
app.get('/createUser', logged, (req,res) =>{
    res.render('createUser')
});

app.get('/customerPage', (req,res) =>{
    res.render('customerPage')
});

app.get("/login",logged, (req,res) =>{
    res.render("login")
});

app.post("/createUser/:user_obj", createUser);

app.post("/createLesson/:lesson_obj", createLesson);

app.post('/createBooking/:lesson_id', createBooking);

app.post('/loginuser', login);

app.get("/logout", logout);

app.get("/findCustomer", findCustomer);

app.get('/findLessonsAdmin', findLessonsAdmin);

app.get('/findLessonsCustomer', findLessonsCustomer);

app.get('/findBookings', findBookings);

app.delete('/deleteLesson/:lesson_title', deleteLesson);

app.delete('/deleteUser', deleteUser);

app.delete('/deleteBooking/:booking_lessonid', deleteBooking);

app.get("/findOneLesson/:lesson_title", findOneLesson);

app.put('/updateLesson/:lesson_updatedInfo', updateLesson);

app.put('/updateUser/:user_obj', updateUser);

app.get('/findteam/:lesson_title', team);

app.use((req,res) =>res.render('notfound'));
