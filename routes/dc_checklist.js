var express=require("express");
var router=express.Router();
var dc_db=require("../entities/dc_site_insp");
var multer = require('multer');
var site_info_db=require("../entities/siteinfo");
var path = require("path");
const e = require("express");
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


 router.get("/", async(req, res)=>{
 	var userData= req.session.usuario;

 	if(userData.nivel_acesso=="admin")
		dc_db.find({}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("dc_insp_home", {DataU:userData, DC_insp:data, title:"EagleI"})
		}

			})
 	
 })


 router.get("/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await site_info_db.find({$or:[{siteinfo_sitenum:1421}, {siteinfo_sitenum:1551}, {siteinfo_sitenum:2000},{siteinfo_sitenum:2504},{siteinfo_sitenum:5506},{siteinfo_sitenum:6310},{siteinfo_sitenum:4003}]}).select({siteinfo_sitenum:1,siteinfo_sitename:1}).sort({siteinfo_sitenum:1}).lean();
 	console.log(sites)

	res.render("dc_insp_form", {DataU:userData, DC_insp:sites, title:"EagleI"})
 })

router.post("/novo", upload.any(), async(req, res)=>{
	var userData=await req.session.usuario;
	var este=await {};
	
	let inicio=await req.body.inicio_data.split("/").reverse().join("-");
	let inicio1=await inicio+"T02:30:00";
	let fim=await req.body.data_final.split("/").reverse().join("-");
	let fim1=await (fim+"T23:30:00");
	este.from= new Date(inicio1);
	este.to= new Date(fim1);
	este.site_number=await req.body.site_number;
	este.site_name=await  req.body.site_name;
	este.created_by=await userData.nome;

	var criado=await dc_db.create(este);
	console.log(criado);

	res.json({feito:"feito"})
});


router.get("/detalhes/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();


	res.render("dc_insp_detalhes", {DataU:userData, DC_insp:alvo1, title:"EagleI"})



})

router.get("/accesscontrol/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_acess_controle_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})



router.get("/assinatura/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_asinatura", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/bms/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_bms_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/pdu/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_pdu_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/hvac/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_hvac_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/hvac/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_hvac_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})


router.get("/ups/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_ups_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})


router.get("/retifier/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_retifier_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})
router.get("/firecontrol/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_fire_control_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/generator/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_generator_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/civil/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_civil_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})

router.get("/lights/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var alvo=await req.params.id;
	var alvo1=await dc_db.findOne({_id:alvo}).lean();
	res.render("dc_lights_home", {DataU:userData, DC_insp:alvo1, title:"EagleI"})

})


 router.get("/accesss_control/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})

			
 	
 })

 router.get("/civil/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_civil_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})

			
 	
 })

  router.get("/generator/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_generator_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"}) 	
 })

  router.get("/fire_control/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_insp_firecontrol_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})
 })

   router.get("/bms/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_bms_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})

			
 	
 })

   router.get("/ups/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_ups_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})			
 	
 })

router.get("/pdu/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_pdu_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})			
 	
 })

     router.get("/hvac/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_hvac_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})

			
 	
 })

      router.get("/lights/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_light_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})

			
 	
 })

router.get("/retifier/:id/novo", async(req, res)=>{
 	var userData= req.session.usuario;
 	var sites=await dc_db.findOne({_id:req.params.id}).lean();

		res.render("dc_retifier_form", {DataU:userData, DC_insp:sites, DC:{}, title:"EagleI"})

			
 	
 })

  router.get("/accesss_control/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.access_control.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.access_control[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, DC:alvo.access_control[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

   router.get("/bms/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.bms.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.bms[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_bms_form", {DataU:userData, DC_insp:sites, DC:alvo.bms[index] ,title:"EagleI"})
	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})	
 })

  router.get("/fire_control/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.fire_panel.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.fire_panel[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_insp_firecontrol_form", {DataU:userData, DC_insp:sites, DC:alvo.fire_panel[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

  router.get("/ups/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.ups.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.ups[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_ups_form", {DataU:userData, DC_insp:sites, DC:alvo.ups[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })


    router.get("/hvac/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.hvac.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.hvac[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_hvac_form", {DataU:userData, DC_insp:sites, DC:alvo.hvac[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

        router.get("/lights/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.lights.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.lights[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_light_form", {DataU:userData, DC_insp:sites, DC:alvo.lights[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

      router.get("/civil/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.civil.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.civil[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_civil_form", {DataU:userData, DC_insp:sites, DC:alvo.civil[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

          router.get("/lights/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.lights.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.lights[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_light_form", {DataU:userData, DC_insp:sites, DC:alvo.lights[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

        router.get("/generator/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.generator_A_B.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.generator_A_B[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_generator_form", {DataU:userData, DC_insp:sites, DC:alvo.generator_A_B[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

    router.get("/pdu/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.pdu.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.pdu[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_pdu_form", {DataU:userData, DC_insp:sites, DC:alvo.pdu[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

    router.get("/retifier/detalhes/:id1/:id2", async(req, res)=>{
 	var userData= req.session.usuario;
 	var alvo =await dc_db.findOne({_id:req.params.id1}).lean();
 	console.log(alvo);

 	var index=await alvo.retifier.findIndex(x=>x._id==req.params.id2);
 	console.log(alvo.retifier[index])
 	var sites=await dc_db.findOne({_id:req.params.id1}).lean();

 	res.render("dc_retifier_form", {DataU:userData, DC_insp:sites, DC:alvo.retifier[index] ,title:"EagleI"})

 	

	// res.render("dc_insp_acess_form", {DataU:userData, DC_insp:sites, title:"EagleI"})

			
 	
 })

 router.post("/accesss_control/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{access_control:este}});

 	res.json({feito:"done"})

			
 	
 })

  router.post("/bms/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{bms:este}});

 	res.json({feito:"done"})

			
 	
 })

   router.post("/civil/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{civil:este}});

 	res.json({feito:"done"})

			
 	
 })

    router.post("/hvac/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{hvac:este}});

 	res.json({feito:"done"})

			
 	
 })




 router.post("/firepanel/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{fire_panel:este}});

 	res.json({feito:"done"})

			
 	
 })

 router.post("/ups/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{ups:este}});

 	res.json({feito:"done"})

			
 	
 })

  router.post("/generator/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{generator_A_B:este}});

 	res.json({feito:"done"})

			
 	
 })

  router.post("/lights/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{lights:este}});

 	res.json({feito:"done"})		
 	
 })

  router.post("/retifier/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{retifier:este}});

 	res.json({feito:"done"})

			
 	
 })
    router.post("/pdu/:id/novo", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	if(Object.values(req.body).includes('not ok')) {
 		este=await {...req.body, observacao:'red', done_by:userData.nome, done_on:dataa} 
	}
	else
		este=await {...req.body, observacao:'green', done_by:userData.nome, done_on:dataa} 
	console.log(este);
 	var tettt=await dc_db.updateOne({_id:req.params.id},{$push:{pdu:este}});

 	res.json({feito:"done"})

			
 	
 })

  router.post("/gravarAssinatura", upload.any(), async(req, res)=>{
 	var userData= await req.session.usuario;
 	var este;
 	var dataa=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	

 	
 	var tettt=await dc_db.updateOne({_id:req.body.jobcard_id},{signature:req.body.chegou});

 	res.json({feito:"done"})		
 	
 })


module.exports=router;