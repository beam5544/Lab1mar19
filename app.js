var express = require('express')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/getUsers',function(req,res){
    
    var mongoClient = require('mongodb').MongoClient
    var url = "mongodb://localhost:27017"
    mongoClient.connect(url, function(err, db){
        if(err) throw err
        var dbo = db.db("lab1")
        var CollectionName = "students"
        dbo.collection(CollectionName).find().toArray(function(err,data) { 
            if (err) throw err

            console.log(data)
            console.log("\n ALL Member \n\n")
            res.end(JSON.stringify(data))

            db.close()
        })
    })
   
})

app.get('/getUsers/:id',function(req,res){
    var mongoClient = require('mongodb').MongoClient
    var url = "mongodb://localhost:27017"
    mongoClient.connect(url, function(err, db){
        if(err) throw err
        var dbo = db.db("lab1")
        var CollectionName = "students"
        dbo.collection(CollectionName).find({id: parseInt(req.params.id)}).toArray(function(err,data) { 
            if (err) throw err
                  
            console.log(data)
            console.log("\n a Member \n\n")
            res.end(JSON.stringify(data))

            db.close()
        })
    })
})

app.post('/addUsers',function(req,res){
    var mongoClient = require('mongodb').MongoClient
    var url = "mongodb://localhost:27017"
    mongoClient.connect(url, function(err, db){
        if(err) throw err
        var dbo = db.db("lab1")
        var CollectionName = "students"
        
        dbo.collection(CollectionName).insertOne(req.body,function(err,data) { 
            if (err) throw err
            console.log("\n ADD Member(s) \n\n")
            
            dbo.collection(CollectionName).find().toArray(function(err,data) { 
                if (err) throw err
    
                console.log(data)
                res.end(JSON.stringify(data))
                console.log("\n After ADD Member(s) and Show \n\n")
                db.close()
            })
            
        })
    })
})

var server = app.listen(3000 , function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s",host,port)
})