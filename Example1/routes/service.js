/**
 * Created by antonysamy.j on 12/2/2014.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/Antony");

var personShema={
    name:String,
    age:String
};

var person=mongoose.model('person',personShema,'first');

router.get("/",function(req,res){
    person.find(function(err,doc){
        res.send(doc);
    });
});

module.exports=router;