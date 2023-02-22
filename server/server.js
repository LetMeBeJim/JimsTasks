var myPassword = require('./password');

//run it with npm run dev, this way it updates with browser refresh
//servername: jimrecipe
//password: JimYao1234
var password = myPassword.password;
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors())
const { MongoClient } = require("mongodb");
// const uri=process.env.URI;
const databaseName = "task";






//this part connects to mongodb
MongoClient.connect(password, 
  { useNewUrlParser: true }, 
  function(err, db) {
  if (err) {
    return console.log(err);
  }
  console.log("Connection established - All Well");
  
  //databasename is the name of the database, note name is recipe, collection is recipes
  var dbo = db.db(databaseName)
  //this part gets $project attributes in recipes table
  // dbo.collection("task").aggregate([{ $project : {detail : 1, priority: 1}}]).toArray(function(err, result) {
  //   if (err) throw err;
  //   app.get("/api", (req, res) => {
  //     //this part sends result to front end, making it into a hash {"recipes":others}
  //     res.json(result);
  //   })
  // })

  app.get("/api", (req, res) => {
    dbo.collection("task").aggregate([{ $project: {detail : 1, sector: 1}}]).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  })
//takes a string as input
MongoClient.connect(password, 
  { useNewUrlParser: true }, 
  function(err, db) {
  if (err) {
    return console.log(err);
  }
  var dbo = db.db(databaseName)
  console.log("Connection established - All Well");
  app.get('/del/:detailHere', (req,res) => {
    var myquery = { detail: req.params.detailHere };
    dbo.collection("task").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
    });
    res.redirect('/api');
  })
  })

//takes json string as input
MongoClient.connect(password, 
  { useNewUrlParser: true }, 
  function(err, db) {
  if (err) {
    return console.log(err);
  }
  var dbo = db.db(databaseName)
  console.log("Connection established - All Well");
  
  app.get('/ins/:detailHere', (req,res) => {
    console.log(req.params.detailHere)
    detail = req.params.detailHere
    jsonString = JSON.parse(detail)

    console.log(typeof(jsonString))
    console.log(jsonString.detail)    
    
    var myobj = { detail: jsonString.detail, sector: jsonString.sector};
    
    dbo.collection("task").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    })
    res.redirect('/api');
  })
  })

//this returns an array
MongoClient.connect(password, 
  { useNewUrlParser: true }, 
  function(err, db) {
  if (err) {
    return console.log(err);
  }
  var dbo = db.db(databaseName)
  console.log("Connection established - All Well");

  app.get('/sector/:detailHere', (req,res) => {
    const sector = req.params.detailHere
    dbo.collection("task").find({sector: sector}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

})

// //makes sure server is listening on port 5000
// app.listen(process.env.PORT || 5000, () => { console.log("Server started on port 5000")})
app.listen(process.env.PORT || 5000, () => { console.log("Server started")})
