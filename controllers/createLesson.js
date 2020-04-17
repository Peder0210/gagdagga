module.exports =  (req,res) => {
   /*if (req.session.userId) { //prøvede at implementere check om admin er logget ind for at give ham tilladelse til at oprette dansetimer.
        return res.render("create");*/
        console.log(req.body);
    Lesson.create(req.body,(error,lesson) =>{
        res.redirect('/AdminSite')
    })
};