var express = require('express');
var router = express.Router();
var model = require('../entities/usuario');
var sitee = require('../entities/site');

/* GET users listing. */
router.get("/", function(req, res){
	var userData= req.session.usuario;
	if ((req.session.usuario.nivel_acesso != "normal" ) || (nome == "Luis Brazuna") || (nome == "Antonio Biquiza")) {
		var userData=req.session.usuario;

	sitee.aggregate([{ $match: { $and: [{ tobedoneby: { $ne: "" } }, { regiaoselmec: { $ne: "" } } ] }}, {$group:{_id:{"ano":"$anoplaneado", "status":"$status"}, 'soma':{$sum:1}}}, {$group :{_id:"$_id.ano", "lista":{$push:{status:"$_id.status", soma:"$soma"}}}},{$sort:{_id:1}}], function (err, data) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	console.log(data[0]);
	        	console.log(data[1]);
	        	res.render('site_estatistica_home', {Site: JSON.stringify(data), DataU:userData, title: 'EagleI'});
	        }
		});

	}else{
		
		var nome = userData.nome;
		sitee.aggregate([{$or:[{tobedoneby:nome}, {maintenanceofficer:nome}]}, {"$group":{_id:"$status", "num":{"$sum":1}}}], function (err, data) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	console.log(data);
	        	res.render('site_estatistica_home_pessoal', {Site: JSON.stringify(data), DataU:userData, title: 'EagleI'});
	        }
		});
		
	}
});

router.get('/mensal/:ano', function(req, res, next) {
	var userData=req.session.usuario;
	var ano1 = req.params.ano;
	sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, { tobedoneby: { $ne: "" } }, { regiaoselmec: { $ne: "" } } ] }}, {$group:{_id:{"mes":"$mesplaneado", "status":"$status"}, 'soma':{$sum:1}}}, {$group :{_id:"$_id.mes", "lista":{$push:{status:"$_id.status", soma:"$soma"}}}}, {$sort:{_id:1}}], function (err, data) {
		if (err) {
            return res.status(500).json({ err });
        }
        else{
        	console.log(data);
			res.render('site_estatistica_mensal', {Site: JSON.stringify(data),ano:ano1, DataU:userData, title: 'EagleI'});
        }
	});
	
});

function contarInsp(dados){
	var contaw1 = 0;
    var contd1 = 0;
    var obj = {}
	for(var jj = 0; jj < dados.total; jj++){
        			
		if(dados.status[jj].split(" ")[0] == "Done"){
			contd1++;
		}
		else{
			contaw1++;
		}
        		
    }
    obj.contd1 = contd1;
    obj.contaw1 = contaw1;
    return obj;

}

router.get('/regiao/:ano/:mes', function(req, res, next) {
	var userData=req.session.usuario;
	var ano2 = req.params.ano;
	var mes1 = req.params.mes;
	//console.log(mes1);
	let meses=['Jan','Fev', 'Mar','Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
	var valor=meses.indexOf(mes1);
	sitee.aggregate([{ $match: { $and: [ {anoplaneado: ano2}, {mesplaneado: valor}, { tobedoneby: { $ne: "" } }, { regiaoselmec: { $ne: "" } } ] }}, {$group:{_id:{regiao:"$regiaoselmec", status:"$status"}, soma:{$sum:1}}}, {$group :{_id:"$_id.regiao", "lista":{$push:{status:"$_id.status", soma:"$soma"}}}}, {$sort:{_id:1}}], function (err, data) {
		if (err) {
            return res.status(500).json({ err });
        }
        else{

        	console.log(data[0]);
        	console.log(data[1]);
        	// console.log(data[2]);
        	// console.log(data[3]);
        	 res.render('site_estatistica_regiao', {Site: JSON.stringify(data), ano:ano2, mes:JSON.stringify(valor), DataU:userData, title: 'EagleI'});
        }
	});
 
});

router.get('/tecnico/:ano/:mes/:regiao', function(req, res, next) {
	var userData=req.session.usuario;
	var regiao = req.params.regiao + " "+ "Region";

	if(regiao == "South Region" || regiao == "Sul Region"){
		regiao = "South Region";
	}
	if(regiao == "Central Region" || regiao == "Centro Region"){
		regiao = "Central Region";
	}
	if(regiao == "North Region" || regiao == "Norte Region"){
		regiao = "North Region";
	}
	var ano = req.params.ano;
	var mes = req.params.mes;
	let meses=['Jan','Fev', 'Mar','Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
	var valor=meses.indexOf(mes);

	sitee.aggregate([{ $match: { $and: [ {anoplaneado: ano}, {mesplaneado: valor}, {regiaoselmec: regiao}, { tobedoneby: { $ne: "" } } ] }}, {$group:{_id:{tecnico:"$tobedoneby", status:"$status"}, soma:{$sum:1}}}, {$group :{_id:"$_id.tecnico", "lista":{$push:{status:"$_id.status", soma:"$soma"}}}}, {$sort:{_id:1}}], function (err, data) {
		if (err) {
            return res.status(500).json({ err });
        }
        else{
        	
        	console.log(data);
        	res.render('site_estatistica_tecnico', {Site: JSON.stringify(data), ano:ano, mes:valor, mes1:mes,regiao:regiao, DataU:userData, title: 'EagleI'});
        }
	});
  
});

router.get('/lista/:nome/:ano/:mes/:regiao', function(req, res, next) {
	var userData=req.session.usuario;
	var nome = req.params.nome.replace(/_/g, ' ');
	var ano = req.params.ano;
	var valor = req.params.mes;
	let meses=['Jan','Fev', 'Mar','Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
	var mes=meses.indexOf(valor);
	var regiao = req.params.regiao + " "+ "Region";

	sitee.find({tobedoneby:nome, anoplaneado:ano, mesplaneado:mes, regiaoselmec:regiao}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar procurar meses");
		else{
			console.log(data)
			res.render('site_estatistica_lista', {DataU:userData, Site: data, title:'EagleI'});
		}
	}).sort({ status: 1 });
	
	
});

router.get('/mensal/:ano/:estado', function(req, res, next) {
	var ano1 = req.params.ano;
	var userData=req.session.usuario;
	var stt = req.params.estado;

	if(stt == "awaiting"){
		sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, { $or: [ { status: "Awaiting Inspection" }, { status: "Delayed Inspection" } ] }, { tobedoneby: { $ne: "" } } ] }}, { $group: { _id: "$mesplaneado", total: { $sum: 1 }, status: { $push: "$status" } } }], function (err, data4) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	//Awaiting
	        	var arr5 = [0,0,0,0,0,0,0,0,0,0,0,0];
	        	for(var ii = 0; ii < data4.length; ii ++){
					var obj1 = contarInsp(data4[ii]);
					if(data4[ii]._id=='Jan'){
						arr5[0] = obj1.contaw1;
					}
					if(data4[ii]._id=='Feb'){
						arr5[1] = obj1.contaw1;
					}
					if(data4[ii]._id=='Mar'){
						arr5[2] = obj1.contaw1;
					}
					if(data4[ii]._id=='Apr'){
						arr5[3] = obj1.contaw1;
					}
					if(data4[ii]._id=='May'){
						arr5[4] = obj1.contaw1;
					}
					if(data4[ii]._id=='Jun'){
						arr5[5] = obj1.contaw1;
					}
					if(data4[ii]._id=='Jul'){
						arr5[6] = obj1.contaw1;
					}
					if(data4[ii]._id=='Aug'){
						arr5[7] = obj1.contaw1;
					}
					if(data4[ii]._id=='Sep'){
						arr5[8] = obj1.contaw1;
					}
					if(data4[ii]._id=='Oct'){
						arr5[9] = obj1.contaw1;
					}
					if(data4[ii]._id=='Nov'){
						arr5[10] = obj1.contaw1;
					}
					if(data4[ii]._id=='Dec'){
						arr5[11] = obj1.contaw1;
					}

	        	}
	        	//console.log(arr5);
	        	res.render('site_estatistica_mensal_aw', {Site: JSON.stringify(data4), contarraw: JSON.stringify(arr5), ano:ano1, DataU:userData, title: 'EagleI'});
	        }
		});
  	}
  	else{
  		sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, {$or: [ {status: "Done early"}, {status: "Done on time"}, {status: "Done later"} ]}, { tobedoneby: { $ne: "" } } ] }}, { $group: { _id: "$mesplaneado", total: { $sum: 1 }, status: { $push: "$status" } } }], function (err, data4) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	//Done
	        	var arr5 = [0,0,0,0,0,0,0,0,0,0,0,0];
	        	for(var ii = 0; ii < data4.length; ii ++){
					var obj1 = contarInsp(data4[ii]);
					if(data4[ii]._id=='Jan'){
						arr5[0] = obj1.contd1;
					}
					if(data4[ii]._id=='Feb'){
						arr5[1] = obj1.contd1;
					}
					if(data4[ii]._id=='Mar'){
						arr5[2] = obj1.contd1;
					}
					if(data4[ii]._id=='Apr'){
						arr5[3] = obj1.contd1;
					}
					if(data4[ii]._id=='May'){
						arr5[4] = obj1.contd1;
					}
					if(data4[ii]._id=='Jun'){
						arr5[5] = obj1.contd1;
					}
					if(data4[ii]._id=='Jul'){
						arr5[6] = obj1.contd1;
					}
					if(data4[ii]._id=='Aug'){
						arr5[7] = obj1.contd1;
					}
					if(data4[ii]._id=='Sep'){
						arr5[8] = obj1.contd1;
					}
					if(data4[ii]._id=='Oct'){
						arr5[9] = obj1.contd1;
					}
					if(data4[ii]._id=='Nov'){
						arr5[10] = obj1.contd1;
					}
					if(data4[ii]._id=='Dec'){
						arr5[11] = obj1.contd1;
					}

	        	}
	        	//console.log(data4);
	        	res.render('site_estatistica_mensal_d', {Site: JSON.stringify(data4), contarrd: JSON.stringify(arr5), ano:ano1, DataU:userData, title: 'EagleI'});
	        }
		});
  	}
});

router.get('/regiao/:ano/:mes/:estado', function(req, res, next) {
	var userData=req.session.usuario;
	var ano2 = req.params.ano;
	var mes1 = req.params.mes;
	var stt = req.params.estado;

	if(mes1 == "Fev" || mes1 == "Feb"){
		mes1 = "Feb";
	}
	if(mes1 == "Abr" || mes1 == "Apr"){
		mes1 = "Apr";
	}
	if(mes1 == "Maio" || mes1 == "May"){
		mes1 = "May";
	}
	if(mes1 == "Ago" || mes1 == "Aug"){
		mes1 = "Aug";
	}
	if(mes1 == "Set" || mes1 == "Sept"){
		mes1 = "Sep";
	}
	if(mes1 == "Out" || mes1 == "Oct"){
		mes1 = "Oct";
	}
	if(mes1 == "Dec" || mes1 == "Dez"){
		mes1 = "Sept";
	}

	if(stt == "awaiting"){

		sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, {mesplaneado: mes1}, { $or: [ { status: "Awaiting Inspection" }, { status: "Delayed Inspection" } ] }, { tobedoneby: { $ne: "" } } ] }}, { $group: { _id: "$regiaoselmec", total: { $sum: 1 }, status: { $push: "$status" } } }], function (err, data5) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	//Awaiting
	        	var arr6 = [0,0,0,0];
	        	for(var iii = 0; iii < data5.length; iii ++){
					var obj2 = contarInsp(data5[iii]);
					if(data5[iii]._id=='Maputo Region'){
						arr6[0] = obj2.contaw1;
					}
					if(data5[iii]._id=='South Region'){
						arr6[1] = obj2.contaw1;
					}
					if(data5[iii]._id=='Central Region'){
						arr6[2] = obj2.contaw1;
					}
					if(data5[iii]._id=='North Region'){
						arr6[3] = obj2.contaw1;
					}

	        	}
	        	//console.log(arr6); 
	        	res.render('site_estatistica_regiao_aw', {Site: JSON.stringify(data5), contarraw: JSON.stringify(arr6), ano:ano2, mes:mes1, DataU:userData, title: 'EagleI'});
	        }
		});
	}else{
		sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, {mesplaneado: mes1}, {$or: [ {status: "Done early"}, {status: "Done on time"}, {status: "Done later"} ]}, { tobedoneby: { $ne: "" } } ] }}, { $group: { _id: "$regiaoselmec", total: { $sum: 1 }, status: { $push: "$status" } } }], function (err, data5) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	//Awaiting
	        	var arr6 = [0,0,0,0];
	        	for(var iii = 0; iii < data5.length; iii ++){
					var obj2 = contarInsp(data5[iii]);
					if(data5[iii]._id=='Maputo Region'){
						arr6[0] = obj2.contd1;
					}
					if(data5[iii]._id=='South Region'){
						arr6[1] = obj2.contd1;
					}
					if(data5[iii]._id=='Central Region'){
						arr6[2] = obj2.contd1;
					}
					if(data5[iii]._id=='North Region'){
						arr6[3] = obj2.contd1;
					}

	        	}
	        	//console.log(arr6); 
	        	res.render('site_estatistica_regiao_d', {Site: JSON.stringify(data5), contarrd: JSON.stringify(arr6), ano:ano2, mes:mes1, DataU:userData, title: 'EagleI'});
	        }
		});
	}
});

router.get('/tecnico/:ano/:mes/:regiao/:estado', function(req, res, next) {
	var userData=req.session.usuario;
	var regiao1 = req.params.regiao + " "+ "Region";
	var stt = req.params.estado;
	
	if(regiao1 == "South Region" || regiao1 == "Sul Region"){
		regiao1 = "South Region";
	}
	if(regiao1 == "Central Region" || regiao1 == "Centro Region"){
		regiao1 = "South Region";
	}
	if(regiao1 == "North Region" || regiao1 == "Norte Region"){
		regiao1 = "North Region";
	}

	if(stt == "awaiting"){
		sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, {mesplaneado: req.params.mes}, {regiaoselmec: regiao1}, { $or: [ { status: "Awaiting Inspection" }, { status: "Delayed Inspection" } ] }, { tobedoneby: { $ne: "" } } ] }}, { $group: { _id: "$tobedoneby", total: { $sum: 1 }, status: { $push: "$status" } } }], function (err, data6) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	var contarraw3 = [];
	        	

	        	for(var iiii = 0; iiii < data6.length; iiii ++){
					
	        		var contaw3 = 0;
	        		var contd3 = 0;
	        		for(var jj = 0; jj < data6[iiii].total; jj++){
	        			
	        			
	        			if(data6[iiii].status[jj].split(" ")[0] == "Done"){
	        				contd3++;
	        			}
	        			else{
	        				contaw3++;
	        			}
	        		
	        		}
	        		
	        	
	        		contarraw3.push(contaw3);
	        	
	        	}
	        	//console.log(contarraw3);
	        	res.render('site_estatistica_tecnico_aw', {Site: JSON.stringify(data6), contarraw: JSON.stringify(contarraw3), regiao:req.params.regiao, ano:req.params.ano, mes:req.params.mes, DataU:userData, title: 'EagleI'});
	        }

		});
  	} else{
  		sitee.aggregate([{ $match: { $and: [ {anoplaneado: req.params.ano}, {mesplaneado: req.params.mes}, {regiaoselmec: regiao1}, {$or: [ {status: "Done early"}, {status: "Done on time"}, {status: "Done later"} ]}, { tobedoneby: { $ne: "" } } ] }}, { $group: { _id: "$tobedoneby", total: { $sum: 1 }, status: { $push: "$status" } } }], function (err, data6) {
			if (err) {
	            return res.status(500).json({ err });
	        }
	        else{
	        	
	        	var contarrd3 = [];

	        	for(var iiii = 0; iiii < data6.length; iiii ++){
					
	        		var contaw3 = 0;
	        		var contd3 = 0;
	        		for(var jj = 0; jj < data6[iiii].total; jj++){
	        			
	        			
	        			if(data6[iiii].status[jj].split(" ")[0] == "Done"){
	        				contd3++;
	        			}
	        			else{
	        				contaw3++;
	        			}
	        		
	        		}
	        		
	        		contarrd3.push(contd3);
	        	
	        	
	        	}
	        	
	        	res.render('site_estatistica_tecnico_d', {Site: JSON.stringify(data6), contarrd: JSON.stringify(contarrd3), regiao:req.params.regiao, ano:req.params.ano, mes:req.params.mes, DataU:userData, title: 'EagleI'});
	        }

		});
  	}
});
module.exports = router;
