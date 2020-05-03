const express = require('express');
const app = new express();
const bcrypt  = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const UserLesson = require(`./models/userlesson`)
const expressSession = require('express-session');
const logoutController = require("./controllers/logout")
const Lesson = require("./models/lesson")
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

const validator = require(`mongoose-unique-validator`);
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

app.get('/login', (req,res) =>{
    res.render('Login')
});

app.get("/logout", logoutController);

app.get('/myPageUser', (req,res) =>{
    res.render('myPageUser')
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
    console.log(req.session);
    User.findOne({_id:req.session.userId},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
        if(result){
            console.log(result);
            let lessonInfo = JSON.parse(req.params.lessonInfo);
            console.log(lessonInfo);
            Lesson.create(lessonInfo, (error2, result2) => {
                if (result2) {

                    console.log("worked");
                    res.send(JSON.stringify(result2));
                } else {
                    console.log(error2);
                    console.log("Your lesson doesn't have an unique name");
                    res.send("error")
                }
            }) //find alle duration hvor man laver et null// Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
        } else{
            res.send("error2")
        }
    })

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


app.post('/AdminSite', async (req,res) => {
    console.log(req.body);
    await Lesson.create(req.body,(error,lesson) =>{
        res.redirect('/AdminSite')
    })
});



app.get("/userInfo", (req,res) =>{
    console.log(req.session);
  User.findOne({_id:req.session.userId},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
       if(result){
           console.log(result);
               res.send(JSON.stringify(result)); // Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
         } else{
           res.send("No profiles found")
       }
   })
});



app.get('/lessonboard', (req,res)=> {
    User.findOne({_id:req.session.userId},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
        if(result){
            Lesson.find({Duration: {$gt: 0}}, (error, result) => {
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No profiles found")
                }
            }) //find alle duration hvor man laver et null// Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
        } else{
            res.send("error2")
        }
    })

    //find alle duration hvor man laver et null (det gør vi med alle).
});

app.get('/mylessonboard/:lesson', (req,res)=> {
    UserLesson.find({userid: req.session.userId}, (error,result) => {
        if(result){
            var temp = [];
            for(var i=0;i<result.length;i++){
                if(result[i].lessonid){

                    temp.push(result[i].lessonid)
                }
            }

            Lesson.find({_id:    {$in:temp}}, (error1, result1) => {
                if (result1) {

                    res.send(JSON.stringify(result1))
                } else {
                    res.send("No profiles found")
                }
            })
        } else{
            res.send("Say Psych")
        }
    });
    //find alle participant names hvor man laver et null
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
 Lesson.find({_id:JSON.parse(req.params.lesson)}, (error, result)=> {
     if(result){
         UserLesson.find({lessonid:JSON.parse(req.params.lesson)}, (error1, result2)=> {
             if(result2){
                 if(result2.length==result[0].Participants){
                     console.log("The Lesson is fully booked");
                     res.send("error2")
                 } else{

                     UserLesson.findOne({userid:req.session.userId, lessonid:JSON.parse(req.params.lesson)},(error3,result3)=> {
                         if (result3) {
                             console.log("You cannot book the same Lesson twice");
                             res.send("error")
                         } else {
                             UserLesson.create({userid:req.session.userId, lessonid:JSON.parse(req.params.lesson)},(error4,result4)=> {
                                 if (result4) {
                                     res.send(JSON.stringify(result4))
                                 } else {
                                     res.send("UserLesson couldnt be created")
                                 }
                             })
                         }
                     })
                 }
             } else{
                 console.log("Error")
             }
         });
     } else{
         console.log("Error")
     }
 });








    //find alle duration hvor man laver et null
})


//Userlesson.find(userid: req.session.userid){
//
//}
app.put('/cancellesson/:lesson', (req,res)=> {

console.log(req.session);
    let query = {$and:[{userid: req.session.userId},{lessonid: JSON.parse(req.params.lesson)[0]}]};
    console.log(query);
   console.log( JSON.stringify(query,null,2));
    UserLesson.deleteOne(query, (error,result)=>{
        if(result){
            console.log(result);
            res.send(result);
        } else{

            console.log(error);
            res.send(result);
        }
    });
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


app.get("/getuserinfo", (req,res) =>{

    User.findOne({_id:req.session.userId},(error,result)=>{
        if(result) {
            res.send(JSON.stringify(result))  // Tjekker userid og den user som er logget ind så man undgår at komme ind på andre brugeres side og se deres oplysninger.
        }
        else{
            res.send("No profiles found")
        }
    })

});


app.put('/changeuserinfo/:userinfo', (req,res)=> {
    User.updateOne({_id: req.session.userId},{$set: JSON.parse(req.params.userinfo)}, (error, result) => {
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



