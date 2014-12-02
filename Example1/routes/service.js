/**
 * Created by antonysamy.j on 12/2/2014.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/Antony");

var db=mongoose.connection;

db.on('error',function(err){
    console.log('Connection error'+err);
});

db.once('open',function(){
    console.log('Connection open');
});

var Shema=mongoose.Schema;

var personShema= new Shema({
    name:String,
    email:String
});

var person=mongoose.model('person',personShema,'People');

router.get("/",function(req,res){
    person.find(function(err,doc){
        res.send(doc);
    });
});

router.post("/Create",function(req,res){
    var user=new person({
        "name":req.body.data.name,
        "email":req.body.data.email
    });

    user.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
       res.send(data);
    });
});
module.exports=router;