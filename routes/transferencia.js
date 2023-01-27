var express = require('express');
var router = express.Router();
var transferenciaVeiculo= require("../entities/transferencia_veiculo.js");
var model = require('../entities/usuario');
var oficina=require('../entities/oficina');
var emailSender=require('../util/sendEmail')
var sender = require('../util/sendText');
var veiiculo= require("../entities/veiculo.js");
require("../scheduled/transferencia_schedule.js");
var multer = require('multer');
var path = require("path");
var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads');
        },
        filename: function(req, file, cb) {
            cb(null, req.session.usuario.nome + "_" + Date.now() + path.extname(file.originalname));
        }
    })
});

router.get("/",async function(req, res){
	if(req.session.usuario){
	var useru=await model.findOne({_id:req.session.usuario._id});
	var userData= await {...req.session.usuario, matricula:useru.matricula, modelo:useru.modelo, marca:useru.marca, ano_aquisicao:useru.ano_aquisicao, kilometragem:useru.kilometragem };
	
	var nome=userData.nome;
	if(req.session.usuario.nivel_acesso!="normal"){
	 transferenciaVeiculo.find({}, function(err, data){
		if(err)
			console.log(err); 
		else {
			res.render('transferencia_home',  {DataU:userData,Transferencias: data, funcionario: "logged!!", title: 'EagleI'});
		}
	}).sort({_id:1}).lean();
	}
	else
	{transferenciaVeiculo.find({$or:[{motorista:nome}, {nome_supervisor:nome}, {nome_receptor:nome}]}, function(err, data){
		if(err)
			console.log(err); 
		else{
			res.render('transferencia_home',  {DataU:userData,Transferencias: data, funcionario: "logged!!", title: 'EagleI'});
			}
	})}

}
else
	res.redirect("/")
})
// +++++++++++++++++++++++++++++++++++++++++++++++

exports.retornarTodos=function(){
 	transferenciaVeiculo.find({}, function(err, data){
 		if(err)
 			console.log("ocorreu um erro ao tentar retornar todos");
 		else
 			return data;
 	})
 };
// router.get('/exportartocsv', function(req, res, next) {
//     var filename   = "Transferencias"+(new Date().getTime())+".csv";
//     var dataArray;
//     var your=[];
//     model.find({}, function(err1, data1){
//     	if(err1)
//     		console.log("ocorreu um erro ao tentar aceder base de dados!")
//     	else
//     		{
//     			for(var i=0;i<data1.length; i++){
//     				veiiculo.findOne({motorista:data1[i].nome}, function(err2, data2){
//     					if(err2)
//     						console.log("ocorreu um erro ao tentar base de dados2");
//     					else{
//     						if(data2==null){
//     							var t= {nome:data1[i].nome};
//     							your.push(t)
    							
//     						}
//     						console.log(your)

//     					}
//     				})
//     			}
    			
//     	// transferenciaVeiculo.find().lean().exec({}, function(err, products) {
//      //    if (err) res.send(err);
        
//      //    res.statusCode = 200;
//      //    res.setHeader('Content-Type', 'text/csv');
//      //    res.setHeader("Content-Disposition", 'attachment; filename='+filename);
//      //    res.csv(your, true);
//     // });


//     		}
//     })

//     // transferenciaVeiculo.find().lean().exec({}, function(err, products) {
//     //     if (err) res.send(err);
        
//     //     res.statusCode = 200;
//     //     res.setHeader('Content-Type', 'text/csv');
//     //     res.setHeader("Content-Disposition", 'attachment; filename='+filename);
//     //     res.csv(products, true);
//     // });
//  });

// router.post("/", function(req, res){
// 	var veiculo = getVeiculo(req.body);
// 	console.log(veiculo);
// 	transferenciaVeiculo.gravarDados(veiculo, function(err){
// 		if(err){
// 			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
// 			console.log(err)
// 		}
// 		else
// 			console.log("dados gravados com sucesso!!");
// 	});
	
// 	res.redirect("/inicio");
// })


router.post("/aprovar", upload.any(), async function(req, res){
	var aprov=await req.body.novo;
	console.log(aprov)
	var nextMessage;
	var proximo;
	
	var kampa=await transferenciaVeiculo.find({_id:req.body.novo}).lean();
	console.log(kampa)
	var kampa1=await model.find({nome:kampa[0].nome_receptor, marca:'SEM VEICULO'});
	var kampa2=await oficina.find({responsavel:kampa[0].motorista, matricula:kampa[0].matricula});
	if(kampa[0].estagio.length<2 && kampa1.length>0 && kampa2.length>0){
	
	var tempo=((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	console.log(aprov)
	await [4].reduce(async function(acum, idiota){
		await acum
		await transferenciaVeiculo.updateOne({_id:aprov}, {$push:{estagio:{$each:[1,1]}}, $set:{despachado_por:req.session.usuario.nome, data_despacho:tempo}}, function(err, dta1){
		if(err)
			console.log("ocorreu um erro ao tentar aprovar a transferencia"+err)
		else
		console.log(dta1)

	})
	
		await transferenciaVeiculo.findOne({_id:aprov}, function(erro, dta){
			if(erro)
				console.log("ocorreu um erro ao tentar actualizar")
			else
			{
				console.log(dta);
			for(var i=0; i<3;i++){
				model.findOne({nome:dta.intervenientes[i]}, function(errrr, ddta){
					if(errrr)
						console.log("ocorreum um erro ao tentar mandar sms de reprovacao");
					else
						if(ddta){
						
									
							ddta.msg="Prezado Senhor "+ddta.nome+", a viatura "+ dta.marca_modelo+ ", matricula "+dta.matricula+", foi transferida de "+dta.intervenientes[0]+" para o "+dta.intervenientes[2]+"\n\n EagleI 2020";
								// sender.sendText(ddta,  function(err1, response){
								//       if(err1){
								//         return console.log(err);
								//       }
								  
								//       console.log('SMS Enviada ');
								//     })

							}
							
							
						
							

						

				})
			}

			if((dta.nome_receptor=="Oficina")||(dta.nome_receptor=="Parque")){
				var oficinna={};
			oficinna.responsavel="Parqueado";
			oficinna.matricula=dta.matricula;
			oficinna.kilometragem=dta.quilometragem;
			var mmarca=dta.marca_modelo.split("_");
			oficinna.marca=mmarca[0];
			oficinna.modelo=mmarca[1];
			oficinna.local=dta.nome_receptor;
			oficinna.parqueado=true;
			var destinnoo=dta.nome_receptor;
			model.findOne({nome:dta.motorista}, function(err5, jk){
				if(err5)
					console.log("ocorreu um erro!!")
				else{
					oficinna.regiao=jk.regiao;
					oficina.provincia=jk.provincia_trabalho;
					oficinna.ano_aquisicao=jk.ano_aquisicao;
				oficina.gravarDadosOficinas(oficinna, function(err){
				if(err)
					console.log("ocorre erro ao tentar "+err)
				else
					console.log("dados gravados com sucesso na oficina")
			})

			oficina.updateOne({responsavel:dta.motorista},{$set:{responsavel:destinnoo}}, function(irr, data){
				if(irr)
					console.log("error  to be solved")
				else 
					console.log("Oficinas actualizadas")
			})

			// oficina.deleteOne({responsavel:dta.motorista}, function(error, ghj){
			// 	if(error)
			// 		console.log("ocorreu erro na busca oficina")
			// 	else
			// 		console.log(ghj)
			// })

				}
			})

			//  actualizacao de viaturas 


			// oficinna.ano_aquisicao=transfer.ano_aquisicao;
			// oficinna.provincia=transfer.provincia;
			// oficinna.regiao=transfer.regiao;

			

				model.updateOne({nome:dta.motorista},{$set:{'matricula':'SEM VEICULO', 'modelo':'SEM VEICULO', 'marca':'SEM VEICULO', 'ano_aquisicao':0, 'kilometragem':0 }}, function(err, data3){
					if(err)
						console.log("ocooreu erro ao tentar actualizar a transferencia \n " +err);
					else
						if(data3!=null)
							console.log("actualizacao feita");
							// if(req.session.usuario.nome==data3[0].nome)
							// 	req.session.usuario=data[0];
				});
			




			}
				// nextMessage=dta.estagio.length;
				// proximo=dta.intervenientes[(nextMessage+1)];

				// model.findOne({nome:proximo}, function(errr, data){
				// 	if(errr)
				// 	console.log("ocorreu um erro ao tentar registar a transferencia");
				// 	else
				// 	if(data){
				// 		console.log("executado")
				// 		// emailSender.createConnection();
				// 		// emailSender.sendEmail(data)
				// 	}
				// 	else 
				// 		console.log("nao enviei pois nao encontrei o utilizador")
				// })
				
				
			}
		})
	




	await transferenciaVeiculo.findOne({_id:aprov}, function(err, data){
		if(err)
		console.log("primeiro erro da transferencia da viatura")
		if(data!=null)
		{
		if(data.estagio[2]==1) {

			model.findOne({nome:data.motorista}, function(err, data1){
				if(err)
				console.log("segundo erro da transferencia")
				else
				if((data1!=null) && ((data.nome_receptor!="Oficina")||(data.nome_receptor!="Parque"))){
					model.updateOne({nome:data.nome_receptor},{$set:{'matricula':data1.matricula, 'modelo':data1.modelo, 'marca':data1.marca, 'ano_aquisicao':data1.ano_aquisicao, 'kilometragem':data1.kilometragem}}, function(err, data2){
						if(err)
							console.log("ocooreu erro ao tentar actualizar a transferencia \n " +err);
						
							// if(req.session.usuario.nome==data2[0].nome)
							// 	req.session.usuario=data2[0];
					});

					oficina.updateOne({matricula:data.matricula},{responsavel:data.nome_receptor}, function(ghs, hysh){
						if(ghs)
							console.log("ocorreu um erro")
						else
							console.log("feito!!!!")
					});
				}


			})

			 model.updateOne({nome:data.motorista},{$set:{'matricula':'SEM VEICULO', 'modelo':'SEM VEICULO', 'marca':'SEM VEICULO', 'ano_aquisicao':0, 'kilometragem':0 }}, function(err, data3){
				if(err)
					console.log("ocooreu erro ao tentar actualizar a transferencia \n " +err);
				else
					if(data3!=null)
						console.log("actualizacao feita");
						// if(req.session.usuario.nome==data3[0].nome)
						// 	req.session.usuario=data[0];
			});


		}
		
		}
	})

	
	console.log(proximo)
	


	}, 0);
}
else
{
	var fgei=await transferenciaVeiculo.deleteOne({_id:aprov});
	console.log(fgei);
}

	


	res.json({feito:"done"})
})

router.post("/reprovar", upload.any(), async function(req, res){
	var aprov=req.body.novo;

	var kampa=await transferenciaVeiculo.find({_id:req.body.novo});
	var kampa1=await model.find({nome:kampa[0].nome_receptor, marca:'SEM VEICULO'});
	var kampa2=await oficina.find({responsavel:kampa[0].motorista, matricula:kampa[0].matricula});
	if(kampa[0].estagio.length<2 && kampa1.length>0 && kampa2.length>0){


	var tempo=((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

	console.log(aprov)
	await transferenciaVeiculo.updateOne({_id:aprov}, {$push:{estagio:{$each:[0,0]}},  $set:{despachado_por:req.session.usuario.nome, data_despacho:tempo}})

	transferenciaVeiculo.findOne({_id:aprov}, function(err, dta){
		if(err)
		console.log("ocorreu um erro ao reprovar a transferencia")
		else
		{
			console.log(dta);
			for(var i=0; i<2;i++){
				model.findOne({nome:dta.intervenientes[i]}, function(errrr, ddta){
					if(errrr)
						console.log("ocorreum um erro ao tentar mandar sms de reprovacao");
					else
						if(ddta){

							

							// ddta.msg = "Prezado Senhor "+ddta.nome+",  A sua requisicao foi negada \n\n EagleI 2019";
						ddta.msg="Prezado Senhor "+ddta.nome+",  a transferencia da viatura "+ dta.marca_modelo+ ", matricula "+dta.matricula+", de "+dta.intervenientes[0]+" para "+dta.intervenientes[2]+" foi reprovada! \n\n EagleI 2020";
								// sender.sendText(ddta,  function(err1, response){
							 //          if(err1){
							 //            return console.log(err);
							 //          }
							      
							 //          console.log('SMS Enviada ');
							 //        })

						}

				})
			}
		}
	})
	}
else
{
	var fgei=await transferenciaVeiculo.deleteOne({_id:aprov});
	console.log(fgei);
}


	res.json({feito:"done"})
})

 
router.get("/novo", async function(req, res){

	// if(req.session.usuario){
		 // var userData=req.session.usuario;
		 var useru=await model.findOne({_id:req.session.usuario._id});
	var userData= await {...req.session.usuario, matricula:useru.matricula, modelo:useru.modelo, marca:useru.marca, ano_aquisicao:useru.ano_aquisicao, kilometragem:useru.kilometragem };
	
		// var nome=userData.nome;
		if(req.session.usuario){
			model.find({$or:[{matricula:'SEM VEICULO'}, {nome:'Parque'}, {nome:'Oficina'}], status:"activo" },null, {sort:{nome:1}}, function(err, datta){
				if(err)
				console.log(" ocorreu erro ao tentar registar a transferencia!")
				else
				if(datta!=null){

					res.render('transferencia_form', {DataU:userData,   title:'EagleI', datta});
	
				}

			})
			
				
	}
	else
		res.redirect("/")
	// var userData=req.session.usuario;
	// res.render("transferencia_form", {DataU:userData,title:'EagleI'})
});



router.post("/novo", upload.any(), async function(req, res){
	var transfer = getTransferencia(req.body);
	transfer.estagio=[1];
	var messageRec= transfer.estagio.length

	var receiver;
	console.log(transfer.nome_receptor);
	console.log(transfer);


	var amelia=await transferenciaVeiculo.find({$or:[{$and:[{"intervenientes.2":{"$eq":transfer.nome_receptor}}, {"estagio.2":{"$exists":false}}]}, {$and:[{"intervenientes.0":{"$eq":transfer.motorista}}, {"estagio.2":{"$exists":false}}]}]})

	if(amelia.length==0){
		if((transfer.matricula!="SEM VEICULO")&&((transfer.nome_receptor=="Oficina")||(transfer.nome_receptor=="Parque"))) {
			transferenciaVeiculo.gravarDados(transfer, async function(err){
				if(err){
					console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
					
				}
				else
					console.log("dados gravados com sucesso!!");
			});
		
		
			await model.findOne({nome:transfer.intervenientes[1]}, async function(errr, data){
				if(errr)
				console.log("ocorreu um erro ao tentar registar a transferencia");
				else
				{
					await emailSender.createConnection();
					await emailSender.transferenciaManager(data)
				}
			})
		
			}
		
			if((transfer.matricula!="SEM VEICULO")&&((transfer.nome_receptor!="Oficina")&&(transfer.nome_receptor!="Parque"))) {
				model.findOne({nome:transfer.nome_receptor},async function(err, dattta){
					if(err)
						console.log("ocorre um erro ao tentar verificar matricula")
					else
					{
						if(dattta.matricula=="SEM VEICULO"){
								await transferenciaVeiculo.gravarDados(transfer, function(err){
				if(err){
					console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
					console.log(err)
				}
				else
					console.log("dados gravados com sucesso!!");
			});
		
			model.findOne({nome:transfer.intervenientes[1]}, async function(errr, data){
				if(errr)
				console.log("ocorreu um erro ao tentar registar a transferencia");
				else
				if(data!=null){
		
					data.msg = "prezado Senhor "+data.nome+",  tem um expediente por despachar na plataforma da EagleI \n Melhores cumprimentos!";
		
					await emailSender.createConnection();
					await emailSender.transferenciaManager(data)
				}
			})
		
		
		
						}
						if(dattta.matricula!="SEM VEICULO"){
		
							model.findOne({nome:transfer.motorista}, function(errrr, reijetado){
								if(errrr)
									console.log("Ocorreum erro ao tentar encontrar o rejeitado!")
								else
									console.log("MANDAR SMS PARA DATTTA");
							})
						}
		
		
		
					}
				})
			}
		
					}

	var enco=await transferenciaVeiculo.find({"estagio.2":{"$exists":false}, $or:[{nome_receptor:{"$eq":"Oficina"}}, {nome_receptor:{"$eq":"Parque"}}]})

	if(enco.findIndex(x=>x.motorista==transfer.motorista)==-1 && enco.length>0){
		await transferenciaVeiculo.gravarDados(transfer, async function(err){
			if(err){
				console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
				console.log(err)
			}
			else
				console.log("dados gravados com sucesso!!");
		});


await model.findOne({nome:transfer.intervenientes[1]}, async function(errr, data){
	if(errr)
		console.log("ocorreu um erro ao tentar registar a transferencia");
	else
	{
		await emailSender.createConnection();
		await emailSender.transferenciaManager(data)
	}
	})


	}



	
	
	res.redirect("/transferencia");
})



// router.post("/novo", function(req, res){
// 	var transfer = getTransferencia(req.body);
// 	transfer.estagio=[1];
// 	var messageRec= transfer.estagio.length;

// 	var receiver;


// 	// *******************************************tricks************************************
// 	if((transfer.matricula!="SEM VEICULO") && ((transfer.nome_receptor!="Oficina")||(transfer.nome_receptor!="Parque"))){
// 		model.findOne({nome:transfer.nome_receptor}, function(err, datet){
// 			if(err)
// 				console.log("erro da transferencia 1");
// 			else
// 				if(datet.matricula=="SEM VEICULO"){
// 		model.findOne({nome:transfer.nome_receptor}, function(err, dadoos){
// 		if(err)
// 			console.log("erro ao consultar o receptor")
// 		else
// 			if((dadoos!=null)&&(dadoos.matricula!="SEM VEICULO")){
// 				if(transfer.matricula!= "SEM VEICULO"){
// 	transferenciaVeiculo.gravarDados(transfer, function(err){
// 		if(err){
// 			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
// 			console.log(err)
// 		}
// 		else
// 			console.log("dados gravados com sucesso!!");
// 	});

// 	model.findOne({nome:transfer.intervenientes[messageRec]}, function(errr, data){
// 		if(errr)
// 		console.log("ocorreu um erro ao tentar registar a transferencia");
// 		else
// 		if(data!=null){

// 			data.msg = "prezado Senhor "+data.nome+",  tem um expediente por despachar na plataforma da EagleI \n";
// 			sender.sendText(data,  function(err, response){
//           if(err){
//             return console.log(err);
//           }
      
//           console.log('SMS Enviada ');
//         })
// 			emailSender.createConnection();
// 			emailSender.sendEmail(data)
// 		}
// 	})

// 	}
// 			}
// 	})


// 				}
// 		})
// 	}
// 	else
// 	{
// 		if((transfer.matricula!="SEM VEICULO")&&((transfer.nome_receptor=="Oficina")||(transfer.nome_receptor=="Parque"))){
// 		transfer.intervenientes[1]="Lino Matandalasse";
// 		transferenciaVeiculo.gravarDados(transfer, function(err){
// 		if(err){
// 			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
// 			console.log(err)
// 		}
// 		else
// 			console.log("dados gravados com sucesso!!");
// 	});

// 		model.findOne({nome:transfer.intervenientes[1]}, function(errr, data){
// 		if(errr)
// 		console.log("ocorreu um erro ao tentar registar a transferencia");
// 		else
// 		if(data!=null){

// 			data.msg = "prezado Senhor "+data.nome+",  tem um expediente por despachar na plataforma da EagleI \n";
// 			sender.sendText(data,  function(err, response){
//           if(err){
//             return console.log(err);
//           }
      
//           console.log('SMS Enviada ');
//         })
// 			// emailSender.createConnection();
// 			// emailSender.sendEmail(data)
// 		}
// 	})

// 		}

// 	}

// 	// *******************************************end tricks**********************************
// 	// ****************************************************************************************************************
// 	// if(transfer.matricula!="SEM VEICULO"){
// 	// 	model.find({nome:transfer.motorista}, function(err, data){
// 	// 		if(err)
// 	// 			console.log("ocorreu erro ao tentar transferir viatura para oficina")
// 	// 		else
// 	// 			if(data[0].matricula!="SEM VEICULO")
// 	// 			{
// 	// 				let oficcina={};
// 	// 				oficcina.condutor=data[0].motorista;
// 	// 				oficcina.matricula=data[0].matricula;
// 	// 				oficcina.kilometragem=data[0].kilometragem;
// 	// 				oficcina.marca=data[0].marca;
// 	// 				oficcina.modelo=data[0].modelo;
// 	// 				oficcina.ano_aquisicao=data[0].ano_aquisicao;
// 	// 				oficina.gravarDadosOficinas(oficcina, function(err1){
// 	// 					if(err1)
// 	// 						console.log("erro ao tentar inserir carro na oficina")
// 	// 					else
// 	// 					{
// 	// 						console.log("o carro ja foi inserido na plataforma!")
// 	// 						model.updateOne({nome:transfer.motorista},{$set:{'matricula':'SEM VEICULO', 'modelo':'SEM VEICULO', 'marca':'SEM VEICULO', 'ano_aquisicao':0, 'kilometragem':0 }}, function(err, data3){
// 	// 			if(err)
// 	// 				console.log("ocooreu erro ao tentar actualizar a transferencia \n " +err);
// 	// 			else
					
// 	// 					res.redirect("/transferencia")
// 	// 					// if(req.session.usuario.nome==data3[0].nome)
// 	// 					// 	req.session.usuario=data[0];
// 	// 		});

// 	// 					}
// 	// 				})
// 	// 			}

// 	// 	})
// 	// }




// 	// ******************************************************************************************************************
// 	// model.findOne({nome:transfer.nome_receptor}, function(err, dta){
// 	// 	if(err){
// 	// 		console.log("Ocorreu um erro ao tentar encontrar a transferencia!")
// 	// 	}
// 	// 	else{
// 	// 		sup_receiver=dta.nome_supervisor;
// 	// }
// 	// });
	

// 	// res.redirect("/transferencia");
// 	})




// ++++++++++***************************************

router.get("/detalhes/:id", function(req, res){

	var userData=req.session.usuario;
	transferenciaVeiculo.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('transferencia_form', {DataU:userData,Transferencias: data, funcionario: "logged!!", title:'EagleI'});

	})

})

router.get("/motivo/:id", function(req, res){

	var userData=req.session.usuario;
	transferenciaVeiculo.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('transferencia_form', {DataU:userData,Transferencias: data, funcionario: "logged!!", title:'EagleI'});

	})

})

router.get("/remove/:id", function(req, res){
	transferenciaVeiculo.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("inspeção Removido com sucesso!!");
			res.redirect("/transferencia")}
	})
})

function getTransferencia(body){
	var trans= {};
	trans.motorista=body.motorista
	trans.matricula=body.matricula;
	trans.nome_receptor=body.nome_receptor;
	trans.data_transferencia=((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	trans.marca_modelo=body.marca_modelo;
	trans.quilometragem=body.quilometragem;
	trans.nome_supervisor=body.supervisor;
	trans.intervenientes=[body.motorista, body.supervisor, body.nome_receptor];
	trans.datta=body.datta;
	trans.kilometragem=body.kilometragem;
	trans.parabrisas=body.parabrisas;
	trans.porcas=body.porcas;
	trans.pneus=body.pneus;
	trans.oleo=body.oleo;
	trans.pressao=body.pressao;
	trans.refrigeracao=body.refrigeracao;
	trans.travoes=body.travoes;
	trans.carrocaria=body.carrocaria;
	trans.luzes=body.luzes;
	trans.nivel=body.nivel;
	trans.vidros=body.vidros;
	trans.camera=body.camera;
	trans.handsfree=body.handsfree;
	var temp1=body.razaoCarrocari;
	trans.razaoCarrocari=JSON.parse(temp1);
	var temp2=body.razaoPneus;
	trans.razaoPneus=JSON.parse(temp2);	
	var temp3=body.razaoPressao;
	trans.razaoPressao=JSON.parse(temp3);
	var temp4=body.razaoPorcas;
	trans.razaoPorcas=JSON.parse(temp4);
	var temp5=body.razaoLuzes;
	trans.razaoLuzes=JSON.parse(temp5);
	var temp6=body.razaoNivel;
	trans.razaoNivel=JSON.parse(temp6);
	var temp7=body.razaoTravoes;
	trans.razaoTravoes=JSON.parse(temp7);
	var temp8=body.razaoVidros;
	trans.razaoVidros=JSON.parse(temp8);
	var temp9=body.razaoCamera;
	trans.razaoCamera=JSON.parse(temp9);
	if((body.porcas=="not ok")||(body.pneus=="not ok")||(body.travoes=="not ok")||(body.luzes=="not ok")||(body.parabrisas=="not ok"))
		trans.observacao="red";
	else
		if((body.pressao=="not ok")||(body.oleo=="not ok")||(body.refrigeracao=="not ok")||(body.carrocaria=="not ok"))
			trans.observacao="orange";
		else
			trans.observacao="green";






	return trans;

}

module.exports = router;
