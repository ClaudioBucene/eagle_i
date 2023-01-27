var express = require('express');
var router = express.Router();
var oficina= require("../entities/oficina.js");
var feramentas= require("../entities/ferramenta.js");
var tools = require('../util/provincias-distritos');
var model = require('../entities/usuario');
var historico = require('../entities/historico_atribuicao');
var veiculo_db=require("../entities/veiculo");
var transferencia_db=require("../entities/transferencia_veiculo");
var bowser_db = require('../entities/bowser');
var multer  = require('multer');
var path = require("path");
var upload = multer({storage: multer.diskStorage({
	destination: function(req, file,cb){
		cb(null, './public/uploads');
	},
	filename: function(req, file, cb){
		cb(null, req.session.usuario.nome+ "_"+ Date.now()+ path.extname(file.originalname));
	}
}) });


const sleep = ms =>{
	return new Promise(resolve => setTimeout(resolve, ms));
}




router.get("/", function(req, res){
	if(req.session.usuario){
	var userData=req.session.usuario;
	var nome=userData.nome;

	
	if((req.session.usuario.nivel_acesso=="gestor")||(req.session.usuario.nivel_acesso=="admin")||(req.session.usuario.departamento_id=="615325f7699ee012d00db4e9")){
	 oficina.find({}, null, {sort:{responsavel:1}}, function(err, data){
		if(err)
			console.log(err); 
		else {

			// data.reduce(async function(ac, idiota, i){
			// 	await ac;
			// 	sleep(100);
			// 	var hoje= await parseInt(idiota.kilometragem)
			// 	model.updateOne({nome:idiota.responsavel}, {$set:{matricula:idiota.matricula,  marca:idiota.marca, modelo:idiota.modelo, ano_aquisicao:idiota.ano_aquisicao, kilometragem:hoje }}, function(errrp, bhnj){
			// 		if(errrp)
			// 			console.log("ocorreu um erro")
			// 		else
			// 			console.log("feito com sucesso!")
			// 	})

			// }, 0);
			
			model.find({}, function(err, dataUsuarios){
				if(err){
					console.log(err); 
				}else{

					res.render('ferramenta_home', {DataU:userData, Ferramenta: data, Usuarios:dataUsuarios, title: 'EagleI'});
				}
			
				
			});
		}
	})}
	else
		if(req.session.usuario.funcao=="Regional Manager" || req.session.usuario.funcao=="regional_manager" || req.session.usuario.funcao_id=="611e2b8cf9b1b31cd868a30c" || req.session.usuario.funcao_id=="611e3b3d6ed713019c50cf79"){
			oficina.find({regiao:req.session.usuario.regiao}, null, {sort:{responsavel:1}}, function(err, data){
		if(err) 
			console.log(err); 
		else {
			res.render('ferramenta_home',  {DataU:userData, Ferramenta: data, title: 'EagleI'});
		}
	})
		}
		else
	{
		oficina.find({'utilizador':nome}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('ferramenta_home',  {DataU:userData, Ferramenta: data, title: 'EagleI'});
		}
	})
}

}
else
	res.redirect("/")
})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/bowser", function(req, res){
	if(req.session.usuario){
		var userData=req.session.usuario;
		var nome=userData.nome;
		
		bowser_db.find({}, null, {sort:{dieselbowser:1}}, function(err, data){
			if(err)
				console.log(err); 
			else {

				model.find({}, function(err, dataUsuarios){
					if(err){
						console.log(err); 
					}else{

						res.render('dieselbowser_home', {DataU:userData, Ferramenta: data, Usuarios:dataUsuarios, title: 'EagleI'});
					}
				});
			}
		})
	}
});

exports.retornarTodos=function(){
 	feramentas.find({}, function(err, data){
 		if(err)
 			console.log("ocorreu um erro ao tentar retornar todos");
 		else
 			return data;
 	})
 };

router.get("/novo", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	res.render("acao_form", {DataU:userData, title:'EagleI', dadosUser:user,  provincias:tools.provincias})
});

router.get("/bowsernovo", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	res.render("newbowser_form", {DataU:userData, title:'EagleI', dadosUser:user,  provincias:tools.provincias})
});

router.post("/novo", upload.any(), function(req, res){
	// var transfer = getFerramenta(req.body);
	console.log(req.body);
	oficina.gravarDadosOficinas(req.body, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else
			console.log("dados gravados com sucesso!!");
	});
	
	res.redirect("/ferramenta");
})

router.post("/bowsernovo", upload.any(), function(req, res){
	var userData=req.session.usuario;
	var bowser = req.body;
	console.log(bowser);
	console.log(userData);
	var data_registo1 = ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	
	bowser.data_registo1 = data_registo1;
	bowser.criado_por = userData.nome;

	bowser_db.gravarDados(req.body, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else
			console.log("dados gravados com sucesso!!");
	});
	
	res.redirect("/ferramenta/bowser");
});

router.post("/atribuicao", upload.any(), async  function(req, res){


	// console.log(req.body)
	// historico.gravarDadosHistorico(req.body, function(err){
	// 	if(err)
	// 		console.log("ocorreum erro ao tentar gravar historico")
	// 	else
	// 		console.log("historico actualizado com sucesso!!")
	

	// })
	// await [4].reduce(async (acumul, idiota)=>{
	// 	await acumul;
		// await sleep(70);

	

	var origem= await oficina.findOne({matricula:req.body.matricula});

	var trans= await criar_transferencia(origem, req.session.usuario);
	trans.intervenientes.push(req.body.beneficiario);
	trans.nome_receptor=req.body.beneficiario

	console.log(trans)

	await oficina.updateOne({_id:req.body.dataInserida}, {$set:{responsavel:req.body.beneficiario}}, function(err, datos){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("viatura atribuido com sucesso!!");
			// res.redirect("/utilizador")
			}
		})

var alvo=await oficina.findOne({matricula:req.body.matricula})
	// var temp=req.body.marca.split('-');
	// console.log(req.body.beneficiario)
if(trans.nome_receptor!="Parque" || trans.nome_receptor!="Oficina")
	await model.updateOne({nome:req.body.beneficiario}, {$set:{'marca':req.body.marca, 'matricula':req.body.matricula, 'modelo': req.body.modelo, 'ano_aquisicao':alvo.ano_aquisicao, 'kilometragem':req.body.kilometragem}}, function(err ,data){
		if(err)
			console.log("ocorre  um erro ao tentar actualizar dados do utilizador!!")
		else
			console.log("actualizacao ocorreu com sucesso!!")
		})

	await transferencia_db.gravarDados(trans,  function(erro){
		if(erro)
			console.log("Transferencia nao guardada")
		else
			console.log("transferencia gravada com sucesso!")
	})

	// })

		res.json({feito:"feito"})



	})

router.post("/atribuicao_park", upload.any(), async  function(req, res){


	// console.log(req.body)
	// historico.gravarDadosHistorico(req.body, function(err){
	// 	if(err)
	// 		console.log("ocorreum erro ao tentar gravar historico")
	// 	else
	// 		console.log("historico actualizado com sucesso!!")
	

	// })
	// await [4].reduce(async (acumul, idiota)=>{
	// 	await acumul;
		// await sleep(70);

	

	var origem= await oficina.findOne({matricula:req.body.matricula});

	var trans= await criar_transferencia(origem, req.session.usuario);
	trans.intervenientes.push(req.body.beneficiario);
	trans.nome_receptor=req.body.beneficiario

	console.log(trans)

	await oficina.updateOne({_id:req.body.dataInserida}, {$set:{responsavel:req.body.beneficiario}}, function(err, datos){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("viatura atribuido com sucesso!!");
			// res.redirect("/utilizador")
			}
		})

var alvo=await oficina.findOne({matricula:req.body.matricula})
	// var temp=req.body.marca.split('-');
	// console.log(req.body.beneficiario)
if(trans.nome_receptor=="Parque" || trans.nome_receptor=="Oficina")
	await model.updateOne({nome:origem.responsavel}, {$set:{'marca':'SEM VEICULO', 'matricula':'SEM VEICULO', 'modelo':'SEM VEICULO', 'ano_aquisicao':0, 'kilometragem':0}}, function(err ,data){
		if(err)
			console.log("ocorre  um erro ao tentar actualizar dados do utilizador!!")
		else
			console.log("actualizacao ocorreu com sucesso!!")
		})

	await transferencia_db.gravarDados(trans,  function(erro){
		if(erro)
			console.log("Transferencia nao guardada")
		else
			console.log("transferencia gravada com sucesso!")
	})

	// })

		res.json({feito:"feito"})



	})

router.get("/detalhes/:id", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	console.log(req.params.id);
oficina.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	else
		// console.log(data)
		res.render('acao_form', {DataU:userData, Oficina: data, dadosUser:user, provincias:tools.provincias , title:'EagleI', show:true});

	});


})

router.get("/detalhesbowser/:id", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	console.log(req.params.id);
    bowser_db.find({_id:req.params.id}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else
            console.log(data)
            res.render('newbowser_form', {DataU:userData, Ferramenta: data, dadosUser:user , title:'EagleI', show:true});
    });
})

router.get("/editarbowser/:id", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	console.log(req.params.id);
	var editar = true;
    bowser_db.find({_id:req.params.id}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else
            res.render('newbowser_form', {DataU:userData, Ferramenta: data, dadosUser:user, Dados:JSON.stringify(data), editar:editar, title:'EagleI', show:true});
    });
})

router.get("/editar/:id", function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	console.log(req.params.id);
	if(userData.nivel_acesso=="admin" || userData.nome=="Faiza Tricamo")
oficina.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	else
		// console.log(data)
		res.render('acao_form_edit', {DataU:userData, Oficina: data, dadosUser:user, provincias:tools.provincias , title:'EagleI', show:true, link:data[0]._id});

	});
else
	res.redirect("/inicio")


})


router.post("/editar/:id",  async function(req, res){
	var user=req.session.usuario;
	var userData=req.session.usuario;
	console.log(req.params.id);
	console.log(req.body)

	await oficina.update({_id:req.params.id}, req.body,   function(err, done){
		if(err)
			console.log("ocorreu um erro ao tentar achar")
		else
			console.log(done)
	})

	await model.update({matricula:req.body.matricula}, req.body, function(err, done){
		if(err)
			console.log("ocorreu um erro ao tentar achar um cerro")
		else
			console.log(done)
	})

	res.redirect("/ferramenta")





})


 router.get('/exportartocsvFerramentas', function(req, res, next) {
    var filename   = "Lista de Viaturas"+(new Date().getTime())+".csv";
    var dataArray;
    oficina.find().select("marca matricula modelo regiao kilometragem responsavel -_id").lean().exec({}, async function(err, products) {
        if (err) 
        	res.send(err);
        var produto=[];
        var  depar= await model.find({});
        await Promise.all(products.map(async(prod, i)=>{

        	 produto[i]= await{};
        	 produto[i].Matricula= await products[i].matricula;
        	 produto[i].Marca= await products[i].marca;
        	 produto[i].Modelo=await products[i].modelo;
        	 let teste =await veiculo_db.find({matricula:products[i].matricula}).sort({_id:-1}).limit(2).lean();
        	 produto[i].Estado= await teste.length>0? classifier(teste[0].observacao) : "Nao Declarado";
        	 
        	 produto[i].Departamento= await depar.findIndex(x=> x.nome==prod.responsavel)!=-1? depar[depar.findIndex(x=>x.nome==prod.responsavel)].departamento : "Nao declarado";
        	 produto[i].Responsavel=await products[i].responsavel;
        	 produto[i].Kilometragem=await products[i].kilometragem;
        	 produto[i].Regiao=await products[i].regiao.charAt(0).toUpperCase()+ products[i].regiao.slice(1);
        }))

        // var modellos=await model.find({}).select({_id:1, nome:1, user_code:1}).lean();
        // await sleep(100)
        // console.log(depar)
        // console.log(produto);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(produto, true);
    });
 });

// router.get("/remove/:id", function(req, res){ 
// 	feramentas.findByIdAndRemove(req.params.id, function(err){
// 		if(err)
// 			console.log("ocorreu um erro ao tentar apagar os dados!");
// 		else{
// 			console.log("inspeção Removido com sucesso!!");
// 			res.redirect("/ferramenta")}
// 	})
// })

function classifier(receb){
	switch(receb){
		case "green" : return "Bom";
			break;
		case "orange" : return "Razoavel";
			break;
		case "red" :  return "Mau";
			break;
		default :  return "Nao declarado"

	}
}



router.get("/remove/:id", function(req, res){
	var userData=req.session.usuario;
	oficina.findOne({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{if(userData.nivel_acesso=="admin")
			model.find({matricula:"SEM VEICULO", status:"activo"}, null , {sort:{nome:1}}, function(errr, dtaa){
				if(errr)
					console.log("ocorreum um erro ao tentar encontrar users sem veiculo");
				else
					{	
						console.log(dtaa)
						res.render("atribuicao_veiculo", {DataU:userData, Oficina: data, Usuarios:dtaa, provincias:tools.provincias , title:'EagleI'})}
			})
		else
			model.find({matricula:"SEM VEICULO", status:"activo"}, null , {sort:{nome:1}}, function(errr, dtaa){
				if(errr)
					console.log("ocorreum um erro ao tentar encontrar users sem veiculo");
				else
					{	
						console.log(dtaa)
						res.render("atribuicao_veiculo", {DataU:userData, Oficina: data, Usuarios:dtaa, provincias:tools.provincias , title:'EagleI'})}
			})
		}
	})
})

router.get("/retirar/:id", function(req, res){
	var userData=req.session.usuario;
	oficina.findOne({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{if(userData.nivel_acesso=="admin")
			model.find({$or:[{nome:"Parque"},{nome:"Oficina"}]}, null , {sort:{nome:1}}, function(errr, dtaa){
				if(errr)
					console.log("ocorreum um erro ao tentar encontrar users sem veiculo");
				else
					{	
						console.log(dtaa)
						res.render("atribuicao_veiculo_park", {DataU:userData, Oficina: data, Usuarios:dtaa, provincias:tools.provincias , title:'EagleI'})}
			})
		else
			model.find({$or:[{nome:"Parque"},{nome:"Oficina"}]}, function(errr, dtaa){
				if(errr)
					console.log("ocorreum um erro ao tentar encontrar users sem veiculo");
				else
					{	
						console.log(dtaa)
						res.render("atribuicao_veiculo_park", {DataU:userData, Oficina: data, Usuarios:dtaa, provincias:tools.provincias , title:'EagleI'})}
			})
		}
	})
})


function getFerramenta(body){
	var ferra= {};
	ferra.estado_geral=body.estado_geral;
	//ferra.data=body.data;
	ferra.cabos_mangueira=body.cabos_mangueira;
	ferra.interruptores=body.interruptores;
	ferra.ruido=body.ruido
	ferra.funcionamento=body.funcionamento;
	ferra.manometro=body.manometro;
	ferra.macarico=body.macarico
	ferra.nivel_oleo=body.nivel_oleo;
	ferra.nome=body.nome;
	ferra.image=body.image;
	ferra.utilizador=body.utilizador;
	ferra.data_utilizador=body.data_utilizador;
	ferra.observacao=body.observacao;
	return ferra;
}

function criar_transferencia(origem, body){
	var transfer_object={};
	transfer_object.estagio=[1,1,1];
	transfer_object.motorista=origem.responsavel;
	transfer_object.intervenientes=[origem.responsavel, body.nome];
	transfer_object.matricula=origem.matricula;
	transfer_object.data_transferencia=((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	transfer_object.marca_modelo=origem.marca+"-"+origem.modelo;
	transfer_object.quilometragem=origem.kilometragem;
	transfer_object.nome_supervisor=body.nome;
	transfer_object.porcas="ok";
	transfer_object.pneus="ok";
	transfer_object.pressao="ok";
	transfer_object.travoes="ok";
	transfer_object.carrocaria="ok";
	transfer_object.luzes="ok";
	transfer_object.nivel="ok";
	transfer_object.vidros="ok";
	transfer_object.camera="ok";
	transfer_object.handsfree="ok";
	transfer_object.data_despacho=((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	transfer_object.observacao="green";
	transfer_object.despachado_por=body.nome;

	return transfer_object;


}

module.exports = router;