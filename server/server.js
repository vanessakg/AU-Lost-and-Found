const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

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
    const adminID = req.body.adminID;
    const adminPW = req.body.adminPW;
    db.query(
        "SELECT * FROM Admin", [adminID, adminPW], 
        (err, result) => {
            if(err) throw err;
            console.log(result)
            //console.log("Admin:", `${adminID}`)
            //console.log("Password: ", `${adminPW}`)
    })
    console.log("Logging in...")
});

app.get("/lostItemsAdmin", (req, res) => {
    db.query(
        "SELECT * FROM lostItems",
        (err,result) => {
            if(err) throw err;
            console.log(result)
            res.send(result)
        }
    )
})

app.listen('3001', () => { 
    console.log("Server running on port 3001")
})