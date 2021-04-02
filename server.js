const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
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

app.get("/lostItemsAdmin", (req, res) => {
    if(req.session.loggedin){
        db.query(
            "SELECT * FROM lostItems",
            (err,result) => {
                if(err) throw err;
                console.log(result)
                res.send(result)
            }
        )
    }else{
        res.send("You must be an admin to view this page")
    }
    
    
})

app.listen('3001', () => { 
    console.log("Server running on port 3001")
})