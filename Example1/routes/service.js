/**
 * Created by antonysamy.j on 12/2/2014.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var multiparty=require('multiparty');
var fs=require('fs');

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

router.get("/Find/:id",function(req,res){
    person.findById(req.params.id,function(err,doc){
        if(!err){
            res.send(doc);
        }else{
            console.log(err);
        }
    });
});

router.put("/Update/:id",function(req,res){

    /*Update record method one*/
    person.findById(req.params.id,function(err,doc){
        doc.name=req.body.data.name;
        doc.email=req.body.data.email;
        doc.save(function(err){
            res.send(err);
        });
    });

    /*Update record method two*/
    /*var conditions={"_id":req.body.data._id};
    var update={$set:{"name":req.body.data.name,"email":req.body.data.email}};
    var options={upsert:true};

    person.update(conditions,update,options,function(err){
        res.send(err);
    });*/

});

router.delete("/Delete/:id",function(req,res){
    person.findById(req.params.id,function(err,doc){
       if(!err){
           doc.remove(function(err){
                res.send('success');
           });
       }
    });
});

router.post("/image-upload",function(req,res){
    var form =new multiparty.Form();
    form.parse(req,function(err,fields,files){
        fs.readFile(files.file[0].path,'utf8',function(err,data){
            console.log(data);
        });
    });
});

module.exports=router;