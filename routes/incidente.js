var express=require("express")
var router= express.Router();
var multer = require('multer');
var path = require("path");
var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/comprovativo_huawei');
        },
        filename: function(req, file, cb) {
            cb(null, req.session.usuario.nome + "_" + Date.now() + path.extname(file.originalname));
        }
    })
});
var incidente_db=require("../entities/incidente.js");
var userM=require("../entities/usuario")

router.get("/", function(req, res){
	var userData=req.session.usuario;
	if(userData.nome=="Sandra Dias" || userData.nivel_acesso=="admin"){
		incidente_db.find({}, function(err, dados){
			if(err)
				console.log("ocorreu m erro ao tentar achar incidentes")
			else{
				res.render("incidente_home", {DataU:userData, Incidente:dados, title:"EagleI"})
			}
		})
	}
	else
		res.redirect("/inicio")

});

router.get("/detalhes/:id", function(req, res){
	var userData=req.session.usuario;
	if(userData.nome=="Sandra Dias" || userData.nivel_acesso=="admin"){
		incidente_db.findOne({_id:req.params.id}, function(err, dados){
			if(err)
				console.log("ocorreu um erro ao tentar achar incidente");
			else
				res.render("incidente_detalhes", {DataU:userData, Incidente:dados, title:"EagleI"})

		})
	}
	else
		res.redirect("/inicio")
})

router.get("/novo", function(req, res){
	var userData=req.session.usuario;
	if(userData.nome=="Sandra Dias" || userData.nivel_acesso=="admin"){
		res.render("incidente_form",{DataU:userData, title:"EagleI"})
	}
	else
		res.redirect("/inicio");
})

router.post("/novo", upload.any(), async function(req, res){
	console.log(req.body)
	var incidente=req.body
	incidente.registado_por=req.session.usuario.nome;
	var intermediario=await req.body.ocurrance_date.split("/").reverse().join("-")
	incidente.data=new Date(intermediario);
	await incidente_db.gravar_incidente(incidente, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar gravar incidente")
		else
			console.log("incidete gravado com sucesso!")
	})

	await sleep(1000);

	userM.findOne({_id:req.session.usuario._id}, function(err, datta){
		if(err)
			console.log("erro ao tentar aceder o utilizador!!");
		else
			if(datta){

				// ****************************************************
				if(datta.username==datta.senha) {
					res.render("changeProf",{greeting:datta})
				}
				else
				{
				// **********************************************
				incidente_db.find({}, async function(eero, daddds){
					if(eero)
						console.log("ocorreu um erro")
					else
					{	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
						var ano = await daddds[0].data.getFullYear();
						var mes= await  daddds[0].data.getMonth()+1;
						var dia= await daddds[0].data.getDate();
						var horas= await daddds[0].data.getHours();
						var minutos= await daddds[0].data.getMinutes();
						var firstDate =await new Date(ano, mes, dia);
						var secondDate =await new Date();
						console.log(firstDate, secondDate)
						
						var diffDays = await Math.round(Math.abs((firstDate - secondDate) / oneDay));
						var diffDays=ano+"-"+mes+"-"+dia;
						console.log(diffDays)
						
						
						var temp=await {};
						temp.data=await diffDays;
						var pacote= Object.assign(datta, temp)
						pacote.data=await diffDays

						req.session.usuario= await pacote;
						req.session.usuario.data= diffDays;

						var userData=req.session.usuario;
						userData.data=diffDays
						console.log(pacote)
						console.log(temp)
						res.render("inicio", {DataU:userData, title:'EagleI'});
						
					}
				}).sort({_id:-1})
				
				
			}
			}
			else
				//res.redirect("/inicio")
				res.render("login",{err:true})
	})

})

const sleep = (ms)=>{
	return new Promise(resolve => setTimeout(resolve, ms))
}


module.exports=router