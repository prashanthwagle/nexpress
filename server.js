const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
    const server = express();

    let Session = require('express-session');
    let MemoryStore = require('memorystore')(Session);

    server.use(bodyParser.urlencoded({
        extended:false
    }));
    server.use(bodyParser.json());

    const {
        PORT=3000,
        NOD_ENV='development',
        SECRET='HighlySecret!',
        COOKIE_DURATION=1000*60*60*2
    } = process.env;

    const redirectLogin = (req, res, next)=>{
        if(!req.session.userid){
            res.redirect('/login')
        }else{
            next()
        }
    }

    const redirectHome = (req,res,next)=>{
        if(req.session.userid){
            res.redirect('/');
        }else{
            next();
        }
    }

    server.use(Session({

        name: '_yeti_demo', 
        secret: SECRET, 
        resave: false,
        store: new MemoryStore({
            checkPeriod: COOKIE_DURATION 
        }), 
        saveUninitialized: false,
        cookie:{
            maxAge: COOKIE_DURATION, // 1 hour
            sameSite: true
        }

    }));

    server.post('/login', (req,res)=>{
        console.log(req.body)
        if(req.body.username==='ppw'){
            req.session.userid=req.body.username;
            res.status(200)
            return res.redirect('/')
        }else{
            res.status(403)
            return res.send("Invalid Credentials")
        }
    })

    server.get('/login', redirectHome, (req,res)=>{
        app.render(req,res, '/login')
    })

    server.get('/logout', (req,res)=>{
        req.session.destroy(err=>{
            if(err){
                return console.log(err)
            }
            res.redirect('/login')
            return console.log("Destroyed Session")

        })
    })
        

    server.get('/custom',(req, res) => {
        const actualPage = '/about'
        app.render(req, res, actualPage)
    })

    server.get('/', redirectLogin, (req,res)=>{
        console.log(req.session)
        app.render(req,res,'/')
    })

    
    server.get('*', (req, res) => {
        return handle(req, res)
    })



            
    server.listen(3000, (err) => {
        if (err) throw err
        console.log('Ready on http://localhost:3000')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})