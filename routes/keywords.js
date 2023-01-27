var express=require("express")
var router=express.Router();

router.get("/", function(req, res){
    var userData=req.session.usuario;
    res.render("personal_info", {DataU:userData, title:"EAGLEI"})
})


module.exports=router