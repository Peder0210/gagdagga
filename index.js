//NPM custom modules
const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

//Variables are created that contain controllers
const createUser = require("./controllers/createUser");
const createLesson = require ("./controllers/createLesson");
const createBooking = require("./controllers/createBooking");

const findCustomer = require("./controllers/findCustomer");
const findLessonsCustomer = require("./controllers/findLessonsCustomer");
const findLessonsAdmin = require("./controllers/findLessonsAdmin");
const findBookings = require("./controllers/findBookings");
const findOneLesson = require("./controllers/findOneLesson");
const findParticipants  = require("./controllers/findParticipants");

const updateLesson = require("./controllers/updateLesson");
const updateUser = require("./controllers/updateUser");

const deleteLesson  = require("./controllers/deleteLesson");
const deleteBooking = require("./controllers/deleteBooking");
const deleteUser = require("./controllers/deleteUser");

const login = require("./controllers/login");
const logout = require("./controllers/logout");


// Middleware(s)
const redirectIfLoggedIn = require('./middleware/redirectIfLoggedIn');

//Setting up MongoDB, Ejs and Express
mongoose.connect('mongodb://localhost:27017/danseskole'), {useNewUrlParser:true};
app.set('view engine','ejs');

//Opretter en session.
app.use(expressSession({
  secret: 'Temno Player'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());


//This application will listen on port 3000
app.listen(3000,()=>{
  console.log("App listening on port 3000")
});


//Routes for ejs pages with  login and registration
app.get('/createUser', redirectIfLoggedIn, (req,res) =>{
  res.render('createUser')
});

app.get("/login",redirectIfLoggedIn, (req,res) =>{
  res.render("login")
});


//Routes for admin sites
app.get('/adminPage', (req,res) =>{
  res.render('adminPage')
});

app.get('/lessonsAdmin', ( req,res) => {
  res.render('lessonsAdmin')
});

app.get('/findPart', (req,res) =>{
  res.render('findPart')
});

app.get('/updateLesson', (req,res)=>{
  res.render('updateLesson')
});


//Routes for customer sites
app.get('/customerPage', (req,res) =>{
  res.render('customerPage')
});

app.get('/lessonsCustomer', (req,res)=>{
  res.render('lessonsCustomer')
});

app.get('/myBookings',  (req,res) =>{
  res.render('myBookings')
});

app.get('/updateUser', (req,res) =>{
  res.render('updateUser')
});


//POST requests
app.post("/createUser/:user_obj", createUser);

app.post("/createLesson/:lesson_obj", createLesson);

app.post('/createBooking/:lesson_id', createBooking);

app.post('/loginuser', login);


//GET requests
app.get("/logout", logout);

app.get("/findCustomer", findCustomer);

app.get('/findLessonsAdmin', findLessonsAdmin);

app.get('/findLessonsCustomer', findLessonsCustomer);

app.get('/findBookings', findBookings);

app.get("/findOneLesson/:lesson_id", findOneLesson);

app.get('/findParticipants/:lesson_id', findParticipants);

//Delete requests
app.delete('/deleteLesson/:lesson_id', deleteLesson);

app.delete('/deleteUser', deleteUser);

app.delete('/deleteBooking/:booking_lessonid', deleteBooking);


//Put requests
app.put('/updateLesson/:lesson_updatedInfo', updateLesson);

app.put('/updateUser/:user_obj', updateUser);


//Used for unknown routes
app.use((req,res)=>res.render('notfound'));
