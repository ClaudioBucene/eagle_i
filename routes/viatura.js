var express = require('express');
var model = require('../entities/usuario');
var bowser_db = require('../entities/bowser');
var insp_bowser = require('../entities/bowser_inspection');
var sender = require('../util/sendText');
var emailSender=require('../util/sendEmail')
var router = express.Router();
var veiiculo= require("../entities/veiculo.js");
var csv =require("csv-express");
var multer  = require('multer');
var path = require("path");
var veiculo_controlee=require("../entities/oficina.js");
var upload = multer({storage: multer.diskStorage({
	destination: function(req, file,cb){
		cb(null, './public/uploads');
	},
	filename: function(req, file, cb){
		cb(null, req.session.usuario.nome+ "_"+ Date.now()+ path.extname(file.originalname));
	}
}) });


var provincias=require("../util/provincias-distritos")

router.get("/", function(req, res){
	if(req.session.usuario){
	var userData=req.session.usuario;
	var nome=userData.nome;
	if(req.session.usuario.nivel_acesso!="normal"){
// ******************************************tricks to push pblblems****************problemas
// veiiculo.find({}, function(err, dtaaa){
// 	if(err)
// 		console.log("ocorreu um erro!!");
// 	else
// 	{
// 		for(var t=0;t<dtaaa.length;t++){
// 			var pblm=[];
			
// 			pblm=pblm.concat(dtaaa[t].razaoCarrocari);
// 			pblm=pblm.concat(dtaaa[t].razaoPneus);
// 			pblm=pblm.concat(dtaaa[t].razaoPorcas);
// 			pblm=pblm.concat(dtaaa[t].razaoPressao);
// 			pblm=pblm.concat(dtaaa[t].razaoTravoes);
// 			pblm=pblm.concat(dtaaa[t].razaoVidros);
// 			pblm=pblm.concat(dtaaa[t].razaoNivel);
// 			pblm=pblm.concat(dtaaa[t].razaoLuzes)
// 			veiiculo.findOneAndUpdate({_id:dtaaa[t]._id},{$set:{problemas:pblm}}, function(err2, gy){
// 				if(err2)
// 					console.log("ocorreu erro2")
// 				else
// 					console.log(gy);
// 			})
// 		}
// 	}
// })


// *************************************************ending push problems****************


		// ***************************************triccks for update province, regioon ***************************
// 		model.find({}, function(ee, data){
// 			if(ee)
// 				console.log("ocorreum errro ao tentar actualizar dados do veiculo")
// 			else
// 				if(data!=[]){
// 					for( let i=0; i<data.length; i++){
// 					veiiculo.update({motorista:data[i].nome},{$set:{regiao:data[i].regiao, provincia:data[i].provincia_trabalho	}}, {multi:true}, function(err ,dta){
// 						if(err)
// 							console.log("nao conseguiu encontrar")
// 						else
// 							console.log("encontrado")
// 					})
// 				}}
// 		})

// console.log("fim da execucao!!")
		// **************************************************end Trick.......................................


	 veiiculo.find({}, function(err, data){
		if(err)
			console.log(err); 
		else {
			// **************************************tricks to update vehicles and owner**********************
			
			// model.find({}, function(errrr, dttta){

			// 	if(errrr)
			// 		console.log("Ocorreu um erro na actualiacao")
			// 	else
			// 	for( var j=0; j<dttta.length;j++){ 
			// 	let objectoo={};
			// 	objectoo.marca=dttta[j].marca;
			// 	objectoo.modelo=dttta[j].modelo;
			// 	objectoo.matricula=dttta[j].matricula;
			// 	objectoo.ano_aquisicao=dttta[j].ano_aquisicao;
			// 	objectoo.kilometragem=dttta[j].kilometragem;
			// 	objectoo.responsavel=dttta[j].nome;
			// 	objectoo.regiao=dttta[j].regiao;
			// 	objectoo.provincia=dttta[j].provincia_trabalho;
			// 	objectoo.utilizado_por=dttta[j].nome;
			// 	registado_por="Administrador";
			// 	if(dttta[j].matricula!="SEM VEICULO"){
			// 	veiculo_controlee.gravarDadosOficinas(objectoo, function(errr){
			// 		if(errr)
			// 			console.log("Ocorreu um erro ao tentar actualiar as viaturas!!")
			// 		else
			// 			console.log("Dados actualiados com sucesso!!")
			// 	})}
			// 	else
			// 		continue;
			// }
			

			// })
			


			// *****************************************end Vehicles Owners***************************** 


			// ******************************trcks to update Date of Inspetion*********************
			// for(var i=0; i<data.length; i++){
			// 	var teste=data[i].datta;
			// 	var rt=teste.split(" ");
			// 	var rt1=rt[0];
			// 	rt1=rt1.split("/").reverse();
			// 	if(parseInt(rt1[1])<10)
			// 		rt1[1]='0'+rt1[1];
			// 	if(parseInt(rt1[2])<10)
			// 		rt1[2]='0'+rt1[2];
			// 	rt1=rt1.join("-")
			// 	rt1=rt1+"T05:00:00";
			// 	console.log(rt1)
			// 	var entrega=new Date(rt1)
			// 	veiiculo.findOneAndUpdate({_id:data[i]._id}, {$set:{data_inspecao:entrega}}, function(errr, daata){
			// 		if(errr)
			// 			console.log("ocrreu erro ao tentar teminar actualizar datas")
			// 		else
			// 			console.log("dados actualizados com sucesso!!");
			// 	})
			// }
			// console.log("fim da execucao")

			// *******************************en tricks to ipdate Date Inspection***************
			res.render('inspdiaria_home', {DataU:userData, veiculos: data,  provincias:provincias, title:'EagleI'});
		}
	}).lean().sort({_id:-1}).limit(3000)
	}
	else
	{veiiculo.find({'motorista':nome}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('inspdiaria_home', {DataU:userData, veiculos: data,  provincias:provincias, title:'EagleI'});
		}
	}).lean().sort({_id:-1}).limit(500)
}

}
else
	res.redirect("/")
})

exports.retornarTodos=function(){
 	veiiculo.find({}, function(err, data){
 		if(err)
 			console.log("ocorreu um erro ao tentar retornar todos");
 		else
 			return data;
 	})
 };

 router.get('/exportartocsv', function(req, res, next) {
    var filename   = "inspdiaria"+((new Date()).getDate())+"/"+((new Date()).getMonth()+1)+"/"+((new Date()).getFullYear())+".csv";
    var dataArray;
    veiiculo.find().lean().exec({}, function(err, products) {
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

router.get("/novo", async function(req, res){
	var useru=await model.findOne({_id:req.session.usuario._id});
	var userData= await {...req.session.usuario, matricula:useru.matricula, modelo:useru.modelo, marca:useru.marca, ano_aquisicao:useru.ano_aquisicao, kilometragem:useru.kilometragem };
	

	var escolha = "vazio";
	res.render("inspdiaria", {DataU:userData, v1:escolha, title:"EagleI"})
});

router.get("/inspdbowser", async function(req, res){
	var userData= req.session.usuario;
	console.log("Diesel Bowser Inspection")
	var inspensao = await veiiculo.find({motorista:userData.nome}, {_id:1}).sort({data_inspecao:-1}).limit(1);
	console.log(inspensao);

	bowser_db.find({}, {matricula:1, dieselbowser:1,_id:1}, function(err, databowser){
		if (err) {
			console.log("Erro ao colocar o bowser");
		} else {
            bowser_db.countDocuments({}, function(erro,bowsercount){
                if(erro){
                    console.log("Nao consigo contar");
                }else{
                    console.log({databowser});
                    console.log(`O tamanho é ${bowsercount}`);
                    res.render("dieselbowser_inspection", {DataU:userData, Inspensao:JSON.stringify(inspensao),bowsers:databowser, bowsers1:JSON.stringify(databowser), tamanho:bowsercount, title:"EagleI"});
                }
            });
		}
	})
})

router.post("/novoinspdbowser", async function(req, res){
    var userData = req.session.usuario;
    var dbow = req.body;
    console.log("entro aqui")
    console.log(dbow);

    await insp_bowser.gravarDados(dbow, function(err){
        if(err){
            console.log("Ocorreu um erro ao gravar a inspenção do bowser "+ err);
        }else{
            console.log("Conseguiu passar "+ err);            
        }
    })

    var idultimobowser = await insp_bowser.find({responsavel:userData.nome}, {_id:1, inspencao_id:1}).sort({data_inspecao:-1}).limit(1);
    var idbowser = await idultimobowser[0]._id;
    var idinspveiculo = await idultimobowser[0].inspencao_id;
    console.log({idbowser}, {idinspveiculo});

    await veiiculo.updateOne({_id:idinspveiculo}, {$set:{dbowser_inspencao_id:idbowser}}, function(ero, dta){
    	if (ero) {
    		console.log("Não conseguiu fazer o set das cenas");
    	} else {
    		console.log("AVANCOU!");
    		res.redirect("/inspdiaria");
    	}    	
    })
});

router.post("/novo", async function(req, res){
	var veiculo = await getVeiculo(req.body);
	veiculo.provincia=req.session.usuario.provincia_trabalho;
	veiculo.regiao=req.session.usuario.regiao;
	console.log(veiculo);
// let controle=(new Date()).getDate()+"/"+((new Date()).getMonth()+1)+"/"+(new Date()).getFullYear();

let diiaass= (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
let messees= (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


let controle=diiaass+"/"+messees+"/"+(new Date()).getFullYear();

veiiculo.findOne({"motorista":veiculo.motorista, "datta":{ $regex:controle, $options: "i" }}, function(err, este){
	if(err)
		console.log("erro encontrado!!!")
	else
		// console.log(este, controle)
		if(este==null || este==[]){
			
			console.log("chegou!!!!!!!!!!!!!!")
			if(veiculo.matricula!="SEM VEICULO"){

				// **************************************tricks************************************
			veiiculo.find({matricula:veiculo.matricula}, function(errer, trick){
				if(errer)
					console.log("trying to replace data is failed!")
				else
					if(trick!=[] && trick.length>0){
						var repl= trick.length - 1;
						console.log(trick)
						if((trick[repl].observacao!="green") && (trick[repl].fleet_man)&& (!trick[repl].feito)){
							// veiculo.data_acao=trick[repl].data_acao;
							// veiculo.razao_acao=trick[repl].razao_acao;
							// veiculo.fleet_man=trick[repl].fleet_man;
							// // veiculo.lembrete=trick[repl].lembrete;
							// veiculo.tipo_acao=trick[repl].tipo_acao;
							veiiculo.gravarDados(veiculo, function(err){
								if(err){
								console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
								console.log(err)
								}
								else
									{
										console.log("dados gravados com sucesso!!");
										

							}
						});
							// *************************actualizacao de Kilometragem*********************************************
								model.updateOne({matricula:veiculo.matricula},{$set:{kilometragem:veiculo.kilometragem}}, function(errorrr, ki){
								if(errorrr)
									console.log("ocorreu um erro ao tentar actualizar kilometragem")
								else
									console.log("kilometragem actualizado com ssucesso!!")
							})

							veiculo_controlee.updateOne({matricula:veiculo.matricula},{$set:{kilometragem:veiculo.kilometragem}}, function(errorrr, ki){
								if(errorrr)
									console.log("ocorreu um erro ao tentar actualizar kilometragem")
								else
									console.log("kilometragem actualizado com ssucesso!!")
							});
								// *********************************************end actualizacao de kilometragem*************************************




						}
						else
						{
								veiiculo.gravarDados(veiculo, function(err){
								if(err){
								console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
								console.log(err)
								}
								else
									console.log("dados gravados com sucesso!!"); });

								// *************************actualizacao de Kilometragem*********************************************
								model.updateOne({matricula:veiculo.matricula},{$set:{kilometragem:veiculo.kilometragem}}, function(errorrr, ki){
								if(errorrr)
									console.log("ocorreu um erro ao tentar actualizar kilometragem")
								else
									console.log("kilometragem actualizado com ssucesso!!")
							})

								veiculo_controlee.updateOne({matricula:veiculo.matricula},{$set:{kilometragem:veiculo.kilometragem}}, function(errorrr, ki){
								if(errorrr)
									console.log("ocorreu um erro ao tentar actualizar kilometragem")
								else
									console.log("kilometragem actualizado com ssucesso!!")
							});
								// *********************************************end actualizacao de kilometragem*************************************


								// ************************************envio de sms++++++++++++++++++++++++++++++++
								if(veiculo.observacao!="green"){
								model.findOne({nome:veiculo.motorista}, function(errrr, ddta){
										if(errrr)
											console.log("ocorreum um erro ao tentar mandar sms de reprovacao");
										else
											if(ddta!=null){
												ddta.msg = "Prezado Senhor "+ddta.nome+", aguarde pela autorizacao para o uso desta viatura! \n  \n\n EagleI 2020";
												// sender.sendText(ddta,  function(err1, response){
									   //        if(err1){
									   //          return console.log(err);
									   //        }
									      
									   //        console.log('SMS Enviada ');
									   //      })
												var fleetManager={"telefone_1":"+258849903045"}
												fleetManager.msg="Prezado Senhor Lino Matandalasse, a viatura do(a) Senhor(a) "+ddta.nome+" não está em perfeitas condicoes, Porfavor verifique.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })
											var fleetManager1={"telefone_1":"+258849903024"}
												fleetManager1.msg="A viatura do(a) Senhor(a) "+ddta.nome+" não está em perfeitas condições. Por favor verifique.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager1,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })
													if(veiculo.observacao=="red"){
									var fleetManager2={"telefone_1":"+258849903015"}
												fleetManager2.msg="Prezado Senhor Valeriano Hilario, a viatura do(a) Senhor(a) "+ddta.nome+" não está em perfeitas condições. Por favor verifique.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager2,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })
											var fleetManager3={"telefone_1":"+258849903010"}
												fleetManager3.msg="A viatura do(a) Senhor(a) "+ddta.nome+" não está em perfeitas condições. Por favor verifique.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager3,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })


								}


											}

									})
								


							}

							// res.redirect("/inspdiaria")





						}
					}

					else
						{
							veiiculo.gravarDados(veiculo, function(err){
								if(err){
								console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
								console.log(err)
								}
								else
									{
										console.log("dados gravados com sucesso!!");


							}
						});

							model.updateOne({matricula:veiculo.matricula},{$set:{kilometragem:veiculo.kilometragem}}, function(errorrr, ki){
								if(errorrr)
									console.log("ocorreu um erro ao tentar actualizar kilometragem")
								else
									console.log("kilometragem actualizado com ssucesso!!")
							})

								if(veiculo.observacao!="green"){
								model.findOne({nome:veiculo.motorista}, function(errrr, ddta){
										if(errrr)
											console.log("ocorreum um erro ao tentar mandar sms de reprovacao");
										else
											if(ddta!=null){
												ddta.msg = "Prezado Senhor "+ddta.nome+", aguarde pela autorizacao para o uso desta viatura! \n  \n\n EagleI 2020";
												// sender.sendText(ddta,  function(err1, response){
									   //        if(err1){
									   //          return console.log(err);
									   //        }
									      
									   //        console.log('SMS Enviada ');
									   //      })
												var fleetManager={"telefone_1":"+258849903045"}
												fleetManager.msg="Prezado Senhor Lino Matandalasse, a viatura do(a) Senhor(a)"+ddta.nome+" não está em perfeitas condicoes, Porfavor verifique.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })

													var fleetManager1={"telefone_1":"+258849903024"}
												fleetManager1.msg="Prezada Senhora Faiza Tricamo, a viatura do(a) Senhor(a) "+ddta.nome+" nao esta em perfeitas consdicoes, Por favor verique.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager1,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })	
												

											}

									})


							}


						}	
		



			})



				// *************************************end tricks####################################


			// **************************************fim SMS*******************************

		}


	}

			console.log("sem sucesso")
}
	)

	// if(veiculo.matricula!="SEM VEICULO"){
	// veiiculo.gravarDados(veiculo, function(err){
	// 	if(err){
	// 		console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
	// 		console.log(err)
	// 	}
	// 	else
	// 		console.log("dados gravados com sucesso!!");
	// });}

if((veiculo.extintor=="not ok")||(veiculo.socorros=="not ok")||(veiculo.cintoSeg=="not ok")){

	 emailSender.createConnection();
	 emailSender.problemasSeguranca(veiculo);


	}


	
	res.redirect("/inicio");
})

router.get("/detalhes/:id", function(req, res){
	var userData=req.session.usuario;
	var escolha = "completo";
veiiculo.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('inspdiaria', {DataU:userData,veiculos: data, v1: escolha, funcionario: "logged!!", title: 'EagleI'});

})

})

router.get("/detalhesbowser/:id", async function(req, res){
	var userData=req.session.usuario;
	var escolha = "completo";
	console.log("id das cenas ---- "+req.params.id);
	console.log(req.params.id);
    var inspensao = await veiiculo.find({motorista:userData.nome}, {_id:1}).sort({data_inspecao:-1}).limit(1);
    var dbbb = await bowser_db.find({}, {matricula:1, dieselbowser:1,_id:1});
    var count = await bowser_db.countDocuments({});
    console.log({inspensao}, {dbbb}, {count});
	insp_bowser.find({_id:req.params.id}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("deve");
            res.render('dieselbowser_inspection', {DataU:userData, Inspensao:JSON.stringify(inspensao),bowsers:dbbb, tamanho:count, Bowser:data, v1:escolha, title: 'EagleI'});
        }
	}).limit(1)

});


router.get("/detalhes_acao/:id", function(req, res){
	var userData=req.session.usuario;
veiiculo.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	else
	veiiculo.find({matricula:data[0].matricula, observacao:{$ne:"green"}}, function(error, dados){
		if(error)
			console.log("Ocorreu um erro....")
		else
			res.render("historico", {DataU:userData, veiculos: dados, funcionario: "logged!!", title: 'EagleI'})
	})
	// res.render('detalhes_acao', {DataU:userData, veiculos: data, funcionario: "logged!!", title: 'EagleI'});

})

})


router.get("/detalhes_acaoo/:id", function(req, res){
	var userData=req.session.usuario;
veiiculo.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	else
	// veiiculo.find({matricula:data[0].matricula, observacao:{$ne:"green"}}, function(error, dados){
	// 	if(error)
	// 		console.log("Ocorreu um erro....")
	// 	else
	// 		res.render("historico", {DataU:userData, veiculos: dados, funcionario: "logged!!", title: 'EagleI'})
	// })
	res.render('detalhes_acao', {DataU:userData, veiculos: data, funcionario: "logged!!", title: 'EagleI'});

})

})

router.post("/aprovarUtilizaco", function(req, res){
	var userData=req.session.usuario;
	veiiculo.updateOne({_id:req.body.novo}, {$set:{Data_autorizacao:new Date, autorizado_por:userData.nome}}, function(err, data){
		if(err)
			console.log("erronn")
		else
		{
			model.findOne({nome:req.body.mestre}, function(errrr, ddta){
										if(errrr)
											console.log("ocorreum um erro ao tentar mandar sms de reprovacao");
										else
											if(ddta!=null){
												ddta.msg = "Prezado Senhor "+ddta.nome+", ja pode utilizar a sua viatura! autorizado por  "+userData.nome+"!\n  \n\n EagleI 2020";
												// sender.sendText(ddta,  function(err1, response){
									   //        if(err1){
									   //          return console.log(err);
									   //        }
									      
									   //        console.log('SMS Enviada ');
									   //      })
												var fleetManager={"telefone_1":"+258849903045"}
												fleetManager.msg="Prezado Senhor Lino Matandalasse, o(a) Senhor(a) "+ddta.nome+" foi autorizado(a) a utilizar a sua viatura.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })
											var fleetManager1={"telefone_1":"+258849903024"}
												fleetManager1.msg="Prezado Senhor Faiza Tricamo, o(a) Senhor(a) "+ddta.nome+" foi autorizado(a) a utilizar a sua viatura.... \n\n EagleI 2020" 
													// sender.sendText(fleetManager1,  function(err1, response){
									    //       if(err1){
									    //         return console.log(err);
									    //       }
									      
									    //       console.log('SMS Enviada ');
									    //     })	

											}

									})
		}
	})

})


router.get("/remove/:id", function(req, res){
	var userData=req.session.usuario;
	veiiculo.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu erro ao tentar executar accao do veiculo")
		else
			res.render('accao', {DataU:userData, veiculos: data, funcionario: "logged!!", title: 'EagleI'});
	})
	// veiiculo.findByIdAndRemove(req.params.id, function(err){
	// 	if(err)
	// 		console.log("ocorreu um erro ao tentar apagar os dados!");
	// 	else{
	// 		console.log("inspeção Removido com sucesso!!");
	// 		res.redirect("/inspdiaria")}
	// })
})

router.get("/completar/:id", function(req, res){
	var userData=req.session.usuario;
	
	veiiculo.updateOne({matricula:req.params.id, feito:{$exists:false}, fleet_man:{$exists: true} }, {$set:{feito:true}}, {multi:false}, function(err, data){
		if(err)
			console.log("ocorreu erro ao tentar executar accao do veiculo")
		else
			res.redirect("/inspdiaria");
	})
	// veiiculo.findByIdAndRemove(req.params.id, function(err){
	// 	if(err)
	// 		console.log("ocorreu um erro ao tentar apagar os dados!");
	// 	else{
	// 		console.log("inspeção Removido com sucesso!!");
	// 		res.redirect("/inspdiaria")}
	// })
})

router.post("/remove/:id", upload.any(), function(req, res){
	var userData=req.session.usuario;
	veiiculo.updateOne({_id:req.params.id}, {$set:{data_acao:req.body.data_acao, razao_acao:req.body.razao_acao, fleet_man:req.body.fleet_man, tipo_acao:req.body.tipo_acao, lembrete:req.body.lembrete}},{multi:false}, function(err, frs){
		if(err)
			console.log("ocorreu ao tentar registar a data de accao do veiculo")
		else
			console.log("executado com exito!!!")
	})

	// ****************************** Enviar mensaagem para o tecnico*******************************

	// *********************************end Envio de mensagem para tecnico***************************
	res.redirect("/inspdiaria")
	// veiiculo.find({_id:req.params.id}, function(err, data){
	// 	if(err)
	// 		console.log("ocorreu erro ao tentar executar accao do veiculo")
	// 	else
	// 		res.render('accao', {DataU:userData, veiculos: data, funcionario: "logged!!", title: 'EagleI'});
	// })
	// veiiculo.findByIdAndRemove(req.params.id, function(err){
	// 	if(err)
	// 		console.log("ocorreu um erro ao tentar apagar os dados!");
	// 	else{
	// 		console.log("inspeção Removido com sucesso!!");
	// 		res.redirect("/inspdiaria")}
	// })
})

function getVeiculo(body){
	var veiculo= {};
	veiculo.motorista=body.motorista;
	veiculo.matricula=body.matricula;
	veiculo.limpa_parabrisas=body.limpa_parabrisas;
	veiculo.datta=((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	veiculo.kilometragem=body.kilometragem;
	veiculo.parabrisas=body.parabrisas;
	veiculo.porcas=body.porcas;
	veiculo.pneus=body.pneus;
	veiculo.oleo=body.oleo;
	veiculo.pressao=body.pressao;
	veiculo.refrigeracao=body.refrigeracao;
	veiculo.travoes=body.travoes;
	veiculo.carrocaria=body.carrocaria;
	veiculo.limpa_parabrisas=body.limpa_parabrisas;
	veiculo.luzes=body.luzes;
	veiculo.nivel=body.nivel;
	veiculo.vidros=body.vidros;
	veiculo.camera=body.camera;
	veiculo.handsfree=body.handsfree;
	veiculo.Waning_engine=body.Waning_engine;
	veiculo.extintor=body.extintor;
	veiculo.socorros=body.socorros;
	veiculo.cintoSeg=body.cintoSeg;
	veiculo.dieselbowser = body.dieselbowser;
	veiculo.razaobolareboque = body.razaobolareboque;
	veiculo.bolareboque = body.bolareboque;
	var problems=[]
	var temp1=body.razaoCarrocari;
	veiculo.razaoCarrocari=JSON.parse(temp1);
	problems=problems.concat(JSON.parse(temp1));
	var temp2=body.razaoPneus;
	veiculo.razaoPneus=JSON.parse(temp2);
	problems=problems.concat(JSON.parse(temp2));	
	var temp3=body.razaoPressao;
	veiculo.razaoPressao=JSON.parse(temp3);
	problems=problems.concat(JSON.parse(temp3));
	var temp4=body.razaoPorcas;
	veiculo.razaoPorcas=JSON.parse(temp4);
	problems=problems.concat(JSON.parse(temp4));
	var temp5=body.razaoLuzes;
	veiculo.razaoLuzes=JSON.parse(temp5);
	problems=problems.concat(JSON.parse(temp5));
	var temp6=body.razaoNivel;
	veiculo.razaoNivel=JSON.parse(temp6);
	problems=problems.concat(JSON.parse(temp6));
	var temp7=body.razaoTravoes;
	veiculo.razaoTravoes=JSON.parse(temp7);
	problems=problems.concat(JSON.parse(temp7));
	var temp8=body.razaoVidros;
	veiculo.razaoVidros=JSON.parse(temp8);
	problems=problems.concat(JSON.parse(temp8));
	var temp9=body.razaoCamera;
	veiculo.razaoCamera=JSON.parse(temp9);
	problems=problems.concat(JSON.parse(temp9));

	var temp10=body.razaoextintor;
	veiculo.razaoextintor=JSON.parse(temp10);
	problems=problems.concat(JSON.parse(temp10));

	var temp11=body.razaosocorros;
	veiculo.razaosocorros=JSON.parse(temp11);
	problems=problems.concat(JSON.parse(temp11));

	var temp12=body.razaocintoSeg;
	veiculo.razaocintoSeg=JSON.parse(temp12);
	problems=problems.concat(JSON.parse(temp12));
	

	if(body.limpa_parabrisas=="not ok"){
		problems.push("Limpa-parabrisas");
	}

	if(body.handsfree=="not ok"){
		problems.push("Mãos-livres");
	}

	if((body.porcas=="not ok")||(body.pneus=="not ok")||(body.travoes=="not ok")||(body.luzes=="not ok" && body.razaoLuzes.indexOf("Farol Rachado")==-1)||(body.parabrisas=="not ok")||(body.nivel=="not ok")||(body.Waning_engine=="not ok"))
		{veiculo.observacao="red";
			veiculo.estado_carro="Mau";
			veiculo.permitido_circular="nao";}
	else
		if((body.extintor=="not ok")||(body.socorros=="not ok")||(body.cintoSeg=="not ok")||(body.luzes=="not ok" && body.razaoLuzes.indexOf("Farol Rachado")!=-1)||(body.pressao=="not ok")||(body.oleo=="not ok")||(body.refrigeracao=="not ok")||(body.carrocaria=="not ok")||(body.camera=="not ok")||(body.handsfree=="not ok")||(body.handsfree=="not ok")||(body.limpa_parabrisas=="not ok"))
			{veiculo.observacao="orange";
		veiculo.estado_carro="Razoavel";}
		else
			{veiculo.observacao="green";
		veiculo.estado_carro="Bom";}


	veiculo.problemas=problems
	return veiculo;


}
module.exports = router;