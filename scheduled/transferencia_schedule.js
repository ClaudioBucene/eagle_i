var transferencia_db = require("../entities/transferencia_veiculo");
var usuario_db = require("../entities/usuario");
var sender = require('../util/sendText');
var moment_zone=require("moment-timezone");
var CronJob = require("cron").CronJob;
var veiculos_db=require("../entities/veiculo");


var job_transferencia = new CronJob('0 0 8-19 * * *', function(){

	var mydate=new Date();
	var newdate1=new Date(mydate);
	newdate1.setHours(newdate1.getHours()-2)

	transferencia_db.find({estagio:{$size:1}, data_real:{$exists:true}, num_notificacao:{$exists:true}, data_real:{$lt:newdate1}}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar encontrar as transferencias das viaturas!")
		else
			{
				// console.log(data)
				if(data.length>0){
					for(let i=0; i<data.length; i++){




						usuario_db.findOne({nome:data[i].nome_supervisor}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ao tentar achar supervisor!")
							else
								{
									if(dados!=null){
										transferencia_db.findOneAndUpdate({_id:data[i]._id}, {$inc:{num_notificacao:1}}, function(errro, feito){
											if(errro)
												console.log("Falha na actualizacao de numero de noficacao")
											else
												console.log("actualizacao feita!!!")
										})

											dados.msg = "Prezado Senhor "+dados.nome+",  tem um expediente por despachar na plataforma da COMSERV \n";
											// sender.sendText(dados,  function(err, response){
											// if(err){
											// 	return console.log(err);
											// 	}

											// console.log('SMS Enviada ');
        									// 					})
										console.log("mensagem enviada para "+ dados.nome)
									}
								}
						})
					}
				}
				console.log("************************")

			}
	})
}, null, true, "Africa/Maputo")

job_transferencia.start();


var job_veiculo_grave = new CronJob("0 0 7 * * *", function(){
	var carro_gr=new Date();
	var carro_g= new Date(carro_gr);
	carro_g.setMinutes(carro_g.getHours()-96);
	var carro_g1 = new Date(carro_gr);
	carro_g1.setMinutes(carro_g1.getHours()-48);
	
	veiculos_db.find({$and:[{data_inspecao:{$lt:carro_g1}}, {data_inspecao:{$gt:carro_g}}, {data_acao:{$exists:false}}]}, function(err, ddta){
		if(err)
			console.log("ocorreu um erro ao tentar lembrar tomada de acao")
		else {
			if(ddta.length>0){
				for(let i=0; i<ddta.length;i++){

						var fleetManager1={"telefone_1":"+258849903045"}
						fleetManager1.msg="Prezado Senhor Lino Matandalasse, a viatura do(a) Senhor(a)"+ddta[i].motorista+" não está em perfeitas. Tens apenas 1 dia para verificar essa viatura.... \n\n COMSERV " + (new Date()).getFullYear();
						// sender.sendText(fleetManager1,  function(err1, response){
						// if(err1){
						// return console.log(err);
						// }

						// console.log('SMS Enviada ');
						// })	

						console.log(ddta[i].motorista);
				}


			}

		}
	})

		


	console.log("executando")

}, null, true, "Africa/Maputo")


var job_veiculo_grave_v= new CronJob("0 30 9 * * *", function(){
	var carro_gr=new Date();
	var carro_g= new Date(carro_gr);
	carro_g.setMinutes(carro_g.getHours()-142);
	var carro_g1 = new Date(carro_gr);
	carro_g1.setMinutes(carro_g1.getHours()-96);
	
	veiculos_db.find({$and:[{data_inspecao:{$lt:carro_g1}}, {data_inspecao:{$gt:carro_g}}, {data_acao:{$exists:false}}]}, function(err, ddta){
		if(err)
			console.log("ocorreu um erro ao tentar lembrar tomada de acao")
		else {
			if(ddta.length>0){
				for(let i=0; i<ddta.length;i++){

						var fleetManager2={"telefone_1":"+258849903015"}
						fleetManager2.msg="Prezado Senhor Valeriano Hilario, a viatura do "+ddta[i].motorista+" não está em perfeitas condicoes. Por favor, providencie a reparacao da mesma..... \n\n COMSERV " + (new Date()).getFullYear();
						// sender.sendText(fleetManager1,  function(err1, response){
						// if(err1){
						// return console.log(err);
						// }

						// console.log('SMS Enviada ');
						// })	

						console.log(ddta[i].motorista);
				}


			}

		}
	})

		


	console.log("executando")

}, null, true, "Africa/Maputo")





// var job2 = new CronJob("*/3 * * * * *", function(){
// console.log("executando #################")
// }, null, true, "America/Los_Angeles")

// job2.start();

exports.job1 = job_transferencia;
exports.job2 = job_veiculo_grave;
exports.job3 = job_veiculo_grave_v;