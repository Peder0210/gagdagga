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
//Finder en bruger med de oplyste betingelser og returnerer dataen
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
    })
});

app.post('/registerlesson/:lessonInfo', (req,res) => {
    console.log(req.session);
    // Vi tjekker om req.session userid er en Admin, fordi en customer ikke må have adgang til
    // at oprette en lesson
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){
            console.log(result);
            console.log(JSON.parse(req.params.lessonInfo));
            // Vi opretter en lesson. For at vi kan sende objektet lessonInfo gennem databasen, benytter vi JSON.parse
            Lesson.create(JSON.parse(req.params.lessonInfo), (error2, result2) => {
                if (result2) {
                    // JSON.stringify gør, at vi henter dataen tilbage
                    res.send(JSON.stringify(result2));
                } else {
                    // Alle lektioner skal have et unikt lektionsnavn
                    console.log("Your lesson doesn't have an unique name");
                    res.send("error")
                }
            })
        } else {
            res.send("error2") // vi smider forskellige strings ind, for at detektere fejl hurtigere
        }
    })
});

app.post("/loginuser", (req,res) => {
    console.log(req.body); //
    User.findOne({Username: req.body[0]}, (error, result) => { //req.body er et array af 2 ting (username og password)
        if (result){
            //dekryptere for at se om det indtastede er den korrekte password
            bcrypt.compare(req.body[1], result.Password, (error, same) => {
                if (same) {
                    console.log(result._id);
                    req.session.userId = result._id;
                    console.log(req.session);
                    console.log("User info confirmed");
                    // henter usertype info tilbage fra databasen
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

app.get("/userInfo", (req,res) =>{
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
});

app.get('/lessonboard', (req,res)=> {
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){ // hvis man er en admin får man lov til at se lektionerne.
            Lesson.find({Duration: {$gt: 0}}, (error, result) => {
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No profiles found")
                }
            }) //find alle duration hvor man laver et null. (det gør vi med alle).
        } else{
            res.send("error2")
        }
    })
});

app.get('/lessonboard2', (req,res)=> {
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
        if(result){ // hvis man er en customer får man lov til at se lektionerne.
            Lesson.find({Duration: {$gt: 0}}, (error, result) => {
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No profiles found")
                }
            }) //find alle duration hvor man laver et null  (det gør vi med alle).
        } else{
            res.send("error2")
        }
    })
});

app.get('/mylessonboard/:lesson', (req,res)=> {
    UserLesson.find({userid: req.session.userId}, (error,result) => {
        if(result){ // returnere ale userlessons som brugeren har booket.
            var temp = []; // her oprettes et array, hvor userlesson bliver tilføjet
            for(var i=0;i<result.length;i++){
                if(result[i].lessonid){
                    temp.push(result[i].lessonid)
                }
            }
            Lesson.find({_id:{$in:temp}}, (error1, result1) => {
                if (result1) { // vi finder de Lessons som er i temp-arrayet. Altså de, der er booket af brugeren
                    res.send(JSON.stringify(result1))
                } else {
                    res.send("No profiles found")
                }
            })
        } else{
            res.send("Say Psych")
        }
    });
});

app.delete('/deletelesson/:lesson', (req,res)=> {
console.log(req.params.lesson);
    Lesson.deleteOne({Title: req.params.lesson}, (error, result) => { // du sletter en lektion ud fra den informerede titel
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    })
});

app.put('/booklesson/:lesson', (req,res)=> {
 Lesson.find({_id:JSON.parse(req.params.lesson)}, (error, result)=> { // vi finder den lektion vi vil booke ud fra id'et
     if(result){
         UserLesson.find({lessonid:JSON.parse(req.params.lesson)}, (error1, result2)=> {
             // tjekker hvor mange Userlessons, som har det unikke id til den lektion der ønskes at booke.
             if(result2){
                 if(result2.length==result[0].Participants){ // result[0] er lektionen.
                     console.log("The Lesson is fully booked");
                     res.send("error2")
                 } else{
                     UserLesson.findOne({userid:req.session.userId, lessonid:JSON.parse(req.params.lesson)},(error3,result3)=> {
                         // Hvis der allerede er en UserLesson, som har præcis samme user:id, kan vi ikke booke denne lesson.
                         if (result3) {
                             console.log("You cannot book the same Lesson twice"); // undgå dobbeltbooking
                             res.send("error")
                         } else {
                             UserLesson.create({userid:req.session.userId, lessonid:JSON.parse(req.params.lesson)},(error4,result4)=> {
                                 if (result4) { // opretter UserLesson hvis kriterierne er opfyldt.
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
});

app.put('/cancellesson/:lesson', (req,res)=> {
console.log(req.session);
    UserLesson.deleteOne({$and:[{userid: req.session.userId},{lessonid: JSON.parse(req.params.lesson)[0]}]}, (error,result)=>{
        if(result){ // Sletter den user, hvor userlesson_id og user_id passer sammen. Fordi det er many-to-many forhold, må man tjekke begge veje.
            // En user kan være tilmeldt mange lesson, og en lesson kan have mange tilmeldte.
            console.log(result);
            res.send(result);
        } else{
            console.log(error);
            res.send(result);
        }
    });
});

app.get("/changelessoninfo/:lesson", (req,res) =>{
    Lesson.findOne({Title:req.params.lesson},(error,result)=>{ //finder den lektion man gerne vil ændre ud fra titel og returnerer dataen.
        if(result) {
            res.send(JSON.stringify(result))
        }
        else{
            res.send("No profiles found")
        }
    })
});

app.put('/changelessoninfomation/:lesson', (req,res)=> {
    console.log(JSON.parse(req.params.lesson)[1]);
    Lesson.updateOne({Title: JSON.parse(req.params.lesson)[0]},{$set: JSON.parse(req.params.lesson)[1]}, (error, result) => {
        // opdaterer informationerne ud fra titel-key.
        if (result) {
            console.log("det virker :)");
            if(error){
                res.send("error")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {
            res.send("error")
        }
    })
});

app.get("/getuserinfo", (req,res) =>{
    User.findOne({_id:req.session.userId},(error,result)=>{
        if(result) { // før vi kan ændre på userinfo, skal vi hente dem.
            res.send(JSON.stringify(result))
        }
        else{
            res.send("No profiles found")
        }
    })
});

app.put('/changeuserinfo/:userinfo', (req,res)=> {
    User.updateOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},{$set: JSON.parse(req.params.userinfo)}, (error, result) => {
        // tjekker at du er en custumer, bagefter ændrer den dine informationer.
        if (result) {
            console.log("result");
            if(error){
                res.send("error")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {
            res.send("error")
        }
    })
});

app.use((req,res) =>res.render('notfound'));
