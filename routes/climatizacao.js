var express = require('express');
var router = express.Router();
var admin_db=require("../entities/sisadmin");
var cliente_db=require("../entities/cliente");
var viaturas_db=require("../entities/oficina");
var users_db=require("../entities/usuario");
var hvac_db=require("../entities/hvac");
var hvac_dbprojects= require("../entities/hvac_projects")
var veiiculo_db= require("../entities/veiculo.js");
var clientes = require("../entities/cliente.js");
var cliente_hvac_db=require("../entities/cliente_hvac");
var armazem_db=require("../entities/armazem");
var stock_pessoal_db=require("../entities/stock_pessoal")
var emailSender=require('../util/sendEmail');
var clienteshvac = require("../entities/cliente_hvac.js");
var xlsxtojson = require("xlsx-to-json-lc");


var model = require('../entities/usuario');
var NodeGeocoder=require("node-geocoder");
var fs = require("fs");

const options = {
  provider: 'google',
 
  // Optional depending on the providers
  
  apiKey: 'AIzaSyAGI4PphO0TcAodia57tSsJXRSVlTAwNaU', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

//   const thhh =  geocoder.geocode('manduca, maputo, infulene');
//         console.log(thhh)

var multer = require('multer');
var path = require("path");
// var upload = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, './public/uploads/hvac');
//         },
//         filename: function(req, file, cb) {
//             cb(null, req.session.usuario.nome + "_" + Date.now() + path.extname(file.originalname));
//         }
//     })
// });

var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file,cb){
            cb(null, './public/Hvac/');
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname + "_"+Date.now() + file.originalname.replace(/ /g, "_"));
        }
    }) 
});

//details to upload maintenance plan
var storageplan = multer.diskStorage({ //multers disk storage settings
		destination: function (req, file, cb) {
			cb(null, './uploads/MaintenancePlan')
		},
		filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
		}
});

var uploaderplan = multer({ //multer settings
	storage: storageplan,
	fileFilter : function(req, file, callback) { //file filter
		if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
			return callback(new Error('Wrong extension type'));
		}
		callback(null, true);
	}
}).single('file');



router.get("/novo", async(req, res)=>{
        var userData= await req.session.usuario;
    var admin_case=await admin_db.find({});
    var clinet=await cliente_hvac_db.find({}).sort({nome_cliente:1});
    var hvacUsers=await users_db.find({departamento_id:userData.departamento_id}).sort({nome:1});
    var viaturd =await users_db.find({departamento_id:userData.departamento_id, matricula:{$ne:"SEM VEICULO"}}).sort({matricula:1});
    res.render("callout_form", {DataU:userData, AdMagen:admin_case, Clientes:clinet, Clientes1:JSON.stringify(clinet), Viaturas:viaturd, HvacUsers:hvacUsers,title:"eagleI"})

})


router.get("/novafilial/:camn", async(req, res)=>{
        var userData= await req.session.usuario;
    var admin_case=await admin_db.find({});
    var clinet=await cliente_hvac_db.find({_id:req.params.camn});
    
    var viaturd =await viaturas_db.find({}).sort({matricula:1});
    res.render("hvac_filial", {DataU:userData, AdMagen:admin_case, Clientes:clinet, title:"eagleI"})

})




// router.get("/criarcliente", async(req, res)=>{
//         var userData= await req.session.usuario;
//     var admin_case=await admin_db.find({});
//     var clinet=await cliente_db.find({});
//     var hvacUsers=await users_db.find({}).sort({nome:1});
//     var viaturd =await viaturas_db.find({}).sort({matricula:1});
//     var onJobcard = "true";
//     res.render("criar_cliente_hvac", {DataU:userData, AdMagen:admin_case, Signal:onJobcard,  title:"eagleI"})

// })
router.get("/criarcliente", async(req, res)=>{
    var userData= await req.session.usuario;
    var admin_case=await admin_db.find({});
    var clinet=await cliente_db.find({});
    var hvacUsers=await users_db.find({}).sort({nome:1});
    var viaturd =await viaturas_db.find({}).sort({matricula:1});
    var onJobcard = "true";
    console.log("criarcliente")
    res.render("criar_cliente_hvac", {DataU:userData, AdMagen:admin_case, Signal:onJobcard,  title:"eagleI"})

});


router.get('/jobcardprojectshome', async(req, res)=>{
    var userData = await req.session.usuario;
    var admin_case = await admin_db.find({});
    var client = await cliente_db.find({});
    var hvacUsers = await users_db.find({}).sort({nome:1});
    var viaturaId = await viaturas_db.find({}).sort({matricula:1});
    var nome = userData.nome;
    var userDepat = userData.departamente;
    var controladorfuncao = 0;

    if(userData.funcao == 'Tecnico' || userData.funcao == 'Asistant' || userData.funcao == 'Assistente'){
        controladorfuncao = 1;
    }else if(userData.funcao == 'regional_manager'){
        controladorfuncao = 2;
    }else if(userData.funcao == 'Regional Manager'){
        controladorfuncao = 3;
    }else if(userData.funcao == 'Call Center' || userData.funcao == 'Back Office' || userData.nivel_acesso == 'admin' || userData.funcao == 'IT Officer' || userData.funcao == 'comercial' || userData.funcao == ' Manager' && userData.departamento == 'Climatização e Electricidade'){
        controladorfuncao = 4;
    }else if(userData.nome == 'Guest'){
        controladorfuncao = 5;
    }else if(userData.funcao ==''){
        controladorfuncao = 6;
    }
    console.log(controladorfuncao);

    switch (controladorfuncao){
        case 1:
            countNew = await hvac_dbprojects.countDocuments({departamento_ref:'611e45e68cd71c1f48cf45bd', tecnico:nome, status:'new'}, function(err, newjobs){
                if(err){
                    console.log('Error with New projects ')
                }else {
                    console.log(newjobs + 'New Jobs')
                }
            }).lean();

            countInprogress = await hvac_dbprojects.countDocuments({departamento_ref:'611e45e68cd71c1f48cf45bd', tecnico:nome, status:'In Progress'}, function(err, inprogressjobs){
                if(err){
                    console.log('error with projects in progress');
                } else {
                    console.log(inprogressjobs + 'In progress Jobcards')
                }
            }).lean();

            countComplete = await hvac_dbprojects.countDocuments({departamento_ref:'611e45e68cd71c1f48cf45bd', tecnico:nome, status:'Complete'}, function(err, completejobs){
                if(err){
                    console.log('error with complete jobcards');
                } else {
                    console.log(completejobs + 'Complet Jobcars');
                }
            }).lean();
        break;

        case 2:
			countNew = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 3:
			countNew = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", jobcard_regiao:userData.regiao}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", jobcard_regiao:userData.regiao}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 4:
			countNew = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New"}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress"}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In progress");
				}
			}).lean();
							
			countComplete = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete"}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 5:
			countNew = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await hvac_dbprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;
	}

    res.render('hvac_projects', {DataU:userData,  AdMagen:admin_case, Clientes:client, Viaturas:viaturaId, HvacUsers:hvacUsers, title:"eagleI"})

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
	}else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "Manager")){
		controladorfuncao = 4;
	}else if(userData.nome == "Guest"){
		controladorfuncao = 5;
	};

	console.log(controladorfuncao);

	switch(controladorfuncao){
		case 1:
			hvac_dbprojects.find({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
		
					hvac_dbprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcards){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{
	
									hvac_dbprojects.countDocuments({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects1){
										if(err){
											console.log("ocorreu um erro ao tentar aceder os dados")
										}else{
	
											var total = dataProjects1;
											var totalcont = Math.ceil(total/50);
	
											res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcards), Projects:data, title: 'EAGLEI'});
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
			hvac_dbprojects.find({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
		
					hvac_dbprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcards){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{
	
									hvac_dbprojects.countDocuments({ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects1){
										if(err){
											console.log("ocorreu um erro ao tentar aceder os dados")
										}else{
	
											var total = dataProjects1;
											var totalcont = Math.ceil(total/50);
	
											res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcards), Projects:data, title: 'EAGLEI'});
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
			hvac_dbprojects.find({ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{

					hvac_dbprojects.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1}, function(err, dataJobcards){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{
	
									hvac_dbprojects.countDocuments({ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, dataProjects1){
										if(err){
											console.log("ocorreu um erro ao tentar aceder os dados")
										}else{
	
											var total = dataProjects1;
											var totalcont = Math.ceil(total/50);
	
											res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects), DadosJobcards:JSON.stringify(dataJobcards), Projects:data, title: 'EAGLEI'});
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
			hvac_dbprojects.find({ttnumber_status:"New"}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
	
					hvac_dbprojects.countDocuments({ttnumber_status:"New"}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							var total = dataProjects;
							var totalcont = Math.ceil(total/50);
							//console.log(totalcont)
	
							res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1,  Projects:data, title: 'EAGLEI'});
						}
	
					}).exec();
	
					
				}
			}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
		break;

		case 5:
			hvac_dbprojects.find({ttnumber_status:"New", jobcard_clientenome:"Vm,Sa"}, function(err, data){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
	
					hvac_dbprojects.countDocuments({ttnumber_status:"New", jobcard_clientenome:"Vm,Sa"}, function(err, dataProjects){
						if(err){
							console.log("ocorreu um erro ao tentar aceder os dados")
						}else{
	
							var total = dataProjects;
							var totalcont = Math.ceil(total/50);
							//console.log(totalcont)
	
							res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont,dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
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

		hvac_dbprojects.find({ttnumber_status:"In Progress"}, async function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{
				
				var dataJobcaaards = await jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1});
				hvac_dbprojects.countDocuments({ttnumber_status:"In Progress"}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, DadosProjects:JSON.stringify(dataProjects),DadosJobcards:JSON.stringify(dataJobcaaards),  Projects:data, title: 'EAGLEI'});
					}
				}).exec();
				
				
			}
		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();

	}else{

		hvac_dbprojects.find({ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, async function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{
				var dataJobcaaards = await jobcards.find({ttnumber_status:"In Progress"}, {jobcard_sitedeparturedate:1, jobcard_tecniconome:1});
				hvac_dbprojects.countDocuments({ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont, dataJobcaaards, DadosProjects:JSON.stringify(dataProjects), dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
					}
				}).exec();
			}

		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();
	}
});


router.get('/jobcardprojectshome/complete', function(req, res) {

	var userData=req.session.usuario;
	var nome = userData.nome;
	var calljobcard = ["Project"];
	
	if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.nome == "Luis Brazuna") || (userData.nome == "David Nhantumbo") || (userData.nome == "Antonio Biquiza")){

		hvac_dbprojects.find({ttnumber_status:"Complete"}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				hvac_dbprojects.countDocuments({ttnumber_status:"Complete"}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
					}
				}).exec();
				
				
			}
		}).sort({data_ultimaactualizacaojobcard:-1}).limit(50).lean();

	}else{

		hvac_dbprojects.find({ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, data){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}
			else{

				hvac_dbprojects.countDocuments({ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, dataProjects){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{

						var total = dataProjects;
						var totalcont = Math.ceil(total/50);

						res.render("hvacprojects_home", {DataU:userData, dadostotalnr:totalcont, dadoscontroladordecr:0,dadoscontroladorincr:1, Projects:data, title: 'EAGLEI'});
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

			users_db.find({nivel_acesso:{$ne:"admin"} }, {nome:1}, function(err, dataUsuarios){
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

							hvac_dbprojects.find({},{jobcard_projectnumber:1}, function(err, dataJobcardsProjects){
								if(err){
									console.log("ocorreu um erro ao tentar aceder os dados")
								}else{

									res.render("hvacprojects_newform", {DataU:userData, SiteCliente:JSON.stringify(dataSiteCliente), AdMagen:admin_case, DadosClientes:JSON.stringify(dataClientes), DadosProjectos:JSON.stringify(dataJobcardsProjects),Clientes:dataClientes, Usuarios:dataUsuarios,title: 'EAGLEI'});
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
	
	
	var procura = await hvac_dbprojects.find({}, {jobcard_cod:1}, function(err, data){
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

		hvac_dbprojects.gravarDados(jobcard, function(err, data){
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
					hvac_dbprojects.gravarDados(jobcard, function(err, data){
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

		hvac_dbprojects.gravarDados(jobcard, function(err, data){
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
					hvac_dbprojects.gravarDados(jobcard, function(err, data){
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


router.get("/Clicorrectiva", async(req, res)=>{
        var userData= await req.session.usuario;
    var admin_case=await admin_db.find({});
    var clinet=await cliente_db.find({});
    var hvacUsers=await users_db.find({}).sort({nome:1});
    var viaturd =await viaturas_db.find({}).sort({matricula:1});
    var nome = userData.nome;
    var userDept = userData.departamento;
    var controladorfuncao = 0;
    console.log(userData.funcao + " do departamento " + userDept);

    if (userData.funcao == "Tecnico" || userData.funcao == "Assistant" || userData.funcao == "Assistente") {
        controladorfuncao = 1;
    }else if(userData.funcao == "regional_manager"){
        controladorfuncao = 2;
    }else if (userData.verificador_funcao == "Regional Manager") {
        controladorfuncao = 3;
    }else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "IT Officer") || (userData.funcao == "Commercial") || ((userData.funcao == "Manager") && (userData.departamento == "Climatização e Electricidade")) || (userData.nome == "Rogerio Galrito") ){
        controladorfuncao = 4;
    }else if(userData.nome == "Guest"){
        controladorfuncao = 5;
    }else if (userData.funcao == "Manager" && (userData.funcao == "Climatização e Electricidade")) {
        controladorfuncao = 6;
    }
    
    console.log(controladorfuncao);

    switch (controladorfuncao) {
        case 1:
            countNew = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", tecnico:nome, jobcard_jobtype:"Callout", status:"new"}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", tecnico:nome, jobcard_jobtype:"Callout", status:"In Progress"}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In Progress");
                }
            }).lean();
                            
            countComplete = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", tecnico:nome, jobcard_jobtype:"Callout", status:"Complete"}, function(err, completejobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
                } else {
                    console.log(completejobs + " jobcards Complete");
                }
            }).lean();

            // countEscalated = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $and:[{$or:[{ttnumber_status:"New"}, {jobcard_estadoactual:"On hold"}]}, {$or:[{jobcard_siteclassif:"CB"},{jobcard_siteclassif:"BB"},{jobcard_siteclassif:"RN"},{jobcard_siteclassif:"CL"},{jobcard_siteclassif:"DC"}]} ] ,jobcard_tecniconome:nome}, function(err, escalatedjobs){
            //     if (err) {
            //         console.log("Ocorreu um erro ao tentar contar os Callouts escalonados")
            //     } else {
            //         console.log(escalatedjobs + " jobcards escalados");
            //     }
            // }).lean();

        break;

        case 2:
            countNew = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In Progress");
                }
            }).lean();
                            
            countComplete = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, completejobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
                } else {
                    console.log(completejobs + " jobcards Complete");
                }
            }).lean();

            countEscalated = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_escalationlevel:{$exists:true} , $and:[{$or:[{jobcard_escalationlevel:"1"}, {jobcard_escalationlevel:"2"}]}, {$or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}]}, function(err, escalatedjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Escalated")
                } else {
                    console.log(escalatedjobs + " jobcards escalated");
                }
            }).lean();

        break;

        case 3:
            countNew = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_regiao:userData.regiao, jobcard_departamento:userDept}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", jobcard_regiao:userData.regiao, jobcard_departamento:userDept}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In Progress");
                }
            }).lean();
                            
            countComplete = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", jobcard_regiao:userData.regiao, jobcard_departamento:userDept}, function(err, completejobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
                } else {
                    console.log(completejobs + " jobcards Complete");
                }
            }).lean();

            countEscalated = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_regiao:userData.regiao, $and:[{$or:[{ttnumber_status:"New"}, {jobcard_estadoactual:"On hold"}]}, {$or:[{jobcard_siteclassif:"CB"},{jobcard_siteclassif:"BB"},{jobcard_siteclassif:"RN"},{jobcard_siteclassif:"CL"},{jobcard_siteclassif:"DC"}]} ]}, function(err, escalatedjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Escalados")
                } else {
                    console.log(escalatedjobs + " jobcards escalados");
                }
            }).lean();

        break;

        case 4:
            countNew = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", status:"new"}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", status:"In Progress"}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In progress");
                }
            }).lean();
                            
            countComplete = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", status:"Complete"}, function(err, completejobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
                } else {
                    console.log(completejobs + " jobcards Complete");
                }
            }).lean();

            // countEscalated = await jobcards.countDocuments({jobcard_jobtype:"Callout", $and:[{$or:[{ttnumber_status:"New"}, {jobcard_estadoactual:"On hold"}]}, {$or:[{jobcard_siteclassif:"CB"},{jobcard_siteclassif:"BB"},{jobcard_siteclassif:"RN"},{jobcard_siteclassif:"CL"},{jobcard_siteclassif:"DC"}]} ] }, function(err, escalatedjobs){
            //     if (err) {
            //         console.log("Ocorreu um erro ao tentar contar os Callouts Escalados")
            //     } else {
            //         console.log(escalatedjobs + " jobcards escalados");
            //     }
            // }).lean();

        break;

        case 5:
            countNew = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In Progress");
                }
            }).lean();
                            
            countComplete = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, completejobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
                } else {
                    console.log(completejobs + " jobcards Complete");
                }
            }).lean();

            countEscalated = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_escalationlevel:"1"}, {jobcard_escalationlevel:"2"}], jobcard_clientenome: "Vm,Sa"}, function(err, escalatedjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Escalados")
                } else {
                    console.log(escalatedjobs + " jobcards escalados");
                }
            }).lean();

        break;

        case 6:
            countNew = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", status:"new"}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", status:"In Progress"}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In progress");
                }
            }).lean();
                            
            countComplete = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", status:"Complete"}, function(err, completejobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
                } else {
                    console.log(completejobs + " jobcards Complete");
                }
            }).lean();

            // countEscalated = await jobcards.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_escalationlevel:"1"}, {jobcard_escalationlevel:"2"}], jobcard_departamento:userDept}, function(err, escalatedjobs){
            //     if (err) {
            //         console.log("Ocorreu um erro ao tentar contar os Callouts Escalados")
            //     } else {
            //         console.log(escalatedjobs + " jobcards escalados");
            //     }
            // }).lean();

        break;

    }

    res.render("hvac_options_correc", {DataU:userData, AdMagen:admin_case, Clientes:clinet, Viaturas:viaturd, HvacUsers:hvacUsers, CountNew:countNew, CountInprogress:countInprogress, CountComplete:countComplete, title:"eagleI"})

})


// router.get("/preventhvac", async(req, res)=>{
//         var userData= await req.session.usuario;
//     var admin_case=await admin_db.find({});
//     var clinet=await cliente_db.find({});
//     var hvacUsers=await users_db.find({}).sort({nome:1});
//     var viaturd =await viaturas_db.find({}).sort({matricula:1});
//     var nome = userData.nome;

//     var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
// 	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
// 	var ano = (new Date()).getFullYear();
// 	var datactual = dia + "/" + mes + "/" + ano;

//     if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
//     	var countNewhoje = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance", tecnico:nome, jobcard_planneddate:datactual}, function(err, newhojejobs){});
//     	var countNew = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance", tecnico:nome});
//     	var countInprogress = await hvac_db.countDocuments({status:"In Progress", jobcard_jobtype:"Preventative Maintenance", tecnico:nome});
//     	var countComplete = await hvac_db.countDocuments({status:"Complete", jobcard_jobtype:"Preventative Maintenance", tecnico:nome});

//     }else if ((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin") {
//     	var countNewhoje = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance", jobcard_planneddate:datactual});
//     	var countNew = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance"});
//     	var countInprogress = await hvac_db.countDocuments({status:"In Progress", jobcard_jobtype:"Preventative Maintenance"});
//     	var countComplete = await hvac_db.countDocuments({status:"Complete", jobcard_jobtype:"Preventative Maintenance"});
//     }
    
//     res.render("hvac_option_prevent", {DataU:userData, AdMagen:admin_case, CountNewhoje:countNewhoje, CountNew:countNew, CountInprogress:countInprogress, CountComplete:countComplete, Clientes:clinet, Viaturas:viaturd, HvacUsers:hvacUsers,title:"eagleI"})

// });

router.get("/preventhvac", async(req, res)=>{
        var userData= await req.session.usuario;
    var admin_case=await admin_db.find({});
    var clinet=await cliente_db.find({});
    var hvacUsers=await users_db.find({}).sort({nome:1});
    var viaturd =await viaturas_db.find({}).sort({matricula:1});
    var nome = userData.nome;

    var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var datactual = dia + "/" + mes + "/" + ano;

    if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
    	var countNewhoje = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance", tecnico:nome, jobcard_planneddate:datactual}, function(err, newhojejobs){});
    	var countNew = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance", tecnico:nome});
    	var countInprogress = await hvac_db.countDocuments({status:"In Progress", jobcard_jobtype:"Preventative Maintenance", tecnico:nome});
    	var countComplete = await hvac_db.countDocuments({status:"Complete", jobcard_jobtype:"Preventative Maintenance", tecnico:nome});

    }else if ((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin") {
    	var countNewhoje = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance", jobcard_planneddate:datactual});
    	var countNew = await hvac_db.countDocuments({status:"new", jobcard_jobtype:"Preventative Maintenance"});
    	var countInprogress = await hvac_db.countDocuments({status:"In Progress", jobcard_jobtype:"Preventative Maintenance"});
    	var countComplete = await hvac_db.countDocuments({status:"Complete", jobcard_jobtype:"Preventative Maintenance"});
    }
    
    res.render("hvac_option_prevent", {DataU:userData, AdMagen:admin_case, CountNewhoje:countNewhoje, CountNew:countNew, CountInprogress:countInprogress, CountComplete:countComplete, Clientes:clinet, Viaturas:viaturd, HvacUsers:hvacUsers,title:"eagleI"})

});


// router.get("/prevent/newhoje", async function(req, res){
// 	var userData = req.session.usuario;
// 	var nome = userData.nome;

// 	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
// 	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
// 	var ano = (new Date()).getFullYear();
// 	var datactual = dia + "/" + mes + "/" + ano;

// 	var carregadoprogress = await hvac_db.find({status:"In Progress", tecnico_ref:userData._id});

// 	if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
// 		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new", tecnico:nome, jobcard_planneddate:datactual}, function(err, data){
// 			if (err) {
// 				console.log("Não conseguiu encontrar as manutenções de HVAC");
// 			} else {
// 				console.log("Apanhou as cenas");
// 				for (var i = 0; i < data.length; i++) {
// 					carregado2[i] = "true";
// 				}
// 				res.render("hvac_preventhome", {DataU:userData, carregado2:carregado2, HvacInprogress:JSON.stringify(carregadoprogress), HvacJobs:data, title:"EagleI"});
// 			}
// 		});
	
// 	}else if((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin"){
// 		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new", jobcard_planneddate:datactual}, function(err, data){
// 			if (err) {
// 				console.log("Não conseguiu encontrar as manutenções de HVAC");
// 			} else {
// 				console.log("Apanhou as cenas");
// 				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
// 			}
// 		});
// 	}
	
// });

router.get("/prevent/newhoje", async function(req, res){
	var userData = req.session.usuario;
	var nome = userData.nome;
	var carregado2 = [];

	var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
	var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
	var ano = (new Date()).getFullYear();
	var datactual = dia + "/" + mes + "/" + ano;

	var carregadoprogress = await hvac_db.find({status:"In Progress", tecnico_ref:userData._id});

	if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new", tecnico:nome, jobcard_planneddate:datactual}, function(err, data){
			if (err) {
				console.log("Não conseguiu encontrar as manutenções de HVAC");
			} else {
				console.log("Apanhou as cenas");
				for (var i = 0; i < data.length; i++) {
					carregado2[i] = "true";
				}
				res.render("hvac_preventhome", {DataU:userData, carregado2:carregado2, HvacInprogress:JSON.stringify(carregadoprogress), HvacJobs:data, title:"EagleI"});
			}
		});
	
	}else if((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin"){
		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new", jobcard_planneddate:datactual}, function(err, data){
			if (err) {
				console.log("Não conseguiu encontrar as manutenções de HVAC");
			} else {
				console.log("Apanhou as cenas");
				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
			}
		});
	}
	
});

// router.get("/prevent/new", async function(req, res){
// 	var userData = req.session.usuario;
// 	var nome = userData.nome;
// 	var carregado2 = [];

// 	var carregadoprogress = await hvac_db.find({status:"In Progress", tecnico_ref:userData._id});

// 	if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
// 		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new", tecnico:nome}, function(err, data){
// 			if (err) {
// 				console.log("Não conseguiu encontrar as manutenções de HVAC");
// 			} else {
// 				console.log("Apanhou as cenas");
// 				for (var i = 0; i < data.length; i++) {
// 					carregado2[i] = "true";
// 				}
// 				res.render("hvac_preventhome", {DataU:userData, carregado2:carregado2, HvacInprogress:JSON.stringify(carregadoprogress), HvacJobs:data, title:"EagleI"});
// 			}
// 		});
	
// 	}else if((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin"){
// 		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new"}, function(err, data){
// 			if (err) {
// 				console.log("Não conseguiu encontrar as manutenções de HVAC");
// 			} else {
// 				console.log("Apanhou as cenas");
// 				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
// 			}
// 		});
// 	}
	
// });

router.get("/prevent/new", async function(req, res){
	var userData = req.session.usuario;
	var nome = userData.nome;
	var carregado2 = [];

	var carregadoprogress = await hvac_db.find({status:"In Progress", tecnico_ref:userData._id});

	if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new", tecnico:nome}, function(err, data){
			if (err) {
				console.log("Não conseguiu encontrar as manutenções de HVAC");
			} else {
				console.log("Apanhou as cenas");
				for (var i = 0; i < data.length; i++) {
					carregado2[i] = "true";
				}
				res.render("hvac_preventhome", {DataU:userData, carregado2:carregado2, HvacInprogress:JSON.stringify(carregadoprogress), HvacJobs:data, title:"EagleI"});
			}
		});
	
	}else if((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin"){
		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"new"}, function(err, data){
			if (err) {
				console.log("Não conseguiu encontrar as manutenções de HVAC");
			} else {
				console.log("Apanhou as cenas");
				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
			}
		});
	}
	
});

// router.get("/prevent/inprogress", function(req, res){
// 	var userData = req.session.usuario;
// 	var nome = userData.nome;

// 	if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
// 		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"In Progress", tecnico:nome}, function(err, data){
// 			if (err) {
// 				console.log("Não conseguiu encontrar as manutenções de HVAC");
// 			} else {
// 				console.log("Apanhou as cenas");
// 				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
// 			}
// 		});
	
// 	}else if((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin"){
// 		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"In Progress"}, function(err, data){
// 			if (err) {
// 				console.log("Não conseguiu encontrar as manutenções de HVAC");
// 			} else {
// 				console.log("Apanhou as cenas");
// 				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
// 			}
// 		});
// 	}

// });

router.get("/prevent/inprogress", function(req, res){
	var userData = req.session.usuario;
	var nome = userData.nome;

	if (userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Tecnico" || userData.funcao == "Assistente" || userData.funcao == "Assistant")) {
		hvac_db.find({jobcard_jobtype:"Preventative Maintenance", status:"In Progress", tecnico:nome}, function(err, data){
			if (err) {
				console.log("Não conseguiu encontrar as manutenções de HVAC");
			} else {
				console.log("Apanhou as cenas");
				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
			}
		});
	
	}else if((userData.departamento_id == "611e45e68cd71c1f48cf45bd" && (userData.funcao == "Manager" || userData.funcao == "Commercial")) || userData.nivel_acesso == "admin"){
		hvac_db.find({jobcard_jobtype:"Preventative Maintenance",status:"In Progress"}, function(err, data){
			if (err) {
				console.log("Não conseguiu encontrar as manutenções de HVAC");
			} else {
				console.log("Apanhou as cenas");
				res.render("hvac_preventhome", {DataU:userData, HvacJobs:data, title:"EagleI"});
			}
		});
	}

});

// router.get("/prevent/complete", async function(req, res){
// 	var userData = req.session.usuario;
// 	var nome = userData.nome;

// 	if (userData.funcao == "Tecnico" || userData.funcao == "Assistant" || userData.funcao == "Assistente") {
//         controladorfuncao = 1;
//     }else if(userData.funcao == "regional_manager"){
//         controladorfuncao = 2;
//     }else if (userData.verificador_funcao == "Regional Manager") {
//         controladorfuncao = 3;
//     }else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "IT Officer") || (userData.funcao == "Commercial") || ((userData.funcao == "Manager") && (userData.departamento == "Climatização e Electricidade")) || (userData.nome == "Rogerio Galrito") ){
//         controladorfuncao = 4;
//     }else if(userData.nome == "Guest"){
//         controladorfuncao = 5;
//     }else if (userData.funcao == "Manager" && (userData.funcao == "Climatização e Electricidade")) {
//         controladorfuncao = 6;
//     }

// 	var admin_case=await admin_db.find({});
//     if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
//         var carregado=await hvac_db.find({status:"Complete", jobcard_jobtype:"Preventative Maintenance"}).limit(100).sort({data_criacao:-1});
//         res.render("hvac_complete_correct", {DataU:userData, count: controladorfuncao, HvacJobs:carregado ,title:"eagleI"})
//     }
//     else{
//         var carregado=await hvac_db.find({status:"Complete", jobcard_jobtype:"Preventative Maintenance", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100);
//         let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
//             let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


//         var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
//         var carregado2=await [];
//         await Promise.all( carregado.map(async(este, ii)=>{
//             if(este.viatura){
//             let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
//             console.log(gyu)
            
//             if(gyu.length>0)
//                 carregado2[ii]=await "true"
//             else
//                 carregado2[ii]=await "false"
//             }
//             else

//             carregado2[ii]=await "false"
//         }));

//         res.render("hvac_preventcomplete", {DataU:userData, count: controladorfuncao, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

//     }

// });

router.get("/prevent/complete", async function(req, res){
	var userData = req.session.usuario;
	var nome = userData.nome;

	if (userData.funcao == "Tecnico" || userData.funcao == "Assistant" || userData.funcao == "Assistente") {
        controladorfuncao = 1;
    }else if(userData.funcao == "regional_manager"){
        controladorfuncao = 2;
    }else if (userData.verificador_funcao == "Regional Manager") {
        controladorfuncao = 3;
    }else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "IT Officer") || (userData.funcao == "Commercial") || ((userData.funcao == "Manager") && (userData.departamento == "Climatização e Electricidade")) || (userData.nome == "Rogerio Galrito") ){
        controladorfuncao = 4;
    }else if(userData.nome == "Guest"){
        controladorfuncao = 5;
    }else if (userData.funcao == "Manager" && (userData.funcao == "Climatização e Electricidade")) {
        controladorfuncao = 6;
    }

	var admin_case=await admin_db.find({});
    if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
        var carregado=await hvac_db.find({status:"Complete", jobcard_jobtype:"Preventative Maintenance"}).limit(100).sort({data_criacao:-1});
        res.render("hvac_complete_correct", {DataU:userData, count: controladorfuncao, HvacJobs:carregado ,title:"eagleI"})
    }
    else{
        var carregado=await hvac_db.find({status:"Complete", jobcard_jobtype:"Preventative Maintenance", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100);
        let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
            let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


        var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
        var carregado2=await [];
        await Promise.all( carregado.map(async(este, ii)=>{
            if(este.viatura){
            let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
            console.log(gyu)
            
            if(gyu.length>0)
                carregado2[ii]=await "true"
            else
                carregado2[ii]=await "false"
            }
            else

            carregado2[ii]=await "false"
        }));

        res.render("hvac_preventcomplete", {DataU:userData, count: controladorfuncao, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

    }

});

router.post('/uploadplanhvac', async function(req, res) {
		console.log("Carregamento plano");
		var userData=req.session.usuario;
		var exceltojson;
		uploaderplan(req,res,function(err){
			if(err){
				 res.json({error_code:1,err_desc:err});
				 return;
			}
			/** Multer gives us file info in req.file object */
			if(!req.file){
				res.json({error_code:1,err_desc:"No file passed"});
				return;
			}
			/** Check the extension of the incoming file and 
			 *  use the appropriate module
			 */
			if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
				exceltojson = xlsxtojson;
			} else {
				exceltojson = xlstojson;
			}
			console.log(req.file.path);
			try {
				exceltojson({
					input: req.file.path,
					output: null, //since we don't need output.json
					sheet:"Data",
					lowerCaseHeaders:true
				}, async function(err,result){
					if(err) {
						return res.json({error_code:1,err_desc:err, data: null});
					}
					else{
						var posicaodados, cont, cont1, cont2, cont3, cont4, cont6, cont7, cont8, cont9;

						var teste = await hvac_db.find({jobcard_jobtype:"Preventative Maintenance"}, {_id:1, jobcard_cod:1}, function(err, data){
							if(err){
								console.log(err);
							}else{
							
								console.log("done");
							}
						});
						console.log(teste.length);
								
						if(teste.length == 0){

							
							cont1 = 0;
							for (var i = 0, j = result.length; i < j; i++) {
								if(result[i].cliente != ""){
								
								var jobcard = {};
								// console.log()
								//planed date details
								jobcard.jobcard_planneddate=result[i].data;
								jobcard.data_inicio = result[i].data;
								jobcard.razao = "Tarefa Planeada";
								jobcard.status= "new";

								// generate key
								var planneddate = result[i].data.split('/');
								var dia = parseInt(planneddate[0]);
								var mes = parseInt(planneddate[1]);
								var year = (planneddate[2] + "").split("");
								var ano = year[2] + year[3];

								// console.log(dia, mes, year)

								//ms details
								var mes2 = parseInt(planneddate[1]) - 1;
								var ano2 = parseInt(planneddate[2]);
								var dataPlaneada2 = new Date(ano2, mes2, dia).getTime();
								// console.log(dataPlaneada2)
								jobcard.jobcard_planneddatems = dataPlaneada2;

								var cincodias = 86400000 * 5;
								var diaAntes = parseInt(dataPlaneada2) - cincodias;
								jobcard.jobcard_planneddate5beforems = diaAntes;

								var diaDepois = parseInt(dataPlaneada2) + cincodias;
								jobcard.jobcard_planneddate5afterms = diaDepois;

								cont6 = "CCP/" + mes + "/" + ano;
								cont7 = "CCP";
								 
								cont1 = cont1 + 1;
								// cont2 = cont6 + "/0001";

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

								//general details
								var busca =  await`${result[i].morada}, ${result[i].local}`;
								console.log({busca});
								const geoloc = await geocoder.geocode(busca);
								jobcard.jobcard_call= [];
								jobcard.jobcard_ttnumber= 0;
								jobcard.jobcard_departamento= "Climatização e Electricidade";
								jobcard.departamento= "Climatização e Electricidade";
								jobcard.jobcard_jobtype= "Preventative Maintenance";
								jobcard.jobcard_loggedby="Planned";
								jobcard.estadoactual="Planned";
								jobcard.prioridade = "Baixa";
								jobcard.jobcard_provincia=result[i].provincia;
								jobcard.local = result[i].local;
								jobcard.jobcard_datareporte="";
								jobcard.jobcard_horareporte="";
								jobcard.jobcard_loggedon="";
								jobcard.jobcard_quotacao="";
								jobcard.jobcard_razaoreprovar="";
								jobcard.jobcard_backofficeagent="";
								jobcard.wait="nao";
								jobcard.viatura="";
								jobcard.data_registojobcard1=result[i].data;
								jobcard.controlador=[1];
								jobcard.jobcard_travelinfo_proposito="";
								// jobcard.travelinfoArrayJobcard=[];
								// jobcard.generatorArrayJobcard=[];
								// jobcard.jobcard_credelecinfo=[];
								// jobcard.equipamentoArrayJobcard=[];
								// jobcard.cliente=result[i].cliente;
								// jobcard.jobcard_workstatus="";
								var geolocalizacao_array = [];
								var geolocalizacao_object = {};
								geolocalizacao_object.latitude = geoloc[0].latitude;
								geolocalizacao_object.longitude = geoloc[0].longitude;
								console.log({geolocalizacao_object});
								geolocalizacao_array.push(geolocalizacao_object);
								jobcard.geolocalizacao = geolocalizacao_array;

								var sitedetails = await cliente_hvac_db.find({nome_cliente:{$regex:result[i].cliente}}, {_id:1, nome_cliente:1, filial:1, pessoa_contactoArray:1, regiao:1, pessoa_contactoArray:1}, function(err, dataUser){
									 if(err){
										 console.log("erro ao tentar aceder a informação do cliente");
									}
									 else{ 
										 console.log("Cliente feito");
									 }
								});

								if (sitedetails[0] == undefined) {
									console.log("Nao encontrou nenhum cliente com esse nome");
									jobcard.cliente = result[i].cliente;
									jobcard.cliente_ref = "n/registado"
									jobcard.filial = result[i].filial;
									jobcard.filial_ref = cont2; // estou aquiiiiiiiiiiiiiii tenho tambem de colocar esse id no cliente 
								} else {
									console.log("Encontrou esse cliente "+result[i].cliente);
									console.log("Entao o cliente é "+ sitedetails[0].nome_cliente+ " e o id é "+sitedetails[0]._id);
									jobcard.cliente = sitedetails[0].nome_cliente;
									jobcard.cliente_ref = sitedetails[0]._id;
									jobcard.regiao = sitedetails[0].regiao;
									var filiais = sitedetails[0].filial;
									var pessoacontact = sitedetails[0].pessoa_contactoArray;
									if(result[i].filial == "" || result[i].filial == " "){
										console.log("Filial Vazia");
										jobcard.filial = sitedetails[0].filial[0].nome;
										jobcard.filial_ref = sitedetails[0].filial[0]._id;
										jobcard.provincia = sitedetails[0].filial[0].provincia;
										jobcard.provincia_ref = sitedetails[0].filial[0].provincia_ref;
										jobcard.pessoacontacto_nome = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_nome;
										jobcard.pessoacontacto_numero = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_numero;
									}else{
										if (filiais.length > 0) {
											for (var y = 0; y < filiais.length; y++) {
												if (filiais[y].nome == result[i].filial) {
													console.log("Encontrou a filial");
													jobcard.filial = filiais[y].nome;
													jobcard.filial_ref = filiais[y]._id;
													jobcard.provincia = filiais[y].provincia;
													jobcard.provincia_ref = filiais[y].provincia_ref;
													if (pessoacontact.length > 0) {
														for (var k = 0; k < pessoacontact.length; k++){
															if(pessoacontact[k].pessoacontacto_nome == result[i].pessoa_contacto){
																jobcard.pessoacontacto_nome = result[i].pessoa_contacto;
																jobcard.pessoacontacto_numero = pessoacontact[k].pessoacontacto_telefone;
															}else{
																jobcard.pessoacontacto_nome = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_nome;
																jobcard.pessoacontacto_numero = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_numero;
															}
														}
													}
												}else{
													console.log("Nao Encontrou a filial");
													jobcard.filial = sitedetails[0].filial[0].nome;
													jobcard.filial_ref = sitedetails[0].filial[0]._id;
													jobcard.provincia = sitedetails[0].filial[0].provincia;
													jobcard.provincia_ref = sitedetails[0].filial[0].provincia_ref;
													jobcard.pessoacontacto_nome = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_nome;
													jobcard.pessoacontacto_numero = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_numero;
												}
											}
										}
									}
								}


								if (result[i].provincia) {
									jobcard.jobcard_provincia = result[i].provincia;
								} else {
									jobcard.jobcard_provincia = "";
								}
									
								

								//tecnico details
								// var arrControladorintervenientes = ["Planned"]; *********

								jobcard.tecnico= result[i].tecnico;
								// arrControladorintervenientes.push(result[i].maintenanceofficer);

								var userdetails = await model.find({nome:result[i].tecnico},{_id:1, nome_supervisor:1, telefone_1:1, regiao:1}, function(err, dataUser){
									 if(err){
										 console.log("erro ao tentar aceder o utilizador!!");
									}
									 else{ 
										 console.log("Technician details done");
									 }
								});

								if(userdetails.length != 0 ){
									// arrControladorintervenientes.push(userdetails[0].nome_supervisor);
									// jobcard.jobcard_linemanager=userdetails[0].nome_supervisor;
									// jobcard.jobcard_cell=userdetails[0].telefone_1;
									// jobcard.jobcard_regiao= userdetails[0].regiao;
									jobcard.tecnico_ref = userdetails[0]._id;
								}else{
									// arrControladorintervenientes.push(userdetails[0].nome_supervisor);
									jobcard.tecnico_ref = "";
									// jobcard.jobcard_linemanager="";
									// jobcard.jobcard_cell="";
									// jobcard.jobcard_regiao= "";
								}

								// Assistentes

								var assistentesArray = await [];

								var assistente1 = await model.find({nome:result[i].assistente}, {_id:1, nome:1}, function(errooo, dataAssist1){
									if (errooo) {
										console.log("Ocorreu um erro ao importar o assistente 1");
									} else {
										console.log(`Apanhou o assistente`);
									}
								});

								if (assistente1.length != 0) {
									var assistenteObject = await {};
									assistenteObject.nome = await assistente1[0].nome;
									assistenteObject.referencia = await assistente1[0]._id;

									assistentesArray.push(assistenteObject);
								}

								var assistente2 = await model.find({nome:result[i].assistente2}, {_id:1, nome:1}, function(erroooooo, dataAssist2){
									if (erroooooo) {
										console.log("Ocorreu um erro ao importar o assistente 1");
									} else {
										console.log(`Apanhou o assistente`);
									}
								});

								if (assistente2.length != 0) {
									var assistenteObject = await {};
									assistenteObject.nome = await assistente2[0].nome;
									assistenteObject.referencia = await assistente2[0]._id;

									assistentesArray.push(assistenteObject);
								}

								jobcard.assistentes = await assistentesArray;
								// jobcard.jobcard_controladorintervenientes=arrControladorintervenientes;

								// var userlinemanager = await model.find({nome:jobcard.jobcard_linemanager}, function(err, dataUser){
								// 	 if(err){
								// 		 console.log("erro ao tentar aceder o utilizador!!");
								// 	}
								// 	 else{ 
								// 		 console.log("Technician details done");
								// 	 }
								// });

								// if(userlinemanager.length != 0 ){
									
								// 	jobcard.jobcard_linemanagerid=userlinemanager[0]._id;
								// 	jobcard.jobcard_linemanagercell=userlinemanager[0].telefone_1;
									
								// }else{
									
								// 	jobcard.jobcard_linemanagerid="";
								// 	jobcard.jobcard_linemanagercell="";
								// }

								// var procuracliente = await clientes.find({cliente_nome:"Vm,Sa"}, function(err, dataUser){
								// 	 if(err){
								// 		 console.log("erro ao tentar aceder o utilizador!!");
								// 	}
								// 	 else{ 
								// 		 console.log("Technician details done");
								// 	 }
								// });

								// // //client details
								// jobcard.jobcard_clientenome=procuracliente[0].cliente_nome;
								// jobcard.jobcard_clienteid=procuracliente[0]._id;
								// jobcard.jobcard_clientebranch="";
								// jobcard.jobcard_clientetelefone=procuracliente[0].cliente_telefone;     ********************

								// audit trail
								var jobcard_audittrailArray = [];
								var jobcard_audittrailObject = {};

								var diacarreg = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
								var mescarreg = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
								var anocarreg = (new Date()).getFullYear();
								var todaydatecarreg = diacarreg + "/" + mescarreg + "/" + anocarreg;
								var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

								jobcard.data_registojobcard1= todaydatecarreg;

								jobcard_audittrailObject.nome_ref = userData._id;
								jobcard_audittrailObject.nome = userData.nome;
								jobcard_audittrailObject.data = new Date();
								jobcard_audittrailObject.acao = "Carregamento do plano";

								jobcard_audittrailArray.push(jobcard_audittrailObject)
								jobcard.audit_trail = jobcard_audittrailArray;

								hvac_db.gravar_hvac(jobcard, function(err, data){
									if(err){
										console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
										console.log(err); 
									}else{
										console.log("Mazza")
										// console.log("dados gravados com sucesso!!");
										//res.redirect("/inicio");
									}
								});
								}

							}

						}else {
							cont = teste[teste.length-1].jobcard_cod.split("/");
							cont1 = parseInt(cont[3]);

							for (var i = 0, j = result.length; i < j; i++) {
								if(result[i].data != ""){
								
								var jobcard = {};

								//planed date details
								jobcard.jobcard_planneddate=result[i].data;
								jobcard.data_inicio = result[i].data;
								jobcard.razao = "Tarefa Planeada";

								jobcard.status= "new";

								// generate key
								var planneddate = result[i].data.split('/');
								var dia = planneddate[0];
								var mes = planneddate[1];
								var year = (planneddate[2] + "").split("");
								var ano = year[2] + year[3];

								//ms details
								var mes2 = parseInt(planneddate[1]) - 1;
								var ano2 = planneddate[2];
								var dataPlaneada2 = (new Date(ano2, mes2, dia).getTime());
								jobcard.jobcard_planneddatems = dataPlaneada2;

								var cincodias = 86400000 * 5;
								var diaAntes = parseInt(dataPlaneada2) - cincodias;
								jobcard.jobcard_planneddate5beforems = diaAntes;

								var diaDepois = parseInt(dataPlaneada2) + cincodias;
								jobcard.jobcard_planneddate5afterms = diaDepois;

								cont6 = "CCP/" + mes + "/" + ano;
								cont7 = "CCP";
								 
								cont1 = cont1 + 1;
								// cont2 = cont6 + "/0001";

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

								//general details
								var busca = await`${result[i].morada}, ${result[i].local}`;
								console.log({busca});
								const geoloc = await geocoder.geocode(busca);
								jobcard.jobcard_call= [];
								jobcard.jobcard_ttnumber= 0;
								jobcard.jobcard_departamento= result[i].departamento;
								jobcard.departamento = "Climatização e Electricidade";
								jobcard.jobcard_jobtype= "Preventative Maintenance";
								jobcard.jobcard_loggedby="Planned";
								jobcard.estadoactual="Planned";
								jobcard.prioridade = "Baixa";
								jobcard.jobcard_provincia=result[i].provincia;
								jobcard.local = result[i].local;
								jobcard.jobcard_datareporte="";
								jobcard.jobcard_horareporte="";
								jobcard.jobcard_loggedon="";
								jobcard.jobcard_quotacao="";
								jobcard.jobcard_razaoreprovar="";
								jobcard.jobcard_backofficeagent="";
								jobcard.wait="nao";
								jobcard.controlador=[1];
								jobcard.viatura="";
								jobcard.data_registojobcard1=result[i].data;
								jobcard.jobcard_travelinfo_proposito="";
								// jobcard.travelinfoArrayJobcard=[];
								// jobcard.generatorArrayJobcard=[];
								// jobcard.jobcard_credelecinfo=[];
								// jobcard.equipamentoArrayJobcard=[];
								// jobcard.sparesArrayJobcard=[];
								// jobcard.jobcard_workstatus="";
								var geolocalizacao_array = [];
								var geolocalizacao_object = {};
								geolocalizacao_object.latitude = geoloc[0].latitude;
								geolocalizacao_object.longitude = geoloc[0].longitude;
								console.log({geolocalizacao_object});
								geolocalizacao_array.push(geolocalizacao_object);
								jobcard.geolocalizacao = geolocalizacao_array;

								// console.log(result[i].basestationno)
								var sitedetails = await cliente_hvac_db.find({nome_cliente:{$regex:result[i].cliente}}, {_id:1, nome_cliente:1, filial:1, pessoa_contactoArray:1, regiao:1, pessoa_contactoArray:1}, function(err, dataUser){
									 if(err){
										 console.log("erro ao tentar aceder a informação do cliente");
									}
									 else{ 
										 console.log("Cliente feito");
									 }
								});

								if (sitedetails[0] == undefined) {
									console.log("Nao encontrou nenhum cliente com esse nome" + result[i].cliente);
									jobcard.cliente = result[i].cliente;
									jobcard.cliente_ref = "n/registado"
									jobcard.filial = result[i].filial;
									jobcard.filial_ref = cont2; // estou aquiiiiiiiiiiiiiii tenho tambem de colocar esse id no cliente 
								} else {
									console.log("Encontrou esse cliente "+result[i].cliente);
									console.log("Entao o cliente é "+ sitedetails[0].nome_cliente+ " e o id é "+sitedetails[0]._id);
									jobcard.cliente = sitedetails[0].nome_cliente;
									jobcard.cliente_ref = sitedetails[0]._id;
									jobcard.regiao = sitedetails[0].regiao;
									var filiais = sitedetails[0].filial;
									var pessoacontact = sitedetails[0].pessoa_contactoArray;
									if(result[i].filial == "" || result[i].filial == " "){
										console.log("Filial Vazia");
										jobcard.filial = sitedetails[0].filial[0].nome;
										jobcard.filial_ref = sitedetails[0].filial[0]._id;
										jobcard.provincia = sitedetails[0].filial[0].provincia;
										jobcard.provincia_ref = sitedetails[0].filial[0].provincia_ref;
										jobcard.pessoacontacto_nome = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_nome;
										jobcard.pessoacontacto_numero = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_numero;
									}else{
										if (filiais.length > 0) {
											for (var y = 0; y < filiais.length; y++) {
												if (filiais[y].nome == result[i].filial) {
													console.log("Encontrou a filial");
													jobcard.filial = filiais[y].nome;
													jobcard.filial_ref = filiais[y]._id;
													jobcard.provincia = filiais[y].provincia;
													jobcard.provincia_ref = filiais[y].provincia_ref;
													if (pessoacontact.length > 0) {
														for (var k = 0; k < pessoacontact.length; k++){
															if(pessoacontact[k].pessoacontacto_nome == result[i].pessoa_contacto){
																jobcard.pessoacontacto_nome = result[i].pessoa_contacto;
																jobcard.pessoacontacto_numero = pessoacontact[k].pessoacontacto_telefone;
															}else{
																jobcard.pessoacontacto_nome = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_nome;
																jobcard.pessoacontacto_numero = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_numero;
															}
														}
													}
												}else{
													console.log("Nao Encontrou a filial");
													jobcard.filial = sitedetails[0].filial[0].nome;
													jobcard.filial_ref = sitedetails[0].filial[0]._id;
													jobcard.provincia = sitedetails[0].filial[0].provincia;
													jobcard.provincia_ref = sitedetails[0].filial[0].provincia_ref;
													jobcard.pessoacontacto_nome = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_nome;
													jobcard.pessoacontacto_numero = sitedetails[0].pessoa_contactoArray[0].pessoacontacto_numero;
												}
											}
										}
									}
								}


								if (result[i].provincia) {
									jobcard.jobcard_provincia = result[i].provincia;
								} else {
									jobcard.jobcard_provincia = "";
								}
								
								//tecnico details
								// var arrControladorintervenientes = ["Planned"];

								jobcard.tecnico= result[i].tecnico;
								// arrControladorintervenientes.push(result[i].maintenanceofficer);

								var userdetails = await model.find({nome:result[i].maintenanceofficer}, {_id:1, nome_supervisor:1, telefone_1:1, regiao:1, pessoa_contactoArray:1}, function(err, dataUser){
									 if(err){
										 console.log("erro ao tentar aceder o utilizador!!");
									}
									 else{ 
										 console.log("Technician details done");
									 }
								});

								if(userdetails.length != 0 ){
									// arrControladorintervenientes.push(userdetails[0].nome_supervisor);
									// jobcard.jobcard_linemanager=userdetails[0].nome_supervisor;
									// jobcard.jobcard_cell=userdetails[0].telefone_1;
									// jobcard.jobcard_regiao= userdetails[0].regiao;
									jobcard.tecnico_ref = userdetails[0]._id;
								}else{
									// arrControladorintervenientes.push(userdetails[0].nome_supervisor);
									jobcard.tecnico_ref = "";
									// jobcard.jobcard_linemanager="";
									// jobcard.jobcard_cell="";
									// jobcard.jobcard_regiao= "";
								}

								

								// audit trail
								var jobcard_audittrailArray = [];
								var jobcard_audittrailObject = {};

								var diacarreg = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
								var mescarreg = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
								var anocarreg = (new Date()).getFullYear();
								var todaydatecarreg = diacarreg + "/" + mescarreg + "/" + anocarreg;
								var todayhours = new Date().getHours() + ":" + new Date().getMinutes();
								jobcard.data_registojobcard1= todaydatecarreg;

								jobcard_audittrailObject.nome_ref = userData._id;
								jobcard_audittrailObject.nome = userData.nome;
								jobcard_audittrailObject.data = new Date();
								jobcard_audittrailObject.acao = "Carregamento do plano";

								jobcard_audittrailArray.push(jobcard_audittrailObject)
								jobcard.audit_trail = jobcard_audittrailArray;

								hvac_db.gravar_hvac(jobcard, function(err, data){
									if(err){
										console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
										console.log(err); 
									}else{
										console.log("FOiiiiiii");
										// console.log("dados gravados com sucesso!!");
										//res.redirect("/inicio");
									}
								});

							  }

							}


						}
						
						



						res.redirect("/climatizacao/prevent/new");
					}
					
				});
			} catch (e){
				res.json({error_code:1,err_desc:"Corupted excel file"});
			}
		})
	   
});


router.get("/spareused/:id", async function(req, res){
    var userData= await req.session.usuario;
console.log(req.params.id);
    
    
 	
        users_db.find({}, function(rt, datta){
 			if(rt)
 				console.log("error ocurred on user database")
 			else
 			{ 
 				stock_pessoal_db.find({nome_ref:userData._id}, async function(ty, dattta){
 					if(ty)
 						console.log("error ocurred")
 					else
 					{
 						// console.log(data)
 						var carregado = await hvac_db.find({_id:req.params.id});
 						var item= await dattta.length>0? dattta[0].disponibilidade : [];
                         var items_bad= await dattta.length>0? dattta[0].disponibilidade_returned : [];
                         console.log("o problema nao esta aqui")
                         console.log(items_bad, item);
                         if(dattta.length>0)
                        var temporario=await dattta[0].disponibilidade? dattta[0].disponibilidade.filter((i)=>{ return i.disponivel!=0}):[];
                    else
                        var temporario=await [];
                        console.log(temporario);
 						res.render("hvac_use_spare", {DataU:userData,  Esconder:JSON.stringify(dattta), econtro:req.params.id, Jobcard:JSON.stringify(carregado), Items:item, Items_bad:items_bad,  title:"EagleI" })
 					}
 				}).sort({description_item:1})
 				
 			}

 		})
 		
 	
 


	
})

router.post("/spareusedo", upload.any(), async(req, res)=>{
    var userData=req.session.usuario;
    var actual=[];
    if(Array.isArray(req.body.referencia))
    await Promise.all(req.body.referencia.map(async(ob, i)=>{
        actual[i]=await {};
        actual[i].referencia=await req.body.referencia[i];
        actual[i].descricao=await req.body.item_nome[i];
        actual[i].quantidade=await req.body.quantidades[i];
    }))
else
    await Promise.all([23].map(async(ob, i)=>{
        actual[i]=await {};
        actual[i].referencia=await req.body.referencia[i];
        actual[i].descricao=await req.body.item_nome[i];
        actual[i].quantidade=await req.body.quantidades[i];
    }));


    await hvac_db.update({_id:req.body.econtro},{$set:{spares_usados:actual}});

    await actual.reduce(async(ac,obj, i)=>{
        var decremento_stockk= await parseFloat(obj.quantidade);
        var decremento_stock=await -1*decremento_stockk;
        await stock_pessoal_db.update({nome_ref:userData._id, disponibilidade:{$elemMatch:{referencia:obj.referencia}}}, {$inc:{"disponibilidade.$.disponivel":decremento_stock}})
    }, 0)

    res.json({feito:"feito"})

})


router.get("/detalhesassinaturahvacjobcard/:idjobcard",  function(req, res){
    var userData= req.session.usuario;
    var referenciajobcard = req.params.idjobcard;
    console.log(referenciajobcard)

    hvac_db.findOne({_id:referenciajobcard}, function(err,dataJobcard){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{

            res.render("teste_assinatura", {DataU:userData, Jobcard:dataJobcard,title: 'EAGLEI'});
            
        }
    }).lean();

    
});

router.post("/gravarassinaturahvacjobcard", upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var jobcard = req.body;
    var referenciajobcard = jobcard.jobcard_id;

 console.log(req.body)

    var audit_trailObject =  {};
    audit_trailObject.nome_ref=  userData._id;
    audit_trailObject.nome=  userData.nome;
    audit_trailObject.data=  new Date();
    audit_trailObject.acao=  "Assinatura do Cliente";
     console.log(audit_trailObject);

     hvac_db.updateOne({_id:referenciajobcard}, {$push:{audit_trail: audit_trailObject}, $set:{assinatura:req.body.chegou}}, function(err,data){
        if (err) {
            console.log("Ocorreu algum erro ao actualizar os dados");
        }else{
            console.log("Assinatura gravada com sucesso");
            res.redirect("climatizacao/correctivainprogress");
        }
    } )

});

router.post("/tomaraccaoprioridadesametecnico",  upload.any(), async function(req, res){

		var userData= req.session.usuario;
		var jobcard = req.body;

		var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
		var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
		var ano = (new Date()).getFullYear();
		var todaydate = dia + "/" + mes + "/" + ano;

		var todayhours = new Date();
		var todaytime = todayhours.getHours() + ":" + todayhours.getMinutes();


		var procurajobcard = await hvac_db.findOne({_id:jobcard.jobcard_id}, {cliente_ref:1, filial:1, tecnico_ref:1, jobcard_cod:1,  criado_por:1 }, function(err, data){
			if(err){
				console.log(err);
	   		}else{
				console.log("Find Jobcard");
			}
		}).lean();


		jobcard.jobcard_controlador = [1];
		
		jobcard.ttnumber_status = "new";
		jobcard.jobcard_estadoactual = "On hold";
		jobcard.jobcard_wait = "sim";
		jobcard.geolocationJobcardInfo = [];


		var audittrailObject = {};

		audittrailObject.nome_ref = userData._id;
		audittrailObject.nome = userData.nome;
		audittrailObject.data = new Date();
		audittrailObject.acao = "Jobcard posto em espera. Motivo: " + jobcard.jobcard_holdreason;

		if(procurajobcard.jobcard_siteid != ""){
			var procuracliente = await cliente_hvac_db.findOne({_id:procurajobcard.cliente_ref}, {nome_cliente:1}, function(err, data){
				if(err){
					console.log(err);
		   		}else{
					console.log("Find Jobcard");
				}
			}).lean();	
		}else{
			var procuracliente = {};
			procuracliente.siteinfo_sitename = "";

		}


		var procuratecnico = await model.findOne({_id:procurajobcard.tecnico_ref}, {email:1, idioma:1}, function(err,dataUser){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}else{
				console.log("Find User")

			}
		}).lean();
		// var mailrecip = [];
		// mailrecip.push(procuratecnico.email);

		// var procuracallcenter = await model.find({funcao:"Call Center"}, {email:1}, function(err,dataUser){
		// 	if(err){
		// 		console.log("ocorreu um erro ao tentar aceder os dados")
		// 	}else{
		// 		console.log("Find User")

		// 	}
		// }).lean();

		// for(var i=0; i<procuracallcenter.length; i++){
		// 	mailrecip.push(procuracallcenter[i].email);
		// }

		// if(procurajobcard.jobcard_jobtype == "Callout"){

		// 	emailSender.createConnection();
		// 	emailSender.sendEmailTecnicoJobWait(procurajobcard, procuracliente, jobcard.jobcard_holdreason, mailrecip);

		// }else{

		// 	emailSender.createConnection();
		// 	emailSender.sendEmailTecnicoJobWaitPlanned(procurajobcard, procuracliente, mailrecip, jobcard.jobcard_holdreason);
		// }

		
		console.log({audittrailObject});
		console.log("------")
		console.log(audittrailObject);
		hvac_db.updateOne({_id:jobcard.jobcard_id},{$set:{data_ultimaactualizacaojobcard:new Date(), status:jobcard.ttnumber_status, estadoactual:jobcard.jobcard_estadoactual,holdreason:jobcard.jobcard_holdreason,holdaction:jobcard.jobcard_holdaction, wait:jobcard.jobcard_wait, controlador:jobcard.jobcard_controlador},$unset:{jobcard_workstatus:"", healthsafety:"", hsreason:"", sitearrivaldate:""}, $push:{audit_trail:audittrailObject}}, function(err, data1){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados" + err)
			}
			else{

				console.log("Jobcard update");
			}

	});
		
});

router.post("/tomaraccaoprioridadedifftecnico",  upload.any(), async function(req, res){

		var userData= req.session.usuario;
		var jobcard = req.body;
		var assistentes = [];

		var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
		var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
		var ano = (new Date()).getFullYear();
		var todaydate = dia + "/" + mes + "/" + ano;

		var todayhours = new Date();
		var todaytime = todayhours.getHours() + ":" + todayhours.getMinutes();

		console.log("Diff tecnico");
		console.log(jobcard);
		var procurajobcard = await hvac_db.findOne({_id:jobcard.jobcard_id}, {tecnico:1, tecnico_ref:1, cliente_ref:1, jobcard_cod:1, cliente:1}, function(err, data){
			if(err){
				console.log(err);
	   		}else{
				console.log("Find Jobcard");
			}
		}).lean();

		//id do tecnico antigo
		var jobcard_tecniconomeantigo = procurajobcard.tecnico;
		var jobcard_tecnicoidantigo = procurajobcard.tecnico_ref;

		//procurar antigo tecnico
		var procuratecnico = await model.findOne({_id:jobcard_tecnicoidantigo}, {email:1, idioma:1}, function(err,dataUser){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}else{
				console.log("Find Old Technician")

			}
		}).lean();

		// procura novo tecnico
		var procurauser = await model.findOne({_id:jobcard.jobcard_tecnicoid1}, {nome:1, regiao:1, telefone_1:1, nome_supervisor:1, email:1, idioma:1}, function(err,dataUser){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados")
			}else{
				console.log("Find New Technician")

			}
		}).lean();

		jobcard.jobcard_tecniconome = procurauser.nome;
		jobcard.jobcard_regiao = procurauser.regiao;
		jobcard.jobcard_cell = procurauser.telefone_1;
		jobcard.jobcard_linemanager = procurauser.nome_supervisor;

		if (Array.isArray(jobcard.assistente)) {
			
			
			for(var i = 0; i < jobcard.assistente.length; i++){
				var assistenteObject = {};
				assistenteObject.nome = jobcard.assistente[i];
				assistenteObject.referencia = jobcard.referencia[i];
				assistentes.push(assistenteObject);
			}

		}


		jobcard.jobcard_controlador = [1];
		jobcard.status = "new";
		jobcard.jobcard_estadoactual = "On hold"
		jobcard.jobcard_wait = "sim";
		jobcard.geolocationJobcardInfo = [];

		// var procuralinemanager = await model.findOne({nome:procurauser.nome_supervisor}, {telefone_1:1, email:1}, function(err,dataUser){
		// 	if(err){
		// 		console.log("ocorreu um erro ao tentar aceder os dados")
		// 	}else{
		// 		console.log("Find User")

		// 	}
		// }).lean();

		// jobcard.jobcard_linemanagerid = procuralinemanager._id;
		// jobcard.jobcard_linemanagercell = procuralinemanager.telefone_1;


		var audittrailObject = {};

		audittrailObject.nome_ref = userData._id;
		audittrailObject.nome = userData.nome;
		audittrailObject.jobcard_audittrailname = userData.nome;
		audittrailObject.data = new Date();
		// audittrailObject.jobcard_audittrailaction = "Changed the technician " + jobcard_tecniconomeantigo + " by the technician " + jobcard.jobcard_tecniconome + ". Reason: " + jobcard.jobcard_holdreason;
		audittrailObject.acao = "A equipa do tecnico " + jobcard_tecniconomeantigo + " foi trocada pela equipa do técnico " + procurauser.nome + ". Razão: " + jobcard.jobcard_holdreason;


		// if(procurajobcard.jobcard_siteid != ""){
		// 	var procurasiteinfo = await siteinfos.findOne({_id:procurajobcard.jobcard_siteid}, {siteinfo_sitename:1}, function(err, data){
		// 		if(err){
		// 			console.log(err);
		//    		}else{
		// 			console.log("Find Site");
		// 		}
		// 	}).lean();	
		// }else{
		// 	var procurasiteinfo = {};
		// 	procurasiteinfo.siteinfo_sitename = "";

		// }

		// var procuracallcenter = await model.find({funcao:"Call Center"}, {idioma:1, email:1, nome:1, telefone_1:1}, function(err,dataUser){
		// 		if(err){
		// 			console.log("ocorreu um erro ao tentar aceder os dados")
		// 		}else{
		// 			console.log("Find User")

		// 		}
		// 	}).lean();

		// 	var mailrecip = [];
		// 	for(var i=0; i<procuracallcenter.length; i++){
		// 		mailrecip.push(procuracallcenter[i].email);
		// 	}

		// if(procurajobcard.jobcard_jobtype == "Callout"){

		// 	jobcard.jobcard_estadoactual = "On hold";

		// 	emailSender.createConnection();
		// 	//mandar para o tecnicoantigo
		// 	emailSender.sendEmailTecnicoChangeJobWait(procurajobcard, procurasiteinfo, procuratecnico, jobcard.jobcard_holdreason);
		// 	// mandar para o call center
		// 	emailSender.sendEmailCallCenterTecnicoChangeJobWait(procurajobcard, procurasiteinfo, procurauser, jobcard.jobcard_holdreason, mailrecip);
		// 	// mandar para o tecnico novo
		// 	procurajobcard.jobcard_tecniconome = procurauser.nome;
		// 	emailSender.sendEmailCreateTTNumber(procurajobcard, procurauser, procuralinemanager, procurasiteinfo);


		// }else{

		// 	if(procurajobcard.jobcard_estadoactual == "Planned"){
		// 		jobcard.jobcard_estadoactual = "Planned";
		// 	}else{
		// 		jobcard.jobcard_estadoactual = "On hold";
		// 	}

		// 	emailSender.createConnection();
		// 	//mandar para o tecnicoantigo
		// 	emailSender.sendEmailTecnicoChangeJobWaitPlanned(procurajobcard, procurasiteinfo, procuratecnico, jobcard.jobcard_holdreason);
		// 	//mandar para o tecnico novo
		// 	emailSender.sendEmailTecnicoReceiveNewJobPlanned(procurajobcard, procurauser, procuralinemanager, procurasiteinfo);

		// }


		hvac_db.updateOne({_id:jobcard.jobcard_id},{$set:{data_ultimaactualizacaojobcard:new Date(), holdreason:jobcard.jobcard_holdreason,holdaction:jobcard.jobcard_holdaction, wait:jobcard.jobcard_wait, tecnico_ref:jobcard.jobcard_tecnicoid1, tecnico:procurauser.nome, controlador:jobcard.jobcard_controlador, status:jobcard.status, estadoactual:jobcard.jobcard_estadoactual, assistentes:assistentes},$unset:{jobcard_traveldurationms:"",jobcard_travelduration:"",jobcard_traveldistance:"",jobcard_estimahorachegada:"", jobcard_estimadadatachegadams:"", jobcard_estimadadatachegada:"",jobcard_tecarrivaldate:"", jobcard_tecarrivaltime:"", jobcard_sitearrivaldate:"", jobcard_sitearrivaltime:"", jobcard_sitedeparturetime:"", jobcard_tecarrivalduration:"", jobcard_arrivaldepartureduration:"", jobcard_workstatus:"", jobcard_remedialaction:"", jobcard_healthsafety:"", jobcard_hsreason:"", jobcard_healthsafety:"", jobcard_estadoactual:"", sitearrivaldate:""}, $push:{audit_trail:audittrailObject}}, function(err, data1){
			if(err){
				console.log("ocorreu um erro ao tentar aceder os dados" + err)
			}
			else{

				console.log("Jobcard update");
			}

		});
		

	});

router.get("/detalhesAccaoPrioridade/:id",  function(req, res){
	var userData= req.session.usuario;
	
	console.log(req.params.id);
	hvac_db.find({_id:req.params.id}, {status:1}, function(err, data){
		if (err) {
			console.log("Ocorreu um erro ao tentar aceder à manutenção "+ err);
		} else {
			console.log(data);
			model.find({departamento_id:"611e45e68cd71c1f48cf45bd"}, {nome:1}, function(erro, dataUsuarios){
				if (erro) {
					console.log("Ocorreu um erro ao tentar aceder os dados");
				} else {
					console.log(dataUsuarios);
					res.render("hvac_accaoPrioridade", {DataU:userData, Usuarios:dataUsuarios, Jobcards:data, title:"EagleI"});
				}
			});
		}
	})	
});


// router.get("/correctivanew", async(req, res)=>{
//         var userData= await req.session.usuario;
        
//         // Se for o chefe do dept ou Comercial
//         var admin_case=await admin_db.find({});
//         if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
//             var carregado=await hvac_db.find({status:"new", jobcard_jobtype:"Callout"}).limit(100).sort({data_ultimaactualizacaojobcard:-1});
//             console.log("cheguei nesse ponyto")
//             console.log(userData);
//             res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})
//         }
//         else{
//             var carregado=await hvac_db.find({status:"new", jobcard_jobtype:"Callout", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100).sort({data_criacao:-1});
//             var carregadoprogress = await hvac_db.find({status:"In Progress", tecnico_ref:userData._id});
//             var diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
//             var messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


//                 var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
//                 var carregado2=await [];
//         await Promise.all( carregado.map(async(este, ii)=>{
        
//             if(este.viatura){
//                let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
//                console.log(gyu)
               
//              if(gyu.length>0)
//                 carregado2[ii]=await "true"
//             else
//             carregado2[ii]=await "false"
//             }
//             else

//             carregado2[ii]=await "false"
//         }))

//        // setTimeout (function(){console.log(carregado2)}, 2000);



//             res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado, carregado2:carregado2 , HvacInprogress:JSON.stringify(carregadoprogress), title:"eagleI"})

//         }

//     // res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})

// });

router.get("/correctivanew", async(req, res)=>{
        var userData= await req.session.usuario;
        
        // Se for o chefe do dept ou Comercial
        var admin_case=await admin_db.find({});
        if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
            var carregado=await hvac_db.find({status:"new", jobcard_jobtype:"Callout"}).limit(100).sort({data_ultimaactualizacaojobcard:-1});
            console.log("cheguei nesse ponyto")
            console.log(userData);
            res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})
        }
        else{
            var carregado=await hvac_db.find({status:"new", jobcard_jobtype:"Callout", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100).sort({data_criacao:-1});
            var carregadoprogress = await hvac_db.find({status:"In Progress", tecnico_ref:userData._id});
            var diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
            var messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


                var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
                var carregado2=await [];
        await Promise.all( carregado.map(async(este, ii)=>{
        
            if(este.viatura){
               let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
               console.log(gyu)
               
             if(gyu.length>0)
                carregado2[ii]=await "true"
            else
            carregado2[ii]=await "false"
            }
            else

            carregado2[ii]=await "false"
        }))

       // setTimeout (function(){console.log(carregado2)}, 2000);



            res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado, carregado2:carregado2 , HvacInprogress:JSON.stringify(carregadoprogress), title:"eagleI"})

        }

    // res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})

});


router.get("/mandarmail/:id", upload.any(), async function(req, res){

   var dataUser=req.session.usuario;
   // console.log(req.body)
  
  // relatt.nome_cliente=req.body.nome_cliente;

  
var datta=await hvac_db.findOne({_id:req.params.id})


// fs.convert(datta.assinatura, 'public\\images', 'out')
//     .then(result => {console.log(result);})
//     .catch(err => console.error(err));



if(datta.assinatura)
//   await aguentar(datta.assinatura);
var alvoo=await cliente_hvac_db.findOne({_id:datta.cliente_ref});

var index_alvo=await alvoo.filial.findIndex(x=>x._id==datta.filial_ref);

var alv2=await alvoo.filial[index_alvo];
console.log(alv2);





            var invoice= await datta;
            var nome="PurchaseOrder.pdf";
            var partnumbers=await [];

            // await Promise.all(datta.items.map(async(it, indice)=>{
            // var este=await stock_item_db.findOne({description_item:it.nome_item});
            // if(este.part_number && este.part_number!=null && este.part_number!=undefined)
            //     partnumbers.push(este.part_number);
            // else
            //     partnumbers.push("");
            // })
            // )
            
            var  { createInvoice } = require("./createInvoice_hvac.js");
            
            await createInvoice(invoice, nome, dataUser.nome, alv2);
            sleep(3000);

      // res.header("Content-Type","application/pdf")
      if(alv2.email){
            emailSender.createConnection();
            emailSender.testAttachment(alvoo, alv2,datta );

      }
   
            
            
            // *********************malabarismo***********************
            var pd=path.join(__dirname, 'invoice.pdf')
            var buscar="./"+nome;
            setTimeout(function(){
            res.redirect("/climatizacao/correctivacomplete");}, 2000);

})


router.post("/reporteer_Po", upload.any(), async function(req, res){

   var dataUser=req.session.usuario;
   // console.log(req.body)
  
  // relatt.nome_cliente=req.body.nome_cliente;

  
var datta=await hvac_db.findOne({_id:req.body.fitchero})


// fs.convert(datta.assinatura, 'public\\images', 'out')
//     .then(result => {console.log(result);})
//     .catch(err => console.error(err));



if(datta.assinatura)
//   await aguentar(datta.assinatura);
var alvoo=await cliente_hvac_db.findOne({_id:datta.cliente_ref});

var index_alvo=await alvoo.filial.findIndex(x=>x._id==datta.filial_ref);

var alv2=await alvoo.filial[index_alvo];
console.log(alv2);





            var invoice= await datta;
            var nome="PurchaseOrder.pdf";
            var partnumbers=await [];

            // await Promise.all(datta.items.map(async(it, indice)=>{
            // var este=await stock_item_db.findOne({description_item:it.nome_item});
            // if(este.part_number && este.part_number!=null && este.part_number!=undefined)
            //     partnumbers.push(este.part_number);
            // else
            //     partnumbers.push("");
            // })
            // )
            
            var  { createInvoice } = require("./createInvoice_hvac.js");
            
            await createInvoice(invoice, nome, dataUser.nome, alv2);
            sleep(3000);

      // res.header("Content-Type","application/pdf")
    //   emailSender.createConnection();
    // emailSender.testAttachment();
            
            
            // *********************malabarismo***********************
            var pd=path.join(__dirname, 'invoice.pdf')
            var buscar="./"+nome;
            setTimeout(function(){
            res.download(buscar);}, 2000);

})

const sleep = ms =>{
    return new Promise(resolve => setTimeout(resolve, ms))
}


const aguentar=async (invoicee)=>{
       var base64Data =  await invoicee.replace(/^data:image\/png;base64,/, "");

     await fs.writeFile(".\\out2.png", base64Data, 'base64', function(err) {
      console.log(err);

});
     return ;

}


// router.get("/correctivainprogress", async(req, res)=>{
//         var userData= await req.session.usuario;
        
//         var admin_case=await admin_db.find({});
//         if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
//             var carregado=await hvac_db.find({status:"In Progress"}).limit(100);
//             res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})
//         }
//         else{
//             var carregado=await hvac_db.find({status:"In Progress", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100).sort({data_criacao:-1});
//             let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
//                 let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


//                 var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
//                 var carregado2=await [];
//        await Promise.all( carregado.map(async(este, ii)=>{
        
//             if(este.viatura){
//                let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
//                console.log(gyu)
               
//              if(gyu.length>0)
//                 carregado2[ii]=await "true"
//             else
//                  carregado2[ii]=await "false"
//             }
//             else

//              carregado2[ii]=await "false"
//         }))

//        // setTimeout (function(){console.log(carregado2)}, 2000);



//             res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

//         }

//     // res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})

// });

// router.get("/correctivainprogress", async(req, res)=>{
//         var userData= await req.session.usuario;
        
//         var admin_case=await admin_db.find({});
//         if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
//             var carregado=await hvac_db.find({status:"In Progress"}).limit(100).sort({data_ultimaactualizacaojobcard:-1});
//             res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})
//         }
//         else{
//             var carregado=await hvac_db.find({status:"In Progress", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100).sort({data_criacao:-1});
//             let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
//                 let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


//                 var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
//                 var carregado2=await [];
//        await Promise.all( carregado.map(async(este, ii)=>{
        
//             if(este.viatura){
//                let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
//                console.log(gyu)
               
//              if(gyu.length>0)
//                 carregado2[ii]=await "true"
//             else
//                  carregado2[ii]=await "false"
//             }
//             else

//              carregado2[ii]=await "false"
//         }))

//        // setTimeout (function(){console.log(carregado2)}, 2000);



//             res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

//         }

//     // res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})

// });

router.get("/correctivainprogress", async(req, res)=>{
        var userData= await req.session.usuario;
        
        var admin_case=await admin_db.find({});
        if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
            var carregado=await hvac_db.find({status:"In Progress"}).limit(100).sort({data_ultimaactualizacaojobcard:-1});
            res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})
        }
        else{
            var carregado=await hvac_db.find({status:"In Progress", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100).sort({data_criacao:-1});
            let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
                let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


                var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
                var carregado2=await [];
       await Promise.all( carregado.map(async(este, ii)=>{
        
            if(este.viatura){
               let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
               console.log(gyu)
               
             if(gyu.length>0)
                carregado2[ii]=await "true"
            else
                 carregado2[ii]=await "false"
            }
            else

             carregado2[ii]=await "false"
        }))

       // setTimeout (function(){console.log(carregado2)}, 2000);



            res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

        }

    // res.render("hvac_new_correct", {DataU:userData, HvacJobs:carregado ,title:"eagleI"})

});

// router.post("/hvaccorrtsve", upload.any(), async(req, res)=>{
//         var userData= await req.session.usuario;
//         console.log(req.body)
//         var obbj= await req.body;
//         var encontrar_= await cliente_hvac_db.findOne({_id:obbj.cliente_ref})
//         var indx=await encontrar_.filial.findIndex(x=>x._id==obbj.filial_ref)
//         obbj.geolocalizacao=await [];
//         obbj.geolocalizacao[0]=await {};
//         obbj.geolocalizacao[0].latitude=await encontrar_.filial[indx].lat;
//         obbj.geolocalizacao[0].longitude=await encontrar_.filial[indx].long;
//         obbj.audit_trail=await [];
//         obbj.audit_trail[0]=await {};
//         obbj.audit_trail[0].nome_ref= await userData._id;
//         obbj.audit_trail[0].nome= await userData.nome;
//         obbj.audit_trail[0].data=await new Date();
//         obbj.audit_trail[0].acao=await "Criou Tarefa";
//         obbj.status=await "new";
//         obbj.criado_por=await userData.nome;
//         obbj.assistentes=await [];

//          if(req.body.assistente){
//             if(Array.isArray(req.body.assistente)){
//               await Promise.all(  req.body.assistente.map(async (estt, i)=>{
//                     obbj.assistentes[i]=await {};
//                     obbj.assistentes[i].nome=await req.body.assistente[i];
//                     obbj.assistentes[i].referencia=await req.body.referencia[i]


//                 }) )
//             }else

//            await Promise.all( [125].map(async (estt, i)=>{
//                     obbj.assistentes[i]=await {};
//                     obbj.assistentes[i].nome=await req.body.assistente;
//                     obbj.assistentes[i].referencia=await req.body.referencia;


//                 })
//            )
//         }
//         hvac_db.gravar_hvac(obbj, function(err){
//             if(err)
//                 console.log("erro ao tenatr gravar")
//             else
//                 console.log("hvac gravado com sucesso!")
//         });

//         res.json({feito:"done"})

   

// })

router.post("/hvaccorrtsve", upload.any(), async(req, res)=>{
        var userData= await req.session.usuario;
        console.log(req.body)
        var obbj= await req.body;
        var encontrar_= await cliente_hvac_db.findOne({_id:obbj.cliente_ref})
        var indx=await encontrar_.filial.findIndex(x=>x._id==obbj.filial_ref)
        var cont5 = req.body.jobcard_jobtype;
        var posicaodados, cont, cont1, cont2, cont3, cont4, cont6, cont7, cont8, cont9;
        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
        var year = ((new Date()).getFullYear() + "").split("");
        var ano = year[2] + year[3];
        var tech = obbj.tecnico;
        var infotarefa = {};
        var now = Date.now();
        console.log("Agora",now);
        cont6 = "CCC/" + mes + "/" + ano;

        var procura = await hvac_db.find({}, {jobcard_cod:1}, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log("Find Jobcard");
            }
        }).sort({_id:1}).lean();

        obbj.geolocalizacao=await [];
        obbj.geolocalizacao[0]=await {};
        obbj.geolocalizacao[0].latitude=await encontrar_.filial[indx].lat;
        obbj.geolocalizacao[0].longitude=await encontrar_.filial[indx].long;
        obbj.audit_trail=await [];
        obbj.audit_trail[0]=await {};
        obbj.audit_trail[0].nome_ref= await userData._id;
        obbj.audit_trail[0].nome= await userData.nome;
        obbj.audit_trail[0].data=await new Date();
        obbj.audit_trail[0].acao=await "Criou Tarefa";
        obbj.status=await "new";
        obbj.wait=await "nao"
        obbj.jobcard_jobtype = await "Callout";
        obbj.criado_por=await userData.nome;
        obbj.assistentes=await [];

         if(req.body.assistente){
            if(Array.isArray(req.body.assistente)){
              await Promise.all(  req.body.assistente.map(async (estt, i)=>{
                    obbj.assistentes[i]=await {};
                    obbj.assistentes[i].nome=await req.body.assistente[i];
                    obbj.assistentes[i].referencia=await req.body.referencia[i]


                }) )
            }else

           await Promise.all( [125].map(async (estt, i)=>{
                    obbj.assistentes[i]=await {};
                    obbj.assistentes[i].nome=await req.body.assistente;
                    obbj.assistentes[i].referencia=await req.body.referencia;


                })
           )
        }

        var assistentesmail = [];

        var tecnicoemail = await users_db.find({nome:tech}, {_id:0, email:1, idioma:1}, function(err,data){
            if (err) {
                console.log("Erro ao pegar o email do tecnico");
            } else {
                // assistentesmail.push(data[0].email);
                console.log("Pegou o email do tecnico ");
            }
        });

        var manageremail = await users_db.find({departamento_id:"611e45e68cd71c1f48cf45bd", $or:[{funcao_id:"611e6bd559c6e30a006ede59"}, {funcao_id:"611e2b8cf9b1b31cd868a30c"}]}, {_id:0, email:1}, function(err,data){
            if (err) {
                console.log("Erro ao pegar o email do manager");
            } else {
                console.log("Pegou o email do manager ");
            }
        });

        if(obbj.assistente != undefined){
            if(Array.isArray(obbj.assistente)){
                for(var i = 0; i < obbj.assistente.length; i++){
                    var assistente = obbj.assistente[i];
                    var assistentemail = await users_db.find({nome:assistente}, {email:1});
                    console.log("diferente");
                    // console.log("*****************",assistentemail);
                    assistentesmail.push(assistentemail[0].email);
                }
            }else{
                var assistente = obbj.assistente;
                var assistentemail = await users_db.find({nome:assistente}, {email:1});
                assistentesmail.push(assistentemail.email);
            }
        }

        infotarefa.cliente = await obbj.cliente;
        infotarefa.filial = await obbj.filial;
        infotarefa.provincia = await obbj.provincia;
        infotarefa.tecnico = await obbj.tecnico;
        infotarefa.local = await obbj.local;
        infotarefa.prioridade = await obbj.prioridade;
        infotarefa.razao = await obbj.razao;
        if(obbj.assistente != undefined){
            infotarefa.assistente = await obbj.assistente;
        }

        emailSender.createConnection();
        
        emailSender.sendEmailCreateTTNumberhvacassistants(infotarefa, tecnicoemail, manageremail);

        if(procura.length == 0){

            cont2 = cont6 + "/0001";
            cont1 = 1;
    
            obbj.jobcard_cod = cont2;
    
            hvac_db.gravar_hvac(obbj, function(err, data){
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
    
                        obbj.jobcard_cod = cont4;
                        hvac_db.gravar_hvac(obbj, function(err, data){
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
            cont1 = parseInt(cont[3]) + 1;
    
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
    
            obbj.jobcard_cod = cont2;
    
            hvac_db.gravar_hvac(obbj, function(err, data){
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
                        hvac_db.gravar_hvac(obbj, function(err, data){
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
        
        // hvac_db.gravar_hvac(obbj, function(err){
        //     if(err)
        //         console.log("erro ao tenatr gravar")
        //     else
        //         console.log("hvac gravado com sucesso!")
        // });

        // res.json({feito:"done"})

   

});



router.get("/detalhesPhotoModahvac/:id",  function(req, res){
    var userData= req.session.usuario;
    console.log("yesssssss");
    console.log(req.params.id);
    hvac_db.find({_id:req.params.id}, {photoinfo:1, cliente:1, jobcard_jobtype:1}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log(data);
            res.render("hvac_photodetails", {DataU:userData, Jobcards:data, title:'EAGLEI'});
        }
    }).lean();

});

router.post("/updatephotoinfoHvacInfo/:id",  upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var id = req.params.id;
    var photoinfo = [];
    console.log(req.files);
    
    var directorio = "/Hvac/";

    if (req.files) {

        let comprimento = req.files.length;

        for (let i = 0; i < comprimento; i++) {
            photoinfo.push((directorio + req.files[i].filename));
        }

    }

    var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
    var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
    var ano = (new Date()).getFullYear();
    var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

    

    await hvac_db.updateOne({_id:id}, {$push:{photoinfo}});

    hvac_db.updateOne({_id:id},{$set:{data_ultimaactualizacaojobcard:new Date()}}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log("Photo Info done")
            res.redirect("/inicio");
        }
    });

});

router.post("/guardardadosAir/:id", upload.any() ,async function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    var jobcard=req.body;
    
        var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
        var ano = (new Date()).getFullYear();
        var todayhours = new Date().getHours() + ":" + new Date().getMinutes();

        
        var procurajobcard = await hvac_db.findOne({_id:busca}, {jobcard_audittrail:1}, function(err, data){
            if(err){
                console.log("ocorreu um erro ao tentar aceder os dados")
            }
            else{
                console.log("Find jobcard");
            }
        }).lean();

        hvac_db.updateOne({_id:busca}, {$push:{ airconds: jobcard}, $set:{data_ultimaactualizacaojobcard:new Date() }}, function(err, data){
            if(err){
                console.log("ocorreu um erro ao tentar aceder os dados")
            }
            else{
                console.log("Cleaning info done")
                res.redirect("/inicio");
            }
        });
});


router.get("/detalhesEquipmentRepairs/:idjobcard",  function(req, res){
    var userData= req.session.usuario;
    var referencia = req.params.idjobcard;

        res.render("escolherManutencaoPeriodicaClmatizacao", {DataU:userData, Projects:referencia,title: 'EAGLEI'});

});

router.get("/detalhesclima/:idjobcard",  function(req, res){
    var userData= req.session.usuario;
    var referencia = req.params.idjobcard;

        res.render("detalhesrepairclimatizacao", {DataU:userData, Projects:referencia,title: 'EAGLEI'});

});
router.get("/airconRepairs/:idjobcard",  function(req, res){
    var userData= req.session.usuario;
    var referencia = req.params.idjobcard;

        res.render("airconmanentancerepairs", {DataU:userData, Projects:referencia,title: 'EAGLEI'});
});


// router.post("/clientefiliare", upload.any(), async(req, res)=>{
//         var userData= await req.session.usuario;
//         // console.log(req.body)
//         var elemento=await req.body;
//         console.log(elemento);
//         var busca=await req.body.nome_cliente+","+req.body.nome+", "+req.body.provincia+", "+req.body.rua+", "+req.body.bairro+", Mocambique ";
        
//         const thhh = await geocoder.geocode(busca);
//         console.log(thhh[0].latitude, thhh[0].longitude)
//         elemento.criado_por=await userData.nome;
//         elemento.data_criacao=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
//         elemento.lat=await thhh[0].latitude;
//         elemento.long=await thhh[0].longitude;
//         elemento.rua=await req.body.rua;
//         elemento.numero=await req.body.numero_cliente;
//         elemento.email=await req.body.email;
//         elemento.cliente_id = await req.body.nreffgty;
        
//         var pessoa_contactoArray = await [];
//         if(Array.isArray(elemento.pessoacontacto_nome)){
//             for(var i = 0; i < elemento.pessoacontacto_nome.length; i++){
//                 var pessoa_contactoObject = await {};
                
//                 pessoa_contactoObject.filial_id = await elemento.nreffgty;
//                 pessoa_contactoObject.filial_nome = await elemento.nome;
//                 pessoa_contactoObject.pessoacontacto_nome = await elemento.pessoacontacto_nome[i];
//                 pessoa_contactoObject.pessoacontacto_telefone = await elemento.pessoacontacto_telefone[i];
//                 pessoa_contactoObject.pessoacontacto_email = await elemento.pessoacontacto_email[i];
                
//                 console.log(i, " posicao "+ elemento.pessoacontacto_nome[i]);
//                 pessoa_contactoArray.push(pessoa_contactoObject);
//             }
//         }else if(elemento.pessoacontacto_nome.length = 1){
//             var pessoa_contactoObject = await {};
//             pessoa_contactoObject.filial_id = await elemento.nreffgty;
//             pessoa_contactoObject.filial_nome = await elemento.nome;
//             pessoa_contactoObject.pessoacontacto_nome = await elemento.pessoacontacto_nome;
//             pessoa_contactoObject.pessoacontacto_telefone = await elemento.pessoacontacto_telefone;
//             pessoa_contactoObject.pessoacontacto_email = await elemento.pessoacontacto_email;
            
//             pessoa_contactoArray.push(pessoa_contactoObject);
//         }
//             console.log(pessoa_contactoArray);
//         await cliente_hvac_db.updateOne({_id:req.body.nreffgty},{$push:{filial:elemento}})
//         await cliente_hvac_db.updateOne({_id:req.body.nreffgty}, {$push:{pessoa_contactoArray:pessoa_contactoArray}});
//         res.json({feito:"feito"})
   

// });

router.post("/clientefiliare", upload.any(), async(req, res)=>{
        var userData= await req.session.usuario;
        // console.log(req.body)
        var elemento=await req.body;
        console.log(elemento);
        var busca=await req.body.nome_cliente+","+req.body.nome+", "+req.body.provincia+", "+req.body.rua+", "+req.body.bairro+", Mocambique ";
        
        const thhh = await geocoder.geocode(busca);
        console.log(thhh[0].latitude, thhh[0].longitude)
        elemento.criado_por=await userData.nome;
        elemento.data_criacao=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
        elemento.lat=await thhh[0].latitude;
        elemento.long=await thhh[0].longitude;
        elemento.rua=await req.body.rua;
        elemento.numero=await req.body.numero_cliente;
        elemento.cliente_id = await req.body.nreffgty;

        await cliente_hvac_db.updateOne({_id:req.body.nreffgty},{$push:{filial:elemento}});
        res.json({feito:"feito"})
        
        if (elemento.pessoacontacto_nome != undefined){
            var filialid;
            await cliente_hvac_db.findOne({_id:req.body.nreffgty}, async function(erro, datahvacs){
                if (erro) {
                    console.log("Não conseguiu encontrar o cliente");
                } else {
                    filialid = datahvacs.filial[datahvacs.filial.length-1]._id;
                    console.log({filialid}, "dentro da cena");
                }
            });

            var pessoa_contactoArray = await [];
            if(Array.isArray(elemento.pessoacontacto_nome)){
                for(var i = 0; i < elemento.pessoacontacto_nome.length; i++){
                    var pessoa_contactoObject = await {};
                    
                    pessoa_contactoObject.filial_id = await filialid;
                    pessoa_contactoObject.filial_nome = await elemento.nome;
                    pessoa_contactoObject.pessoacontacto_nome = await elemento.pessoacontacto_nome[i];
                    pessoa_contactoObject.pessoacontacto_telefone = await elemento.pessoacontacto_telefone[i];
                    pessoa_contactoObject.pessoacontacto_email = await elemento.pessoacontacto_email[i];
                    
                    console.log(i, " posicao "+ elemento.pessoacontacto_nome[i]);
                    pessoa_contactoArray.push(pessoa_contactoObject);
                }
            }else if(elemento.pessoacontacto_nome.length = 1){
                var pessoa_contactoObject = await {};
                pessoa_contactoObject.filial_id = await filialid;
                pessoa_contactoObject.filial_nome = await elemento.nome;
                pessoa_contactoObject.pessoacontacto_nome = await elemento.pessoacontacto_nome;
                pessoa_contactoObject.pessoacontacto_telefone = await elemento.pessoacontacto_telefone;
                pessoa_contactoObject.pessoacontacto_email = await elemento.pessoacontacto_email;
                
                pessoa_contactoArray.push(pessoa_contactoObject);
            }
                console.log(pessoa_contactoArray);
            await cliente_hvac_db.updateOne({_id:req.body.nreffgty}, {$push:{pessoa_contactoArray:pessoa_contactoArray}});
            res.json({feito:"feito"})
        }
});

// router.post("/clientefiliare", upload.any(), async(req, res)=>{
//         var userData= await req.session.usuario;
//         console.log(req.body)
//         var elemento=await req.body;
//         var busca=await req.body.nome_cliente+","+req.body.nome+", "+req.body.provincia+", "+req.body.rua+", "+req.body.bairro+", Mocambique ";
        
//         const thhh = await geocoder.geocode(busca);
//         console.log(thhh[0].latitude, thhh[0].longitude)
//         elemento.criado_por=await userData.nome;
//         elemento.data_criacao=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
//         elemento.lat=await thhh[0].latitude;
//         elemento.long=await thhh[0].longitude;

//         await cliente_hvac_db.updateOne({_id:req.body.nreffgty},{$push:{filial:elemento}})
//         res.json({feito:"feito"})
   

// })


// router.post("/cliente_hvac_re", upload.any(), async(req, res)=>{
//         var userData= await req.session.usuario;
//         var cliente=await req.body;
//         cliente.criado_por=await userData.nome;
//         cliente.contacto=await {};
//         cliente.contacto.telemovel=await req.body.telemovel;
//         cliente.contacto.telefone=await req.body.telefone;
//         cliente.contacto.email=await req.body.email;
        
//         console.log(req.body)

// // *****************************************************************************************************************************************************************************
//          var busca=await req.body.nome_cliente+", "+req.body.numero+", "+req.body.provincia+", "+req.body.rua+", "+req.body.bairro+", Mocambique ";
        
//         var thhh = await geocoder.geocode(busca);
//             cliente.filial =await [];
//             cliente.filial[0]=await {};
//             cliente.filial[0].nome=await req.body.nome_cliente;
//             cliente.filial[0].rua=await req.body.rua;
//             cliente.filial[0].regiao=await req.body.regiao;
//             cliente.filial[0].regiao_ref=await req.body.regiao_ref;
//             cliente.filial[0].provincia_ref=await req.body.provincia_ref;
//             cliente.filial[0].provincia=await req.body.provincia;
//             cliente.filial[0].numero=await req.body.numero_cliente;
//             cliente.filial[0].bairro=await req.body.bairro;
//             cliente.filial[0].criado_por=await userData.nome;
//             cliente.filial[0].email=await req.body.email;
//             cliente.filial[0].contacto=await req.body.telemovel;
//             cliente.filial[0].data_criacao=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
//             cliente.filial[0].lat=await thhh[0].latitude;
//             cliente.filial[0].long=await thhh[0].longitude;
// //  ***************************************************************************************************************************************************************************
//         await cliente_hvac_db.gravar_cliente(cliente, function(err){
//             if(err)
//                 console.log("ocorreu um erro ao tenatr registar cliente_hvac")
//             else
//                { console.log("cliente registado com sucesso@!")
//                 res.json({feito:"feito"})
//        }
//         });

// })


router.post("/cliente_hvac_re", upload.any(), async(req, res)=>{
        var userData= await req.session.usuario;
        var cliente=await req.body;
        cliente.criado_por=await userData.nome;
        cliente.contacto=await {};
        cliente.contacto.telemovel=await req.body.telemovel;
        cliente.contacto.telefone=await req.body.telefone;
        cliente.contacto.email=await req.body.email;
        
        console.log({cliente})

// *********remo********************************************************************************************************************************************************************
         var busca=await req.body.nome_cliente+", "+req.body.numero+", "+req.body.provincia+", "+req.body.rua+", "+req.body.bairro+", Mocambique ";
        
        var thhh = await geocoder.geocode(busca);
            cliente.filial =await [];
            cliente.filial[0]=await {};
            cliente.filial[0].nome=await req.body.nome_cliente;
            cliente.filial[0].rua=await req.body.rua;
            cliente.filial[0].regiao=await req.body.regiao;
            cliente.filial[0].regiao_ref=await req.body.regiao_ref;
            cliente.filial[0].provincia_ref=await req.body.provincia_ref;
            cliente.filial[0].provincia=await req.body.provincia;
            cliente.filial[0].numero=await req.body.numero_cliente;
            cliente.filial[0].bairro=await req.body.bairro;
            cliente.filial[0].criado_por=await userData.nome;
            cliente.filial[0].email=await req.body.email;
            cliente.filial[0].contacto=await req.body.telemovel;
            cliente.filial[0].data_criacao=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
            cliente.filial[0].lat=await thhh[0].latitude;
            cliente.filial[0].long=await thhh[0].longitude;
//  ***************************************************************************************************************************************************************************
            cliente.pessoa_contactoArray = await [];
            if (cliente.pessoacontacto_nome != undefined) {
                if(Array.isArray(cliente.pessoacontacto_nome)){
                for(var i = 0; i < cliente.pessoacontacto_nome.length; i++){
                    var pessoa_contactoObject = await {};
                    
                    pessoa_contactoObject.filial_id = await cliente.nreffgty;
                    pessoa_contactoObject.filial_nome = await req.body.nome_cliente;
                    pessoa_contactoObject.pessoacontacto_nome = await cliente.pessoacontacto_nome[i];
                    pessoa_contactoObject.pessoacontacto_telefone = await cliente.pessoacontacto_telefone[i];
                    pessoa_contactoObject.pessoacontacto_email = await cliente.pessoacontacto_email[i];
                    
                    console.log(i, " posicao "+ cliente.pessoacontacto_nome[i]);
                    cliente.pessoa_contactoArray.push(pessoa_contactoObject);
                }
                }else if(cliente.pessoacontacto_nome.length = 1){
                    var pessoa_contactoObject = await {};
                    pessoa_contactoObject.filial_id = await cliente.nreffgty;
                    pessoa_contactoObject.filial_nome = await req.body.nome_cliente;
                    pessoa_contactoObject.pessoacontacto_nome = await cliente.pessoacontacto_nome;
                    pessoa_contactoObject.pessoacontacto_telefone = await cliente.pessoacontacto_telefone;
                    pessoa_contactoObject.pessoacontacto_email = await cliente.pessoacontacto_email;
                    
                    cliente.pessoa_contactoArray.push(pessoa_contactoObject);
                }

                var dataclient1= await cliente_hvac_db.create(cliente);

                var dataclient= await clienteshvac.findOne({_id:dataclient1._id}, {_id:1, nome_cliente:1, pessoa_contactoArray:1, filial:1}).sort({$natural:-1}).lean();

                console.log(`Este eh o dataclient ${dataclient}`);
                var idcliente = await dataclient._id;
                var idfilial = await dataclient.filial[0]._id;
                console.log(typeof(idfilial)+ " Tipo do idfilial");
                var nrpessoascontacto = await cliente.pessoa_contactoArray.length;
                console.log({nrpessoascontacto});
                console.log({idcliente});
                console.log({idfilial}, " Filial do dataclient");
                var eparaok=await [];
                await Promise.all(dataclient.pessoa_contactoArray.map(async(obj, i)=>{
                    var filial_id=await idfilial;
                    var tempkl=await {...obj, filial_id:filial_id};
                   await eparaok.push(tempkl);
                }))
                
                console.log({eparaok});
                await clienteshvac.updateOne({_id:idcliente}, {$set:{pessoa_contactoArray:eparaok}}, function(erro, datapcontact){
                    if (erro) {
                        console.log("Não foi possível actualizar os dados das pessoas de contacto");
                    } else {
                        console.log("Actualizado com sucesso");
                        res.redirect("/climatizacao/novo")
                    }
                });

            }else{
                var dataclient1= await cliente_hvac_db.create(cliente);
                res.redirect("/climatizacao/novo")

            }

})


router.post("/aprovarjo/:id",  upload.any(), async(req, res)=>{
        var userData= await req.session.usuario;

        var ob=await {};
        ob.nome_ref= await userData._id;
        ob.nome= await userData.nome;
        ob.data=await new Date();
        ob.acao=await "Aceitou a Tarefa";
        var obj1={};
        obj1.nome_ref= await userData._id;
        obj1.nome= await userData.nome;
        obj1.data=await new Date();
        var tgsh=await {};
        var controlador = await [1,1];
        tgsh.latitude=await req.body.geolocationlatitude;
        tgsh.longitude=await req.body.geolocationlongitude;
        obj1.acao=await "A previsao desta viagem e de "+req.body.Distancia+", que sera efetuada em "+req.body.duracao_viagem;

        await hvac_db.updateOne({_id:req.params.id},{status:"In Progress", controlador, $push:{audit_trail:ob}, $set:{origem:tgsh, controlador}});
        await hvac_db.updateOne({_id:req.params.id},{status:"In Progress", $push:{audit_trail:obj1}});

        res.json({feito:"done"})
});



router.get("/aprovarjo/:id",  async(req, res)=>{
        var userData= await req.session.usuario;
        console.log(req.params.id);
        var ob=await {};
        ob.nome_ref= await userData._id;
        ob.nome= await userData.nome;
        ob.data=await new Date();
        ob.acao=await "Aceitou a Tarefa";

        var tech = await userData.nome;
        var usuarios = await [];
        var procurajobcard = await hvac_db.findOne({_id:req.params.id});
        
        var manageremail = await users_db.find({departamento_id:"611e45e68cd71c1f48cf45bd", $or:[{funcao_id:"611e6bd559c6e30a006ede59"}, {funcao_id:"611e2b8cf9b1b31cd868a30c"}]}, {_id:0, email:1}, function(err,data){
            if (err) {
                console.log("Erro ao pegar o email do manager");
            } else {
                console.log("Pegou o email do manager ", data);
            }
        });
        
        var tecnicoemail = await users_db.find({nome:tech}, {_id:0, email:1, idioma:1}, function(err,data){
            if (err) {
                console.log("Erro ao pegar o email do tecnico");
            } else {
                // assistentesmail.push(data[0].email);
                console.log("Pegou o email do tecnico ");
            }
        });

        var callcenter = await users_db.find({funcao:"Call Center"}, {email:1});
        
        for(var i = 0; i<callcenter.length; i++){
            usuarios.push(callcenter[i].email);
        }

        emailSender.createConnection();
        emailSender.sendEmailCallcenterhvac(procurajobcard, usuarios, manageremail);


        if(req.params.id.length==24){
            var findoco=await hvac_db.find({_id:req.params.id});
            if(findoco.length>0){
                await hvac_db.updateOne({_id:req.params.id},{status:"In Progress", estadoactual:"On Route", $push:{audit_trail:ob}});
                 res.render("visaomapa",{DataU:userData,Jobcards:findoco, DadosJobcards:JSON.stringify(findoco), title:"eagleI"})

            }
            else
            res.render("visaomapa",{DataU:userData,Jobcards:findoco, DadosJobcards:JSON.stringify(findoco), title:"eagleI"})
        }
        else
            res.redirect("/climatizacao/correctivanew")

})



router.post("/updatechegadasitehvac",  upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var jobcard = req.body;
    var ob=await {};
        ob.nome_ref= await userData._id;
        ob.nome= await userData.nome;
        ob.data=await new Date();
        ob.acao=await "Tecnico Chegou ao Local";

    var usuarios = await [];
    var id = jobcard.jobcard_id;
    
    var procurajobcard = await hvac_db.findOne({_id:id});

    var callcenter = await users_db.find({funcao:"Call Center"}, {email:1});

    for(var i = 0; i<callcenter.length; i++){
        usuarios.push(callcenter[i].email);
    }

    var manageremail = await users_db.find({departamento_id:"611e45e68cd71c1f48cf45bd", $or:[{funcao_id:"611e6bd559c6e30a006ede59"}, {funcao_id:"611e2b8cf9b1b31cd868a30c"}]}, {_id:0, email:1}, function(err,data){
        if (err) {
            console.log("Erro ao pegar o email do manager");
        } else {
            console.log("Pegou o email do manager ", data);
        }
    });

    emailSender.createConnection();
    emailSender.sendEmailCallcenterchegadasite(procurajobcard, usuarios, manageremail);


    hvac_db.updateOne({_id:jobcard.jobcard_id},{$set:{data_ultimaactualizacaojobcard:new Date(),estadoactual:"On Site", sitearrivaldate:new Date()}, $push:{audit_trail:ob}}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log("Technician arrived on site")
            res.redirect("/inicio");
        }
    });

});

router.get("/submiteClima/:id", async function(req, res){
    var userData = req.session.usuario;
    var id = req.params.id;
    console.log(id);
    hvac_db.find({_id:id}, {_id:1, jobcard_jobtype:1}, function (err, data) {
    	if (err) {
    		console.log("Falhou em encontrar a tarefa");
    	} else {
    		console.log("Avancou");
    		res.render("submiteJobClimatizacao", {DataU:userData, ID:id , DadosJobcards:data ,title:"eagleI"});
    	}
    });
    
});


router.post("/sendforapprovalhvac",  upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var jobcard = req.body;
    var ob=await {};
        ob.nome_ref= await userData._id;
        ob.nome= await userData.nome;
        ob.data=await new Date();
        ob.acao=await "Enviado para aprovação";
        var controlador = await [1,1,1];

    console.log("jobcard",jobcard);
    var usuarios = await [];
    var id = jobcard.jobcardhvacid;

    var comercialemail = await users_db.find({departamento_id:"611e45e68cd71c1f48cf45bd", $or:[{funcao_id:"611e6bd559c6e30a006ede59"}, {funcao_id:"611e2b8cf9b1b31cd868a30c"}]}, {_id:0, email:1}, function(err,data){
        if (err) {
            console.log("Erro ao pegar o email do manager");
        } else {
            console.log("Pegou o email do commercial ", data);
        }
    });


    var manageremail = await users_db.find({departamento_id:"611e45e68cd71c1f48cf45bd", $or:[{funcao:"Manager"}, {funcao:"Gestor"}]}, {_id:0, email:1}, function(err,data){
        if (err) {
            console.log("Erro ao pegar o email do manager");
        } else {
            console.log("Pegou o email do manager ", data);
        }
    });

    var procurajobcard = await hvac_db.findOne({_id:id});
    var callcenter = await users_db.find({funcao:"Call Center"}, {email:1});
    for(var i = 0; i<callcenter.length; i++){
        usuarios.push(callcenter[i].email);
    }

    console.log("procurajobcard ",procurajobcard);
    console.log("usuarios ",usuarios);

    emailSender.createConnection();
    emailSender.sendEmailSendJobcardAprrovalhvac(procurajobcard, usuarios, comercialemail);

    var report=await {};
        report.coment= await jobcard.jobcard_remedialaction;
        report.Qual= await jobcard.jobcard_hsreason;
        report.Problemas= await jobcard.jobcard_healthsafety;

        var remedialaction = await jobcard.jobcard_remedialaction;
        var healthsafety = await jobcard.jobcard_healthsafety;
        var hsreason = await jobcard.jobcard_hsreason;


    hvac_db.updateOne({_id:jobcard.jobcardhvacid},{$set:{data_ultimaactualizacaojobcard:ob.data, estadoactual:"Awaiting approval",remedialaction, healthsafety, hsreason, sitearrivaldate:new Date(), controlador}, $push:{audit_trail:ob, reportetrabalho:report}}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log("Sent for approval")
            res.redirect("/inicio");
        }
    });
});


router.post("/approvecallouthvac",  upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var jobcard = req.body;
    var ob=await {};
        ob.nome_ref= await userData._id;
        ob.nome= await userData.nome;
        ob.data=await new Date();
        ob.acao=await "Tarefa Aprovada";
        var controlador = await [1,1,1,1];

    console.log("jobcard ",jobcard);
    var usuarios = await [];
    var id = await jobcard.jobcardhvacid;

    var procurajobcard = await hvac_db.findOne({_id:id});

    var tech = await procurajobcard.tecnico;
    
    users_db.find({nome:tech}, {email:1}, function(err, data){
        if (err) {
            console.log("Não encontrou o técnico");
        }else{
            usuarios.push(data[0].email);
        }
    });
    var callcenter = await users_db.find({funcao:"Call Center"}, {email:1});
    for(var i = 0; i<callcenter.length; i++){
        usuarios.push(callcenter[i].email);
    }

    console.log("procurajobcard ",procurajobcard);
    console.log("usuarios ",usuarios);

    emailSender.createConnection();
    emailSender.sendEmailSendJobcardApprovedhvac(procurajobcard, usuarios);

    hvac_db.updateOne({_id:jobcard.jobcardhvacid},{$set:{data_ultimaactualizacaojobcard:ob.data, estadoactual:"Approved", sitearrivaldate:new Date(), controlador}, $push:{audit_trail:ob}}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log("Jobcard Approved")
            res.redirect("/inicio");
        }
    });

});



router.post("/leavesitecallouthvac",  upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var jobcard = req.body;
    var ob=await {};
        ob.nome_ref= await userData._id;
        ob.nome= await userData.nome;
        ob.data=await new Date();
        ob.acao=await "Saída do local";
        var controlador = await [1,1,1,1,1];

    console.log("*****************************************************************", jobcard)

    hvac_db.updateOne({_id:jobcard.jobcardhvacid},{$set:{data_ultimaactualizacaojobcard:ob.data, status:"Complete", sitearrivaldate:new Date(), controlador}, $push:{audit_trail:ob}}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log("Jobcard Approved")
            res.redirect("/inicio");
        }
    });

});


// router.get("/correctivacomplete", async(req, res)=>{
//     var userData= await req.session.usuario;

//     if (userData.funcao == "Tecnico" || userData.funcao == "Assistant" || userData.funcao == "Assistente") {
//         controladorfuncao = 1;
//     }else if(userData.funcao == "regional_manager"){
//         controladorfuncao = 2;
//     }else if (userData.verificador_funcao == "Regional Manager") {
//         controladorfuncao = 3;
//     }else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "IT Officer") || (userData.funcao == "Commercial") || ((userData.funcao == "Manager") && (userData.departamento == "Climatização e Electricidade")) || (userData.nome == "Rogerio Galrito") ){
//         controladorfuncao = 4;
//     }else if(userData.nome == "Guest"){
//         controladorfuncao = 5;
//     }else if (userData.funcao == "Manager" && (userData.funcao == "Climatização e Electricidade")) {
//         controladorfuncao = 6;
//     }
    
//     var admin_case=await admin_db.find({});
//     if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
//         var carregado=await hvac_db.find({status:"Complete"}).limit(100).sort({data_criacao:-1});
//         res.render("hvac_complete_correct", {DataU:userData, count: controladorfuncao, HvacJobs:carregado ,title:"eagleI"})
//     }
//     else{
//         var carregado=await hvac_db.find({status:"Complete", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100);
//         let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
//             let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


//         var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
//         var carregado2=await [];
//         await Promise.all( carregado.map(async(este, ii)=>{
//             if(este.viatura){
//             let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
//             console.log(gyu)
            
//             if(gyu.length>0)
//                 carregado2[ii]=await "true"
//             else
//                 carregado2[ii]=await "false"
//             }
//             else

//             carregado2[ii]=await "false"
//         }));

//         res.render("hvac_complete_correct", {DataU:userData, count: controladorfuncao, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

//     }
// });

router.get("/correctivacomplete", async(req, res)=>{
    var userData= await req.session.usuario;

    if (userData.funcao == "Tecnico" || userData.funcao == "Assistant" || userData.funcao == "Assistente") {
        controladorfuncao = 1;
    }else if(userData.funcao == "regional_manager"){
        controladorfuncao = 2;
    }else if (userData.verificador_funcao == "Regional Manager") {
        controladorfuncao = 3;
    }else if((userData.funcao == "Call Center") || (userData.funcao == "Back Office") || (userData.nivel_acesso == "admin") || (userData.funcao == "IT Officer") || (userData.funcao == "Commercial") || ((userData.funcao == "Manager") && (userData.departamento == "Climatização e Electricidade")) || (userData.nome == "Rogerio Galrito") ){
        controladorfuncao = 4;
    }else if(userData.nome == "Guest"){
        controladorfuncao = 5;
    }else if (userData.funcao == "Manager" && (userData.funcao == "Climatização e Electricidade")) {
        controladorfuncao = 6;
    }
    
    var admin_case=await admin_db.find({});
    if(admin_case[0].departamento.findIndex(x=>x.chefe_depart==userData.nome)!=-1 || (userData.funcao == "Commercial")){
        var carregado=await hvac_db.find({status:"Complete"}).limit(100).sort({data_criacao:-1});
        res.render("hvac_complete_correct", {DataU:userData, count: controladorfuncao, HvacJobs:carregado ,title:"eagleI"})
    }
    else{
        var carregado=await hvac_db.find({status:"Complete", $or:[{tecnico_ref:userData._id}, {criado_por:userData.nome}]}).limit(100);
        let diiaass= await (new Date()).getDate()<10? ("0"+(new Date()).getDate()) : (new Date()).getDate();
            let messees=await  (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)) : ((new Date()).getMonth()+1);


        var controle=await diiaass+"/"+messees+"/"+(new Date()).getFullYear();
        var carregado2=await [];
        await Promise.all( carregado.map(async(este, ii)=>{
            if(este.viatura){
            let gyu=await veiiculo_db.find({matricula:este.viatura,  "datta":{ $regex:controle, $options: "i" }})
            console.log(gyu)
            
            if(gyu.length>0)
                carregado2[ii]=await "true"
            else
                carregado2[ii]=await "false"
            }
            else

            carregado2[ii]=await "false"
        }));

        res.render("hvac_complete_correct", {DataU:userData, count: controladorfuncao, HvacJobs:carregado, carregado2:carregado2 ,title:"eagleI"})

    }
});


router.get("/detalhes/:id",  async(req, res)=>{
        var userData= await req.session.usuario;
       console.log("ja cheguei")

    var admin_case=await admin_db.find({});
    var clinet=await cliente_hvac_db.find({});
    var hvacUsers=await users_db.find({departamento_id:userData.departamento_id}).sort({nome:1});
    var viaturd =await users_db.find({departamento_id:userData.departamento_id, matricula:{$ne:"SEM VEICULO"}}).sort({matricula:1});
    if(req.params.id.length==24){
        var encontr=await hvac_db.find({_id:req.params.id})
    res.render("call_out_detalhes", {DataU:userData, AdMagen:admin_case, Clientes:clinet, Carregado:encontr, Viaturas:viaturd, HvacUsers:hvacUsers, title:"eagleI"})
    }

})



router.get("/detalhesDevolverJobcardhvac/:id",  function(req, res){
    var userData= req.session.usuario;

    hvac_db.find({_id:req.params.id}, {tecnico:1, cliente:1, jobcard_jobtype:1}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            res.render("hvac_detalhesDevolverJobcard", {DataU:userData, Jobcards:data, title: 'EAGLEI'});
        }
    }).lean();

});


router.post("/sendbackjobcardhvac",  upload.any(), async function(req, res){
    var userData= req.session.usuario;
    var jobcard = req.body;
    var jobcard_estadoactual = "On site";
    console.log(userData.funcao);
    console.log(jobcard);

    var razaoreprovar = jobcard.jobcardhvac_razaoreprovar;
    var controlador = await [1,1]; 

    var usuarios = await [];
    var id = jobcard.jobcard_id;

    var procurajobcard = await hvac_db.findOne({_id:id});
    var callcenter = await users_db.find({funcao:"Call Center"}, {email:1});
    for(var i = 0; i<callcenter.length; i++){
        usuarios.push(callcenter[i].email);
    }

    console.log("procurajobcard ",procurajobcard);
    console.log("usuarios ",usuarios);

    emailSender.createConnection();
    emailSender.sendEmailSendJobcardRejectedhvac(procurajobcard, usuarios, razaoreprovar);

    var procura = await hvac_db.findOne({_id:jobcard.jobcard_id}, {tecnicoid:1, cliente:1, cliente_ref:1, jobcard_cod:1, filial:1, criado_por:1}, function(err, data){
        if(err){
            console.log(err);
           }else{
            console.log("Find Jobcard");
        }
    }).lean();

    var procurauser = await model.findOne({_id:procura.tecnicoid}, {idioma:1, email:1}, function(err,dataUser){
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
  jobcard_audittrail.nome_ref = await userData._id;
  jobcard_audittrail.nome = await userData.nome;
  jobcard_audittrail.data = await new Date();
  jobcard_audittrail.acao = await `Enviado de volta` 


  if(procura.cliente_ref != ""){

      var procurasiteinfo = await cliente_db.findOne({_id:procura.cliente_ref}, {nome_cliente:1, provincia:1, filial:1}, function(err,dataUser){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find Site")
        }
    }).lean();
  }else{

      var procurasiteinfo = {};

      procurasiteinfo.nome_cliente = "";
  }

        
        hvac_db.findOneAndUpdate({_id:jobcard.jobcard_id}, {$push:{audit_trail:jobcard_audittrail}, $set:{data_ultimaactualizacaojobcard:new Date(), status: "In Progress", estadoactual:jobcard_estadoactual, razaoreprovar:razaoreprovar}}, function(err, data){
            if(err){
                console.log("ocorreu um erro ao tentar aceder os dados")
            }
            else{
                console.log("Sent Back")
                res.redirect("/inicio");
            }
        });
    

});


router.get("/editash/:id",  async(req, res)=>{
        var userData= await req.session.usuario;
       console.log("ja cheguei")

    var admin_case=await admin_db.find({});

    // var clinet=await cliente_db.find({});
    // var hvacUsers=await users_db.find({}).sort({nome:1});
    // var viaturd =await viaturas_db.find({}).sort({matricula:1});

    var clinet=await cliente_hvac_db.find({});
    var hvacUsers=await users_db.find({departamento_id:userData.departamento_id}).sort({nome:1});
    var viaturd =await users_db.find({departamento_id:userData.departamento_id, matricula:{$ne:"SEM VEICULO"}}).sort({matricula:1});
    

       if(req.params.id.length==24){
        var encontr=await hvac_db.find({_id:req.params.id})

        res.render("call_out_edit", {DataU:userData, AdMagen:admin_case, Clientes:clinet, Carregado:encontr, Clientes1:JSON.stringify(clinet), Viaturas:viaturd, HvacUsers:hvacUsers,title:"eagleI"})
       }
        
        

   

})

router.post("/editarhvac/:id",  upload.any(), async(req, res)=>{
        var userData= await req.session.usuario;
       console.log("ja cheguei");
       var thydsyu=await req.body;
       console.log(req.body)

       // ******************************************

        console.log(req.body)
        var obbj= await req.body;
        var encontrar_= await cliente_hvac_db.findOne({_id:obbj.cliente_ref})
        var indx=await encontrar_.filial.findIndex(x=>x._id==obbj.filial_ref)
        obbj.geolocalizacao=await [];
        obbj.geolocalizacao[0]=await {};
        obbj.geolocalizacao[0].latitude=await encontrar_.filial[indx].lat;
        obbj.geolocalizacao[0].longitude=await encontrar_.filial[indx].long;
        obbj.audit_trail=await [];
        obbj.audit_trail[0]=await {};
        obbj.audit_trail[0].nome_ref= await userData._id;
        obbj.audit_trail[0].nome= await userData.nome;
        obbj.audit_trail[0].data=await new Date();
        obbj.audit_trail[0].acao=await "Editou Tarefa";
        obbj.status=await "new";
        obbj.criado_por=await userData.nome;
        obbj.assistentes=await [];


       // *****************************************

       // var obbj= await req.body;
       //  var encontrar_= await cliente_hvac_db.findOne({_id:obbj.cliente_ref})
       //  var indx=await encontrar_.filial.findIndex(x=>x._id==obbj.filial_ref)
       //  // obbj.latitude=await encontrar_.filial[indx].lat;
       //  // obbj.longitude=await encontrar_.filial[indx].long;
       //  obbj.criado_por=await userData.nome;


       //  obbj.geolocalizacao=await [];
       //  obbj.geolocalizacao[0]=await {};
       //  obbj.geolocalizacao[0].latitude=await encontrar_.filial[indx].lat;
       //  obbj.geolocalizacao[0].longitude=await encontrar_.filial[indx].long;
        
       //  var ob=await {};
       //  ob.nome_ref= await userData._id;
       //  ob.nome= await userData.nome;
       //  ob.data=await new Date();
       //  ob.acao=await "Editou Tarefa";
       // *****************************************


       if(req.body.assistente){
            if(Array.isArray(req.body.assistente)){
              await Promise.all(req.body.assistente.map(async (estt, i)=>{
                    obbj.assistentes[i]=await {};
                    obbj.assistentes[i].nome=await req.body.assistente[i];
                    obbj.assistentes[i].referencia=await req.body.referencia[i]


                }) )
            }else

           await Promise.all( [125].map(async (estt, i)=>{
                    obbj.assistentes[i]=await {};
                    obbj.assistentes[i].nome=await req.body.assistente;
                    obbj.assistentes[i].referencia=await req.body.referencia;


                })
           )
        }
    
       var editt= await hvac_db.updateOne({_id:req.params.id},obbj);
       // await hvac_db.updateOne({_id:req.params.id},{$push:{audit_trail:ob}});
        res.json({feito:"feito"})
       
        
        

   

})







module.exports=router;