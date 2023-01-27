var express = require('express');
var router = express.Router();
var csv =require("csv-express");

var tanque= require("../entities/tanque.js");


router.get("/", function(req, res){
	if(req.session.usuario){
	var userData=req.session.usuario;
	var nome=userData.nome;
	if(req.session.usuario.nivel_acesso!="normal"){
	 tanque.find({}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('tanque_home', {DataU:userData,Tanque: data, funcionario: "logged!!", title: 'EagleI'});
		}
	})}
	else
	{tanque.find({'motorista':nome}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('tanque_home', {DataU:userData,Tanque: data, funcionario: "logged!!", title: 'EagleI'});
		}
	})}

}
else
	res.redirect("/")
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.retornarTodos=function(){
 	tanque.find({}, function(err, data){
 		if(err)
 			console.log("ocorreu um erro ao tentar retornar todos");
 		else
 			return data;
 	})
 };

router.get('/exportartocsvTanque', function(req, res, next) {
    var filename   = "Pre_inspeccaoTanque"+(new Date().getTime())+".csv";
    var dataArray;
    tanque.find().lean().exec({}, function(err, products) {
        if (err) res.send(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(products, true);
    });
 });

// router.post("/", function(req, res){
// 	var veiculo = getVeiculo(req.body);
// 	console.log(veiculo);
// 	tanqferenciaVeiculo.gravarDados(veiculo, function(err){
// 		if(err){
// 			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
// 			console.log(err)
// 		}
// 		else
// 			console.log("dados gravados com sucesso!!");
// 	});
	
// 	res.redirect("/inicio");
// })

router.get("/novo", function(req, res){
	var userData=req.session.usuario;
	res.render("tanque_form", {DataU:userData,title:'EagleI'})
});

router.post("/novo", function(req, res){
	var tank = getTanque(req.body);
	console.log(tank);
	tanque.gravarDadosTanque(tank, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else
			console.log("dados gravados com sucesso!!");
	});
	
	res.redirect("/tanque");
})

router.get("/detalhes/:id", function(req, res){
	var userData=req.session.usuario;
tanque.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('tanque_form', {DataU:userData, Tanque: data, funcionario: "logged!!", title:'EagleI'});

})

})
router.get("/remove/:id", function(req, res){
	tanque.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("inspeção Removido com sucesso!!");
			res.redirect("/tanque")}
	})
})

function getTanque(body){
	var tanq= {};
	tanq.estado_geral_=body.estado_geral_;
	tanq.freio_manual=body.freio_manual;
	tanq.pneus=body.pneus;
	tanq.tampa_combustivel=body.tampa_combustivel;
	tanq.chapa_matricula=body.chapa_matricula;
	tanq.cabo_polia_peca=body.cabo_polia_peca;
	tanq.trailer_licenciado=body.trailer_licenciado;
	tanq.tanque_abordo=body.tanque_abordo;
	tanq.luzes=body.luzes;
	tanq.acoplamento=body.acoplamento;
	tanq.parafusos_hook=body.parafusos_hook;
	tanq.rodas=body.rodas;
	tanq.motorista=body.motorista;
	tanq.observacao=body.observacao;
	return tanq;
}


module.exports = router;
