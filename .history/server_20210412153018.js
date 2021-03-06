const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug' );
app.use(express.json());
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    user: "DMV_S2021",
    host: "45.55.136.114",
    password: "g0t2m0ve1t!",
    database: "DMV_S2021"
})

db.connect(function(err){
    if (err) throw err;
    console.log("Database MDV_S2021 is connected.")
})

app.post("/AdminInfo", (req, res) => {
    const adminID = req.body.id;
    const adminPW = req.body.pw;
    db.query(
        'SELECT * FROM Admin WHERE adminID = ? AND adminPW = ?',
        [adminID, adminPW],
        (err, result) => {
            console.log(`${adminID}`)
            console.log(`${adminPW}`)
            if(err) throw err;
            if(result.length > 0){
                req.session.loggedin = true;
				req.session.adminID = adminID;
                
                res.redirect('/lostItemsAdmin')
            }else{
                res.send("incorrect verification")
            }
            
            
    })
});

app.post("/UserInfo", (req, res) => {
    const userID = req.body.userID;
    const userPW = req.body.userPW;

    db.query(
        'SELECT * FROM User WHERE userID = ? AND userPW = ?',
        [userID, userPW],
        (err, result) => {
            console.log(`${userID}`)
            console.log(`${userPW}`)

            if(err) throw err;
            if(result.length > 0){
                req.session.loggedin = true;
				req.session.userID = userID;

                res.redirect('/lostItemsStudent')
            }else{
                res.send("Incorrect login, try again")
            }

        }
    )
})

app.get("/lostItemsAdmin", (req, res) => {
    if(req.session.loggedin){
        db.query(
            "SELECT * FROM lostItems",
            (err,result) => {
                if(err) throw err;
                console.log(result)
                res.send(result)
                res.render('lostItems')
            }
        )
    }else{
        res.send("You must be an admin to view this page")
    }
    
    
})

app.get('/loginPage', (req, res) => {
    res.render('login');
})

app.get('/admin', (req, res) => {
    res.render('adminlogin')
})

app.get('/student', (req, res) => {
    res.render('studentLogin')
})

app.listen('3001', () => { 
    console.log("Server running on port 3001")
})