var maintenance_db = require("../entities/jobcard.js");
var usuario_db = require("../entities/usuario.js");
var siteinfo_db = require("../entities/siteinfo.js");
var emailSender=require('../util/sendEmail');
var moment_zone=require("moment-timezone");
var CronJob = require("cron").CronJob;

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var email_callcenter = new CronJob('0 1,15,30,45 * * * *', async function(){
// var email_callcenter = new CronJob('* * * * * *', async function(){
	

	var dataactualms=new Date().getTime();
// falta a comparacao
		var procurajobcards = await maintenance_db.find({jobcard_jobtype:"Callout", jobcard_estadoactual:"On route", jobcard_estimadadatachegadams:{$exists:true}, jobcard_estimadadatachegadams:{$lte:dataactualms}}, {jobcard_loggedby:1, jobcard_siteid:1, jobcard_ttnumber:1, jobcard_site:1, jobcard_ttnumber:1, jobcard_tecniconome:1}, async function(err, data){
			if(err){
	    		console.log(err);
			}else{
				console.log(data)
				console.log("Find Jobcards");
			}
		}).lean();
				
		if(procurajobcards.length != 0){
			// console.log(procurajobcards)
			await procurajobcards.reduce(async function(contjobcards, idiota, i){
				await contjobcards;
				await sleep(10);

				console.log(procurajobcards)

				var procuracallcenter = await usuario_db.find({funcao:"Call Center"}, {idioma:1, email:1, nome:1}, function(err,dataUser){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{
						console.log("Find User")

					}
				}).lean();

				var mailrecip = [];
				for(var j=0; j<procuracallcenter.length; j++){
					mailrecip.push(procuracallcenter[j].email);
				}

				var procurasiteinfo = await siteinfo_db.findOne({_id:procurajobcards[i].jobcard_siteid}, {siteinfo_sitename:1}, function(err,dataUser){
					if(err){
						console.log("ocorreu um erro ao tentar aceder os dados")
					}else{
						console.log("Find User")

					}
				}).lean();

				emailSender.createConnection();
				emailSender.sendEmailCallCenterHoraestimada(procurajobcards[i], mailrecip, procurasiteinfo);

			}, 0);
		}
		
			

}, null, true, "Africa/Maputo");

email_callcenter.start();

exports.emailtocallcenter = email_callcenter;