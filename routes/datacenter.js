var express = require('express');
var router = express.Router();
var geolocation = require('geolocation')
var model = require('../entities/usuario');
var emailSender=require('../util/sendEmail');
var jobcards = require("../entities/jobcard.js");
var jobcardprojects = require("../entities/jobcard_projects.js");
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




// router.get('/clickProjects', async(req, res)=>{
//     var userData = await req.session.usuario;
//     var admin_case = await admin_db.find({});
//     var client = await cliente_db.find({});
//     var hvacUsers = await users_db.find({}).sort({nome:1});
//     var viaturaId = await viaturas_db.find({}).sort({matricula:1});
//     var nome = userData.nome;
//     var userDepat = userData.departamente;
//     var controladorfuncao = 0;

//     if(userData.funcao == 'Tecnico' || userData.funcao == 'Asistant' || userData.funcao == 'Assistente'){
//         controladorfuncao = 1;
//     }else if(userData.funcao == 'regional_manager'){
//         controladorfuncao = 2;
//     }else if(userData.funcao == 'Regional Manager'){
//         controladorfuncao = 3;
//     }else if(userData.funcao == 'Call Center' || userData.funcao == 'Back Office' || userData.nivel_acesso == 'admin' || userData.funcao == 'IT Officer' || userData.funcao == 'comercial' || userData.funcao == ' Manager' && userData.departamento == 'Climatização e Electricidade'){
//         controladorfuncao = 4;
//     }else if(userData.nome == 'Guest'){
//         controladorfuncao = 5;
//     }else if(userData.funcao ==''){
//         controladorfuncao = 6;
//     }
//     console.log(controladorfuncao);

//     switch (controladorfuncao){
//         case 1:
//             countNew = await hvac_db.countDocuments({departamento_ref:'611e45e68cd71c1f48cf45bd', tecnico:nome, status:'new'}, function(err, newjobs){
//                 if(err){
//                     console.log('Error with New projects ')
//                 }else {
//                     console.log(newjobs + 'New Jobs')
//                 }
//             }).lean();

//             countInprogress = await hvac_db.countdocuments({departamento_ref:'611e45e68cd71c1f48cf45bd', tecnico:nome, status:'In Progress'}, function(err, inprogressjobs){
//                 if(err){
//                     console.log('error with projects in progress');
//                 } else {
//                     console.log(inprogressjobs + 'In progress Jobcards')
//                 }
//             }).lean();

//             countComplete = await hvac_db.countdocuments({departamento_ref:'611e45e68cd71c1f48cf45bd', tecnico:nome, status:'Complete'}, function(err, completejobs){
//                 if(err){
//                     console.log('error with complete jobcards');
//                 } else {
//                     console.log(completejobs + 'Complet Jobcars');
//                 }
//             }).lean();
//         break;

//     }
//     res.render('datacenter_projects', {DataU:userData,  AdMagen:admin_case, Clientes:client, Viaturas:viaturaId, HvacUsers:hvacUsers, title:"eagleI"})

// })




router.get('/jobcardprojectshome', async function(req, res) {
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
	}else if((userData.funcao = "Call Center") || (userData.funcao = "Back Office") || (userData.nivel_acesso = "admin") || (userData.funcao == "Manager")){
		controladorfuncao = 4;
	}else if(userData.nome == "Guest"){
		controladorfuncao = 5;
	};

	console.log(controladorfuncao);
	switch (controladorfuncao) {
		case 1:
			countNew = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 2:
			countNew = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", $or:[{jobcard_linemanager:nome}, {jobcard_tecniconome:nome}]}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 3:
			countNew = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_regiao:userData.regiao}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress", jobcard_regiao:userData.regiao}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete", jobcard_regiao:userData.regiao}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 4:
			countNew = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New"}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"In Progress"}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In progress");
				}
			}).lean();
							
			countComplete = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"Complete"}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

		case 5:
			countNew = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, newjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts New")
				} else {
					console.log(newjobs + " jobcards novos");
				}
			}).lean();
					
			countInprogress = await	jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, inprogressjobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
				} else {
					console.log(inprogressjobs + " jobcards In Progress");
				}
			}).lean();
							
			countComplete = await jobcardprojects.countDocuments({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_clientenome: "Vm,Sa"}, function(err, completejobs){
				if (err) {
					console.log("Ocorreu um erro ao tentar contar os Callouts Complete");
				} else {
					console.log(completejobs + " jobcards Complete");
				}
			}).lean();

		break;

	}

	res.render("datacenterprojects_options", {DataU:userData, CountNew:countNew, CountInprogress:countInprogress, CountComplete:countComplete, title: 'EAGLEI'});
	
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
            countNew = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", tecnico:nome, status:"new"}, function(err, newjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts New")
                } else {
                    console.log(newjobs + " jobcards novos");
                }
            }).lean();
                    
            countInprogress = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", tecnico:nome, status:"In Progress"}, function(err, inprogressjobs){
                if (err) {
                    console.log("Ocorreu um erro ao tentar contar os Callouts In progress");
                } else {
                    console.log(inprogressjobs + " jobcards In Progress");
                }
            }).lean();
                            
            countComplete = await hvac_db.countDocuments({departamento_ref:"611e45e68cd71c1f48cf45bd", tecnico:nome, status:"Complete"}, function(err, completejobs){
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


router.get("/preventhvac", async(req, res)=>{
        var userData= await req.session.usuario;
    var admin_case=await admin_db.find({});
    var clinet=await cliente_db.find({});
    var hvacUsers=await users_db.find({}).sort({nome:1});
    var viaturd =await viaturas_db.find({}).sort({matricula:1});
    res.render("hvac_option_prevent", {DataU:userData, AdMagen:admin_case, Clientes:clinet, Viaturas:viaturd, HvacUsers:hvacUsers,title:"eagleI"})

});

module.exports=router;