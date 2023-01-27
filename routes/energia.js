var express = require('express');
var router = express.Router();
var geolocation = require('geolocation')
var model = require('../entities/usuario');
var emailSender=require('../util/sendEmail');
var jobcards = require("../entities/jobcard.js");
var jobcardprojects = require("../entities/jobcard_projects.js");
var energiaprojects = require("../entities/energia_projects.js");
var siteinfos = require("../entities/siteinfo.js");
var spareusedinfos = require("../entities/spareused_info.js");
var armazens = require("../entities/stock_pessoal.js");
var admin_db=require("../entities/sisadmin")
var clientes = require("../entities/cliente.js");
var stockhistory = require("../entities/stock_request_history.js");
var generatorhistory = require("../entities/gerador_historico.js");
var rastreiospare = require("../entities/rastreio.js");
var usuarios = require('../entities/usuario');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var multer  = require('multer');
var path = require("path");
var xl = require('excel4node');
require("../scheduled/maintenancescheduled.js");
var hvac_db=require("../entities/hvac")



var upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file,cb){
			cb(null, './public/Preventative_Maintenance');
		},
		filename: function(req, file, cb){
			cb(null, file.fieldname + "_"+Date.now() + file.originalname.replace(/ /g, "_"));
		}
	}) 
});

var uploadprojects = multer({
	storage: multer.diskStorage({
		destination: function(req, file,cb){
			cb(null, './public/EnergiaProjects_Photo');
		},
		filename: function(req, file, cb){
			cb(null, file.fieldname + "_"+Date.now() + file.originalname.replace(/ /g, "_"));
		}
	}) 
});

router.get('/jobcardprojectshome', async function(req, res) {

    console.log('chega')
	var userData=req.session.usuario;
	var nome = userData.nome;
	var countNew;
	var countInprogress;
	var countComplete;

	var controladorfuncao = 0;

	if (userData.funcao == "Tecnico" || userData.funcao == "Assistant") {
		controladorfuncao = 1;
	}else if(userData.funcao == "regional_manager"){
		controladorfuncao = 2;
	}else if (userData.funcao == "Regional Manager") {
		controladorfuncao = 3;
	}else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "Manager")){
		controladorfuncao = 4;
	}else if(userData.nome == "Guest"){
		controladorfuncao = 5;
	};

    console.log('kmk?')
	console.log(controladorfuncao);
	switch (controladorfuncao) {
		case 1:
			countNew = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 2:
			countNew = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 3:
			countNew = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", jobcard_regiao:userData.regiao}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", jobcard_regiao:userData.regiao}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 4:
			countNew = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New"}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress"}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In progress");
				}
			}).lean();
							
			countComplete = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete"}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 5:
			countNew = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await energiaprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

	}
	res.render("energiaprojects_options", {DataU:userData, CountNew:countNew, CountInprogress:countInprogress, CountComplete:countComplete, title: 'EAGLEI'});
	
});


router.get('/jobcardprojectshome/new', function(req, res) {

	var userData=req.session.usuario;
	var nome = userData.nome;

	var controladorfuncao = 0;
	console.log('tra5')
	if (userData.funcao == "Tecnico" || userData.funcao == "Assistant") {
		controladorfuncao = 1;
	}else if(userData.funcao == "regional_manager"){
		controladorfuncao = 2;
	}else if (userData.funcao == "Regional Manager") {
		controladorfuncao = 3;
	}else if((userData.funcao = "Call Center") || (userData.funcao = "Back Office") || (userData.nivel_acesso = "admin") || (userData.funcao == "Manager")){
		controladorfuncao = 4;
	}else if(userData.nome == "Guest"){
		controladorfuncao = 5;
	};

	console.log(controladorfuncao);

	switch(controladorfuncao){
		case 1:
			energiaprojects.find({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
		
					energiaprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcards){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{
	
									energiaprojects.countDocuments({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects1){
										if(err){
											console.log("ocorreu um erro ao tentar aceder os dados")
										}else{
	
											var total = dataProjects1;
											var totalcont = Math.ceil(total/50);
	
											res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcards), Projects:data, title: 'EAGLEI'});
										}
									}).exec();
									
									
								}
							}).lean();
	
							
						}
					}).lean();
	
				}
	
			}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
		break;

		case 2:
			energiaprojects.find({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
		
					energiaprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcards){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{
	
									energiaprojects.countDocuments({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects1){
										if(err){
											console.log("ocorreu um erro ao tentar aceder os dados")
										}else{
	
											var total = dataProjects1;
											var totalcont = Math.ceil(total/50);
	
											res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcards), Projects:data, title: 'EAGLEI'});
										}
									}).exec();
									
									
								}
							}).lean();
	
							
						}
					}).lean();
	
				}
	
			}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
		break;

		case 3:
			energiaprojects.find({ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{

					energiaprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcards){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{
	
									energiaprojects.countDocuments({ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, dataProjects1){
										if(err){
											console.log("ocorreu um erro ao tentar aceder os dados")
										}else{
	
											var total = dataProjects1;
											var totalcont = Math.ceil(total/50);
	
											res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcards), Projects:data, title: 'EAGLEI'});
										}
									}).exec();
									
									
								}
							}).lean();
	
							
						}
					}).lean();
					
				}
			}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
		break;

		case 4:
			energiaprojects.find({ttnumber_status:"New", jobcard_departamento:userData.departamento}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
	
					energiaprojects.countDocuments({ttnumber_status:"New"}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							var total = dataProjects;
							var totalcont = Math.ceil(total/50);
							//console.log(totalcont)
	
							res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1,  Projects:data, title: 'EAGLEI'});
						}
	
					}).exec();
	
					
				}
			}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
		break;

		case 5:
			energiaprojects.find({ttnumber_status:"New", jobcard_clientenome:"Vm,Sa"}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
	
					energiaprojects.countDocuments({ttnumber_status:"New", jobcard_clientenome:"Vm,Sa"}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							var total = dataProjects;
							var totalcont = Math.ceil(total/50);
							//console.log(totalcont)
	
							res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
						}
	
					}).exec();
	
					
				}
			}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
		break;
	}

});

router.get('/jobcardprojectshome/inprogress', async function(req, res) {

	var userData=req.session.usuario;
	var nome = userData.nome;
	console.log('tra6')

	if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.nome == "Luis Brazuna") || (userData.nome == "David Nhantumbo") || (userData.nome == "Antonio Biquiza")){

		energiaprojects.find({ttnumber_status:"In Progress"}, async function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{
				
				var dataJobcaaards = await jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1});
				energiaprojects.countDocuments({ttnumber_status:"In Progress"}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects),DadosJobcards:JSON.stringify(dataJobcaaards),  Projects:data, title: 'EAGLEI'});
					}
				}).exec();
				
				
			}
		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();

	}else{

		energiaprojects.find({ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, async function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{
				var dataJobcaaards = await jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1});
				energiaprojects.countDocuments({ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont, dataJobcaaards, DadosProjects:JSON.stringify(dataProjects), dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
					}
				}).exec();
			}

		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
	}
});


router.get('/jobcardprojectshome/newform', async function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;
	var admin_case=await admin_db.find({});

	clientes.find({},{cliente_nome:1, cliente_filial:1, cliente_telefone:1}, function(err, dataClientes){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{

			usuarios.find({nivel_acesso:{$ne:"admin"} }, {nome:1}, function(err, dataUsuarios){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}else{

					siteinfos.aggregate([{$group:{_id:"$siteinfo_clientid", sites:{$push:{numero:"$siteinfo_sitenum", ref:"$_id"}}}}], function (err, dataSiteCliente) {
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{

							function compare( a, b ) {
							  if ( a.numero < b.numero ){
								return -1;
							  }
							  if ( a.numero > b.numero ){
								return 1;
							  }
							  return 0;
							}
								  

							for(var i = 0; i < dataSiteCliente.length; i++){

								dataSiteCliente[i].sites.sort(compare);

							}

							energiaprojects.find({},{jobcard_projectnumber:1}, function(err, dataJobcardsProjects){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{

									res.render("energiaprojects_newform", {DataU:userData, SiteCliente:JSON.stringify(dataSiteCliente), AdMagen:admin_case, DadosClientes:JSON.stringify(dataClientes), DadosProjectos:JSON.stringify(dataJobcardsProjects),Clientes:dataClientes, Usuarios:dataUsuarios,title: 'EAGLEI'});
								}
							}).lean();

								

						}
					});


					
				}
			}).sort({ nome: 1 }).lean();

			

		}
	}).sort({ cliente_nome: 1 }).lean();
		
	
});


router.post("/novojobcardproject", upload.any(), async function(req, res){
	var userData= req.session.usuario;
	var jobcard = req.body;
	// console.log(jobcard)
	
	var jobcard_siteArray = [];
	var jobcard_sitecontrolador = jobcard.jobcard_site;

	if(Array.isArray(jobcard_sitecontrolador)){

		for( i = 0; i < jobcard_sitecontrolador.length; i++){
			jobcard_siteArray.push(jobcard_sitecontrolador[i]);
		}

	}else{
		jobcard_siteArray.push(jobcard_sitecontrolador);

	}

	jobcard.jobcard_site = jobcard_siteArray;

	var cont5 = req.body.jobcard_jobtype;
	var posicaodados, cont, cont1, cont2, cont3, cont4, cont6, cont7, cont8, cont9;
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var year = ((new Date()).getFullYear() + "").split("");
	var ano = year[2] + year[3];

	
	cont6 = "CCO/Project/" + mes + "/" + ano;
	
	
	var procura = await energiaprojects.find({}, {jobcard_cod:1}, function(err, data){
		if(err){
			console.log(err);
		}else{
			console.log("Find Projects");
		}
	}).sort({_id:1}).lean();

	var procurauser = await model.findOne({_id:jobcard.jobcard_tecnicoid}, {nome:1, regiao:1, telefone_1:1, nome_supervisor:1, email:1, idioma:1}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	}).lean();

	jobcard.jobcard_tecniconome = procurauser.nome;
	jobcard.jobcard_regiao = procurauser.regiao;
	jobcard.jobcard_cell = procurauser.telefone_1;
	// jobcard.jobcard_linemanager = procurauser.nome_supervisor;
	console.log("**************************************************************");
	console.log(jobcard.jobcard_departamento);
	console.log("**************************************************************");
	if (jobcard.jobcard_departamento == "Data Center") {
		jobcard.jobcard_linemanager = "Teresa Guimaraes"
	}else{
		jobcard.jobcard_linemanager = procurauser.nome_supervisor;
	}
	console.log("O novo line manager é "+jobcard.jobcard_linemanager);

	var procuracliente = await clientes.findOne({_id:jobcard.jobcard_clienteid}, {cliente_nome:1, cliente_filial:1, cliente_telefone:1}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	}).lean();

	jobcard.jobcard_clientenome = procuracliente.cliente_nome;
	jobcard.jobcard_clientebranch = procuracliente.cliente_filial;
	jobcard.jobcard_clientetelefone = procuracliente.cliente_telefone;



	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var todaydate = dia + "/" + mes + "/" + ano;
	jobcard.data_registojobcard1 = todaydate;

	jobcard.jobcard_loggedon = todaydate;
	jobcard.jobcard_controlador = [1];
	jobcard.jobcard_loggedby = userData.nome;

	var arrayintervenientes = [];
	arrayintervenientes.push(userData.nome);
	arrayintervenientes.push(jobcard.jobcard_tecniconome);
	arrayintervenientes.push(jobcard.jobcard_linemanager);

	jobcard.jobcard_controladorintervenientes = arrayintervenientes;

	var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

	var arrayaudittrail = [];
	var audittrailObject = {};

	audittrailObject.jobcard_audittrailname = userData.nome;
	audittrailObject.jobcard_audittrailaction = "Create Project";
	audittrailObject.jobcard_audittraildate = dia + "/" + mes + "/" + ano + "  " + todayhours;

	arrayaudittrail.push(audittrailObject);

	jobcard.jobcard_audittrail = arrayaudittrail;
	jobcard.jobcard_wait = "nao";


	var procuralinemanager = await model.findOne({nome:jobcard.jobcard_linemanager}, {telefone_1:1, email:1}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	}).lean();

	jobcard.jobcard_linemanagerid = procuralinemanager._id;
	jobcard.jobcard_linemanagercell = procuralinemanager.telefone_1;
	jobcard.jobcard_estadoactual = "New";
	jobcard.jobcard_workstatus = "";


	emailSender.createConnection();
	emailSender.sendEmailCreateProject(jobcard,procurauser, procuralinemanager);
	
	

	if(procura.length == 0){

		cont2 = cont6 + "/0001";
		cont1 = 1;

		jobcard.jobcard_cod = cont2;

		energiaprojects.gravarDados(jobcard, function(err, data){
			if(err){
				if(err.code == 11000){

					cont3 = parseInt(cont1) + 1;

					if(cont3 < 10){
						cont4 = cont6 + "/000" + cont3;
					}else 
						if((cont3 > 10) && (cont3 < 100) ){
							cont4 = cont6 + "/00" + cont3;
						}else
							if((cont3 > 100) && (cont3 < 1000) ){
								cont4 = cont6 + "/0" + cont3;
							}else{
								cont4 = cont6 + "/" + cont3;
							}

					jobcard.jobcard_cod = cont4;
					energiaprojects.gravarDados(jobcard, function(err, data){
						if(err){
							console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
							console.log(err); 
						}else{
							console.log("dados gravados com sucesso!!");
							res.redirect("/inicio");
						}
					});

				}else{

					console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
					console.log(err)
				}
			}else{
				console.log("Jobcard gravado com sucesso.");
				res.redirect("/inicio");
			}
		});

	}else{

		cont = procura[procura.length-1].jobcard_cod.split("/");
		cont1 = parseInt(cont[4]) + 1;

		if(cont1 < 10){
			cont2 = cont6 + "/000" + cont1;
		}else 
			if((cont1 > 10) && (cont1 < 100) ){
				cont2 = cont6 + "/00" + cont1;
			}else
				if((cont1 > 100) && (cont1 < 1000) ){
					cont2 = cont6 + "/0" + cont1;
				}else{
					cont2 = cont6 + "/" + cont1;
				}

		jobcard.jobcard_cod = cont2;

		energiaprojects.gravarDados(jobcard, function(err, data){
			if(err){
				if(err.code == 11000){

					cont3 = parseInt(cont1) + 1;

					if(cont3 < 10){
						cont4 = cont6 + "/000" + cont3;
					}else 
						if((cont3 > 10) && (cont3 < 100) ){
							cont4 = cont6 + "/00" + cont3;
						}else
							if((cont3 > 100) && (cont3 < 1000) ){
								cont4 = cont6 + "/0" + cont3;
							}else{
								cont4 = cont6 + "/" + cont3;
							}

					jobcard.jobcard_cod = cont4;
					energiaprojects.gravarDados(jobcard, function(err, data){
						if(err){
							console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
							console.log(err); 
						}else{
							console.log("dados gravados com sucesso!!");
							res.redirect("/inicio");
						}
					});

				}else{

					console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
					console.log(err)

				}
			}else{
				console.log("Jobcard gravado com sucesso.");
				res.redirect("/inicio");
			}
		});

	}

});

router.get('/jobcardprojectshome/complete', function(req, res) {

	var userData=req.session.usuario;
	var nome = userData.nome;
	var calljobcard = ["Project"];
	
	if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.nome == "Luis Brazuna") || (userData.nome == "David Nhantumbo") || (userData.nome == "Antonio Biquiza")){

		energiaprojects.find({ttnumber_status:"Complete"}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				energiaprojects.countDocuments({ttnumber_status:"Complete"}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
					}
				}).exec();
				
				
			}
		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();

	}else{

		energiaprojects.find({ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				energiaprojects.countDocuments({ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("jobcardsenergia_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
					}
				}).exec();
			}

		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
	}
});


router.post("/aprovarttnumberproject",  upload.any(), async function(req, res){
	var userData= req.session.usuario;
	var jobcard = req.body;
	console.log(jobcard);
	

	var geolocationJobcardInfo = [];

	var procuraproject = await energiaprojects.findOne({_id:jobcard.jobcard_id}, {jobcard_linemanagerid:1, jobcard_loggedby:1, jobcard_projectnumber:1, jobcard_tecniconome:1, jobcard_site:1}, function(err,dataProject){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find Project")

		}
	}).lean();

	if(procuraproject.jobcard_site != "" && !isNaN(procuraproject.jobcard_site)){
		var site= parseInt(procuraproject.jobcard_site);
		console.log(site)
		var procurasite = await siteinfos.findOne({siteinfo_sitenum:site}, {siteinfo_gps:1, siteinfo_sitename:1}, function(err,dataSiteInfo){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}else{
				console.log("Find Site Info")

			}
		}).lean();

		var geolocationJobcardInfo2 = {};

		if(procurasite.siteinfo_gps.length != 0){

			console.log('qual eh a cena ja')
			geolocationJobcardInfo2.jobcard_latitude = procurasite.siteinfo_gps[0].siteinfo_gpslatitude;
			geolocationJobcardInfo2.jobcard_longitude = procurasite.siteinfo_gps[0].siteinfo_gpslongitude;
			geolocationJobcardInfo.push(geolocationJobcardInfo2);

		}else{

			geolocationJobcardInfo2.jobcard_latitude = "";
			geolocationJobcardInfo2.jobcard_longitude = "";
			geolocationJobcardInfo.push(geolocationJobcardInfo2);

		}

	}else{

		var geolocationJobcardInfo2 = {};

		geolocationJobcardInfo2.jobcard_latitude = "";
		geolocationJobcardInfo2.jobcard_longitude = "";
		geolocationJobcardInfo.push(geolocationJobcardInfo2);

		var procurasite = {};
		procurasite.siteinfo_sitename = "";

	}
	// var geolocationJobcardInfo2 = {};
	// geolocationJobcardInfo2.jobcard_latitude = "";
	// geolocationJobcardInfo2.jobcard_longitude = "";
	// geolocationJobcardInfo.push(geolocationJobcardInfo2);

	var geolocationJobcardInfo1 = {};
	geolocationJobcardInfo1.jobcard_latitude = jobcard.geolocationlatitude;
	geolocationJobcardInfo1.jobcard_longitude = jobcard.geolocationlongitude;
	geolocationJobcardInfo.push(geolocationJobcardInfo1);


	jobcard.ttnumber_status = "In Progress";
	jobcard.jobcard_controlador = [1, 1];
	jobcard.jobcard_estadoactual = "On route";
	jobcard.jobcard_wait = "nao";


	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var todaydate = dia + "/" + mes + "/" + ano;
	var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

	var jobcard_audittrail = {};

	jobcard_audittrail.jobcard_audittrailname = userData.nome;
	if(jobcard.geomessage == ""){
		jobcard_audittrail.jobcard_audittrailaction = "Accept the jobcard";
	}else{
		jobcard_audittrail.jobcard_audittrailaction = "Accept the jobcard. " + jobcard.geomessage;
	}
	siteinfos
	jobcard_audittrail.jobcard_audittraildate = dia + "/" + mes + "/" + ano + "  " + todayhours;

	jobcard.jobcard_tecarrivaldate = todaydate;
	jobcard.jobcard_tecarrivaltime = todayhours;


	var procuralinemanager = await model.findOne({_id:procuraproject.jobcard_linemanagerid}, {idioma:1, email:1}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	}).lean();

	var procuracallcenter = await model.findOne({nome:procuraproject.jobcard_loggedby}, {idioma:1, email:1}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	}).lean();


	emailSender.createConnection();
	emailSender.sendEmailAceitarProjecto(procuraproject, procuralinemanager);
	emailSender.createConnection();
	emailSender.sendEmailAceitarProjecto(procuraproject, procuracallcenter);


	energiaprojects.findOneAndUpdate({_id:jobcard.jobcard_id},{$push:{jobcard_audittrail:jobcard_audittrail},$set:{data_ultimaactualizacaojobcard:new Date(),jobcard_wait:jobcard.jobcard_wait,jobcard_estadoactual:jobcard.jobcard_estadoactual,jobcard_tecarrivaldate:jobcard.jobcard_tecarrivaldate, jobcard_tecarrivaltime:jobcard.jobcard_tecarrivaltime, geolocationJobcardInfo:geolocationJobcardInfo,ttnumber_status:jobcard.ttnumber_status, jobcard_controlador:jobcard.jobcard_controlador}}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{

			console.log("Technician Accept the project");
			res.redirect("/inicio");
		}
	});

});

router.get("/detalhesMapaProject/:id",  function(req, res){
	var userData= req.session.usuario;

	energiaprojects.find({_id:req.params.id},{jobcard_controladorintervenientes:1,jobcard_jobtype:1, geolocationJobcardInfo:1, jobcard_site:1, jobcard_call:1,  jobcard_estadoactual:1}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("energia_viewmapa", {DataU:userData, Jobcards:data, DadosJobcards:JSON.stringify(data), title: 'EAGLEI'});
		}
	}).lean();

});


router.post("/updateinfoviagem",  upload.any(), async function(req, res){

	var userData= req.session.usuario;
	var jobcard = req.body;

	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var todaydate = dia + "/" + mes + "/" + ano;
	var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

	var jobcard_audittrail = {};

	jobcard_audittrail.jobcard_audittrailname = userData.nome;
	jobcard_audittrail.jobcard_audittrailaction = "Adicionada informação de viagem. Distância: " + jobcard.jobcard_traveldistance + "; Tempo de chegada estimado: " + jobcard.jobcard_travelduration + "; Data e hora estimada de chegada: " + jobcard.jobcard_estimadadatachegada + " " + jobcard.jobcard_estimahorachegada;
	jobcard_audittrail.jobcard_audittraildate = dia + "/" + mes + "/" + ano + "  " + todayhours;
	
	energiaprojects.updateOne({_id:jobcard.jobcard_id},{$push:{jobcard_audittrail:jobcard_audittrail},$set:{jobcard_traveldistance:jobcard.jobcard_traveldistance, jobcard_travelduration:jobcard.jobcard_travelduration, jobcard_traveldurationms:jobcard.jobcard_traveldurationms, jobcard_estimadadatachegadams:jobcard.jobcard_estimadadatachegadams, jobcard_estimadadatachegada:jobcard.jobcard_estimadadatachegada, jobcard_estimahorachegada:jobcard.jobcard_estimahorachegada}}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados" + err)
		}
		else{

			console.log("Add travel information");
			res.redirect("/inicio");
		}
	});


});


router.post("/updatechegadasiteproject",  upload.any(), async function(req, res){
	var userData= req.session.usuario;
	var jobcard = req.body;


	var geolocationJobcardInfo = {};
	geolocationJobcardInfo.jobcard_latitude = jobcard.geolocationlatitude;
	geolocationJobcardInfo.jobcard_longitude = jobcard.geolocationlongitude;


	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var todaydate = dia + "/" + mes + "/" + ano;

	var todayhours = new Date();
	var todaytime = todayhours.getHours() + ":" + todayhours.getMinutes();

	
	jobcard.jobcard_sitearrivaldate = todaydate;
	jobcard.jobcard_sitearrivaltime = todaytime;
	jobcard.jobcard_estadoactual = "On site";
	var maintenancedate = await new Date(todaydate.split('/').reverse().join('-'));


	var procuraproject = await energiaprojects.findOne({_id:jobcard.jobcard_id}, {jobcard_tecarrivaltime:1, jobcard_linemanagerid:1, jobcard_loggedby:1, jobcard_projectnumber:1, jobcard_tecniconome:1, jobcard_site:1}, function(err, data){
		if(err){
			console.log(err);
		   }else{
			console.log("Find Project");
		}
	}).lean();


	var jobcard_tecarrivaltime = procuraproject.jobcard_tecarrivaltime;

	var start = jobcard_tecarrivaltime;
	var end = todaytime;

	var jobcard_tecarrivalduration = diff(start, end);

	function diff(start, end) {
		start = start.split(":");
		end = end.split(":");
		var startDate = new Date(0, 0, 0, parseInt(start[0]), parseInt(start[1]), 0);
		var endDate = new Date(0, 0, 0, parseInt(end[0]), parseInt(end[1]), 0);
		var diff = endDate.getTime() - startDate.getTime();
		var hours = Math.floor(diff / 1000 / 60 / 60);
		diff -= hours * 1000 * 60 * 60;
		var minutes = Math.floor(diff / 1000 / 60);
		
		return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
	}
	

	var jobcard_audittrailObject = {};
	jobcard_audittrailObject.jobcard_audittrailname = userData.nome;
	if(jobcard.geomessage == ""){
		jobcard_audittrailObject.jobcard_audittrailaction = "Arrives on site";
	}else{
		jobcard_audittrailObject.jobcard_audittrailaction = "Arrives on site. " + jobcard.geomessage;
	}
	
	jobcard_audittrailObject.jobcard_audittraildate = dia + "/" + mes + "/" + ano + "  " + todaytime;

	var procuralinemanager = await model.findOne({_id:procuraproject.jobcard_linemanagerid}, {idioma:1, email:1}, function(err,dataUser){
		if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
		console.log("Find User")

		}
	}).lean();


		var procuracallcenter = await model.findOne({nome:procuraproject.jobcard_loggedby}, {idioma:1, email:1}, function(err,dataUser){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}else{
				console.log("Find User")

			}
		});


		emailSender.createConnection();
		emailSender.sendEmailChegadaProjecto(procuraproject,procuralinemanager);

		emailSender.createConnection();
		emailSender.sendEmailChegadaProjecto(procuraproject,procuracallcenter);
	
		energiaprojects.updateOne({_id:jobcard.jobcard_id},{$push:{jobcard_audittrail:jobcard_audittrailObject, geolocationJobcardInfo:geolocationJobcardInfo}, $set:{data_ultimaactualizacaojobcard:new Date(),jobcard_maintenancedate:maintenancedate,jobcard_estadoactual:jobcard.jobcard_estadoactual, jobcard_sitearrivaldate:jobcard.jobcard_sitearrivaldate, jobcard_sitearrivaltime:jobcard.jobcard_sitearrivaltime, jobcard_tecarrivalduration:jobcard_tecarrivalduration}}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			console.log("Technician arrived on site")
			res.redirect("/inicio");
		}
	});

});


// router.get("/detalhesSparesUsedJobcardProject/:idproject/:idtecnicosctock",  function(req, res){
// 	var userData= req.session.usuario;
// 	var referenciaproject = req.params.idproject;
// 	var referenciastockpessoal = req.params.idtecnicosctock;

// 	energiaprojects.findOne({_id:referenciaproject}, function(err,dataJobcard){
// 		if(err){
// 			console.log("ocorreu um erro ao tentar aceder os dados")
// 		}else{

// 			armazens.findOne({nome_ref:referenciastockpessoal}, function(err, dataArmazem){
// 				if(err){
// 					console.log("ocorreu um erro ao tentar aceder os dados")
// 				}else{

// 					spareusedinfos.find({}, function(err, dataSpareusedInfo){
// 						if(err){
// 							console.log("ocorreu um erro ao tentar aceder os dados" + err);
// 						}else{
// 							res.render("energia_detalhesSpareUsed", {DataU:userData, DadosSpareusedInfo:JSON.stringify(dataSpareusedInfo), DadosStockPessoal:JSON.stringify(dataArmazem), StockPessoal:dataArmazem, Projects:dataJobcard, DadosProjectos:JSON.stringify(dataJobcard),title: 'EAGLEI'});
// 						}
// 					});

					
// 				}
// 			});

// 		}
// 	});

	
// });

router.get("/detalhesSparesUsed/:idjobcard/:idtecnicosctock",  function(req, res){
	var userData= req.session.usuario;
	var referenciajobcard = req.params.idjobcard;
	var referenciastockpessoal = req.params.idtecnicosctock;

	energiaprojects.findOne({_id:referenciajobcard}, {jobcard_site:1, jobcard_jobtype:1, jobcard_call:1}, function(err,dataJobcard){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{

			armazens.find({nome_ref:referenciastockpessoal}, function(err, dataArmazem){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}else{
					if(dataArmazem.length != 0){

						var posicaoitemdisponivel = dataArmazem[0].disponibilidade.findIndex(x => x.disponivel != 0);
						// console.log(dataArmazem);

						spareusedinfos.find({spareusedinfo_site:dataJobcard.jobcard_site}, function(err, dataSpareusedInfo){
							if(err){
								console.log("ocorreu um erro ao tentar aceder os dados" + err);
							}else{
								
								res.render("energia_detalhesSpareUsed", {DataU:userData, posicaoitemdisponivel:posicaoitemdisponivel,DadosSpareusedInfo:JSON.stringify(dataSpareusedInfo), DadosStockPessoal:JSON.stringify(dataArmazem), StockPessoal:dataArmazem, Jobcard:dataJobcard,title: 'EAGLEI'});
							}
						}).lean();	
					}else{

						res.render("energia_detalhesSpareUsed", {DataU:userData, DadosStockPessoal:JSON.stringify(dataArmazem), StockPessoal:dataArmazem, Jobcard:dataJobcard,title: 'EAGLEI'});
					}
					
				}
			}).lean();
			
		}
	}).lean();

	
});

router.get('/detalhesPhotoProjects/:id', function(req,res){
	var userData= req.session.usuario;
	
	energiaprojects.find({_id:req.params.id}, {jobcardphotoinfo:1, jobcard_jobtype:1}, function(err, data){
		if(err){
			console.log('An error occurred while trying to access the data')
		}
		else{
			res.render('energiaprojects_photodetails', {DataU:userData, JobcardProjects:data, title:'EAGLEI'});
		}
	}).lean();
});


router.post('/updatephotoinfoProjects/:id', uploadprojects.any(), async function(req, res){
	var userData= req.session.usuario;
	var id = req.params.id;
	var jobcardphotoinfo = [];
	console.log(req.files);
	
	var directorio = "/EnergiaProjects_Photo/";

	if (req.files) {

		let comprimento = req.files.length;

		for (let i = 0; i < comprimento; i++) {
			jobcardphotoinfo.push((directorio + req.files[i].filename));
		}

	}

	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

	var procurajobcard = await energiaprojects.findOne({_id:id}, {jobcard_audittrail:1}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			console.log("Find jobcard");
		}
	}).lean();


	var arrAudit = procurajobcard.jobcard_audittrail;
	var lastaudittrail = arrAudit[arrAudit.length-1];

	if((lastaudittrail.jobcard_audittrailname == userData.nome) && (lastaudittrail.jobcard_audittrailaction == "Update Photos")){

	arrAudit[arrAudit.length-1].jobcard_audittraildate = dia + "/" + mes + "/" + ano + "  " + todayhours;

	}else{

	  var jobcard_audittrailObject = {};
	  // jobcard_audittrailObject._id = "";
	  jobcard_audittrailObject.jobcard_audittrailname = userData.nome;
	  jobcard_audittrailObject.jobcard_audittrailaction = "Update Photos";
	  jobcard_audittrailObject.jobcard_audittraildate = dia + "/" + mes + "/" + ano + "  " + todayhours;
	  arrAudit.push(jobcard_audittrailObject);
	}

	var jobcard_audittrail = arrAudit;

	await energiaprojects.findOneAndUpdate({_id:id}, {$push:{jobcardphotoinfo}});

	energiaprojects.updateOne({_id:id},{$set:{data_ultimaactualizacaojobcard:new Date(), jobcard_backofficeagent:userData.nome, jobcard_audittrail:jobcard_audittrail}}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			console.log("Photo Info done")
			res.redirect("/inicio");
		}
	});
});


router.get("/detalhesJobcardCallOutProject/:id",  function(req, res){
	var userData= req.session.usuario;
	var arrSite = [];

	energiaprojects.find({_id:req.params.id}, function(err, data){
		console.log(data)
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			
			clientes.find({},{cliente_nome:1, cliente_filial:1, cliente_telefone:1}, function(err, dataClientes){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}else{

					siteinfos.aggregate([{$group:{_id:"$siteinfo_clientid", sites:{$push:{numero:"$siteinfo_sitenum", ref:"$_id"}}}}], async function (err, dataSiteCliente) {
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{

							function compare( a, b ) {
								if ( a.numero < b.numero ){
									return -1;
								}
								if ( a.numero > b.numero ){
									return 1;
								}
								return 0;
						  	}
							

							for(var i = 0; i < dataSiteCliente.length; i++){

								dataSiteCliente[i].sites.sort(compare);

							}

							var posicaoclientesite = dataSiteCliente.findIndex(x => x._id == data[0].jobcard_clienteid);
							
							if(posicaoclientesite != -1){
								var exemplo= await Promise.all( dataSiteCliente[posicaoclientesite].sites.map(async function(y, i){
									arrSite[i] = y.numero;
								}));

							}
							
							energiaprojects.find({_id:{$ne:req.params.id}}, {jobcard_projectnumber:1}, function(err, dadosprojects){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{

									res.render("energia_viewdetails_project", {DataU:userData, DadosSiteArray:arrSite, DadosProjects:JSON.stringify(dadosprojects), DadosClientes:JSON.stringify(dataClientes), SiteCliente:JSON.stringify(dataSiteCliente), Clientes:dataClientes, NomeSession:userData.nome, Projects:data, title: 'EAGLEI'});
								}
							}).lean();
						}
					});

					
				}
			}).sort({cliente_nome:1}).lean();
		}
	}).lean();

});


router.post('/jobcardprojectshomenewpesquisa', async function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;
	var tthomecont = req.body;
	var controlador = tthomecont.pesquisador;
	

	energiaprojects.find({ttnumber_status:"New",$or:[{jobcard_projectnumber:controlador}, {jobcard_site:controlador}, {jobcard_tecniconome:controlador}, {jobcard_clientenome:controlador}, {jobcard_datacreated:controlador}, {jobcard_regiao:controlador}, {jobcard_estadoactual:controlador}]}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados" + err)
		}
		else{
			res.render("jobcardsenergia_home", {DataU:userData, Dadospesquisa:controlador, Projects:data, title: 'EAGLEI'});
		}
	}).sort({ data_ultimaactualizacaojobcard:-1 }).limit(100).lean();
 
});


router.post('/jobcardprojectshomeinprogresspesquisa', async function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;
	var tthomecont = req.body;
	var controlador = tthomecont.pesquisador;

	energiaprojects.find({ttnumber_status:"In Progress",$or:[{jobcard_projectnumber:controladornr}, {jobcard_site:controlador}, {jobcard_tecniconome:controlador}, {jobcard_clientenome:controlador}, {jobcard_datacreated:controlador}, {jobcard_regiao:controlador}, {jobcard_estadoactual:controlador}]}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados" + err)
		}
		else{
			res.render("jobcardsenergia_home", {DataU:userData, Dadospesquisa:controlador, Projects:data, title: 'EAGLEI'});
		}
	}).sort({ data_ultimaactualizacaojobcard:-1 }).limit(100).lean();
	
 
});


router.post('/jobcardprojectshomecompletepesquisa', async function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;
	var tthomecont = req.body;
	var controlador = tthomecont.pesquisador;

	energiaprojects.find({ttnumber_status:"Complete",$or:[{jobcard_projectnumber:controladornr}, {jobcard_site:controlador}, {jobcard_tecniconome:controlador}, {jobcard_clientenome:controlador}, {jobcard_datacreated:controlador}, {jobcard_regiao:controlador}, {jobcard_estadoactual:controlador}]}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados" + err)
		}
		else{
			res.render("jobcardsenergia_home", {DataU:userData, Dadospesquisa:controlador, Projects:data, title: 'EAGLEI'});
		}
	}).sort({ data_ultimaactualizacaojobcard:-1 }).limit(100).lean();

});


router.post("/sendforapprovalproject",  upload.any(), async function(req, res){
	var userData= req.session.usuario;
	var jobcard = req.body;

	jobcard.jobcard_controlador = [1,1,1];
	jobcard.jobcard_estadoactual = "Awaiting approval";
	
	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var todaydate = dia + "/" + mes + "/" + ano;
	var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

	var jobcard_audittrail = {};
	jobcard_audittrail.jobcard_audittrailname = userData.nome;
	jobcard_audittrail.jobcard_audittrailaction = "Send for approval";
	jobcard_audittrail.jobcard_audittraildate = todaydate + "  " + todayhours;


	var procura = await energiaprojects.findOne({_id:jobcard.jobcard_id}, {jobcard_linemanagerid:1, jobcard_projectnumber:1, jobcard_projectnumber:1, jobcard_tecniconome:1}, function(err, data){
		if(err){
			console.log(err);
		   }else{
			console.log("Find Jobcard");
		}
	}).lean();

var procurauser = await model.findOne({_id:procura.jobcard_linemanagerid}, {idioma:1, email:1}, function(err,dataUser){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}else{
		console.log("Find User")

	}
}).lean();


	emailSender.createConnection();
	emailSender.sendEmailSendJobcardAprrovalProject(procura,procurauser);
	
	energiaprojects.findOneAndUpdate({_id:jobcard.jobcard_id}, {$push:{jobcard_controladorintervenientes:userData.nome, jobcard_audittrail:jobcard_audittrail}, $set:{data_ultimaactualizacaojobcard:new Date() ,jobcard_estadoactual:jobcard.jobcard_estadoactual,jobcard_controlador:jobcard.jobcard_controlador}}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			
			res.redirect("/inicio");
		}
	});

});


router.post("/aprovarjobcardproject",  upload.any(), async function(req, res){
	var userData= req.session.usuario;
	var jobcard = req.body;
	jobcard.jobcard_estadoactual = "Approved";


	var procura = await energiaprojects.findOne({_id:jobcard.jobcard_id}, {jobcard_tecnicoid:1, jobcard_projectnumber:1, jobcard_linemanager:1, jobcard_projectnumber:1, jobcard_site:1}, function(err, data){
		if(err){
			console.log(err);
		   }else{
			console.log("Find Jobcard");
		}
	}).lean();

	var procurauser = await model.findOne({_id:procura.jobcard_tecnicoid}, {idioma:1, email:1}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	}).lean();

	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	  var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	  var ano = (new Date()).getFullYear();
	  var todaydate = dia + "/" + mes + "/" + ano;
	  var todayhours = new Date().getHours() + ":" + new Date().getMinutes();


	  var jobcard_audittrail = {};
	  jobcard_audittrail.jobcard_audittrailname = userData.nome;
	  jobcard_audittrail.jobcard_audittrailaction = "Job Card Approved";
	  jobcard_audittrail.jobcard_audittraildate = todaydate + "  " + todayhours;	  

		  emailSender.createConnection();
		emailSender.sendEmailSendJobcardApprovedProject(procura,procurauser);

		energiaprojects.findOneAndUpdate({_id:jobcard.jobcard_id},{$set:{data_ultimaactualizacaojobcard:new Date(), jobcard_estadoactual:jobcard.jobcard_estadoactual,ttnumber_status:jobcard.ttnumber_status}, $push:{jobcard_controlador:1, jobcard_audittrail:jobcard_audittrail}}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{
				//console.log(data);
				res.redirect("/inicio");
			}
		});
});

router.get("/detalhesDevolverJobcardProject/:id",  function(req, res){
	var userData= req.session.usuario;
	

	energiaprojects.find({_id:req.params.id}, {_id:1}, function(err, data){
		console.log(data)
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			console.log(data)
			res.render("jobcard_detalhesDevolverJobcard", {DataU:userData, Projects:data, DadosProjects:JSON.stringify(data), title: 'EAGLEI'});
			
		}
	}).lean();

});


router.get('/jobcardprojectshome/new/nextpage/:contador/:totalnr', function(req, res) {

	var userData=req.session.usuario;
	var nome = userData.nome;
	var contador = parseInt(req.params.contador) * 50;
	var incrementadr = parseInt(req.params.contador) + 1;
	console.log(contador)
	console.log(incrementadr)
	
	if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.nome == "Hamilton Sitoe") || (userData.nome == "Luis Brazuna") || (userData.nome == "Antonio Biquiza")){

		energiaprojects.find({ttnumber_status:"New"}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				res.render("jobcardprojects_home", {DataU:userData, dadostotalnr:parseInt(req.params.totalnr),dadoscontroladordecr:parseInt(req.params.contador),dadoscontroladorincr:incrementadr, Projects:data, title: 'EAGLEI'});
				
			}
		}).sort({data_ultimaactualizacaojobcard:-1}).skip(contador).limit(50).lean();

	}else{

		energiaprojects.find({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
			
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				// res.render("ttnumber_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, Jobcards:data, title: 'EAGLEI'});

				jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcaaards){

					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}
					else{

						energiaprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){

							if(err){
								console.log("ocorreu um erro ao tentar aceder os dados")
							}
							else{

								res.render("jobcardprojects_home", {DataU:userData, dadostotalnr:parseInt(req.params.totalnr), dadoscontroladordecr:parseInt(req.params.contador),dadoscontroladorincr:incrementadr, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcaaards), Projects:data, title: 'EAGLEI'});
							}

						}).lean();
						
					}

				}).lean();

			}

		}).sort({data_ultimaactualizacaojobcard:-1}).skip(contador).limit(50).lean();
	}
});


router.get('/jobcardprojectshome/new/previouspage/:contador/:totalnr', function(req, res) {

	var userData=req.session.usuario;
	var nome = userData.nome;
	var incrementadr = parseInt(req.params.contador) - 1;
	var contador = incrementadr * 50;
	
	console.log(contador)
	console.log(incrementadr)
	
	if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.nome == "Hamilton Sitoe") || (userData.nome == "Luis Brazuna") || (userData.nome == "Antonio Biquiza")){

		energiaprojects.find({ttnumber_status:"New"}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				res.render("jobcardprojects_home", {DataU:userData, dadostotalnr:parseInt(req.params.totalnr), dadoscontroladordecr:incrementadr, dadoscontroladorincr:parseInt(req.params.contador), Projects:data, title: 'EAGLEI'});
				
			}
		}).sort({data_ultimaactualizacaojobcard:-1}).skip(contador).limit(50).lean();

	}else{

		energiaprojects.find({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
			
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				// res.render("ttnumber_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, Jobcards:data, title: 'EAGLEI'});

				jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcaaards){

					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}
					else{

						energiaprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){

							if(err){
								console.log("ocorreu um erro ao tentar aceder os dados")
							}
							else{

								res.render("jobcardprojects_home", {DataU:userData, dadostotalnr:parseInt(req.params.totalnr), dadoscontroladordecr:incrementadr, dadoscontroladorincr:parseInt(req.params.contador), DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcaaards), Projects:data, title: 'EAGLEI'});
							}

						}).lean();
						
					}

				}).lean();

			}

		}).sort({data_ultimaactualizacaojobcard:-1}).skip(contador).limit(50).lean();
	}
	
});


router.get("/detalhesCallCenterCommentsProject/:id",  function(req, res){
	var userData= req.session.usuario;
	

	energiaprojects.find({_id:req.params.id}, {ttnumber_status:1}, function(err, data){
		console.log(data)
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{

			res.render("jobcard_detalhesCallCenterComments", {DataU:userData, Projects:data, title: 'EAGLEI'});
		}
	}).lean();

});


router.get("/detalhesAccaoPrioridadeProject/:id",  function(req, res){
	var userData= req.session.usuario;
	console.log('traa')
	
	energiaprojects.find({_id:req.params.id}, {_id:1, ttnumber_status:1}, function(err, data){
		console.log(data)
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			model.find({$or:[{nome_supervisor:userData.nome},{regiao_id:userData.regiao_id}]}, {nome:1}, function(err, dataUsuarios){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
					console.log(data)
					res.render("jobcard_accaoPrioridade_projects", {DataU:userData, Usuarios:dataUsuarios, Projects:data, title: 'EAGLEI'});
				}
			}).sort({nome:1}).lean();
		}
	}).lean();
});

module.exports=router;