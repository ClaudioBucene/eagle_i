var express=require("express")
var router=express.Router();
var sisadmin_db=require("../entities/sisadmin");
var user_db=require("../entities/usuario");
var multer=require("multer")

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
	var useData=req.session.usuario;
	var Pacote_admin= await sisadmin_db.find();

res.render("sisadmin_resumo", {DataU:useData,  title:"Eaglei"});


})


router.get("/department_sysadmin", async(req, res)=>{
	var userData=await req.session.usuario;
	var departmentos= await sisadmin_db.find({});

	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_department_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	else
		res.redirect("/inicio");
})


router.get("/funcoes_sysadmin", async(req, res)=>{
	var userData=await req.session.usuario;
	var departmentos= await sisadmin_db.find({});

	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_funcoes_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	else
		res.redirect("/inicio");
})

router.get("/module_sysadmin", async(req, res)=>{
	var userData=await req.session.usuario;
	var departmentos= await sisadmin_db.find({});

	if(userData.nivel_acesso=="admin")

		res.render("sisadmin_module_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	else
		res.redirect("/inicio");
})

router.get("/province_sysadmin", async(req, res)=>{
	var userData=await req.session.usuario;
	var departmentos= await sisadmin_db.find({}).lean();

	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_province_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	else
		res.redirect("/inicio");
})


router.get("/vehicle_sysadmin", async(req, res)=>{
	var userData=await req.session.usuario;
	var departmentos= await sisadmin_db.find({});

	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_viatura_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	else
		res.redirect("/inicio");
})


router.get("/regiao_sysadmin", async(req, res)=>{
	var userData=await req.session.usuario;
	var departmentos= await sisadmin_db.find({}).lean();

	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_regiao_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	else
		res.redirect("/inicio");
})


// *********************************************************formularios do admini******************************************************

router.get("/departform", async(req, res)=>{
	var userData=await req.session.usuario;
	

	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_department_form", {DataU:userData,  title:"Eaglei"})
	else
		res.redirect("/inicio");
})

router.post("/departform", upload.any(), async(req, res)=>{
	console.log(req.body)

	var userData=await req.session.usuario;

	if(userData.nivel_acesso=="admin")
	{
		var packet=await req.body;
		var temporary=await user_db.find({nome:req.body.chefe_depart});
		if(temporary.length>0)
		packet.chefe_depart_id=await temporary[0]._id;
		packet.registado_por=await userData.nome;
		packet.status= await "activo";
	
		var teste=await sisadmin_db.find({});
		if(teste.length>0){
			if(temporary.length>0)
			await sisadmin_db.updateOne({_id:teste[0].id}, {$push:{departamento:packet}})
			res.json({teste:"done"})
	
		}
	
		else
		{
			var ff=await {}
			ff.departamento=await [packet];
			if(temporary.length>0)
			sisadmin_db.gravar_admin(ff, function(err){
				if(err)
					console.log("ocrreu um erro ao tentar gravar siste")
				else
					console.log("dados gravados com sucesso!")
			})
	
			res.json({teste:"done"})
		}
	
	}
	res.redirect("/inicio");

	// res.json({teste:"done"})
})


router.get("/departdetalhes/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();

			if(depart[0].departamento.findIndex(x=>x._id==req.params.id)!=-1){
						var alvo=await depart[0].departamento[depart[0].departamento.findIndex(x=>x._id==req.params.id)]
						console.log(alvo);
			
						res.render("sisadmin_department_detalhes",{Depp:alvo, DataU:userData, title:"Eaglei"})
			}
			else
				res.redirect("/inicio")

		}
	else
		res.redirect("/inicio");
})


router.get("/departdetele/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{

			var depart=await sisadmin_db.find({}).lean();
			await sisadmin_db.updateOne({_id:depart[0]._id, departamento:{$elemMatch:{_id:req.params.id}} },{$set:{"departamento.$.status":"anactivo"}})
			
			var userData=await req.session.usuario;
			var departmentos= await sisadmin_db.find({});

	
		res.render("sisadmin_department_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	


		}
	else
		res.redirect("/inicio");
})

router.get("/departeditr/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();
			var alvo=await depart[0].departamento[depart[0].departamento.findIndex(x=>x._id==req.params.id)]
			console.log(alvo);

			res.render("sisadmin_department_editar",{Depp:alvo, DataU:userData, title:"Eaglei"})


		}
	else
		res.redirect("/inicio");
})


router.post("/editar_depart", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var temporary=await user_db.find({nome:req.body.chefe_depart});

	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());

	var todo=await sisadmin_db.find();
	if(temporary.length>0)
		await sisadmin_db.updateOne({_id:todo[0]._id, departamento:{$elemMatch:{_id:req.body.idioty}}}, {"departamento.$.nome":req.body.nome,"departamento.$.chefe_depart_id":temporary[0]._id, "departamento.$.limite_mensal":req.body.limite_mensal, "departamento.$.chefe_depart":req.body.chefe_depart, "departamento.$.limite_po":req.body.limite_po,"departamento.$.editado_por":userData.nome,"departamento.$.data_edicao":edd })
	res.json({teste:"done"})


	



})


// --------------------------------------------------------funcoes----*-*-*-*-*-*-*-*-*-*-*-*--*--*----


router.get("/funcoesform", async(req, res)=>{
	var userData=await req.session.usuario;
	
	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_funcoes_form", {DataU:userData,  title:"Eaglei"})
	else
		res.redirect("/inicio");
})

// router.post("/functionform", upload.any(), async(req, res)=>{
// 	console.log(req.body)

// 	res.json({teste:"done"})
// })

router.post("/functionform", upload.any(), async(req, res)=>{
	console.log(req.body)

	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
	{
		var packet=await req.body;
		packet.registado_por=await userData.nome;
		packet.status= await "activo";
	
		var teste=await sisadmin_db.find({});
		if(teste.length>0){
			await sisadmin_db.updateOne({_id:teste[0].id}, {$push:{funcao:packet}})
			res.json({teste:"done"})
	
		}
	
		else
			{
			var ff=await {}
			ff.funcao=await [packet];
			sisadmin_db.gravar_admin(ff, function(err){
				if(err)
					console.log("ocrreu um erro ao tentar gravar siste")
				else
					console.log("dados gravados com sucesso!")
			})
	
			res.json({teste:"done"})
		}
	
	}
	res.redirect("/inicio");

	// res.json({teste:"done"})
})


router.get("/funcoaedetalhes/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();

			if(depart[0].funcao.findIndex(x=>x._id==req.params.id)!=-1){
						var alvo=await depart[0].funcao[depart[0].funcao.findIndex(x=>x._id==req.params.id)]
						console.log(alvo);
			
						res.render("sisadmin_funcoes_detalhes",{Depp:alvo, DataU:userData, title:"Eaglei"})
			}
			else
				res.redirect("/inicio")

		}
	else
		res.redirect("/inicio");
})




router.get("/functioneditr/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();
			var alvo=await depart[0].funcao[depart[0].funcao.findIndex(x=>x._id==req.params.id)]
			console.log(alvo);

			res.render("sisadmin_functon_editar",{Depp:alvo, DataU:userData, title:"Eaglei"})


		}
	else
		res.redirect("/inicio");
})


router.post("/editar_function", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());

	var todo=await sisadmin_db.find();

	await sisadmin_db.updateOne({_id:todo[0]._id, funcao:{$elemMatch:{_id:req.body.idioty}}}, {"funcao.$.nome":req.body.nome, "funcao.$.editado_por":userData.nome,"funcao.$.data_edicao":edd })
	res.json({teste:"done"})
})

router.get("/functiondetele/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{

			var depart=await sisadmin_db.find({}).lean();
			await sisadmin_db.updateOne({_id:depart[0]._id, funcao:{$elemMatch:{_id:req.params.id}} },{$set:{"funcao.$.status":"anactivo"}})
			
			var userData=await req.session.usuario;
			var departmentos= await sisadmin_db.find({});

	
		res.render("sisadmin_funcoes_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	


		}
	else
		res.redirect("/inicio");
})

// --------------------------------------------------------Modulos de acesso----*-*-*-*-*-*-*-*-*-*-*-*--*--*----


router.get("/moduleform", async(req, res)=>{
	var userData=await req.session.usuario;
	
	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_module_form", {DataU:userData,  title:"Eaglei"})
	else
		res.redirect("/inicio");
})

// router.post("/functionform", upload.any(), async(req, res)=>{
// 	console.log(req.body)

// 	res.json({teste:"done"})
// })

router.post("/moduleform", upload.any(), async(req, res)=>{
	console.log(req.body)

	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
	{
		var packet=await req.body;
		packet.registado_por=await userData.nome;
		packet.status= await "activo";
	
		var teste=await sisadmin_db.find({});
		if(teste.length>0){
			await sisadmin_db.updateOne({_id:teste[0].id}, {$push:{nivel_acesso:packet}})
			res.json({teste:"done"})
	
		}
	
		else
			{
			var ff=await {}
			ff.nivel_acesso=await [packet];
			sisadmin_db.gravar_admin(ff, function(err){
				if(err)
					console.log("ocrreu um erro ao tentar gravar siste")
				else
					console.log("dados gravados com sucesso!")
			})
	
			res.json({teste:"done"})
		}
	
	}
	res.redirect("/inicio");

	// res.json({teste:"done"})
})


router.get("/moduledetalhes/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();

			if(depart[0].nivel_acesso.findIndex(x=>x._id==req.params.id)!=-1){
						var alvo=await depart[0].nivel_acesso[depart[0].nivel_acesso.findIndex(x=>x._id==req.params.id)]
						console.log(alvo);
			
						res.render("sisadmin_module_detalhes",{Depp:alvo, DataU:userData, title:"Eaglei"})
			}
			else
				res.redirect("/inicio")

		}
	else
		res.redirect("/inicio");
})




router.get("/moduleeditr/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();
			var alvo=await depart[0].nivel_acesso[depart[0].nivel_acesso.findIndex(x=>x._id==req.params.id)]
			console.log(alvo);

			res.render("sisadmin_module_editar",{Depp:alvo, DataU:userData, title:"Eaglei"})


		}
	else
		res.redirect("/inicio");
})


router.post("/editar_module", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());

	var todo=await sisadmin_db.find();

	await sisadmin_db.updateOne({_id:todo[0]._id, nivel_acesso:{$elemMatch:{_id:req.body.idioty}}}, {"nivel_acesso.$.nome":req.body.nome, "nivel_acesso.$.editado_por":userData.nome,"nivel_acesso.$.data_edicao":edd })
	res.json({teste:"done"})
})

router.get("/moduledetele/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{

			var depart=await sisadmin_db.find({}).lean();
			await sisadmin_db.updateOne({_id:depart[0]._id, nivel_acesso:{$elemMatch:{_id:req.params.id}} },{$set:{"nivel_acesso.$.status":"anactivo"}})
			
			var userData=await req.session.usuario;
			var departmentos= await sisadmin_db.find({});

	
		res.render("sisadmin_module_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
	


		}
	else
		res.redirect("/inicio");
})

// ************************************************************Provincias*********-*-*-**-*--***-**-**--**-**-*-**--*--*-*-***


router.get("/provinciaform", async(req, res)=>{
	var userData=await req.session.usuario;
	
	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_province_form", {DataU:userData,  title:"Eaglei"})
	else
		res.redirect("/inicio");
})

// router.post("/functionform", upload.any(), async(req, res)=>{
// 	console.log(req.body)

// 	res.json({teste:"done"})
// })

router.post("/provinceform", upload.any(), async(req, res)=>{
	console.log(req.body)

	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
	{
		var packet=await req.body;
		packet.registado_por=await userData.nome;
		packet.status= await "activo";
	
		var teste=await sisadmin_db.find({});
		if(teste.length>0){
			await sisadmin_db.updateOne({_id:teste[0].id}, {$push:{provincia:packet}})
			res.json({teste:"done"})
	
		}
	
		else
			{
			var ff=await {}
			ff.provincia=await [packet];
			await sisadmin_db.gravar_admin(ff, function(err){
				if(err)
					console.log("ocrreu um erro ao tentar gravar siste")
				else
					console.log("dados gravados com sucesso!")
			})
	
			res.json({teste:"done"})
		}
	
	}
	res.redirect("/inicio");

	// res.json({teste:"done"})
})


router.get("/provncrdetalhes/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();

			if(depart[0].provincia.findIndex(x=>x._id==req.params.id)!=-1){
						var alvo=await depart[0].provincia[depart[0].provincia.findIndex(x=>x._id==req.params.id)]
						console.log(alvo);
			
						res.render("sisadmin_province_detalhes",{Depp:alvo, DataU:userData, title:"Eaglei"})
			}
			else
				res.redirect("/inicio")

		}
	else
		res.redirect("/inicio");
})




router.get("/provinceeditr/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();
			var alvo=await depart[0].provincia[depart[0].provincia.findIndex(x=>x._id==req.params.id)]
			console.log(alvo);

			res.render("sisadmin_province_editar",{Depp:alvo, DataU:userData, title:"Eaglei"})


		}
	else
		res.redirect("/inicio");
})


router.post("/editar_province", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());

	var todo=await sisadmin_db.find();

	await sisadmin_db.updateOne({_id:todo[0]._id, provincia:{$elemMatch:{_id:req.body.idioty}}}, {"provincia.$.nome":req.body.nome, "provincia.$.nome_supervisor":req.body.nome_supervisor,"provincia.$.regiao":req.body.regiao, "provincia.$.editado_por":userData.nome,"provincia.$.data_edicao":edd })
	res.json({teste:"done"})
})


router.get("/provincedetele/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{

			var depart=await sisadmin_db.find({}).lean();
			await sisadmin_db.updateOne({_id:depart[0]._id, provincia:{$elemMatch:{_id:req.params.id}} },{$set:{"provincia.$.status":"anactivo"}})
			
			var userData=await req.session.usuario;
			var departmentos= await sisadmin_db.find({});

		res.render("sisadmin_province_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
		

		}
	else
		res.redirect("/inicio");
})

// *************************************************************************Regiao***********************************************************************

router.get("/regiaoform", async(req, res)=>{
	var userData=await req.session.usuario;
	
	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_regiao_form", {DataU:userData,  title:"Eaglei"})
	else
		res.redirect("/inicio");
})

// router.post("/functionform", upload.any(), async(req, res)=>{
// 	console.log(req.body)

// 	res.json({teste:"done"})
// })

router.post("/regionform", upload.any(), async(req, res)=>{
	console.log(req.body)

	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
	{
		var packet=await req.body;
		packet.registado_por=await userData.nome;
		packet.status= await "activo";
	
		var teste=await sisadmin_db.find({});
		if(teste.length>0){
			await sisadmin_db.updateOne({_id:teste[0].id}, {$push:{regiao:packet}})
			res.json({teste:"done"})
	
		}
	
		else
			{
			var ff=await {}
			ff.regiao=await [packet];
			await sisadmin_db.gravar_admin(ff, function(err){
				if(err)
					console.log("ocrreu um erro ao tentar gravar siste")
				else
					console.log("dados gravados com sucesso!")
			})
	
			res.json({teste:"done"})
		}
	
	}
	res.redirect("/inicio");

	// res.json({teste:"done"})
})


router.get("/regyondetalhes/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();

			if(depart[0].regiao.findIndex(x=>x._id==req.params.id)!=-1){
						var alvo=await depart[0].regiao[depart[0].regiao.findIndex(x=>x._id==req.params.id)]
						console.log(alvo);
			
						res.render("sisadmin_region_detalhes",{Depp:alvo, DataU:userData, title:"Eaglei"})
			}
			else
				res.redirect("/inicio")

		}
	else
		res.redirect("/inicio");
})




router.get("/editar_regionns/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();
			var alvo=await depart[0].regiao[depart[0].regiao.findIndex(x=>x._id==req.params.id)]
			console.log(alvo);

			res.render("sisadmin_regiao_editar",{Depp:alvo, DataU:userData, title:"Eaglei"})


		}
	else
		res.redirect("/inicio");
})


router.post("/editar_region", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());

	var todo=await sisadmin_db.find();

	await sisadmin_db.updateOne({_id:todo[0]._id, regiao:{$elemMatch:{_id:req.body.idioty}}}, {"regiao.$.nome":req.body.nome, "regiao.$.regional_manager":req.body.regional_manager, "regiao.$.editado_por":userData.nome,"regiao.$.data_edicao":edd })
	res.json({teste:"done"})
})

router.get("/regyondetele/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{

			var depart=await sisadmin_db.find({}).lean();
			await sisadmin_db.updateOne({_id:depart[0]._id, regiao:{$elemMatch:{_id:req.params.id}} },{$set:{"regiao.$.status":"anactivo"}})
			
			var userData=await req.session.usuario;
			var departmentos= await sisadmin_db.find({});

		res.render("sisadmin_regiao_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
		

		}
	else
		res.redirect("/inicio");
})

// *****************************************************************************Viaturas***************************************************************


router.get("/vehicleform", async(req, res)=>{
	var userData=await req.session.usuario;
	
	if(userData.nivel_acesso=="admin")
		res.render("sisadmin_viatura_form", {DataU:userData,  title:"Eaglei"})
	else
		res.redirect("/inicio");
})

// router.post("/functionform", upload.any(), async(req, res)=>{
// 	console.log(req.body)

// 	res.json({teste:"done"})
// })

router.post("/vehichleform", upload.any(), async(req, res)=>{
	console.log(req.body)

	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
	{
		var packet=await req.body;
		packet.registado_por=await userData.nome;
		packet.status= await "activo";
	
		var teste=await sisadmin_db.find({});
		if(teste.length>0){
			await sisadmin_db.updateOne({_id:teste[0].id}, {$push:{viatura:packet}})
			res.json({teste:"done"})
	
		}
	
		else
			{
			var ff=await {}
			ff.viatura=await [packet];
			await sisadmin_db.gravar_admin(ff, function(err){
				if(err)
					console.log("ocrreu um erro ao tentar gravar siste")
				else
					console.log("dados gravados com sucesso!")
			})
	
			res.json({teste:"done"})
		}
	
	}
	res.redirect("/inicio");

	// res.json({teste:"done"})
})


router.get("/detalhes_viat/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();

			if(depart[0].viatura.findIndex(x=>x._id==req.params.id)!=-1){
						var alvo=await depart[0].viatura[depart[0].viatura.findIndex(x=>x._id==req.params.id)]
						console.log(alvo);
			
						res.render("sisadmin_viaturas_detalhes",{Depp:alvo, DataU:userData, title:"Eaglei"})
			}
			else
				res.redirect("/inicio")

		}
	else
		res.redirect("/inicio");
})




router.get("/editar_viat/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{
			var depart=await sisadmin_db.find({}).lean();
			var alvo=await depart[0].viatura[depart[0].viatura.findIndex(x=>x._id==req.params.id)]
			console.log(alvo);

			res.render("sisadmin_viaturas_editar",{Depp:alvo, DataU:userData, title:"Eaglei"})


		}
	else
		res.redirect("/inicio");
})


router.post("/editar_viaturs", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());

	var todo=await sisadmin_db.find();

	await sisadmin_db.updateOne({_id:todo[0]._id, viatura:{$elemMatch:{_id:req.body.idioty}}}, {"viatura.$.marca":req.body.marca, "viatura.$.modelo":req.body.modelo, "viatura.$.editado_por":userData.nome,"viatura.$.data_edicao":edd })
	res.json({teste:"done"})
})

router.get("/vehicledetele/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	


	

	if(userData.nivel_acesso=="admin")
		{

			var depart=await sisadmin_db.find({}).lean();
			await sisadmin_db.updateOne({_id:depart[0]._id, viatura:{$elemMatch:{_id:req.params.id}} },{$set:{"viatura.$.status":"anactivo"}})
			
			var userData=await req.session.usuario;
			var departmentos= await sisadmin_db.find({});

		res.render("sisadmin_viatura_home", {DataU:userData, Departamenttos:departmentos, title:"Eaglei"})
		

		}
	else
		res.redirect("/inicio");
})


module.exports=router

