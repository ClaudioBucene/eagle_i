var express = require('express');
var router = express.Router();
var epindividual= require("../entities/epi.js");
var tools = require('../util/provincias-distritos');
var historico = require('../entities/historico_atribuicao');

router.get("/", function(req, res){
	if(req.session.usuario){
	var userData=req.session.usuario;
	var nome=userData.nome;
	if(req.session.usuario.nivel_acesso!="normal"){
	 historico.find({}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('epi_home',  {DataU:userData, Epi: data, title: 'EagleI'});
		}
	})}
	

}

	
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/", function(req, res){
	var user= req.session.usuario;
	var userData=req.session.usuario;
	epindividual.find({}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('epi_home', {DataU:userData,Epi: data, dadosUser:user, title: 'EagleI'});
		}
	})
})

exports.retornarTodos=function(){
 	epindividual.find({}, function(err, data){
 		if(err)
 			console.log("ocorreu um erro ao tentar retornar todos");
 		else
 			return data;
 	})
 };


// router.post("/", function(req, res){
// 	var veiculo = getVeiculo(req.body);
// 	console.log(veiculo);
// 	feramentas.gravarDados(veiculo, function(err){
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
	var user=req.session.usuario;
	var userData=req.session.usuario;
	res.render("epi_form", {DataU:userData,title:'EagleI', dadosUser:user, Nome_Epis:tools.equipamentoPi})
});

router.post("/novo", function(req, res){
	var transfer = getEpi(req.body);
	console.log(transfer);
	epindividual.gravarDadosEpi(transfer, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else
			console.log("dados gravados com sucesso!!");
	});
	
	res.redirect("/epi");
})

router.get("/detalhes/:id", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;

epindividual.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('epi_form', {DataU:userData, Epi:data, dadosUser:user, Nome_Epis:tools.equipamentoPi , title:'EagleI'});

})


})

 router.get('/exportartocsvEpis', function(req, res, next) {
    var filename   = "Epi_Inpeccionadas"+(new Date().getTime())+".csv";
    var dataArray;
    epindividual.find().lean().exec({}, function(err, products) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(products, true);
    });
 });

router.get("/remove/:id", function(req, res){
	epindividual.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("inspeção Removido com sucesso!!");
			res.redirect("/epi")}
	})
})

function getEpi(body){
	var equi= {};
	equi.estado_geral=body.estado_geral;
	//equi.data=body.data;
	equi.componentes=body.componentes;
	equi.nome=body.nome;
	equi.image=body.image;
	equi.utilizador=body.utilizador;
	equi.data_utilizador=body.data_utilizador;
	equi.observacao=body.observacao;
	return equi;
}
module.exports = router;