//run it with npm run dev, this way it updates with browser refresh
//servername: jimrecipe
//password: JimYao123

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors())
const { MongoClient } = require("mongodb");
// const uri=process.env.URI;
const databaseName = "task";

//Middleware: to-do fix CORS error


//this part connects to mongodb
MongoClient.connect("mongodb+srv://yaobojing:JimYao123@cluster0.fzznrzn.mongodb.net/?retryWrites=true&w=majority", 
  { useNewUrlParser: true }, 
  function(err, db) {
  if (err) {
    return console.log(err);
  }
  console.log("Connection established - All Well");
  //databasename is the name of the database, note name is recipe, collection is recipes
  var dbo = db.db(databaseName)
  //this part gets $project attributes in recipes table
  dbo.collection("task").aggregate([{ $project : {detail : 1, priority: 1}}]).toArray(function(err, result) {
    if (err) throw err;
    app.get("/api", (req, res) => {
      //this part sends result to front end, making it into a hash {"recipes":others}
      res.json(result);
    })
    db.close()
  })
})

// //makes sure server is listening on port 5000
// app.listen(process.env.PORT || 5000, () => { console.log("Server started on port 5000")})
app.listen(process.env.PORT || 5000, () => { console.log("Server started")})
