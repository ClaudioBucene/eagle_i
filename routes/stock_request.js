var express=require("express");
var router = express.Router();
var stock_request_db=require("../entities/stock_request");
var armazem_db=require("../entities/armazem");
var usuario_db=require("../entities/usuario");
var stock_item_db=require("../entities/stock_item");
var dados_provinciais = require('../util/provincias-distritos');
var stock_pessoal_db=require("../entities/stock_pessoal");
var armazem_trans_db=require("../entities/armazem_transferencias");
var rastreio_stock_db=require("../entities/rastreio");
var stock_req_history_db=require("../entities/stock_request_history");
var admin_db=require("../entities/sisadmin");
var multer = require('multer');
var path = require("path");
const e = require("express");
var emailSender=require('../util/sendEmail');
// emailSender.createConnection();
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


// (async  function(){
// 	var find_all= await stock_request_db.find({$or:[{actual_situation:"Recebido"},{actual_situation:"Expedido"}]}).lean();
// 	console.log(JSON.stringify(find_all))
// 	find_all.reduce(async(ac, obj, i)=>{
// 		await ac;
// 		await sleep(120);

// 		await obj.items.reduce(async(ac1, obj1, i1)=>{
// 			await ac1;
// 			await sleep(80)
			
// 			if((obj1.received && obj1.booked_out!=obj1.received && obj1.booked_out)|| (!obj1.received && obj1.booked_out)){
// 				if(obj1.received && obj1.booked_out!=obj1.received)
// 				{	if(obj1.received!="NaN")
// 					var quant_rece=await parseInt(obj1.booked_out)-parseInt(obj1.received);
// 					if(obj1.received=="NaN"){
// 						var quant_rece=await 0;
// 					}
// 					if(obj1.received==""){
// 						var quant_rece=await 0;
// 					}

// 				}
				
// 			if(!obj1.received)	
// 				var quant_rece=await parseInt(obj1.booked_out);

// 				var enco_item=await stock_item_db.findOne({_id:obj1.referencia})

// var acress=await {};
// acress.num_serie=await obj1.num_serie;
// acress.cliente_name=await obj1.cliente_name;
// acress.description_item=await obj1.description;
// acress.referencia=await obj1.referencia;
// acress.disponivel=await quant_rece;
// acress.grupo=await enco_item.grupo;
// // acress.cliente_name=await obj1.cliente_name;
// var pesron=await {}
// pesron.nome=await obj.requested_by;
// pesron.nome_ref=await obj.requested_by_ref;
// pesron.nome=await obj.requested_by;
// pesron.disponibilidade=await [];
// await pesron.disponibilidade.push(acress);

// await stock_request_db.updateOne({_id:obj._id , items:{$elemMatch:{referencia:obj1.referencia}}}, { $set:{ "items.$.received":quant_rece, "items.$.data_recepcao":new Date()}})


// 	var tyhd=await stock_pessoal_db.updateOne({nome_ref:obj.requested_by_ref, disponibilidade:{$elemMatch:{referencia:obj1.referencia}}},{$inc:{"disponibilidade.$.disponivel":quant_rece}, $push:{"disponibilidade.$.num_serie":{$each:obj1.num_serie}}})



// if(tyhd.n==0){
// 	var fori_feito=await stock_pessoal_db.updateOne({nome_ref:obj.requested_by_ref, "disponibilidade.referencia":{$ne:obj1.referencia}}, {$push:{disponibilidade:acress}})
// 	if(fori_feito.n==0)
// 		stock_pessoal_db.gravar_stock_pessoal(pesron, function(irr, feito){
// 					if(irr)
// 						console.log("ocorreu um erro ao gravar stock!!")
// 					else
// 						console.log("historico gravado com sucesso!!")
// 						})


// }
// 	// await stock_pessoal_db.updateOne({nome_ref:dados.requested_by_ref, "disponibilidade.referencia":{$ne:dados.items[i].referencia}}, {$push:{disponibilidade:stock_recebido.disponibilidade[i]}})

// 	await rastreio_stock_db.updateMany({serial_number:{$in:obj1.num_serie}}, {$push:{ref_local_actual:obj.requested_by_ref,  local_actual:obj.requested_by, meio_atribuicao:"Received", atribuidores:obj.requested_by, datas_local_actual:new Date()}})

// stock_req_history_db.gravar_historico({beneficiario:obj.requested_by, beneficiario_ref: obj.requested_by_ref, departamento:obj.department, request_from:obj.request_from, request_from_ref:obj.request_from_ref, ref_Item:obj1.referencia, numero:obj.stocK_request_number, quantidade:quant_rece, nome_item:obj1.description, serialized:obj1.serialized, cliente_name:obj1.cliente_name}, function(errp, d){
// 				 			if(errp)
// 				 				console.log("ocorreu um erro ao tentar gravar historico")
// 				 			else
// 				 				console.log("Historico gravado com sucesso!!")
// 				 		})
						


// 			}


// 		}, 0)


// 	}, 0)

// 	return 0;
// })()





router.get("/", function(req, res){
	var userData= req.session.usuario;

	stock_request_db.find({}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	})
})


router.get("/home", function(req, res){
	
var userData= req.session.usuario;

res.render("stock_resumo", {DataU:userData, title:"EagleI"})
	
})


router.get("/stock_pessoal", function(req, res){
	
var userData= req.session.usuario;
if(userData.nivel_acesso=="admin"){
	stock_request_db.find({requested_by:userData.nome, estagio:{$size:1}}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})		

		}
		else

		stock_request_db.find({requested_by:userData.nome, estagio:{$size:1}}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
				}
			}).sort({date_request:-1})		
})



router.get("/expedientes", function(req, res){
	
var userData= req.session.usuario;
if(userData.nivel_acesso=="admin" || userData.funcao_id=="627e4995cba3d2105c26ed34" || userData.funcao_id=="611e3b3d6ed713019c50cf79"){
	stock_request_db.find({ estagio:{$size:1}, actual_situation:{$ne:"aprovado"}, returned_reason:{$exists:false} }, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})		

}
else
	if(userData.funcao_id=="611e2b8cf9b1b31cd868a30c"){
		stock_request_db.find({$or:[{ estagio:{$size:1}, intervenientes:{$in:[userData.nome]}, regiao:userData.regiao,   date_request:{$lt:new Date("2022-06-22T21:00")} },{ $or:[{estagio:{$size:1}, "intervenientes.1":userData.nome},{estagio:{$size:2}, "intervenientes.2":userData.nome}], returned_reason:{$exists:false}, regiao:userData.regiao, departamento_ref:userData.departamento_id,  date_request:{$gt:new Date("2022-06-22T21:00")} }]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})	

	}
	else 
	if(userData.funcao_id=="627e49eacba3d2105c26ed35" || userData.funcao_id=="627e4995cba3d2105c26ed34"){
	stock_request_db.find({$or:[{estagio:{$size:1}, "intervenientes.1":userData.nome,   date_request:{$lt:new Date("2022-06-22T21:00")}}, {$or:[{$or:[{estagio:{$size:1}, "intervenientes.1":userData.nome, intervenientes:{$in:[userData.nome]}},{estagio:{$size:2},"estagio.1":1, "intervenientes.2":userData.nome, intervenientes:{$in:[userData.nome]}}]}], date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})		


}

	else

		stock_request_db.find({$or:[{"intervenientes.1":userData.nome, estagio:{$size:1}, returned_reason:{$exists:false}, date_request:{$lt:new Date("2022-06-22T21:00")} },{ $or:[{estagio:{$size:1}, "intervenientes.1":userData.nome},{estagio:{$size:2},"intervenientes.2":userData.nome}] ,  returned_reason:{$exists:false}, date_request:{$gt:new Date("2022-06-22T21:00")} }]}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
				}
			}).sort({date_request:-1})		
})




router.get("/aprovados", function(req, res){
	
var userData= req.session.usuario;
if(userData.nivel_acesso=="admin" || userData.funcao_id=="627e4995cba3d2105c26ed34"){
stock_request_db.find({$or:[{"estagio.1":1,  "estagio.3":{$exists:false},   date_request:{$lt:new Date("2022-06-22T21:00")}},{"estagio.1":1,  "estagio.3":{$exists:false},   date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})	
}
else
if(userData.funcao_id=="611e2b8cf9b1b31cd868a30c" ){
	stock_request_db.find({$or:[{"estagio.1":1,  "estagio.3":{$exists:false}, regiao:userData.regiao, departamento_ref:userData.departamento_id,  date_request:{$lt:new Date("2022-06-22T21:00")}}, {"estagio.2":1,  "estagio.4":{$exists:false}, regiao:userData.regiao, departamento_ref:userData.departamento_id,  date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})	


}
else 
	if(userData.funcao_id=="627e49eacba3d2105c26ed35" || userData.funcao_id=="627e4995cba3d2105c26ed34"){
	stock_request_db.find({$or:[{"estagio.1":1,  "estagio.3":{$exists:false}, departamento_ref:userData.departamento_id, date_request:{$lt:new Date("2022-06-22T21:00")}},{"estagio.2":1,  "estagio.4":{$exists:false}, intervenientes:{$in:[userData.nome]}, date_request:{$gt:new Date("2022-06-22T21:00")}},{"estagio.3":1,  "estagio.4":{$exists:false}, intervenientes:{$in:[userData.nome]}, date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})	


}
else
stock_request_db.find({$or:[{"estagio.1":1, $or:[{intervenientes:{$in:[userData.nome]}}, {responsaveis_arrmazem:{$in:[userData.nome]}}], "estagio.3":{$exists:false},  date_request:{$lt:new Date("2022-06-22T21:00")}}, {"estagio.2":1, $or:[{intervenientes:{$in:[userData.nome]}}, {responsaveis_arrmazem:{$in:[userData.nome]}}], "estagio.4":{$exists:false},  date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})	
})

router.get("/finalizados", function(req, res){
	
var userData= req.session.usuario;

if(userData.nivel_acesso=="admin"){
	stock_request_db.find({$or:[{$or:[{"estagio.1":0}, {"estagio.3":{$exists:true}}], date_request:{$lt:new Date("2022-06-22T21:00")}},{$or:[{"estagio.1":0},{"estagio.1":0},{"estagio.4":{$exists:true}}], date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{

			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"COMSERV"})
		}
	}).sort({date_request:-1})	

}else
if(userData.funcao_id=="611e2b8cf9b1b31cd868a30c" ){
	stock_request_db.find({$or:[{$or:[{"estagio.1":0}, {"estagio.3":{$exists:true}}], regiao:userData.regiao, departamento_ref:userData.departamento_id, date_request:{$lt:new Date("2022-06-22T21:00")}},{$or:[{"estagio.1":0},{"estagio.1":0}, {"estagio.4":{$exists:true}}], regiao:userData.regiao, departamento_ref:userData.departamento_id, date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})		


}
else 
	if(userData.funcao_id=="627e49eacba3d2105c26ed35" || userData.funcao_id=="627e4995cba3d2105c26ed34"){
	stock_request_db.find({$or:[{$or:[{"estagio.1":0}, {"estagio.3":{$exists:true}}],intervenientes:{$in:[userData.nome]}, date_request:{$lt:new Date("2022-06-22T21:00")}},{$or:[{"estagio.1":0},{"estagio.1":0}, {"estagio.4":{$exists:true}}], intervenientes:{$in:[userData.nome]}, date_request:{$gt:new Date("2022-06-22T21:00")}}, {$or:[{"estagio.1":0},{"estagio.2":0}, {"estagio.4":{$exists:true}}], intervenientes:{$in:[userData.nome]}, date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			console.log(data)
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	}).sort({date_request:-1})		


}
else

stock_request_db.find({$or:[{$or:[{"estagio.1":0, intervenientes:{$in:[userData.nome]}}, {"estagio.3":{$exists:true}, intervenientes:{$in:[userData.nome]}}], date_request:{$lt:new Date("2022-06-22T21:00")}},{$or:[{responsaveis_arrmazem:{$in:userData.nome}},{"estagio.1":0, intervenientes:{$in:[userData.nome]}}, {"estagio.4":{$exists:true}, intervenientes:{$in:[userData.nome]}}], date_request:{$gt:new Date("2022-06-22T21:00")}}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{

			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"COMSERV"})
		}
	})	.sort({date_request:-1})	
})

router.get("/tecnicos", async function(req, res){
	
var userData= req.session.usuario;
var todos=await stock_pessoal_db.find({});

var check=await [];
await Promise.all(
	todos.map(async(obj)=>{await check.push(obj.nome)})
	)

if(userData.nivel_acesso=="admin" || userData.nome=="Teresa Guimaraes"){
	usuario_db.find({status:"activo", nome:{$in:check}}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
			else
			{
				console.log(data)

				res.render("stock_tecnicos", {DataU:userData, Stock_request:data, title:"EagleI"})
			}
		}).sort({nome:1});





}
else
	usuario_db.find({$or:[{nome_supervisor:userData.nome}, {nome:userData.nome}] , nome:{$in:check}}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
			else
			{
				console.log(data)
				res.render("stock_tecnicos", {DataU:userData, Stock_request:data, title:"EagleI"})
			}
		}).sort({nome:1})	
})


router.get("/tecnicos/ferramentasss/:id",async function(req, res){
	
var userData= req.session.usuario;

usuario_db.findOne({_id:req.params.id},async function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
		else
		{	
			stock_pessoal_db.findOne({nome:data.nome},async function(irro, dados){
				if(irro)
					console.log("ocorreu erro no stock pessoal")
				else
				{
					// console.log(dados)
					var espares =await dados.disponibilidade.filter((obj)=>obj.grupo=="ferramenta");
					console.log(espares);
					var dado=await {...dados, disponibilidade:espares};
					console.log(dado)
					res.render("stock_tecnicos_detalhes", {DataU:userData, titulo:"Utilizaveis", Stock_request:dado, Id:data, title:"EagleI"})

				}
			}).lean()
			
		}
	}).lean()
})

router.get("/tecnicos/informatica/:id", async function(req, res){
	
var userData= req.session.usuario;

usuario_db.findOne({_id:req.params.id}, async function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
		else
		{	
			stock_pessoal_db.findOne({nome:data.nome}, async function(irro, dados){
				if(irro)
					console.log("ocorreu erro no stock pessoal")
				else
				{	var espares =await dados.disponibilidade.filter((obj)=>obj.grupo=="IT");
					console.log(espares);
					var dado=await {...dados, disponibilidade:espares};
					console.log(dado)
					// console.log(dados)
					res.render("stock_tecnicos_detalhes", {DataU:userData, titulo:"Infomaticos", Stock_request:dado, Id:data, title:"EagleI"})

				}
			}).lean()
			
		}
	}).lean()
})

router.get("/tecnicos/sst/:id",async function(req, res){
	
var userData= req.session.usuario;

usuario_db.findOne({_id:req.params.id},async function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
		else
		{	
			stock_pessoal_db.findOne({nome:data.nome},async function(irro, dados){
				if(irro)
					console.log("ocorreu erro no stock pessoal")
				else
				{
					// console.log(dados)
					var espares =await dados.disponibilidade.filter((obj)=>obj.grupo=="SST");
					console.log(espares);
					var dado=await {...dados, disponibilidade:espares};
					console.log(dado)
					// dado.disponibilidade=await espares;
					res.render("stock_tecnicos_detalhes", {DataU:userData, titulo:"SST", Stock_request:dado, Id:data, title:"EagleI"})

				}
			}).lean()
			
		}
	}).lean()
})

router.get("/tecnicos/frota/:id",async function(req, res){
	
var userData= req.session.usuario;

usuario_db.findOne({_id:req.params.id},async function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
		else
		{	
			stock_pessoal_db.findOne({nome:data.nome},async function(irro, dados){
				if(irro)
					console.log("ocorreu erro no stock pessoal")
				else
				{
					// console.log(dados)
					var espares =await dados.disponibilidade.filter((obj)=>obj.grupo=="Frota");
					console.log(espares);
					var dado=await {...dados, disponibilidade:espares};
					console.log(dado)
					// dado.disponibilidade=await espares;
					res.render("stock_tecnicos_detalhes", {DataU:userData, titulo:"Frota", Stock_request:dado, Id:data, title:"EagleI"})

				}
			}).lean()
			
		}
	}).lean()
})

router.get("/tecnicos/dla/:id",async function(req, res){
	
var userData= req.session.usuario;

usuario_db.findOne({_id:req.params.id},async function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar tecnicos no stock!!")
		else
		{	
			stock_pessoal_db.findOne({nome:data.nome}, async function(irro, dados){
				if(irro)
					console.log("ocorreu erro no stock pessoal")
				else
				{
					// console.log(dados)
					var espares =await dados.disponibilidade.filter((obj)=>obj.grupo=="DLA");
					var dado=await {...dados, disponibilidade:espares};
					// dado.disponibilidade=await espares;
					res.render("stock_tecnicos_detalhes", {DataU:userData, titulo:"sobressalentes", Stock_request:dado, Id:data, title:"EagleI"})

				}
			}).lean()
			
		}
	}).lean()
})

router.get("/history/:id2/:id4",  async function(req, res){
	var userData=req.session.usuario;
	var d1=  await req.params.id2;
	var d2=  await req.params.id4;

	console.log(d1, d2);
	stock_req_history_db.find({$or:[{beneficiario_ref:d1, ref_Item:d2}, {request_from_ref:d1, ref_Item:d2}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar achar o historico dos items")
		else{
			console.log(data)
			res.render("stock_request_history_home", {DataU:userData, Stock_request:data, benefficiario:d1, title:"EagleI"})
		}
	})
})

router.get("/histories/:id2/:id4",  async function(req, res){
	var userData=req.session.usuario;
	var d1=  await req.params.id2;
	var d2=  await req.params.id4;

	console.log(d1, d2);
	stock_req_history_db.find({$or:[{beneficiario_ref:d1, ref_Item:d2}, {request_from_ref:d1, ref_Item:d2}]}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar achar o historico dos items")
		else{
			console.log(data)
			res.render("stock_request_histories_home", {DataU:userData, Stock_request:data, benefficiario:d1, title:"EagleI"})
		}
	})
})




const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

router.post("/mudarwrz",upload.any() ,async(req, res)=>{

console.log(req.body);
	var find_thhis=await stock_request_db.findOne({_id:req.body.novo})

	var findwrz=await armazem_db.findOne({nome:req.body.localwrz})
	if(findwrz!=null && find_thhis.estagio.length==3){
		if(find_thhis.requisitar_em.indexOf("Armazem")!=-1)
			var actuali=await stock_request_db.updateOne({_id:req.body.novo}, {requisitar_em:findwrz.nome, request_from_ref:findwrz._id, request_from:findwrz.nome, responsaveis_arrmazem:findwrz.responsavel, "intervenientes.3":findwrz.responsavel[0]})
		else
			var actuali=await stock_request_db.updateOne({_id:req.body.novo}, { request_from_ref:findwrz._id,  responsaveis_arrmazem:findwrz.responsavel, "intervenientes.3":findwrz.responsavel[0]})
		
	await sleep(90)

	if(actuali.n==1){
		res.json({feito:"done"})
	}
	else
		res.json({feito:"done"})
	}
	else

	res.json({feito:"done"})
})

router.get("/bookout/:id", async function(req, res){
	
var userData= req.session.usuario;
var armadddz=await armazem_db.find({nome:{$regex:"Armazem"}, responsavel:{$in:[userData.nome]}}).sort({nome:1}).select({nome:1, _id:1}).lean()


var data=await stock_request_db.find({_id:req.params.id})

	 	var vall=[];
		 	var nume_sro=[];
			
				await data[0].items.reduce(async function(ac, idiota, i){
					await ac;
					// await sleep(10);
					var dadoss=await armazem_db.find({_id:data[0].request_from_ref})

					let indicec=await dadoss[0].items.findIndex(x => x.referencia==data[0].items[i].referencia)
						if(indicec!=-1)
							{await vall.push(dadoss[0].items[indicec].disponivel)
							await nume_sro.push(dadoss[0].items[indicec].serial_number);
							
						}
						else{
							await vall.push(0)
							await nume_sro.push([])
						}


				}, 0)
				
				
			
				console.log(vall, nume_sro)	
			res.render("stock_request_bookout", {DataU:userData, Stock_request:data, Disponivel:vall, nume_sro, Armazem:armadddz, title:"EagleI"})
			
})

router.get("/delivery/:id", function(req, res){
	
var userData= req.session.usuario;

stock_request_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_receiving", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	})	
})

router.get("/editar_request/:id",  function(req, res){
	var userData=req.session.usuario;

	armazem_db.find({pessoas_permitidas:{$in:[req.session.usuario.nome]}}, function(err, data){
		if(err)
			console.log("erro ocurred")
		else
		{
			stock_item_db.find({}, function(ty, dattta){
				if(ty)
					console.log("error ocurred")
				else
				{
					stock_request_db.find({_id:req.params.id}, function(err1, data1){
						if(err1)
							console.log("ocrreu um erro ao tentar editar o stock request")
						else
							res.render("stock_request_edit", {DataU:userData, 'Departamento':dados_provinciais.departamentos, Armazemm:JSON.stringify(data), Armazem:data, Items:dattta, Stock_request:data1,'subcategoriias':dados_provinciais.subcategory, title:"EagleI" , chefes_depart:dados_provinciais.chefes_departamentos})
					})
					
				}
			})
			
		}
	})
	
})







router.get("/reprovados", function(req, res){
	
var userData= req.session.usuario;

stock_request_db.find({$or:[{"estagio.1":0},{"estagio.2":0}], intervenientes:{$in:[userData.nome]}}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_home", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	})	
})



router.get("/detalhes/:id", function(req, res){
	
var userData= req.session.usuario;

stock_request_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_request_detalhes", {DataU:userData, Stock_request:data,'Departamento':dados_provinciais.departamentos, title:"EagleI"})
		}
	})	
})

router.get("/reprovar/:id", function(req, res){
	var userData=req.session.usuario;
	stock_request_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("erro na tentativa de reprovar")
		else
		{
			res.render("razoes_reprovacao_stock_request", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	})

})

router.post("/aprovar", upload.any(), async function(req, res){

	  function criar(palavra){
		var conversao =  palavra.toString();
		switch(conversao.length){
			case 1:
				return ("0000"+conversao);
				break;
			case 2:
				return ("000"+ conversao);
				break;
			case 3: return ("00"+conversao);
				break;
			case 4: return ("0"+conversao);
				break;
			default: return (conversao.toString());
		}
		

	}
	
	
	var userData=req.session.usuario;
	var ultimo =  await stock_request_db.countDocuments({stocK_request_number:{$exists:true}}, function(err , count){
		if(err)
			return err
		else 
		{	console.log(count)
			return count

		}
			})
		ultimo ++;
	var ano =  new Date().getFullYear().toString().substr(-2);
	var mes = (((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1)).toString();
	var dia = ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate()).toString();
	
	var numero = "SR"+ano + mes + dia + criar(ultimo);
	console.log(numero)

	var avlo= await stock_request_db.findOne({_id:req.body.novo});
	var k="";

	await avlo.items.reduce(async(acumul, iiidiota)=>{
		await acumul;
		
		 k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ iiidiota.description + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.quanty +"</td></tr>";


	}, 0);

	var enc_test=await stock_request_db.find({_id:req.body.novo, stocK_request_number:{$exists:false} })
	if(enc_test.length>0 ){
		if(enc_test[0].intervenientes.length>4){
		if(enc_test[0].estagio.length==2 && enc_test[0].intervenientes[1]!=enc_test[0].intervenientes[2] )
		var tyuh=await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"aprovado", stocK_request_number:numero}})
	else
		if(enc_test[0].estagio.length==1 && enc_test[0].intervenientes[1]==enc_test[0].intervenientes[2] )
		var tyuh=	await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:[1,1], stock_approvers:[userData.nome, userData.nome], date_actions:[new Date(), new Date()]}, $set:{actual_situation:"aprovado", stocK_request_number:numero}})
	else	
		if(enc_test[0].estagio.length==1 && enc_test[0].intervenientes[1]!=enc_test[0].intervenientes[2])
		var tyuh=await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}})

	var procurastockreq = await stock_request_db.findOne({_id:req.body.novo});

	var procurarequisitante = await usuario_db.findOne({_id:procurastockreq.requested_by_ref});

	var procurawarehousemanager = await usuario_db.findOne({nome:procurastockreq.intervenientes[2]});

	emailSender.createConnection();
	emailSender.sendEmailAprovadoStockRequest(procurarequisitante);
	emailSender.sendEmailAprovadoStockRequestWarehouse(procurawarehousemanager, k);

	}

	else
		if(enc_test[0].intervenientes.length==4){
		await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"aprovado", stocK_request_number:numero}})

	var procurastockreq = await stock_request_db.findOne({_id:req.body.novo});

	var procurarequisitante = await usuario_db.findOne({_id:procurastockreq.requested_by_ref});

	var procurawarehousemanager = await usuario_db.findOne({nome:procurastockreq.intervenientes[2]});

	emailSender.createConnection();
	emailSender.sendEmailAprovadoStockRequest(procurarequisitante);
	emailSender.sendEmailAprovadoStockRequestWarehouse(procurawarehousemanager, k);

	}



}
	

	res.json({feito:"feito"});



	 
})

router.post("/retornar_stock", upload.any(), async function(req, res){
	var userData = req.session.usuario;
	console.log(req.body)

	var procurastockreq = await stock_request_db.findOne({_id:req.body.novo});

		var procurarequisitante = await usuario_db.findOne({_id:procurastockreq.requested_by_ref});

		var mensagemrazoes = req.body.razoes_return;

		emailSender.createConnection();
		emailSender.sendEmailReturnStockRequest(procurarequisitante, mensagemrazoes);

	await stock_request_db.updateOne({_id:req.body.novo}, { $set:{returned:true, returned_reason:req.body.razoes_return}})
	
	res.json({feito:"feito"});
	
})



// router.post("/delivery", upload.any(), function(req, res){
// 		var userData=req.session.usuario;

// 		stock_request_db.findOne({_id:req.body.novo},  function(erro, dados){
// 				if(erro)
// 					console.log("ocorreu um erro ao tentar achar o stocj_item")
// 				else
// 				{
// 					console.log(dados)
					
// 						var stock_recebido={};
// 						stock_recebido.nome_beneficiario=dados.requested_by;
// 						stock_recebido.disponibilidade=[];
// 						for(let i=0; i< dados.items.length; i++){
// 						stock_recebido.disponibilidade[i] = {};
// 						stock_recebido.disponibilidade[i].description_item = dados.items[i].description;
// 						stock_recebido.disponibilidade[i].disponivel = parseInt(dados.items[i].received);

// 						}
// 						stock_pessoal_db.gravar_stock_pessoal(stock_recebido, function(irr, feito){
// 							if(irr)
// 								console.log("ocorreu um erro ao gravar stock!!")
// 							else
// 								console.log("historico gravado com sucesso!!")
// 						})
					
					
// 				}
// 			})

// 	stock_request_db.findOneAndUpdate({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"Recebido"}}, function(err, data){
// 		if(err)
// 			console.log("ocorreu um erro ao tentar actualizar po")
// 		else
// 			{
// 				console.log(data);

// 			}
// 	})

		



// 	})

router.post("/reprovar", upload.any(), async function(req, res){
		var userData=req.session.usuario;

		var procurastockreq = await stock_request_db.findOne({_id:req.body.novo});

		var procurarequisitante = await usuario_db.findOne({_id:procurastockreq.requested_by_ref});

		var mensagemrazoes = req.body.razoes_return;
		var ttt=await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:0, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"reprovado", decline_reasons:req.body.razoes_return}});


		emailSender.createConnection();
		emailSender.sendEmailReprovadoStockRequest(procurarequisitante, mensagemrazoes);


	
	res.json({feito:"feito"});
})

router.get("/novo", async function(req, res){
	var userData= await req.session.usuario;
	var admin_case=await admin_db.find({});
	if(admin_case.length>0){

		var datta=await usuario_db.find({}).lean();

 		var dattta=await stock_item_db.find({}).sort({description_item:1}).lean();

 		var dla =await  dattta.filter(x=>x.grupo=="DLA")
				 var ferramenta =await  dattta.filter(x=>x.grupo=="ferramenta")
				 var sst =await  dattta.filter(x=>x.grupo=="SST")
				 var infoT =await  dattta.filter(x=>x.grupo=="IT")
				 var frotA =await  dattta.filter(x=>x.grupo=="Frota")

	var data=await	 armazem_db.find({pessoas_permitidas:{$in:[userData.nome]}, nome:{$ne:"Obsoleto"}}).sort({nome:1}).lean();




		
				 
				 // console.log(dla, ferramenta, sst, infoT)

 					res.render("stock_request_form", {DataU:userData, dla:dla,frotA:frotA, ferramenta:ferramenta, sst:sst, infoT:infoT, 'Departamento':dados_provinciais.departamentos, AdMagen:admin_case, chefes_depart:dados_provinciais.chefes_departamentos, Armazemm:JSON.stringify(data), Armazem:data, Destino:datta,  'subcategoriias':dados_provinciais.subcategory, title:"EagleI" })
 					
	}

 else
 res.redirect("/inicio")


	
})

function getAllIndexes(arr, val) {
	var indexes = [], i = -1;
	while ((i = arr.indexOf(val, i+1)) != -1){
		indexes.push(i);
	}
	return indexes;
}

router.post("/receber_productos", upload.any(), async function(req, res){
	console.log(req.body)

var test_enct=await stock_request_db.find({_id:req.body.novo, actual_situation:"aprovado"})
if(test_enct.length>0){
	var custo_medio=[1]
var tydo=await custo_medio.reduce(async function(acT, idiotaT){
	await acT;
	await sleep(50);

	
	
	if(Array.isArray(req.body.referencia)){
	var array_bruto=req.body.e || [];
	var encontradoso = await getAllIndexes(req.body.serialized, "sim");
	var numeros_de_seriess=[]

	for(let i=0; i<req.body.serialized.length; i++){
		numeros_de_seriess.push([]);

	}

	if(encontradoso.length>0 )
	for(let j=0; j<encontradoso.length; j++){
		
		let vallor=parseInt(req.body.received[encontradoso[j]])
		if(Array.isArray(req.body.e) && vallor!=0){
			let t = array_bruto.splice(0,vallor)
			numeros_de_seriess[encontradoso[j]]=t;

		}
		else
			if(vallor!=0)
				numeros_de_seriess[encontradoso[j]]=[req.body.e];
			
	}
	}
	else{
		if(Array.isArray(req.body.e))
			var numeros_de_seriess=[req.body.e]
		else
			if(req.body.e!=null)
				var numeros_de_seriess=[[req.body.e]];
			else
				var numeros_de_seriess=[['']];
	}

	

	console.log(numeros_de_seriess);

	// --------------------------------------------------------------------------------------------criacao de serie number*********************************************

await Promise.all(numeros_de_seriess.map(async function(idiota, i){
		if(idiota.length>0){

			await Promise.all(idiota.map(async function(idiota2, j){
				if(Array.isArray(req.body.referencia))
					var dados=await stock_item_db.findOne({_id:req.body.referencia[i]})
				else{
					var dados=await stock_item_db.findOne({_id:req.body.referencia})
				}

				if(dados!=null){

							var rastreo=await {};
							rastreo.serial_number=await idiota2;
							rastreo.part_number=await dados.part_number;
							rastreo.quanty=await 1;
							// rastreo.pod=await test_enct[0].stocK_request_number;
							rastreo.status=await "disponivel";
							rastreo.datas_local_actual=await [new Date()];
							rastreo.meio_atribuicao=await ["Confirmado"];
							rastreo.atribuidores=await [req.session.usuario.nome];
							rastreo.referencia=await dados._id;
							rastreo.owner=await dados.cliente_name;
							rastreo.description=await dados.description_item;
							rastreo.local_actual=await [test_enct[0].request_from];
							  rastreo.ref_local_actual=await [test_enct[0].request_from_ref];
							  
							  rastreio_stock_db.gravar_rastreio(rastreo, function(erro){
								  if(erro)
								  	console.log("ocorreu um erro ao tenatr ");
								  else
								  	console.log("dados gravados com sucesso");
							  })

							}


			}))
		}

	}))

	// **********************************************************************************************end criacao de Serial Item**********************************************
	


	var userData=req.session.usuario;

	var procurastockreq = await stock_request_db.findOne({_id:req.body.novo});

var procurarequisitante = await usuario_db.findOne({_id:procurastockreq.requested_by_ref});

// emailSender.createConnection();
// emailSender.sendEmailBookout(procurastockreq,procurarequisitante);

	await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"Expedido", local_levantamento:req.body.local_levantamento, previsao_entrega:req.body.previsao_entrega}})

	// *************************************************************************inicio de tricks dos precos*****************************************************************

	if(Array.isArray(req.body.received)){
		await req.body.received.reduce(async(ac, idiota,p)=>{
		await ac;
	  	await sleep(10);
		var localizar_armazem =await armazem_db.find({_id:req.body.locaal, items:{$elemMatch:{referencia:req.body.referencia[p]}}});
		console.log(localizar_armazem);
		if(localizar_armazem.length>0)
		var array_cnst=await localizar_armazem[0].items[(localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia[p])))];

		if(localizar_armazem.length>0 && req.body.serialized[p]=="nao" && idiota!='0'){
		var index_de_troca=await localizar_armazem[0].items[(localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia[p])))]; //objecto achado
		console.log(index_de_troca);
		var controlado = await parseInt(idiota);
		console.log(controlado)
		var novo_array = await index_de_troca.precos.splice(0, controlado);
		console.log(novo_array);

		await armazem_db.updateOne({_id:req.body.locaal , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":index_de_troca.precos}});

		await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":novo_array}});

		// var index_de_troca=await localizar_armazem.items[(localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia[p])))]; //objecto achado


		}


		if(localizar_armazem.length>0 && req.body.serialized[p]=="sim" && idiota!='0'){
			var index_de_troca=await localizar_armazem[0].items[(localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia[p])))]; //objecto achado
			var controlado = await parseInt(idiota);
			if(controlado==1){
				// var aux=await numeros_de_seriess[p][0];
				var localizar_indece_numserial= await index_de_troca.serial_number.findIndex(x=> x==numeros_de_seriess[p][0]);
				var novo_array= await index_de_troca.precos.splice(localizar_indece_numserial, 1);

				// await armazem_db.updateOne({_id:req.body.locaal , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":index_de_troca.precos}});

				// await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":novo_array}});



			}
			else{
				var novo_array=[];
				await numeros_de_seriess[p].reduce(async(acc, iidiota)=>{
					await acc;
					await sleep(10);

					var localizar_indece_numserial= await index_de_troca.serial_number.findIndex(x=> x==iidiota);

					await novo_array.push(index_de_troca.precos[localizar_indece_numserial]);
					await index_de_troca.serial_number.splice(localizar_indece_numserial, 1)
					
					await index_de_troca.precos.splice(localizar_indece_numserial, 1);
					await sleep(10);
					

				}, 0)
				
				// await armazem_db.updateOne({_id:req.body.locaal , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":index_de_troca.precos}});

				// await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":novo_array}});

			}

		}



		}, 0);
		


	}else{
		var makhapa=[];
		makhapa[0]= await [req.body.received];

		await makhapa.reduce(async(ac, idiota,p)=>{
		await ac;
	  	await sleep(10);
		var localizar_armazem =await armazem_db.find({_id:req.body.locaal, items:{$elemMatch:{referencia:req.body.referencia}}});
		console.log(localizar_armazem);

		if(localizar_armazem.length>0 && req.body.serialized=="nao" && idiota!='0'){
		var index_de_troca=await localizar_armazem[0].items[(localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia)))]; //objecto achado
		console.log(index_de_troca);
		var controlado = await parseInt(idiota);
		console.log(controlado)
		var novo_array = await index_de_troca.precos.splice(0, controlado);
		console.log(novo_array);

		// await armazem_db.updateOne({_id:req.body.locaal , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.precos":index_de_troca.precos}});

		// await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.precos":novo_array}});

		// var index_de_troca=await localizar_armazem.items[localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia))]; //objecto achado


		}


		if(localizar_armazem.length>0 && req.body.serialized=="sim" && idiota!='0'){
			var index_de_troca=await localizar_armazem[0].items[(localizar_armazem[0].items.findIndex(x=>(x.referencia==req.body.referencia)))]; //objecto achado
			var controlado = await parseInt(idiota);
			if(controlado==1){
				// var aux=await numeros_de_seriess[p][0];
				var localizar_indece_numserial= await index_de_troca.serial_number.findIndex(x=> x==numeros_de_seriess[0][0]);
				var novo_array= await index_de_troca.precos.splice(localizar_indece_numserial, 1);

				await armazem_db.updateOne({_id:req.body.locaal , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.precos":index_de_troca.precos}});

				await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.precos":novo_array}});



			}
			else{
				var novo_array=[];
				await numeros_de_seriess[0].reduce(async(acc, iidiota)=>{
					await acc;
					await sleep(10);
					var localizar_indece_numserial= await index_de_troca.serial_number.findIndex(x=> x==iidiota);
					await novo_array.push(index_de_troca.precos[localizar_indece_numserial]);
					await index_de_troca.serial_number.splice(localizar_indece_numserial, 1)

					await index_de_troca.precos.splice(localizar_indece_numserial, 1);
					await sleep(10)

					
					
					

				}, 0)

				await sleep(10);
				
				// await armazem_db.updateOne({_id:req.body.locaal , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":index_de_troca.precos}});
				// await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[p]}}}, { $set:{ "items.$.precos":novo_array}});

			}

		}



		}, 0);
		


	

	}

	//  falta quando o array nao esta em array++++++++++++++++++++++++++++++++++++++********+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*



	// *************************************************************************Fim de tricks dos precos********************************************************************

	if(Array.isArray(req.body.received)){
		console.log(req.body.received)


// **********************fim ciclo*********************
var urls = req.body.received
  console.log(urls)
  // async function getTodos() {
	  await urls.reduce(async function(ac, idiota, i){
	  	await ac;
	  	await sleep(10);
	  	var incme= parseFloat(req.body.received[i])/2;
	var incme1= await parseFloat(req.body.received[i])
	var decremento_stock= await -1*incme1;
	if(decremento_stock!=0)
	
		{
			 	var tgshsaa256= await armazem_db.updateOne({_id:req.body.locaal, items:{$elemMatch:{referencia:req.body.referencia[i], $or:[{disponivel:{$gte:incme1}}, {disponivel:{$gte:incme}}]}}}, {$inc:{"items.$.disponivel":decremento_stock},  $pull:{"items.$.serial_number":{$in:numeros_de_seriess[i]}}});

			var localizar_stock= await stock_request_db.findOne({_id:req.body.novo} );
				console.log(localizar_stock);

				var tgshsaa856 =await rastreio_stock_db.updateMany({serial_number:{$in:numeros_de_seriess[i]}}, {$push:{ref_local_actual:localizar_stock.requested_by_ref,  local_actual:localizar_stock.book_out_to_store, meio_atribuicao:"Saida", atribuidores:req.session.usuario.nome, datas_local_actual:new Date()}});



				var tgshsaa3201 =await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[i]}}}, { $set:{ "items.$.booked_out":req.body.received[i], "items.$.data_book_out":new Date(), "items.$.num_serie":numeros_de_seriess[i]}})

		
			  // console.log(`Received Todo`, todo);
			

		}
		else
		{
			await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[i]}}}, { $set:{ "items.$.booked_out":req.body.received[i], "items.$.data_book_out":new Date(), "items.$.num_serie":numeros_de_seriess[i]}})

		}
		


	  }, 0);

	
  
	console.log('Finished!');
  // }

  
// await getTodos();
// --------------------------------------------------------------------------------------

}
else
{
var urls = []
urls[0]=req.body.received
  
  // async function getTodos() {
  	await urls.reduce(async function(ac, idiota, i){
  		await ac;
  		await sleep(10);
  			var incme=parseFloat(req.body.received)/2;
	var incme1=parseFloat(req.body.received)
	var decremento_stock= -1*incme1;
	if(decremento_stock)
	  var foun=await armazem_db.find({_id:req.body.locaal, items:{$elemMatch:{referencia:req.body.referencia, disponivel:{$gte:incme1} }}})

	if(foun.length>0)
	 	var tgshsaafd =await armazem_db.update({_id:req.body.locaal, items:{$elemMatch:{referencia:req.body.referencia}}}, {$inc:{"items.$.disponivel":decremento_stock}, $pull:{"items.$.serial_number":{$in:numeros_de_seriess[0]}}});

	var localizar_stock= await stock_request_db.findOne({_id:req.body.novo});
		console.log(localizar_stock);

		var tgshsaa31_=await rastreio_stock_db.updateMany({serial_number:{$in:numeros_de_seriess[0]}}, {$push:{ref_local_actual:localizar_stock.requested_by_ref,  local_actual:localizar_stock.book_out_to_store, meio_atribuicao:"Saida", atribuidores:req.session.usuario.nome, datas_local_actual:new Date()}})

	 	var tgshsaa__= await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.booked_out":req.body.received, "items.$.data_book_out":new Date(),  "items.$.num_serie":numeros_de_seriess[0]}})
	  

	// else
	// {
	// 	stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.booked_out":req.body.received, "items.$.data_book_out":new Date(), "items.$.num_serie":numeros_de_seriess[0]}},null,  function(err, data){
	// 		if(err)
	// 			console.log("ocorreu um erro ao tentar decrementar stock")
	// 		else
	// 			{
	// 				console.log("stock decrementado com sucesso!!")
	// 			}
	// 	})

	// }

  	},0);
	  
	
  
	console.log('Finished!');
  // }

  
	// getTodos();


}


}, 0);

console.log(tydo);

await sleep(500);
// ++++++++++++++++++++++++++++++++++++++++++++++++++inicio de historico++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var dados=await stock_request_db.findOne({_id:req.body.novo});
var vem_de=await armazem_db.findOne({_id:dados.request_from_ref})

await dados.items.reduce(async function(ac, idiota, i){
	await ac;
	await sleep(5);
	if(dados.reason!="Venda directa")
	stock_req_history_db.gravar_historico({beneficiario:dados.book_out_to_store, departamento:dados.department, beneficiario_ref:dados.requested_by_ref, request_from_ref:dados.request_from_ref, request_from:vem_de.nome, ref_Item:idiota.referencia, numero:dados.stocK_request_number, quantidade:idiota.booked_out, nome_item:idiota.description, serialized:idiota.serialized, cliente_name:idiota.cliente_name}, function(errp, d){
		if(errp)
			console.log("ocorreu um erro ao tentar gravar historico")
		else
			console.log("Historico gravado com sucesso!!")
	})
else
	stock_req_history_db.gravar_historico({beneficiario:dados.vendido_a, departamento:dados.department, beneficiario_ref:"V3nd1d0", request_from_ref:dados.request_from_ref, request_from:vem_de.nome, ref_Item:idiota.referencia, numero:dados.stocK_request_number,  quantidade:idiota.booked_out, nome_item:idiota.description, serialized:idiota.serialized, cliente_name:idiota.cliente_name}, function(errp, d){
		if(errp)
			console.log("ocorreu um erro ao tentar gravar historico")
		else
			console.log("Historico gravado com sucesso!!")
	})


}, 0)

}



res.json({feito:"feito"});

})





router.post("/delivery", upload.any(), async function(req, res){
	console.log(req.body)



	var test_enct=await stock_request_db.find({_id:req.body.novo, actual_situation:"Expedido"})
if(test_enct.length>0){
	var recebidos=await [];


	await Promise.all(test_enct[0].items.map(async(obj, i)=>{
		let yujjs=await parseInt(obj.booked_out)
		await recebidos.push(yujjs)
	}))



	var userData=req.session.usuario;
	var custo_medio=[1];
var item_achado=await stock_request_db.findOne({_id:req.body.novo})
	

	var tydo=await custo_medio.reduce(async function(acT, idiotaT){
		await acT;
		await sleep(100);
	
	await stock_request_db.update({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"Expedido" }})

	
	if(Array.isArray(req.body.received) && recebidos.length>1){

		// for(var i=0; i<req.body.received.length; i++ ){
			await req.body.received.reduce(async function(ac, idiota, i){
				await ac;
				await sleep(10);
				await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[i]}}}, { $set:{ "items.$.received":item_achado.items[i].booked_out, "items.$.data_recepcao":new Date()}})


			}, 0);
			
		// }
	}
	else
	{
		
			await stock_request_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.received":item_achado.items[0].booked_out, "items.$.data_recepcao":new Date()}})
		

	}




// *****************************************************************actualizacao do stock do tecnico******************************************************
var dados=await stock_request_db.findOne({_id:req.body.novo})
var varaiad=await armazem_db.find({_id:dados.requested_by_ref})


if(varaiad.length==0){
					console.log(dados)
					
						var stock_recebido={};
						stock_recebido.nome=dados.requested_by;
						stock_recebido.nome_ref=userData._id;
						stock_recebido.disponibilidade = [];
						// for(let i=0; i< dados.items.length; i++){
							await dados.items.reduce(async function(ac, idiota, i){
								await ac;
								await sleep(10);
								stock_recebido.disponibilidade[i] = await {};
								stock_recebido.disponibilidade[i].referencia = await dados.items[i].referencia;
								stock_recebido.disponibilidade[i].description_item = await dados.items[i].description;
								stock_recebido.disponibilidade[i].disponivel = await parseInt(dados.items[i].received);
								stock_recebido.disponibilidade[i].serialized = await dados.items[i].serialized;
								stock_recebido.disponibilidade[i].num_serie = await dados.items[i].num_serie;
								stock_recebido.disponibilidade[i].cliente_name = await dados.items[i].cliente_name;
								stock_recebido.disponibilidade[i].grupo = await dados.items[i].grupo;

								if(test_enct[0].reason!="Venda directa"){
									await stock_pessoal_db.updateOne({nome_ref:dados.requested_by_ref, disponibilidade:{$elemMatch:{referencia:dados.items[i].referencia}}},{$inc:{"disponibilidade.$.disponivel":stock_recebido.disponibilidade[i].disponivel}, $push:{"disponibilidade.$.num_serie":{$each:dados.items[i].num_serie}}})

						


								await stock_pessoal_db.updateOne({nome_ref:dados.requested_by_ref, "disponibilidade.referencia":{$ne:dados.items[i].referencia}}, {$push:{disponibilidade:stock_recebido.disponibilidade[i]}})

								await rastreio_stock_db.updateMany({serial_number:{$in:idiota.num_serie}}, {$push:{ref_local_actual:dados.requested_by_ref,  local_actual:dados.requested_by, meio_atribuicao:"Received", atribuidores:req.session.usuario.nome, datas_local_actual:new Date()}})


								}
								else{
									await rastreio_stock_db.updateMany({serial_number:{$in:idiota.num_serie}}, {$push:{ref_local_actual:"Vendido",  local_actual:dados.requested_by, meio_atribuicao:"Venda", atribuidores:req.session.usuario.nome, datas_local_actual:new Date()}})



								}
								

						


							}, 0);
						

						// }

				var result= await stock_pessoal_db.find({nome_ref:dados.requested_by_ref})

				if(result.length==0 && test_enct[0].reason!="Venda directa"){
						stock_pessoal_db.gravar_stock_pessoal(stock_recebido, function(irr, feito){
					if(irr)
						console.log("ocorreu um erro ao gravar stock!!")
					else
						console.log("historico gravado com sucesso!!")
						})



							}

				 //*************************inicio insercao do historico**********************************************
				 if(Array.isArray(req.body.received)){
				 	// for(var i=0; i<req.body.received.length; i++){
						await req.body.received.reduce(async function(ac, idiota, i){
							await ac;
							await sleep(5);
							if(test_enct[0].reason!="Venda directa")
								{
									// await stock_req_history_db.gravar_historico({beneficiario:userData.nome, departamento:item_achado.department, beneficiario_ref: userData._id, request_from_ref:dados.request_from_ref, request_from:dados.request_from, ref_Item:req.body.referencia[i], numero:dados.stocK_request_number, quantidade:recebidos[i], nome_item:req.body.decricao[i], serialized:dados.items[i].serialized, cliente_name:dados.items[i].cliente_name}, function(errp, d){
									// 							if(errp)
									// 								console.log("ocorreu um erro ao tentar gravar historico")
									// 							else
									// 								console.log("Historico gravado com sucesso!!")
									// 						})
							}
							else
							{
								// await stock_req_history_db.gravar_historico({beneficiario:test_enct[0].vendido_a, departamento:item_achado.department, beneficiario_ref: "V3nda5", request_from_ref:dados.request_from_ref, request_from:dados.request_from, ref_Item:req.body.referencia[i], numero:dados.stocK_request_number, quantidade:recebidos[i], nome_item:req.body.decricao[i], serialized:dados.items[i].serialized, cliente_name:dados.items[i].cliente_name}, function(errp, d){
								// 							if(errp)
								// 								console.log("ocorreu um erro ao tentar gravar historico")
								// 							else
								// 								console.log("Historico gravado com sucesso!!")
								// 						})
						}


						}, 0)
				 		

				 	// }
				 }
				 else
				 {
				 	if(test_enct[0].reason!="Venda directa")
				 	{
				 		// let yuppl=await stock_req_history_db.gravar_historico({beneficiario:userData.nome, beneficiario_ref: userData._id, departamento:item_achado.department, request_from:dados.request_from, request_from_ref:dados.request_from_ref, ref_Item:req.body.referencia, numero:dados.stocK_request_number, quantidade:recebidos[0], nome_item:req.body.decricao, serialized:dados.items[0].serialized, cliente_name:dados.items[0].cliente_name}, function(errp, d){
				 		// 			 			if(errp)
				 		// 			 				console.log("ocorreu um erro ao tentar gravar historico")
				 		// 			 			else
				 		// 			 				console.log("Historico gravado com sucesso!!")
				 		// 			 		})
					}
					else{
						// let yuppl=await stock_req_history_db.gravar_historico({beneficiario:test_enct[0].vendido_a, beneficiario_ref: "V3nd1d0", departamento:item_achado.department, request_from:dados.request_from, request_from_ref:dados.request_from_ref, ref_Item:req.body.referencia, numero:dados.stocK_request_number, quantidade:recebidos[0], nome_item:req.body.decricao, serialized:dados.items[0].serialized, cliente_name:dados.items[0].cliente_name}, function(errp, d){
				 		// 			 			if(errp)
				 		// 			 				console.log("ocorreu um erro ao tentar gravar historico")
				 		// 			 			else
				 		// 			 				console.log("Historico gravado com sucesso!!")
				 		// 			 		})

					}

				 }


				 // ************************fim insercao do historico******************************************
						
					
					
				}
				else{
					console.log(dados)
					
						var stock_recebido={};
						stock_recebido.nome=dados.requested_by;
						stock_recebido.nome_ref=userData._id;
						stock_recebido.items = await [];
						// for(let i=0; i< dados.items.length; i++){
							await dados.items.reduce(async function(ac, idiota, i){
								await ac;
								await sleep(10);
								stock_recebido.items[i] = await {};
								stock_recebido.items[i].referencia = await idiota.referencia;
								stock_recebido.items[i].description_item = await idiota.description;
								stock_recebido.items[i].disponivel = await parseInt(idiota.received);
								stock_recebido.items[i].serialized = await idiota.serialized;
								stock_recebido.items[i].serial_number = await idiota.num_serie;
								stock_recebido.items[i].cliente_name = await idiota.cliente_name;
								// stock_recebido.items[i].precos = await idiota.precos;

								var tgshsaa=await armazem_db.updateOne({_id:dados.requested_by_ref, items:{$elemMatch:{referencia:dados.items[i].referencia}}},{$inc:{"items.$.disponivel":stock_recebido.items[i].disponivel}, $push:{"items.$.num_serie":{$each:dados.items[i].num_serie} }})

						


									var tgshsaa1 =await armazem_db.updateOne({_id:dados.requested_by_ref, "items.referencia":{$ne:dados.items[i].referencia}}, {$push:{items:stock_recebido.items[i]}})
									if(test_enct[0].reason!="Venda directa")
										var tgshsaa2= await rastreio_stock_db.updateMany({serial_number:{$in:idiota.num_serie}}, {$push:{ref_local_actual:dados.requested_by_ref,  local_actual:dados.book_out_to_store, meio_atribuicao:"Recieving", atribuidores:req.session.usuario.nome, datas_local_actual:new Date()}})
									else
										var tgshsaa2= await rastreio_stock_db.updateMany({serial_number:{$in:idiota.num_serie}}, {$push:{ref_local_actual:"V3nd1d0",  local_actual:"Vendido", meio_atribuicao:"Recieving", atribuidores:req.session.usuario.nome, datas_local_actual:new Date()}})
									

						


							}, 0);
						

						// }

				//  await stock_pessoal_db.find({nome_ref:dados.requested_by_ref}, function(irroo, result){
				// 		if (irroo)
				// 			console.log("erro na procura do owner do stock")
				// 		else
				// 		{
				// 			if(result.length==0){
				// 				stock_pessoal_db.gravar_stock_pessoal(stock_recebido, function(irr, feito){
				// 			if(irr)
				// 				console.log("ocorreu um erro ao gravar stock!!")
				// 			else
				// 				console.log("historico gravado com sucesso!!")
				// 		})



				// 			}
				// 		}
				// 	})

				 //*************************inicio insercao do historico**********************************************
				 if(Array.isArray(req.body.received)){
				 	// for(var i=0; i<req.body.received.length; i++){
						await req.body.received.reduce(async function(ac, idiota, i){
							await ac;
							await sleep(5);
						// 	if(test_enct[0].reason!="Venda directa")
						// 	stock_req_history_db.gravar_historico({beneficiario:dados.book_out_to_store, departamento:item_achado.department, beneficiario_ref:dados.requested_by_ref, request_from_ref:dados.request_from_ref, request_from:dados.request_from, ref_Item:req.body.referencia[i], numero:dados.stocK_request_number, quantidade:recebidos[i], nome_item:req.body.decricao[i], serialized:dados.items[i].serialized, cliente_name:dados.items[i].cliente_name}, function(errp, d){
						// 		if(errp)
						// 			console.log("ocorreu um erro ao tentar gravar historico")
						// 		else
						// 			console.log("Historico gravado com sucesso!!")
						// 	})
						// else
						// 	stock_req_history_db.gravar_historico({beneficiario:test_enct[0].vendido_a, departamento:item_achado.department, beneficiario_ref:"V3nd1d0", request_from_ref:dados.request_from_ref, request_from:dados.request_from, ref_Item:req.body.referencia[i], numero:dados.stocK_request_number, quantidade:recebidos[i], nome_item:req.body.decricao[i], serialized:dados.items[i].serialized, cliente_name:dados.items[i].cliente_name}, function(errp, d){
						// 		if(errp)
						// 			console.log("ocorreu um erro ao tentar gravar historico")
						// 		else
						// 			console.log("Historico gravado com sucesso!!")
						// 	})


						}, 0)
				 		

				 	// }
				 }
				 else
				 {
				//  	if(test_enct[0].reason!="Venda directa")
				//  	stock_req_history_db.gravar_historico({beneficiario:dados.book_out_to_store, departamento:item_achado.department, beneficiario_ref:dados.requested_by_ref, request_from:dados.request_from, request_from_ref:dados.request_from_ref, ref_Item:req.body.referencia, numero:dados.stocK_request_number, quantidade:recebidos[0], nome_item:req.body.decricao, serialized:dados.items[0].serialized}, function(errp, d){
				//  			if(errp)
				//  				console.log("ocorreu um erro ao tentar gravar historico")
				//  			else
				//  				console.log("Historico gravado com sucesso!!")
				//  		})
				//  else
				//  	stock_req_history_db.gravar_historico({beneficiario:test_enct[0].vendido_a, departamento:item_achado.department, beneficiario_ref:"V3nd1d0", request_from:dados.request_from, request_from_ref:dados.request_from_ref, ref_Item:req.body.referencia, numero:dados.stocK_request_number, quantidade:recebidos[0], nome_item:req.body.decricao, serialized:dados.items[0].serialized}, function(errp, d){
				//  			if(errp)
				//  				console.log("ocorreu um erro ao tentar gravar historico")
				//  			else
				//  				console.log("Historico gravado com sucesso!!")
				//  		})

				 }


				 // ************************fim insercao do historico******************************************
						
					
					
				}



	 await stock_request_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, stock_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"Recebido"}})


// *******************************************************************end actualizacao do stock do tecnico*************************************************
// -----------------------------------------------------------------------------outra sessao-------------------------------------------------------------------------------------


// return custo__;
}, 0);

await sleep(100);


var procurastockreq = await stock_request_db.findOne({_id:req.body.novo});

	var procurawarehousemanager = await usuario_db.findOne({nome:procurastockreq.intervenientes[2]});

	var k = "";

	await procurastockreq.items.reduce(async(acumul, iiidiota)=>{
		await acumul;
		 k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ iiidiota.description + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.quanty +"</td>" + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.booked_out +"</td>"+"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.received +"</td>" + "</tr>";


	},0);

	// for(let [i,test] of procurastockreq.items.entries()) {

 //        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ iiidiota.description + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.quanty +"</td>" + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.booked_out +"</td>" + "</tr>";

 //    }

	await emailSender.createConnection();
	await emailSender.sendEmailStockVerification(k,procurawarehousemanager);


}
	

	res.json({feito:"feito"});

})


router.post("/importaxao_file", upload.any(), async(req,res)=>{
	var teste=await JSON.parse(req.body.m);
	console.log(JSON.stringify(teste.Sheet));
var wrz=await teste.Sheet;
var carregados=await [];

var armazenz=await [{codigo:"LIC", nome:"Armazem de Lichinga"},{codigo:"MPT", nome:"Armazem da Matola"},{codigo:"VIL", nome:"Armazem de Vilanculos"},{codigo:"XAI", nome:"Armazem de Xai-Xai"},{codigo:"BEIRA", nome:"Armazem da Beira"},{codigo:"QLM", nome:"Armazem de Quelimane"},{codigo:"TET", nome:"Armazem de Tete"},{codigo:"NPL", nome:"Armazem de Nampula"},{codigo:"PEM", nome:"Armazem de Pemba"}]

var todos_arma=await armazem_db.find({}).lean();
// await Promise.all(todos_arma.map(async(obj, i)=>{
// 	await armazem_db.updateOne({_id:obj._id}, {$set:{items:[]}})
// })
// )



// wrz.reduce(async(ac, obj, i)=>{
// await ac;
// await sleep(10)
// 	var tghs=await stock_item_db.updateMany({$or:[{cliente_name:"Vodacom"}, {cliente_name:"Huawei"}]}, {$set:{grupo:"DLA"}});
// 	console.log(tghs);
// 	if(tghs.n==0){
// 		await carregados.push(obj.DESCRIPTION);
// 	}

// }, 0)

// var tghs=await stock_item_db.updateOne({$or:[{description_item:obj.DESCRIPTION}, {description_item_e:obj.DESCRIPTION}, {part_number:obj.PRODUCTITEMCODE}, {product_code:obj.PRODUCTITEMCODE}]}, {grupo:});
// console.log(tghs);
await wrz.reduce(async(ac, obj, i)=>{
	await ac;
	await sleep(50);
	var indicc=await armazenz.findIndex(x=>x.codigo==obj.Armazem);
	if(indicc!=-1)

		var arrrmazem=await armazenz[indicc].nome;
	else
		var arrrmazem=await obj.Armazem;

	var itenn=await stock_item_db.find({$or:[{description_item:obj.Descricao.trim()}, {description_item_e:obj.Descricao.trim()}, {part_number:{ $regex: new RegExp(`${obj.Artigo}`), $options: 'i' }},{product_code:obj.Artigo}]}).lean();;
	var encowr=await armazem_db.find({nome:arrrmazem});
	var pessoa_enc=await usuario_db.find({nome:arrrmazem})
	var enco_stock_p=await stock_pessoal_db.find({nome:arrrmazem});
	if(itenn.length>0 && encowr.length>0){
		var acres=await {};
		acres.serialized=await itenn[0].serialized_item;
		acres.cliente_name=await itenn[0].cliente_name;
		acres.description_item=await itenn[0].description_item;
		acres.part_number=await itenn[0].part_number;
		acres.referencia=await itenn[0]._id;
		acres.disponivel=await parseInt(obj.Quantidade);
		console.log(acres.disponivel);

		acres.grupo=await itenn[0].grupo;
		 var tgt = await armazem_db.updateOne({nome:arrrmazem, items:{$elemMatch:{referencia:acres.referencia}}}, {$inc:{"items.$.disponivel":acres.disponivel}});

					  if(tgt.n==0){
								 await armazem_db.updateOne({nome:arrrmazem}, {$push:{items:acres}});
								
									}


							// 		 			await stock_req_history_db.gravar_historico({beneficiario:obj.Armazem, beneficiario_ref: encowr[0]._id, request_from_ref:"Primavera", request_from:"Primavera", ref_Item:itenn[0]._id, numero:"carregamento", quantidade:obj.Quantidade, nome_item:itenn[0].description_item, serialized:itenn[0].serialized, cliente_name:itenn[0].cliente_name, precos:["0"]}, function(errp, d){
							// 	if(errp)
							// 		console.log("ocorreu um erro ao tentar gravar historico")
							// 	else
							// 		console.log("Historico gravado com sucesso!!")
							// })

							

	}
	else
		if(itenn.length>0 && enco_stock_p.length>0){

			var acres=await {};
		acres.serialized=await itenn[0].serialized_item;
		acres.cliente_name=await itenn[0].cliente_name;
		acres.description_item=await itenn[0].description_item;
		acres.referencia=await itenn[0]._id;
		acres.disponivel=await obj.Quantidade;
		acres.grupo=await itenn[0].grupo;
		 var tgt = await stock_pessoal_db.updateOne({nome:arrrmazem, disponibilidade:{$elemMatch:{referencia:acres.referencia}}}, {$inc:{"disponibilidade.$.disponivel":obj.Quantidade}});

					  if(tgt.n==0){
								 await stock_pessoal_db.updateOne({nome:arrrmazem}, {$push:{disponibilidade:acres}});
								
									}

									
						


		}
			else
				if(itenn.length>0 && enco_stock_p.length==0 && pessoa_enc.length>0){
					var acres=await {};
					acres.nome=await pessoa_enc[0].nome;
					acres.nome_ref=await pessoa_enc[0]._id;
					acres.disponibilidade=await[];
					acres.disponibilidade[0]=await {};
					acres.disponibilidade[0].serialized=await itenn[0].serialized_item;
					acres.disponibilidade[0].cliente_name=await itenn[0].cliente_name;
					acres.disponibilidade[0].description_item=await itenn[0].description_item;
					acres.disponibilidade[0].referencia=await itenn[0]._id;
					acres.disponibilidade[0].disponivel=await obj.Quantidade;
					acres.disponibilidade[0].grupo=await itenn[0].grupo;
				
						await stock_pessoal_db.gravar_stock_pessoal(acres, function(irr, feito){
					if(irr)
						console.log("ocorreu um erro ao gravar stock!!")
					else
						console.log("historico gravado com sucesso!!")
						})



						
							


				}
				else{
		var ncrgdo=await {};
		ncrgdo.item=await obj.Descricao;
		ncrgdo.wahreh=await arrrmazem;
		ncrgdo.quati=await obj.Quantidade;
		await carregados.push(ncrgdo);

ncrgdo.description_item=await obj.Descricao;

// ncrgdo.product_code=await obj.PRODUCTITEMCODE;

ncrgdo.unit_sale=await "Each";
ncrgdo.part_number=await obj.Artigo;
ncrgdo.product_code=await obj.Artigo;
ncrgdo.least_price=await "0";
ncrgdo.serialized_item=await "nao"
ncrgdo.cliente_name=await obj.Proprietario;
 ncrgdo.registado_por=await "Helio Mahesse";
ncrgdo.cliente_stock=await "Cliente";
ncrgdo.grupo=await "DLA";

var ttt=await stock_item_db.create(ncrgdo);
console.log(ttt);

	}
	await sleep(10);
}, 0)

// console.log("=========================================================after wards============================================")

console.log(JSON.stringify(carregados));


// ****************************************************inicio da organizacao dos artigos***********************************


// await wrz.reduce(async(ac, obj, i)=>{
// await ac;
// sleep(10);
// var encont=await usuario_db.updateOne({nome:obj.Nome},{$set:{user_code:obj.Codigo}});
// if(encont.n==0){
// 	await carregados.push(obj.Nome)

// }else
// console.log(encont)


// }, 0);


// console.log(carregados);




// *********************************************************fim da organizacao dos artigos***********************************************



	// ===========================================actualizacao de stock==================================================================================================================================================
// var nao_carregados=await [];
// var criados=await [];
// await teste.Sheet1.reduce(async (ac, obj, i)=>{
// await ac;
// var fontew=await armazem_db.find({nome:obj.Source}).lean();
// var destinoP=await usuario_db.find({nome:obj.Destination}).lean();
// var destinoW=await armazem_db.find({nome:obj.Destination}).lean();
// var item_d=await stock_item_db.find({description_item:obj.descricao}).lean();

// var grav=await {};
// grav.beneficiario=await destinoP.length>0? destinoP[0].nome : (destinoW.length>0? destinoW[0].nome: obj.Destination);
// grav.beneficiario_ref=await destinoP.length>0? destinoP[0]._id : (destinoW.length>0? destinoW[0]._id: 'sem_referencia');
// grav.request_from=await fontew.length>0? fontew[0].nome : obj.Source;
// grav.request_from=await fontew.length>0? fontew[0]._id : "sem_referencia";
// grav.ref_Item=await item_d.length>0? item_d[0]._id : "sem_item_referencia";
// grav.nome_item=await obj.descricao;
// grav.numero=await obj.Referencia;
// grav.serialized=await  item_d.length>0? item_d[0].serialized_item : "item_desconhecido";
// grav.cliente_name=await  item_d.length>0? item_d[0].cliente_name : "COMSERV";
// var raz_cot=await obj.Razao_cotacao.split("&");
// grav.razao_uso=await raz_cot[0];
// grav.cotacao=await raz_cot[1];
// await criados.push(grav);

// sleep(10);




// }, 0)

// console.log(JSON.stringify(criados));

// =========================================================fim importacao de stock==================================================================

// =========================================================inicio de actualizacao de stock_item ============================================
// console.log(teste.Data)
// var tes=await [];
// await teste.Data.reduce(async(ac, obj, i)=>{
// 	await ac;
// 	sleep(5);
// 	var ty=await stock_item_db.update({description_item:obj.DESCRIPTIONPT}, {description_item_e:obj.DESCRIPTION});
// 	console.log(ty)
// 	await tes.push(obj.DESCRIPTION);

// })


// console.log(JSON.stringify(tes))

// =====================================================================fim de  actualizacao de stock_item==============================================================

// =====================================================================actualizacao de Stock request==================================================================

// ====================================================================fim de actualizacao de stock request===============================================================




})


router.post("/novo", upload.any(), async function(req, res){
	var userData=await req.session.usuario;
	console.log(req.body)
	let stockk= await req.body;
	stockk.requested_by_ref=await userData._id;
	stockk.items=await [];


	var encontr_wr=await armazem_db.find({_id:"5e674acfa369f51130f9cbbb"}).lean();
	stockk.regiao=await userData.regiao;
	if(req.body.requisitar_em=="SST" || req.body.requisitar_em=="Ferramentas" || req.body.requisitar_em=="Frota" || req.body.requisitar_em.indexOf("Armazem")!=-1){
		var onde_req=await armazem_db.find({"nome":{ $regex:"Armazem", $options: "i" }, pessoas_permitidas:{$in:[userData.nome]}});
		stockk.request_from=await onde_req[0].nome;
		stockk.request_from_ref=await onde_req[0]._id;
		stockk.responsaveis_arrmazem=await onde_req[0].responsavel


	}
	


	if(stockk.item_nome){
		if(Array.isArray(stockk.item_nome))
		for(let i=0;i<stockk.item_nome.length; i++){
			stockk.items[i]={};
			stockk.items[i].description=req.body.item_nome[i];
			stockk.items[i].quanty=req.body.quantidades[i];
			stockk.items[i].referencia=req.body.referencia[i];
			stockk.items[i].serialized=req.body.serialized[i];
			stockk.items[i].cliente_name=req.body.cliente_name[i];
			stockk.items[i].grupo=req.body.grupo[i];
		}
	else
		for(let i=0;i<1; i++){
			stockk.items[i]={};
			stockk.items[i].description=req.body.item_nome;
			stockk.items[i].quanty=req.body.quantidades;
			stockk.items[i].referencia=req.body.referencia;
			stockk.items[i].serialized=req.body.serialized;
			stockk.items[i].cliente_name=req.body.cliente_name;
			stockk.items[i].grupo=req.body.grupo;
		}

	}


	if(req.body.requisitar_em=="SST"  || req.body.requisitar_em=="Frota" || req.body.requisitar_em=="Ferramentas"){
		var acres__=await armazem_db.findOne({nome:req.body.requisitar_em})


		stockk.intervenientes=await [userData.nome, userData.nome_supervisor,  req.body.responsaveis, onde_req[0].responsavel[0], req.body.book_out_to_store];
		stockk.opcional_=await acres__.responsavel.length>1? [acres__.responsavel[1]] : [""];

	}
	else
		stockk.intervenientes=await [userData.nome, userData.nome_supervisor, userData.nome_supervisor, req.body.responsaveis, req.body.book_out_to_store];

if(req.body.requisitar_em=="Ferramentas")
	stockk.intervenientes=await [userData.nome, userData.nome_supervisor,  userData.nome_supervisor, onde_req[0].responsavel[0], req.body.book_out_to_store];

	
	stockk.estagio=[1];
	stockk.date_actions=[new Date()];
	stockk.stock_approvers=[userData.nome];

	let transf=stockk.Date_required.split("/")
	transf.reverse();
	let transf1=transf.join("-");
	console.log(transf1);
	stockk.real_date_required=new Date(transf1);

	stockk.registado_por=userData.nome;


	if(["Hodaifo Xavier", "Gilberto Mucato", "Francisco Mandlate", "Mario Niquisse", "Armando Massingue"].indexOf(userData.nome)!=-1 && req.body.department=="Telco" && req.body.requisitar_em.indexOf("Armazem")!=-1){
		var admin_case=await admin_db.find({});
		var achar_regional_index= await  admin_case[0].regiao.findIndex(x=>x.nome==stockk.regiao);
		stockk.intervenientes[1]=await admin_case[0].regiao[achar_regional_index].regional_manager;
		stockk.intervenientes[2]=await admin_case[0].regiao[achar_regional_index].regional_manager;
	}

	var procuralinemanager = await usuario_db.findOne({nome:stockk.intervenientes[1]}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	});
	var k="";

	await stockk.items.reduce(async(acumul, iiidiota)=>{
		await acumul;
		// k=
		 k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ iiidiota.description + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + iiidiota.quanty +"</td></tr>";


	}, 0);


	
	

	if(stockk.items.length>0){
		stock_request_db.gravar_stock_request(stockk, function(err, data){
			if(err)
				console.log("erross");
			else 
				console.log("saved")
		})

	emailSender.createConnection();
	emailSender.sendEmailNewStockRequest(stockk, userData, procuralinemanager, k);

		

	}

	res.json({feito:"feito"});
		

})

// **********************************************************************************actualizacao de stocks dos tecnicos****************************
router.post("/transferencia/novo", upload.any(), async(req, res)=>{
	var userData=req.session.usuario;
	console.log(req.body)
	var este=await {};
	este.feito_por=await userData.nome;
	este.origem=await req.body.origem;
	este.origem_ref=await req.body.origem_ref;
	este.destino=await req.body.destino;
	este.destino_ref=await req.body.destino_ref;

	var alvo=await armazem_trans_db.create(este);

	await sleep(1000);

	if(Array.isArray(req.body.description_item)){
		await req.body.description_item.reduce(async(ac, obj, i)=>{
			await ac;
			await sleep(20);
			var dec=await req.body.quantidades[i].replace(/,/g,"");
			var dec1=await parseInt(dec);
			var dec2=await -1*dec1;
			var testee= await armazem_db.updateOne({_id:req.body.origem_ref, items:{$elemMatch:{referencia:req.body.referencia[i], disponivel:{$gte:dec1} }}}, {$inc:{"items.$.disponivel":dec2}});
			if(testee.n!=0){

				var find_whz=await armazem_db.findOne({_id:req.body.origem_ref})
				var itemm=await stock_item_db.findOne({_id:req.body.referencia[i]}).lean();
				if(itemm!=null && find_whz!=null){
					var estte=await {};
					estte.referencia=await itemm._id;
					estte.description_item=await itemm.description_item;
					estte.serialized=await itemm.serialized_item;
					estte.part_number=await itemm.part_number;
					estte.disponivel=await parseInt(dec1);
					estte.cliente_name=await itemm.cliente_name;
					estte.grupo=await itemm.grupo;
					este.serial_number=[]

					// var teste=await armazem_db.updateOne({_id:req.body.destino_ref, items:{$elemMatch:{referencia:itemm._id}}},{$inc:{"items.$.disponivel":dec1}})
					// 		if(teste.n==0){
					// 			await armazem_db.updateOne({_id:req.body.destino_ref}, {$push:{items:estte}});
					// 		}

					await armazem_trans_db.updateOne({_id:alvo._id},{$push:{items:estte}});

					await stock_req_history_db.gravar_historico({beneficiario:este.destino, request_from_ref:este.origem_ref, request_from:este.origem, beneficiario_ref:este.destino_ref, ref_Item:itemm._id, numero:"TR4N5F3R3NC14", quantidade:dec1, nome_item:itemm.description_item, serialized:itemm.serialized_item,  cliente_name:itemm.cliente_name}, function(errp, d){
				 			if(errp)
				 				console.log("ocorreu um erro ao tentar gravar historico")
				 			else
				 				console.log("Historico gravado com sucesso!!")
				 		})

			

				}	
		}
			


		},0)

		res.json({feito:"feito"})
	}
	else{

		await [0].reduce(async(ac, obj, i)=>{
			await ac;
			await sleep(50);
			var dec=await req.body.quantidades.replace(/,/g,"");
			var dec1=await parseInt(dec);
			var dec2=await -1*dec1;
			var testee= await armazem_db.updateOne({_id:req.body.origem_ref, items:{$elemMatch:{referencia:req.body.referencia, disponivel:{$gte:dec1} }}}, {$inc:{"items.$.disponivel":dec2}});
			if(testee.n!=0){

				var find_whz=await armazem_db.findOne({_id:req.body.origem_ref})
				var itemm=await stock_item_db.findOne({_id:req.body.referencia}).lean();
				if(itemm!=null && find_whz!=null){
					var estte=await {};
					estte.referencia=await itemm._id;
					estte.description_item=await itemm.description_item;
					estte.serialized=await itemm.serialized_item;
					estte.part_number=await itemm.part_number;
					estte.disponivel=await parseInt(dec1);
					estte.cliente_name=await itemm.cliente_name;
					estte.grupo=await itemm.grupo;
					este.serial_number=[]

					// var teste=await armazem_db.updateOne({_id:req.body.destino_ref, items:{$elemMatch:{referencia:itemm._id}}},{$inc:{"items.$.disponivel":dec1}})
					// 		if(teste.n==0){
					// 			await armazem_db.updateOne({_id:req.body.destino_ref}, {$push:{items:estte}});
					// 		}

					await armazem_trans_db.updateOne({_id:alvo._id},{$push:{items:estte}})

					await stock_req_history_db.gravar_historico({beneficiario:este.destino, request_from_ref:este.origem_ref, request_from:este.origem, beneficiario_ref:este.destino_ref, ref_Item:itemm._id, numero:"TR4N5F3R3NC14", quantidade:dec1, nome_item:itemm.description_item, serialized:itemm.serialized_item,  cliente_name:itemm.cliente_name}, function(errp, d){
				 			if(errp)
				 				console.log("ocorreu um erro ao tentar gravar historico")
				 			else
				 				console.log("Historico gravado com sucesso!!")
				 		})
			

				}	
		}
			


		},0)

		res.json({feito:"feito"})


	}





})






// ***********************************************************************************End actualiacao dos tecnicos*****************************************





router.post("/editado_stRequest/:id", upload.any(), function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)
	let stockk= req.body;
	stockk.items=[];

	if(stockk.item_nome){
		if(Array.isArray(stockk.item_nome))
		for(let i=0;i<stockk.item_nome.length; i++){
			stockk.items[i]={};
			stockk.items[i].description=req.body.item_nome[i];
			stockk.items[i].quanty=req.body.quantidades[i];
			stockk.items[i].referencia=req.body.referencia[i];
			stockk.items[i].serialized=req.body.serialized[i];
			stockk.items[i].cliente_name=req.body.cliente_name[i];

		}
	else
		for(let i=0;i<1; i++){
			stockk.items[i]={};
			stockk.items[i].description=req.body.item_nome;
			stockk.items[i].quanty=req.body.quantidades;
			stockk.items[i].referencia=req.body.referencia;
			stockk.items[i].serialized=req.body.serialized;
			stockk.items[i].cliente_name=req.body.cliente_name;
		}

	}

	stockk.intervenientes=[userData.nome, userData.nome_supervisor, req.body.responsaveis, req.body.book_out_to_store];
	stockk.estagio=[1];
	stockk.date_actions=[new Date()];
	stockk.stock_approvers=[userData.nome];

	let transf=stockk.Date_required.split("/")
	transf.reverse();
	let transf1=transf.join("-");
	console.log(transf1);
	stockk.real_date_required=new Date(transf1);

	stockk.registado_por=userData.nome;
	
	stock_request_db.updateOne({_id:req.params.id},{$set:stockk, $unset:{returned:1,returned_reason:1}}, function(erro, dados){
		if(erro)
			console.log("ocorreu um erro ao tentar actualizar o stock request")
		else
			console.log("actualizacao feita com sucesso!")
	})

	// stock_request_db.gravar_stock_request(stockk, function(err, data){
	// 	if(err)
	// 		console.log("erross");
	// 	else 
	// 		console.log("saved")
	// })

	res.json({feito:"feito"});

})

module.exports=router;