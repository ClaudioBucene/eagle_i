var express = require('express');
var router = express.Router();
var veiiculo= require("../entities/veiculo.js");
var veiiculomensal= require("../entities/veiculo_mensal.js");
var csv =require("csv-express");
var provincias=require("../util/provincias-distritos")


router.get("/", function(req, res){
	if(req.session.usuario){
	var userData=req.session.usuario;
	var nome=userData.nome;
	if(req.session.usuario.nivel_acesso!="normal"){

veiiculo.aggregate([{$group:{_id:{"regiao":"$regiao", "observacao":"$observacao"},  soma:{$sum:1}}} , {$group :{_id:"$_id.regiao", "lista":{$push:{observacao:"$_id.observacao", soma:"$soma"}}}}, {$sort:{_id:1}}], function(err, datta){
	if(err)
		console.log("ocorreu um erro ao tentar fazer aggregacao")
	else
		{console.log(datta);
		res.render('index', {veiculosMensal: JSON.stringify(datta), DataU:userData, mez:provincias.meses, provincias:provincias, title:'EagleI'});
	}
})
	//  veiiculo.aggregate([{"$project":{motorista:true, _id:1, observacao:1}}, {"$group":{_id:"$observacao", "visits":{"$sum":1}}}, {"$sort" : {"observacao" : -1}} ], function(err, data){
	// 	if(err)
	// 		console.log(err); 
	// 	else {
	// 		console.log(data)

	// 		res.render('index', {veiculosMensal: JSON.stringify(data), DataU:userData, mez:provincias.meses, provincias:provincias, title:'EagleI'});
	// 	}
	// })

	}
	else
	{
		veiiculo.aggregate([{"$match":{motorista:nome}},{"$group":{_id:"$observacao", "num":{"$sum":1}}}], function(err, data){
		if(err)
			console.log(err); 
		else {
			console.log(data)
			res.render('pessoal', {veiculosMensal: JSON.stringify(data), DataU:userData, mez:provincias.meses, provincias:provincias, title:'EagleI'});
		}
	})
}

}
else
	res.redirect("/")
})

//****************************************************************



// router.get("/", function(req, res){
// 	var userData=req.session.usuario;
// res.render('index', {DataU:userData, funcionario: "logged!!", title: 'EagleI'});
// })
exports.retornarTodos=function(){
 	veiiculomensal.find({}, function(err, data){
 		if(err)
 			console.log("ocorreu um erro ao tentar retornar todos");
 		else
 			return data;
 	})
 };

 router.get('/exportartocsvMensal', function(req, res, next) {
    var filename   = "inspMensal"+(new Date().getTime())+".csv";
    var dataArray;
    veiiculomensal.find().lean().exec({}, function(err, products) {
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
// 	veiiculo.gravarDados(veiculo, function(err){
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
	res.render("inspmensal",{ DataU:userData,mez:provincias.meses})
});

router.post("/novo", function(req, res){
	var veiculo = getVeiculo(req.body);
	console.log(veiculo);
	veiiculomensal.gravarDadoMensal(veiculo, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else
			console.log("dados gravados com sucesso!!");
		res.redirect("/inspmensal");
	});
	
	
})

router.get("/detalhes/:id", function(req, res){
	var userData=req.session.usuario;
	var teste=req.params.id;
	teste=teste.split('1');
	console.log(teste);
	teste[0]=(teste[0]=="Bom")? 'green':((teste[0]=='Razoável')? 'orange': 'red');
	console.log(teste);
veiiculo.aggregate([{$match:{observacao:teste[0], regiao:teste[1]}},{$group:{_id:"$motorista", total:{$sum:1}}}, {$sort:{_id:1}}], function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	else{
		console.log(data)
	res.render('inspmensal', {DataU:userData, veiculosMensal:JSON.stringify(data), cores:teste[0], regiao: teste[1], funcionario: "logged!!", title: 'EagleI'});
}

})

})



router.get("/remove/:id", function(req, res){
	veiiculomensal.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("inspeção Removido com sucesso!!");
			res.redirect("/inspmensal")}
	})
})

function getVeiculo(body){
	var veiculo= {};
	veiculo.estado_pintura=body.estado_pintura;
	veiculo.lubrificacao_tubos=body.lubrificacao_tubos;
	veiculo.kit_maos_camera=body.kit_maos_camera;
	veiculo.condicionado_electrico=body.condicionado_electrico;
	veiculo.porcas_parafusos=body.porcas_parafusos;
	veiculo.sinalizacao=body.sinalizacao;
	veiculo.documentos=body.documentos;
	veiculo.parabrisas=body.parabrisas;
	veiculo.sist_direcao=body.sist_direcao;
	veiculo.trinco_seguranca=body.trinco_seguranca;
	veiculo.espelhos=body.espelhos;
	veiculo.travoes=body.travoes;
	veiculo.buzina=body.buzina;
	veiculo.socorro_extintor=body.socorro_extintor;
	veiculo.macaco_roda=body.macaco_roda;
	veiculo.vidros_manometro=body.vidros_manometro;
	veiculo.liquido=body.liquido;
	veiculo.tapetes=body.tapetes;
	veiculo.bateria=body.bateria;
	veiculo.etiquetas=body.etiquetas;
	veiculo.sinais_perigo=body.sinais_perigo;
	veiculo.quilometragem=body.quilometragem;
	veiculo.data=body.data;
	veiculo.inspector=body.inspector;
	veiculo.matricula=body.matricula;
	veiculo.motorista=body.motorista;
	veiculo.marca_modelo=body.marca_modelo;
	veiculo.numero_registo=body.numero_registo;
	veiculo.mes=body.mes;
	veiculo.observacao=body.observacao;
	return veiculo;

}
module.exports = router;