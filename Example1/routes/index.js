/**
 * Created by antonysamy.j on 12/2/2014.
 */
var express=require("express");
var router=express.Router();

var _dir="./views/";

router.get("/",function(req,res){
   res.sendfile(_dir+"Index.html")
});

router.get("/am",function(req,res){
   res.send("am new");
});

module.exports = router;