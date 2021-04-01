var express = require('express');
var mysql = require('mysql');
var app = express();

app.use(express.json());

var db = mysql.createConnection({
    user: "DMV_S2021",
    host: "45.55.136.114",
    password: "g0t2m0ve1t!",
    database: "DMV_S2021"
})

db.connect(function(err){
    if (err) throw err;
    console.log("Database MDV_S2021 is connected.")
})

app.get("/AdminInfo", (req, res) => {
    const adminID = req.body.adminID;
    const adminPW = req.body.adminPW;
    db.query(
        "SELECT * FROM Admin", [adminID, adminPW], 
        (err, result) => {
            if(err) throw err;
            console.log(result)
            console.log("Admin:", adminID)
            console.log("Password: ", adminPW)
    })
});

app.listen('3001', () => { 
    console.log("Server running on port 3001")
})