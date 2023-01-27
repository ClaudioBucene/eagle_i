var express = require('express');
var router = express.Router();
var userM=require("../entities/usuario");
var incidente_db=require("../entities/incidente");
var hvac_db=require("../entities/hvac");


/* GET home page. */


router.get('/', function(req, res, next) {
	delete req.session.usuario;
	
  res.render("login", {title:'EAGLEI'});
});

router.post("/change", function(req, res){
	var user1=getUser(req.body)
	if((user1.username!=user1.senha) && (user1.senha.length>=7)){
	userM.findOneAndUpdate({username:user1.username},{$set:{'senha':user1.senha, loged:"sim"}}, function(err, data){
		if(err)
		console.log("erro ao tentar actualizar os mudar o password")
		else
		if(data)
		console.log("Dados actualizados com Sucesso")
		}
		)
		res.render("login")
	}
		else
		userM.findOne({username:user1.username}, function(err, data){
			if(err)
			console.log("ocorreu um erro ao tentar mudar password 2")
			else
			res.render("changeProf", {err:true, greeting:data, message:"your passwords are less than 7 letter or \n they dont match"})
		})
	


})
	
	

router.get("/inicio", function(req, res){
	if(req.session.usuario){
		var userData=req.session.usuario;
		console.log(userData);
		res.render("inicio", {DataU:userData, title: "EAGLEI"})
	}
	else
	res.redirect("/")
})

router.post('/', function(req, res){
	var user1=getUser(req.body)
	console.log(user1);
	userM.findOne(user1, function(err, datta){
		if(err)
			console.log("erro ao tentar aceder o utilizador!!");
		else
			if(datta){

				// ****************************************************
				if(datta.username==datta.senha) {
					res.render("changeProf",{greeting:datta})
				}
				else
				{
				// **********************************************
				incidente_db.find({}, async function(eero, daddds){
					if(eero)
						console.log("ocorreu um erro")
					else
					{	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
						var ano = await daddds[0].data.getFullYear();
						var mes= await  daddds[0].data.getMonth()+1;
						var dia= await daddds[0].data.getDate();
						var horas= await daddds[0].data.getHours();
						var minutos= await daddds[0].data.getMinutes();
						var firstDate =await new Date(ano, mes, dia);
						var secondDate =await new Date();
						console.log(firstDate, secondDate)
						
						var diffDays = await Math.round(Math.abs((firstDate - secondDate) / oneDay));
						var diffDays=ano+"-"+mes+"-"+dia;
						console.log(diffDays)
						
						
						var temp=await {};
						temp.data=await diffDays;
						var pacote= Object.assign(datta, temp)
						pacote.data=await diffDays

						req.session.usuario= await pacote;
						req.session.usuario.data= diffDays;

						var userData=req.session.usuario;
						userData.data=diffDays
						console.log(pacote)
						console.log(temp)
						res.render("inicio", {DataU:userData, title:'EAGLEI'});
						
					}
				}).sort({_id:-1})
				
				
			}
			}
			else
				//res.redirect("/inicio")
				res.render("login",{err:true})
	})
})


function getUser(body){
	var userr= {};
	userr.username=body.username.replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	userr.senha=body.senha.replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	userr.status="activo";
	return userr;

}




// (
// 	async function(){
// 		let gg= await userM.find({});

// 		var tt=await Promise.all(gg.map(async function(e){
// 					await userM.updateOne({funcao:"Call Center"},{$set:{departamento_id:"61728c8c07fec02d40e0ab3e",departamento:"Centro de Suporte de Operações"}, $unset:{departmento:1}})
// 				})
// 		)
// 		console.log(tt)
// 	}
// )()

// (
// 	async function(){
// 		let gg= await hvac_db.find({}).limit(10000);
// 		// console.log(gg);
// 		//jobcard_departamentoid:{$exists:false}
// 		await gg.reduce(async(ac, obj, i)=>{
// 			await ac;
// 			var auditoria=await [];
// 			await Promise.all(obj.audit_trail.map(async(obj1, i1)=>{
// 				let hjs=await {};
// 				hjs.jobcard_audittrailname=await obj1.nome;
// 				hjs.jobcard_audittrailaction=await obj1.acao;
// 				hjs.jobcard_audittraildate=await (obj1.data.getDate()<10? '0'+obj1.data.getDate():obj1.data.getDate())+'/'+((obj1.data.getMonth()+1)<10? ('0'+(obj1.data.getMonth()+1)):(obj1.data.getMonth()+1))+'/'+(obj1.data.getFullYear())+'   '+(obj1.data.getHours()<10? ('0'+obj1.data.getHours()): obj1.data.getHours() )+' : '+(obj1.data.getMinutes()<10? ('0'+obj1.data.getMinutes()):obj1.data.getMinutes());
// 				await auditoria.push(hjs);
// 			})
// 			)
// 			// var h=await [];
// 			// await Promise.all(obj.spares_usados.map(async(obj2, i2)=>{
// 			// 	let hd= await {};
// 			// 	hd.jobcard_itemid = await obj2.referencia
// 			// 	hd.jobcard_item=await obj2.descricao;
// 			// 	hd.jobcard_quantityuse = await obj2.quantidade;
// 			// 	await h.push(hd);
// 			// }))
			
// 			// console.log(obj.jobcard_jobtype)
// 			// if(obj.jobcard_jobtype=="Callout"){
// 			// 	var pp = obj.criado_por;
// 			// }else{
// 			// 	var pp = obj.jobcard_loggedby;
// 			// }
// 			// var t=[];
// 			// console.log(obj.jobcard_jobtype)
// 			// if(obj.jobcard_jobtype=="Callout"){ 
// 			// 	t=[ obj.criado_por, obj.tecnico, "Rogerio Galrito"];
// 			// }else{
// 			// 	t=["Planned", obj.tecnico, "Rogerio Galrito"];
// 			// }
// 			// var te=await hvac_db.updateOne({_id:obj._id},{$set:{jobcard_info:[""], jobcard_departamento:"Climatização e Electricidade", jobcard_hsreason:obj.razao, sparesArrayJobcard:h, data_registojobcard:obj.data_criacao, jobcard_loggedby:pp, jobcard_prioritycomments:[""], jobcard_siteid:obj.filial_ref, jobcard_tecnicoid:obj.tecnico_ref, jobcard_callcenteractions:[""],jobcard_controladorintervenientes:t, jobcard_departamentoid:"611e45e68cd71c1f48cf45bd", jobcard_controlador:obj.controlador, ttnumber_status:obj.status,jobcard_tecniconome:obj.tecnico, jobcard_estadoactual:obj.estadoactual, jobcard_regiao:obj.regiao,jobcard_audittrail:auditoria, jobcard_clientenome:obj.cliente, jobcard_clienteid:obj.cliente_ref, jobcard_priority:obj.prioridade, jobcard_site:obj.filial}});
		
// 			var te=await hvac_db.updateOne({_id:obj._id},{$set:{}});
// 		},0)

// 		// var tt=await Promise.all(gg.map(async function(e){
// 		// 			await userM.updateOne({funcao:"Call Center"},{$set:{departamento_id:"61728c8c07fec02d40e0ab3e",departamento:"Centro de Suporte de Operações"}, $unset:{departmento:1}})
// 		// 		})
// 		// )
// 		// console.log(tt)
// 	}
// )()


module.exports = router;


