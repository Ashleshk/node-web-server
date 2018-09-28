const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

//for dynamic port allocation
const port =process.env.PORT || 3000;
// create an app
var app = express();

//for setting up template for pages 
hbs.registerPartials(__dirname + '/views/partials');

//set up a view engine
app.set('view engine','hbs');

//middleware  ----  lets you configure express to work like to your way
            /*       logiing to screen 
                    api authetication
                    write header is sent
                    respont to a request -- resppoonse.render  response.sent
                    whether logded in and give access to him*/


// next for next thing to do 
app.use((req,res,next)=>{
    var now = new Date().toString();
    //creating LOGGER
    var log = `${now}: + ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to Append to server.log');
         }
    });
        
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); 


//register helper of hbs
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
//helper with arguemets
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

//setting up http routehandler
app.get('/',(req,res)=>{
    
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'welcome to my website'
    });
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name:'Ashlesh',
    //     likes:[
    //         'biking',
    //         'hiking',
    //         'sleeping'
    //     ]
    // })
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle:'about page' 
    });
});

app.get('/projects',(req,res) =>{
    res.render('projects.hbs',{
        pageTitle:'Projects page' 
    });
});

app.get('/bad',(req,res) =>{
    res.send({
        error:'could not load page'
    });
});

//an default port no set here with a function server is up ... do something
app.listen(port,()=>{
    console.log(`Server is Up on port ${port}`);
    
});