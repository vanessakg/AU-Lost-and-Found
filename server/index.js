const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
    user: "DMV_S2021",
    host: "45.55.136.114",
    password: "g0t2m0ve1t!",
    multipleStatements: true,
});

db.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
})