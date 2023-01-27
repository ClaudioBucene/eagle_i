var express=require("express");
var router = express.Router();
var armazem_db=require("../entities/armazem");
var person_stock_db=require("../entities/stock_pessoal")
var pessoas=require("../entities/usuario");
var jobcard_db=require("../entities/jobcard");
var jobcardprojects = require("../entities/jobcard_projects.js");
var stock_request_db=require("../entities/stock_request")
var stock_return_db=require("../entities/stock_return")
var stock_item_db=require("../entities/stock_item")
var rastreio_stock_db=require("../entities/rastreio");
var stock_req_history_db=require("../entities/stock_request_history")
var usuario_db=require("../entities/usuario");
var dados_provinciais = require('../util/provincias-distritos');
var multer = require('multer');
var path = require("path");
var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/comprovativo_huawei');
        },
        filename: function(req, file, cb) {
            cb(null, req.session.usuario.nome + "_" + Date.now() + path.extname(file.originalname));
        }
    })
});

// (async function(){
// 	var todo=await usuario_db.find({status:"activo"}).sort({nome:1});
// 	var todos=await [];
// 	await Promise.all(todo.map(async(obj, i)=>{
// 		await todos.push(obj.nome);
// 	}))

// 	var tgg=await armazem_db.updateMany({$or:[{nome:"IT"}, {nome:"SST"}, {nome:"Frota"}]},{$set:{pessoas_permitidas:todos}});
// 	console.log(tgg);

// })()


// (async function(){
// 	var todas=await pessoas.updateMany({nome_supervisor:"Dalilio Chigoi", regiao:"maputo"},{$set:{nome_supervisor:"Samuel David"}});
// 	console.log(todas);
// // ££££££££££££££33333333333333££££££££££££££££££££££
// var ele=await pessoas.findOne({nome:"Samuel David"}).lean();

// var ty=await jobcard_db.updateMany({ttnumber_status:"New", jobcard_linemanager:"Dalilio Chigoi", jobcard_regiao:"maputo"},{$set:{jobcard_linemanager:ele.nome, jobcard_cell:ele.telefone_1, jobcard_linemanagerid:ele._id, "jobcard_controladorintervenientes.2":ele.nome}})

// console.log(ty);
// // £££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££

// })()


// (async function(){
// 	var encontr_peso=await person_stock_db.find({}).lean();

// 					await encontr_peso.reduce(async(ac, obj, i)=>{
// 						await ac
// 						await sleep(10);
// 					 	await obj.disponibilidade.reduce(async(ac1, obj1, i1)=>{
// 					 		await ac1;
// 					 		await sleep(20);
// 					 		if(obj1.disponivel<0 && i1==0){
// 					 		var test=await 	person_stock_db.updateOne({_id:obj._id, disponibilidade:{$elemMatch:{referencia:obj1.referencia}}},{"disponibilidade.$.disponivel":0})
					 		
// 					 		console.log(test)

// 					 		}

// 					 	})
					 	
// 					 }, 0)
					
// })()






router.get("/", function(req, res){
	var userData= req.session.usuario;

	if(userData.nivel_acesso=="admin" || userData.nome=="Henk Brutten"|| userData.nome=="Manager" || userData.nome=="Hamilton Sitoe")
		armazem_db.find({}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar stock_items!!")
			else
			{
				res.render("stock_home", {DataU:userData, Stock_request:data, title:"EagleI"})
			}
		})
	else
		if(userData.funcao=="regional_manager")
			armazem_db.find({responsavel:{$in:[userData.nome]}}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("stock_home", {DataU:userData, Stock_request:data, title:"EagleI"})
				}
			})
		else
			res.redirect("/inicio")


})





router.get("/carregmento_huawei", async function(req, res){
	var userData=req.session.usuario;
	if(userData.nivel_acesso=="admin" || userData.nome=="David Nhantumbo" || userData.nome=="Hamilton Sitoe")
		res.render("carregamento_huawei", {DataU:userData, title:"EagleI"})
	else
		res.redirect("/inicio");
})

router.post("/matarinha", upload.any(), async function(req, res){
	var entradas1=await JSON.parse(req.body.m);
	var entradas=await entradas1["Relatorio"];

	console.log(entradas)

	await entradas.reduce(async(ac, idiota, j)=>{
	await ac;
	var puto=await {};


puto.description_item=await idiota.descricao
puto.serialized_item=await "nao"

puto.cliente_name=await "COMSERV"
puto.registado_por=await "Helio Mahesse"

puto.cliente_stock=await "Cliente";

	stock_item_db.gravarStock_item(puto, function(err){
		if(err)
			console.log("ocorreu um erro")
		else
			console.log("feito meu puto!")
	})

	}, 0)
	
	// var estracto=[];
})

router.post("/actualzacao_kilometro", upload.any(), async function(req, res){
	var entradas1=await JSON.parse(req.body.m);
	var estracto=[];
	// 1
	// var entradas=await entradas1["Data"];

	var entradas=await entradas1["Sheet1"]; 

	console.log(entradas)
	await entradas.reduce(async(ac, idiota, j)=>{
		await ac;
		sleep(900);
		var itemm = await stock_item_db.find({description_item:idiota.description_item});
		var find_wh=await armazem_db.find({nome:idiota.nome})
		var find_prsn= await pessoas.find({nome:idiota.nome});
		var find_prsn_db= await person_stock_db.find({nome:idiota.nome});
		if(find_prsn!=null && itemm!=null){
		if(itemm.length>0 && find_prsn.length>0 ){
			if(find_prsn_db.length>0){
					if(itemm[0].serialized_item){
						var precos= await Array.from({length:idiota.quant}, (v, p)=>idiota.preco);
						var nume_ss=await itemm[0].serialized_item=="sim"? ["c0m53rv"]:[];

						// var precos= await Array.from({length:idiota.quant}, (v, p)=>0);
						// var nume_ss=await itemm[0].serialized_item=="sim"? [idiota.serial__]:[];

						var tentar_p = await person_stock_db.updateOne({nome_ref:find_prsn[0]._id, disponibilidade:{$elemMatch:{referencia:itemm[0]._id}}}, {$inc:{"disponibilidade.$.disponivel":idiota.quant}, $push:{"disponibilidade.$.num_serie":nume_ss, "disponibilidade.$.precos":precos}})
					// var tentar_p await armazem_db.updateOne({_id:req.body.arman, items:{$elemMatch:{referencia:j.referencia}}}, {$inc:{"items.$.disponivel":incme1}, $push:{"items.$.serial_number":j.num_serie}});
						if(tentar_p.n==0){
							await person_stock_db.updateOne({nome_ref:find_prsn[0]._id}, {$push:{disponibilidade:{referencia:itemm[0]._id, description_item:idiota.description_item, serialized:itemm[0].serialized_item, cliente_name:itemm[0].cliente_name, disponivel:idiota.quant, num_serie:nume_ss, precos:precos}}})
						}

					}

		if(itemm[0].serialized_item=="sim"){
		var rastreo={};

		rastreo.serial_number=await "c0m53rv"+j;

		// rastreo.serial_number=idiota.serial__;

		rastreo.part_number=itemm[0].part_number;
		rastreo.quanty=idiota.quant;
		// rastreo.pod=idiota.pod;
		rastreo.status="disponivel";
		rastreo.datas_local_actual=[new Date()];
		rastreo.meio_atribuicao=["Carregamento"];
		rastreo.atribuidores=["Helio Mahesse"];

		// depos de id

		rastreo.referencia=await itemm[0]._id;
		rastreo.owner=await itemm[0].cliente_name;
		rastreo.description=await itemm[0].description_item; 
		rastreo.local_actual= await [idiota.nome];
		rastreo.ref_local_actual= await [find_prsn[0]._id];

		await rastreio_stock_db.gravar_rastreio(rastreo, function(eeero){
					  				if(eeero)
					  					console.log("rastreio nao gravado");
					  				else
					  					console.log("rastreio gravado com sucesso!")
					  			})




			}
						
		}
		else{
			var dispo=await [];
			var argu=await {};

			var precos= await Array.from({length:idiota.quant}, (v, p)=>idiota.preco);
			argu.num_serie= await itemm[0].serialized_item=="sim"? ["c0m53rv"] :[];
			// Para VDM
			// var precos= await Array.from({length:idiota.quant}, (v, p)=>0);
			// var nume_ss=await itemm[0].serialized_item=="sim"? [idiota.serial__]:[];

			argu.disponivel=await idiota.quant;
			argu.serialized= await itemm[0].serialized_item
			argu.cliente_name=await await itemm[0].cliente_name;
			argu.description_item=await idiota.description_item;
			argu.precos=await precos;
			dispo.push(argu);


			await person_stock_db.gravar_stock_pessoal({nome:idiota.nome, nome_ref:find_prsn[0]._id, disponibilidade:dispo}, function(err){
				if(err)
					console.log("ocorreu um erro ao tentar gravar stock_pessoal");
				else
					console.log("");
			})

			if(itemm[0].serialized_item=="sim"){
		var rastreo={};
		rastreo.serial_number=await "c0m53rv"+j;
		// rastreo.serial_number=idiota.serial__;
		rastreo.part_number=itemm[0].part_number;
		rastreo.quanty=idiota.quant;
		// rastreo.pod=idiota.pod;
		rastreo.status="disponivel";
		rastreo.datas_local_actual=[new Date()];
		rastreo.meio_atribuicao=["Carregamento"];
		rastreo.atribuidores=["Helio Mahesse"];

		// depos de id

		rastreo.referencia=await itemm[0]._id;
		rastreo.owner=await itemm[0].cliente_name;
		rastreo.description=await itemm[0].description_item; 
		rastreo.local_actual= await [idiota.nome];
		rastreo.ref_local_actual= await [find_prsn[0]._id];

		await rastreio_stock_db.gravar_rastreio(rastreo, function(eeero){
					  				if(eeero)
					  					console.log("rastreio nao gravado");
					  				else
					  					console.log("rastreio gravado com sucesso!")
					  			})




			}
		}
	}

}


		if(itemm.length>0 && find_wh.length>0 ){
			if(find_wh.length>0){
					if(itemm[0].serialized_item){
						// var nume_ss=itemm[0].serialized_item=="sim"? ["c0m53rv"]:[]
						// var precos= await Array.from({length:idiota.quant}, (v, p)=>idiota.preco)

						var precos= await Array.from({length:idiota.quant}, (v, p)=>0);
						var nume_ss=await itemm[0].serialized_item=="sim"? [idiota.serial__]:[];

						var tentar_p = await armazem_db.updateOne({nome:idiota.nome, items:{$elemMatch:{referencia:itemm[0]._id}}}, {$inc:{"items.$.disponivel":idiota.quant}, $push:{"items.$.serial_number":nume_ss, "items.$.precos":precos}})
					// var tentar_p await armazem_db.updateOne({_id:req.body.arman, items:{$elemMatch:{referencia:j.referencia}}}, {$inc:{"items.$.disponivel":incme1}, $push:{"items.$.serial_number":j.num_serie}});
						if(tentar_p.n==0){
							await armazem_db.updateOne({nome:idiota.nome}, {$push:{items:{referencia:itemm[0]._id, description_item:idiota.description_item, serialized:itemm[0].serialized_item, cliente_name:itemm[0].cliente_name, disponivel:idiota.quant, serial_number:nume_ss, precos:precos}}})
						}

						// ****************************************nosso rastreio**********************************************

						if(itemm[0].serialized_item=="sim"){
		var rastreo={};

		rastreo.serial_number=await "c0m53rv"+j;
		// rastreo.serial_number=idiota.serial__;


		rastreo.part_number=itemm[0].part_number;
		rastreo.quanty=idiota.quant;
		// rastreo.pod=idiota.pod;
		rastreo.status="disponivel";
		rastreo.datas_local_actual=[new Date()];
		rastreo.meio_atribuicao=["Carregamento"];
		rastreo.atribuidores=["Helio Mahesse"];

		// depos de id

		rastreo.referencia=await itemm[0]._id;
		rastreo.owner=await itemm[0].cliente_name;
		rastreo.description=await itemm[0].description_item; 
		rastreo.local_actual= await [idiota.nome];
		rastreo.ref_local_actual= await [find_wh[0]._id];

		await rastreio_stock_db.gravar_rastreio(rastreo, function(eeero){
					  				if(eeero)
					  					console.log("rastreio nao gravado");
					  				else
					  					console.log("rastreio gravado com sucesso!")
					  			})




			}

					}
						
		}
		
	}



// *********************************acrescentar quem na carregou*********************************
if((find_prsn.length==0 && itemm.length==0)  || (itemm.length==0 && find_wh.length>0)){
	console.log(idiota.description_item, idiota.nome)
	var locaarea={};
	locaarea.nome=await idiota.nome;
	locaarea.descricao=await idiota.description_item;
	locaarea.quant=idiota.quant;

	await estracto.push(locaarea)



}

// *********************************ultimo de quem nao carregou***********************************

		

	}, 0);

	if(typeof XLSX == 'undefined') XLSX = require('xlsx');

	/* make the worksheet */
	var ws = await XLSX.utils.json_to_sheet(estracto);

	/* add to workbook */
	var wb = await XLSX.utils.book_new();
	await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

	/* generate an XLSX file */
	await XLSX.writeFile(wb, "sheetjs_naocarregado.xlsx");

	// res.download("./sheetjs_naocarregado.xlsx")

	
})











router.post("/uploadfichiero", upload.any(), async function(req, res){
	var userData= req.session.usuario;
	if(userData.nivel_acesso=="admin" || userData.nome=="David Nhantumbo" || userData.nome=="Hamilton Sitoe"){
	console.log(JSON.parse(req.body.m));
	var inpt=await JSON.parse(req.body.m);
	await inpt.reduce(async function(ac, idiota, i){
		await ac;
		await sleep(100);
		var rastreo={};
		rastreo.serial_number=idiota.sn;
		rastreo.part_number=idiota.pn;
		rastreo.quanty=idiota.quant;
		rastreo.pod=idiota.pod;
		rastreo.status="disponivel";
		rastreo.datas_local_actual=[new Date()];
		rastreo.meio_atribuicao=["Carregamento"];
		rastreo.atribuidores=[userData.nome];
		var inter_m=await idiota.descr.trim();
		var partnn=await idiota.pn.trim();
		if(req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "carrager_comprovativo") {
                rastreo.ficheiro= "/uploads/comprovativo_huawei/" + req.files[i].filename;
                continue;
            	}
        	}
    	}

		var incremnto=await parseInt(idiota.quant)
		var dados=await stock_item_db.findOne({$or:[{description_item:inter_m},{part_number:idiota.pn}]})

		if(dados!=null){
					rastreo.referencia=dados._id;
					rastreo.owner=dados.cliente_name;
					rastreo.description=dados.description_item; 

					var encontrwh=await armazem_db.findOne({nome:idiota.wh});

					 var actualizado= await armazem_db.updateOne({nome:idiota.wh, items:{$elemMatch:{referencia:dados._id}}}, {$inc:{"items.$.disponivel":incremnto}, $push:{"items.$.serial_number":idiota.sn, "items.$.pod":idiota.pod, "items.$.data_received":new Date, "items.$.precos":"0"}})

					  if(actualizado.n==0)
							{
								console.log("feito")
								await armazem_db.updateOne({nome:idiota.wh}, {$push:{items:{"disponivel":incremnto, "referencia":dados._id, "description_item":dados.description_item , "cliente_name":dados.cliente_name, "defeituosa":0, "serial_number":[idiota.sn], data_received:[new Date()], "part_number":idiota.pn, "grupo":dados.grupo,  "pod":idiota.pod, "precos":["0"]}}});

								
							}



					  

					  if(encontrwh!=null){
					  			rastreo.local_actual= await [idiota.wh];
					  			rastreo.ref_local_actual= await [encontrwh._id];
					  			await rastreio_stock_db.gravar_rastreio(rastreo, function(eeero){
					  				if(eeero)
					  					console.log("rastreio nao gravado");
					  				else
					  					console.log("rastreio gravado com sucesso!")
					  			});
					  			




					  		}

					  			var ano =  new Date().getFullYear().toString().substr(-2);
								var mes = (((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1)).toString();
								var dia = ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate()).toString();
	
								var ref_carregamento =await idiota.pod+ano + mes + dia;

					  			

					  // 			await stock_req_history_db.gravar_historico({beneficiario:idiota.wh, beneficiario_ref: encontrwh._id, request_from_ref:ref_carregamento, request_from:"VM/HW", ref_Item:dados._id, numero:idiota.pod, quantidade:idiota.quant, nome_item:dados.description_item, serialized:dados.serialized, cliente_name:dados.cliente_name, precos:["0"]}, function(errp, d){
							// 	if(errp)
							// 		console.log("ocorreu um erro ao tentar gravar historico")
							// 	else
							// 		console.log("Historico gravado com sucesso!!")
							// })



					  		


				}

	}, 0);

	res.json({feito:"feito"});


}

else
res.redirect("/inicio")






})

router.get("/rastreio_items", async function(req, res){
	var userData=req.session.usuario;
	if(userData.nivel_acesso=="admin" || userData.nome=="David Nhantumbo" || userData.nome=="Hamilton Sitoe"){
		var dados=await rastreio_stock_db.find({}).sort({description:1}).limit(50);
		console.log(dados);
		res.render("rastreio_stock_home", {DataU:userData, Armazens:dados, title:"EagleI", cont:0})
	}
	else
		res.redirect("/inicio")
})


router.post("/ratreio/buscar", upload.any(), async(req, res)=>{
	console.log(req.body)
	var userData=req.session.usuario;
	var teste=await req.body.pesquisador;
	var b=await rastreio_stock_db.find({$or:[{ description:{ $regex: new RegExp(`${teste}`), $options: 'i' } }, { part_number:{ $regex: new RegExp(`${teste}`), $options: 'i' } }, { serial_number:{ $regex: new RegExp(`${teste}`), $options: 'i' } }]}).lean().exec();
	res.render("rastreio_stock_home", {DataU:userData, Armazens:b, title:"EagleI", cont:0})
})

router.get("/rastreioj/proximo/:id", async(req, res)=>{
	var userData=await req.session.usuario;
	var salto=await parseInt(req.params.id)*50;
	var cont= await parseInt(req.params.id);

	if(cont==0)
		res.redirect("/armazem/rastreio_items")
	else

	{
		var data=await rastreio_stock_db.find({}).sort({description_item:1}).limit(50).skip(salto).lean();
		console.log(data);
		res.render("rastreio_stock_home", {DataU:userData, Armazens:data, title:"EagleI", cont:cont});
	}

})

router.get("/rastreio_items/:id", function(req, res){
	var userData=req.session.usuario;
	if((userData.nivel_acesso=="admin" || userData.nome=="David Nhantumbo" || userData.nome=="Hamilton Sitoe") && req.params.id.length==24){
		rastreio_stock_db.find({_id:req.params.id}, function(err, dados){
			if(err)
				console.log("ocrreu erro ao tentar achar rastreio")
			else
				if(dados.length>0)
					res.render("rastreio_stock_detalhes", {DataU:userData, Armazens:dados, title:"EagleI"})
				else
					res.redirect("/inicio")	
		})
	}
	else
		res.redirect("/inicio")
})




router.get("/regional/:id", function(req, res){
	var userData= req.session.usuario;
	armazem_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("Ocorreu um erro ao tentar encontrar armazem regional")
		else
			if(data.length>0)
				{
					console.log(data)
					res.render("armazem_regional", {DataU:userData, Armazem:data, title:"EagleI", this_warehouse:req.params.id})
				}
			else
				res.redirect("/inicio")
	})
})

router.get("/mystock", function(req, res){
	var userData=req.session.usuario;
				
				person_stock_db.find({nome:req.session.usuario.nome}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar aceder meu stock")
				else{

					console.log(data)
					res.render("stock_pessoal_home", {DataU:userData, MeuStock:data, title:"EagleI"})
				}
				})
			

})

		router.get("/central", function(req, res){
			var userData=req.session.usuario;
			if(userData.nivel_acesso=="admin" || userData.nome=="Neila Cassam" || userData.nome=="William Goldswain" || userData.nome=="Celeste Sambo" || userData.nome=="Teresa Guimaraes")
				armazem_db.find({}, function(err, data){
					if(err)
						console.log("ocorreu um erro ao tentar selecionar stock_items!!")
					else
					{
						res.render("armazens_home", {DataU:userData, Armazens:data, title:"EagleI"})
					}
				}).sort({nome:1}).select({nome:1, provincia:1, regiao:1, responsavel:1}).lean();
			else
				
					armazem_db.find({responsavel:{$in:[userData.nome]}}, function(err, data){
						if(err)
							console.log("ocorreu um erro ao tentar selecionar stock_items!!")
						else
						{
							res.render("armazens_home", {DataU:userData, Armazens:data, title:"EagleI"})
						}
					}).sort({nome:1}).lean()
				

			// armazem_db.find({}, function(err, data){
			// 	if(err)
			// 		console.log("Ocorreu um ero ao tentar encontrar armazens")
			// 	else
			// 	{
			// 		res.render("armazens_home", {DataU:userData, Armazens:data, title:"EagleI"})
			// 	}

			// })


				})

router.get("/detalhes/:id", function(req, res){
	var userData=req.session.usuario;
	if(req.params.id.length==24)
		armazem_db.find({_id:req.params.id}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar encontrar os utilizadores do armazem")
			else
				if(data.length>0)
					{
						res.render("armazem_detalhes", {DataU:userData,   Armazem:data, title:"EagleI" })
					}
				else
					res.redirect("/inicio")
		})
	else
	res.redirect("/inicio");

	
})


router.get("/novo", async function(req, res){
	var userData=req.session.usuario;
var data2=await pessoas.find({$and:[{nome:{$ne:"administrador"}},{nome:{$ne:"Oficina"}},{nome:{$ne:"Parque"}}]}).sort({nome:1}).lean();
var data1= await armazem_db.find({}).lean();
var data= await data2.concat(data1);
res.render("armazem_form", {DataU:userData, 'Departamento':dados_provinciais.departamentos, 'provincias':dados_provinciais.provincias, Escolher:data, title:"EagleI" })



	
})


router.post("/novo", upload.any(), function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)
	let stockk= req.body;
	stockk.registado_por=userData.nome;
	

	armazem_db.gravar_armazem(stockk, function(err, data){
		if(err)
			console.log("erross");
		else 
			console.log("saved")
	})

});


router.get("/:id/novo", async function(req, res){
	var userData= await req.session.usuario;
	if(req.params.id.length==24)
		armazem_db.find({nome:{$regex: new RegExp("Armazem"), $options: 'i' }},async function(err, data){
			if(err)
				console.log("erro ocurred")
			else
				if(data.length>0){
					
							stock_item_db.find({}, async function(ty, dattta){
								if(ty)
									console.log("error ocurred")
								else
								{
									

					res.render("stock_request_form_wh", {DataU:userData,  Armazem:data,  Items:dattta,  title:"EagleI" })
								
									}
							}).sort({description_item:1})
							
					
				}
			else{
				let utj= await "/armazem/regional/"+req.params.id;
				res.redirect(utj)
				}
		})
		else
		res.redirect("/inicio")

	
})

router.post("/stockrequestwh/novo", upload.any(), async function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)
	let stockk= req.body;
	// stockk.requested_by_ref=userData._id;
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

	stockk.intervenientes=[userData.nome, "Antonio Biquiza", req.body.responsaveis, userData.nome];
	stockk.estagio=[1];
	stockk.date_actions=[new Date()];
	stockk.stock_approvers=[userData.nome];

	let transf=stockk.Date_required.split("/")
	transf.reverse();
	let transf1=transf.join("-");
	console.log(transf1);
	stockk.real_date_required=new Date(transf1);

	stockk.registado_por=userData.nome;

	var procuralinemanager = await usuario_db.findOne({nome:userData.nome_supervisor}, function(err,dataUser){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}else{
			console.log("Find User")

		}
	});

	console.log(stockk)


	
	

	if(stockk.items.length>0){
		stock_request_db.gravar_stock_request(stockk, function(err, data){
			if(err)
				console.log("erross");
			else 
				console.log("saved")
		})

	// 	emailSender.createConnection();
	// emailSender.sendEmailNewStockRequest(stockk, userData, procuralinemanager);

		

	}
		

})

router.get("/relatorio", function(req, res){
	var userData=req.session.usuario;

	armazem_db.find({}, function(err, dados){
		if(err)
			console.log("ocorreu um erro ao tentar achar armazem para relatorio")
		else{
			console.log(dados);
			res.render("warehouse_filtro_form", {DataU:userData, Fornecedor:dados,  title:"EagleI" })
		}
	})
	
})


router.post("/relotorios", upload.any(), async function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)

	if(req.body.data_inicio!='' && req.body.data_fim!=''){
		var start=new Date(req.body.data_inicio.split("/").reverse().join("-"));
		var end=new Date(req.body.data_fim.split("/").reverse().join("-")+"T23:00");
		console.log(start, end);
		if(req.body.supplier1=="any"){
			if(req.body.tipo_reporter=="Book out"){
				var armazemms=await [];

				var elels=await armazem_db.find({});
				await Promise.all(elels.map(async(onk, i)=>{
					await armazemms.push(onk._id.toString());
				}))

				console.log(armazemms)


				
				stock_req_history_db.find({data:{$gt:start, $lt:end}, request_from_ref:{$in:armazemms}}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, till:"Saidas do Armazem", pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})
	}

	if(req.body.tipo_reporter=="GRV"){
				

				
				stock_req_history_db.find({data:{$gt:start, $lt:end}, request_from:"PO"}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, till:"Entradas do Armazem", pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})
	}

	if(req.body.tipo_reporter=="Retornado"){


		var elesl=await armazem_db.find({}).sort({_id:-1});
		var dados=await [];
		await Promise.all(elesl.map(async(okn, i)=>{
			let yu=await okn._id.toString();
			await dados.push(yu);
		}))

		stock_req_history_db.find({data:{$gt:start, $lt:end}, beneficiario_ref:{$in:dados}, request_from:{$ne:"PO"}}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, till:"Saidas do Armazem", pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})
				

				
				
	}

	if(req.body.tipo_reporter=="Used spares"){
		var usuus=await usuario_db.find({})
		var elesl=await armazem_db.find({}).sort({_id:-1});
		var dados=await [];
		await Promise.all(elesl.map(async(okn, i)=>{
			let yu=await okn._id.toString();
			await dados.push(yu);
		}))

		await Promise.all(usuus.map(async(okn, i)=>{
			let yu=await okn._id.toString();
			await dados.push(yu);
		}))

		stock_req_history_db.find({data:{$gt:start, $lt:end}, beneficiario_ref:{$nin:dados}}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, till:"Saidas do Armazem", pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})

	}

		if(req.body.tipo_reporter=="Voda_Hua"){
		var usuus=await usuario_db.find({})
		var elesl=await armazem_db.find({}).sort({_id:-1});
		var dados=await [];
		var final = await [];

		var data = await jobcard_db.find({data_registojobcard:{$gt:start, $lt:end}, sparesArrayJobcard:{$size:1}},{sparesArrayJobcard:1, jobcard_tecniconome:1, jobcard_site:1, jobcard_regiao:1, jobcard_ttnumber:1, jobcard_jobtype:1})
		var dataprojects = await jobcardprojects.find({sparesArrayJobcard:{$size:1}},{sparesArrayJobcard:1, jobcard_tecniconome:1, jobcard_site:1, jobcard_projectnumber:1, jobcard_regiao:1, jobcard_jobtype:1})
		// console.log(data.length)
		// console.log(dataprojects.length)

		await data.reduce(async (ac, obj, i) =>{
			await ac
			await Promise.all(obj.sparesArrayJobcard.map(async (obj1, i1)=>{
				var stock = await stock_item_db.find({_id:obj1.jobcard_itemid});
				var armazem = await armazem_db.find({pessoas_permitidas:{$in:[obj.jobcard_tecniconome]},nome:{$regex: new RegExp("Armazem"), $options: 'i' }}, {nome:1});
				// console.log(armazem);
				
				if(obj1.jobcard_itemowner=="Vodacom" || obj1.jobcard_itemowner=="Huawei"){
					let tn = await {};
					tn.tecnico=await obj.jobcard_tecniconome;
					tn.site=await obj.jobcard_site;
					tn.ttnumber= await obj.jobcard_ttnumber;
					tn.regiao=await obj.jobcard_regiao;
					tn.tipo=await obj.jobcard_jobtype;
					tn.descricao=await obj1.jobcard_item;
					tn.part_number=await stock[0].part_number;
					tn.serial=await obj1.jobcard_itemnrserie;
					tn.serialAntigo=await obj1.jobcard_nomeitemreplace;
					tn.razao=await obj1.jobcard_itemreplacereason;
					tn.quantidade=await obj1.jobcard_quantityuse;
					tn.data=await obj1.jobcard_datauso;
					tn.propretario=await obj1.jobcard_itemowner;
					tn.armazem= await armazem[0].nome;
					await final.push(tn);
				}
			}))
		}, 0);
		// console.log(final.length)

		await dataprojects.reduce(async (ac, obj, i) =>{
			await ac
			await Promise.all(obj.sparesArrayJobcard.map(async (obj1, i1)=>{
				var stock = await stock_item_db.find({_id:obj1.jobcard_itemid});
				var armazem = await armazem_db.find({pessoas_permitidas:{$in:[obj.jobcard_tecniconome]},nome:{$regex: new RegExp("Armazem"), $options: 'i' }}, {nome:1});
				// console.log(armazem);
				// console.log(stock)
				if(obj1.jobcard_itemowner=="Vodacom" || obj1.jobcard_itemowner=="Huawei"){
					let tn = await {};
					tn.tecnico=await obj.jobcard_tecniconome;
					tn.site=await obj.jobcard_site;
					tn.ttnumber=await obj.jobcard_projectnumber;
					tn.regiao=await obj.jobcard_regiao;
					tn.tipo=await obj.jobcard_jobtype;
					tn.descricao=await obj1.jobcard_item;
					tn.part_number=await stock[0].part_number;
					tn.serial=await obj1.jobcard_itemnrserie;
					tn.serialAntigo=await obj1.jobcard_nomeitemreplace;
					tn.razao=await obj1.jobcard_itemreplacereason;
					tn.quantidade=await obj1.jobcard_quantityuse;
					tn.data=await obj1.jobcard_datauso;
					tn.propretario=await obj1.jobcard_itemowner;
					tn.armazem= await armazem[0].nome;
					await final.push(tn);
				}
			}))
		}, 0);

		
		res.render("warehouse_report_home", {DataU:userData, Stock_rst:final, till:"Saidas do Armazem", type:req.body.tipo_reporter, pacote:JSON.stringify(req.body), title:"EagleI" })
	}




			// stock_request_db.find({date_request:{$gt:start, $lt:end}, $or:[{actual_situation:'Recebido'}, {actual_situation:'Entregue' }]}, function(err, data){
			// 	if(err)
			// 		console.log(err)
			// 	else{
			// 		stock_return_db.find({date_request:{$gt:start, $lt:end},  actual_situation:'aprovado'}, async function(err1, data1){
			// 						if(err1)
			// 							console.log(err1);
			// 						else
			// 						{
			// 							var todo= await data.concat(data1)
			// 							console.log("**************************************************")
			// 							console.log(todo);
			// 							res.render("warehouse_report_home", {DataU:userData, Stock_rst:todo, pacote:JSON.stringify(req.body), title:"EagleI" })
			// 						}
			// 					})
			// 		// console.log(data)
			// 	}
			// }).sort({_id:-1})
		}
		else
			{
				if(req.body.supplier1!="any"){
					var referencia_wz=await armazem_db.findOne({nome:req.body.supplier1})
					if(req.body.tipo_reporter=="Book out")
						
						stock_req_history_db.find({data:{$gt:start, $lt:end}, request_from_ref:referencia_wz._id}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})

				if(req.body.tipo_reporter=="GRV")
					stock_req_history_db.find({data:{$gt:start, $lt:end},  request_from:"PO", beneficiario_ref:referencia_wz._id}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})



					// stock_request_db.find({date_request:{$gt:start, $lt:end}, request_from:req.body.supplier1, $or:[{actual_situation:'Recebido'}, {actual_situation:'Entregue'} ]}, function(err, data){
					// 		if(err)
					// 			console.log(err)
					// 		else{
					// 			stock_return_db.find({date_request:{$gt:start, $lt:end}, return_to:req.body.supplier1, actual_situation:'aprovado'}, async function(err1, data1){
					// 				if(err1)
					// 					console.log(err1);
					// 				else
					// 				{
					// 					var todo= await data.concat(data1)
					// 					console.log("**************************************************")
					// 					console.log(todo);
					// 					res.render("warehouse_report_home", {DataU:userData, Stock_rst:todo, pacote:JSON.stringify(req.body),  title:"EagleI" })
					// 				}
					// 			})

								
					// 		}
					// }).sort({_id:-1})
				if(req.body.tipo_reporter=="Retornado"){
					stock_req_history_db.find({data:{$gt:start, $lt:end},  request_from:{$ne:"PO"}, beneficiario_ref:referencia_wz._id}, function(erro, dados){
							if(erro)
								console.log("ocorreu um erro ")
							else
								{	console.log(dados)
									res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, pacote:JSON.stringify(req.body), title:"EagleI" })
						}
						}).sort({_id:-1})

				}

				if(req.body.tipo_reporter=="Used spares"){
					var usuus=await usuario_db.find({})
					var elesl=await armazem_db.find({}).sort({_id:-1});
					var dados=await [];
					await Promise.all(elesl.map(async(okn, i)=>{
						let yu=await okn._id.toString();
						await dados.push(yu);
					}))

					await Promise.all(usuus.map(async(okn, i)=>{
						let yu=await okn._id.toString();
						await dados.push(yu);
					}))

					stock_req_history_db.find({data:{$gt:start, $lt:end}, beneficiario_ref:{$nin:dados}}, function(erro, dados){
										if(erro)
											console.log("ocorreu um erro ")
										else
											{	console.log(dados)
												res.render("warehouse_report_home", {DataU:userData, Stock_rst:dados, till:"Saidas do Armazem", pacote:JSON.stringify(req.body), title:"EagleI" })
									}
									}).sort({_id:-1})

	}

		if(req.body.tipo_reporter=="Voda_Hua"){
		var usuus=await usuario_db.find({})
		var elesl=await armazem_db.find({}).sort({_id:-1});
		var ty=await req.body.supplier1;
		var dados=await [];
		var final = await [];

		var data = await jobcard_db.find({data_registojobcard:{$gt:start, $lt:end}, sparesArrayJobcard:{$size:1}},{sparesArrayJobcard:1, jobcard_tecniconome:1, jobcard_site:1, jobcard_regiao:1,  jobcard_ttnumber:1, jobcard_jobtype:1})
		var dataprojects = await jobcardprojects.find({sparesArrayJobcard:{$size:1}},{sparesArrayJobcard:1, jobcard_tecniconome:1, jobcard_site:1, jobcard_regiao:1, jobcard_projectnumber:1, jobcard_jobtype:1})
		// console.log(data.length)
		// console.log(dataprojects.length)

		await data.reduce(async (ac, obj, i) =>{
			await ac
			await Promise.all(obj.sparesArrayJobcard.map(async (obj1, i1)=>{
				var stock = await stock_item_db.find({_id:obj1.jobcard_itemid});
				var armazem = await armazem_db.find({pessoas_permitidas:{$in:[obj.jobcard_tecniconome]},nome:{$regex: new RegExp("Armazem"), $options: 'i' }}, {nome:1});
				// console.log(armazem);
				
				if(obj1.jobcard_itemowner=="Vodacom" || obj1.jobcard_itemowner=="Huawei"){
					let tn = await {};
					tn.tecnico=await obj.jobcard_tecniconome;
					tn.site=await obj.jobcard_site;
					tn.ttnumber= await obj.jobcard_ttnumber;
					tn.regiao=await obj.jobcard_regiao;
					tn.tipo=await obj.jobcard_jobtype;
					tn.descricao=await obj1.jobcard_item;
					tn.part_number=await stock[0].part_number;
					tn.serial=await obj1.jobcard_itemnrserie;
					tn.serialAntigo=await obj1.jobcard_nomeitemreplace;
					tn.razao=await obj1.jobcard_itemreplacereason;
					tn.quantidade=await obj1.jobcard_quantityuse;
					tn.data=await obj1.jobcard_datauso;
					tn.propretario=await obj1.jobcard_itemowner;
					tn.armazem= await armazem[0].nome;
					await final.push(tn);
				}
			}))
		}, 0);
		console.log(final.length)

		await dataprojects.reduce(async (ac, obj, i) =>{
			await ac
			await Promise.all(obj.sparesArrayJobcard.map(async (obj1, i1)=>{
				var stock = await stock_item_db.find({_id:obj1.jobcard_itemid});
				var armazem = await armazem_db.find({pessoas_permitidas:{$in:[obj.jobcard_tecniconome]},nome:{$regex: new RegExp("Armazem"), $options: 'i' }}, {nome:1});
				// console.log(armazem);
				// console.log(stock)
				if(obj1.jobcard_itemowner=="Vodacom" || obj1.jobcard_itemowner=="Huawei"){
					let tn = await {};
					tn.tecnico=await obj.jobcard_tecniconome;
					tn.site=await obj.jobcard_site;
					tn.ttnumber=await obj.jobcard_projectnumber;
					tn.regiao=await obj.jobcard_regiao;
					tn.tipo=await obj.jobcard_jobtype;
					tn.descricao=await obj1.jobcard_item;
					tn.part_number=await stock[0].part_number;
					tn.serial=await obj1.jobcard_itemnrserie;
					tn.serialAntigo=await obj1.jobcard_nomeitemreplace;
					tn.razao=await obj1.jobcard_itemreplacereason;
					tn.quantidade=await obj1.jobcard_quantityuse;
					tn.data=await obj1.jobcard_datauso;
					tn.propretario=await obj1.jobcard_itemowner;
					tn.armazem= await armazem[0].nome;
					await final.push(tn);
				}
			}))
		}, 0);

		res.render("warehouse_report_home", {DataU:userData, Stock_rst:final, till:"Saidas do Armazem", type:req.body.tipo_reporter, pacote:JSON.stringify(req.body), title:"EagleI" })
	}


				}
				else
					res.redirect("/inicio")

			}

		
	}
});

router.post("/serial_exposrat",upload.any(), async function(req, res){

var dad=await rastreio_stock_db.find({status:"disponivel"}).sort({_id:-1})

			console.log(dad)
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){
							await oper
							await sleep(10);
							daddos= await {};
					      	daddos.Description=await y.description;
					      	daddos.PartNumber=await y.part_number 
					      	daddos.Serial_Number=await y.serial_number;
					      	daddos.Quantity=y.quanty;
					      	daddos.Alocado=y.local_actual[(y.local_actual.length-1)] ;
					      	daddos.Stock_owner=await y.owner;
					      	daddos.Data=await ((y.datas_local_actual[(y.datas_local_actual.length-1)]).getDate()<10? '0'+(y.datas_local_actual[(y.datas_local_actual.length-1)]).getDate():(y.datas_local_actual[(y.datas_local_actual.length-1)]).getDate())+'/'+(((y.datas_local_actual[(y.datas_local_actual.length-1)]).getMonth()+1)<10? ('0'+((y.datas_local_actual[(y.datas_local_actual.length-1)]).getMonth()+1)):((y.datas_local_actual[(y.datas_local_actual.length-1)]).getMonth()+1))+'/'+((y.datas_local_actual[(y.datas_local_actual.length-1)]).getFullYear())+'   '+((y.datas_local_actual[(y.datas_local_actual.length-1)]).getHours()<10? ('0'+(y.datas_local_actual[(y.datas_local_actual.length-1)]).getHours()): (y.datas_local_actual[(y.datas_local_actual.length-1)]).getHours() )+' : '+((y.datas_local_actual[(y.datas_local_actual.length-1)]).getMinutes()<10? ('0'+(y.datas_local_actual[(y.datas_local_actual.length-1)]).getMinutes()):(y.datas_local_actual[(y.datas_local_actual.length-1)]).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")

})

router.post("/extrair_relatoro", upload.any(), async function(req, res){

  var temp=await JSON.parse(req.body.fitchero);
  console.log(temp)
  var start=new Date(temp.data_inicio.split("/").reverse().join("-"));
	var end=new Date(temp.data_fim.split("/").reverse().join("-")+"T23:00");
	console.log(start, end);
 
	if(start!='' && start!=''){
		
		if(temp.supplier1=="any"){
	if(temp.tipo_reporter=="Book out"){

		var armazemms=await [];

				var elels=await armazem_db.find({});
				var dados=await [];
				// var daddos=await [];
				await Promise.all(elels.map(async(onk, i)=>{
					await armazemms.push(onk._id.toString());
				}))

				console.log(armazemms)

			var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end}, request_from_ref:{$in:armazemms}}).sort({_id:-1})

			console.log(dad)
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=await [];
						var exemplo= await  todo.reduce(async function(oper, y){
							var armazenz=await [{codigo:"LIC", nome:"Armazem de Lichinga"},{codigo:"MPT", nome:"Armazem da Matola"},{codigo:"VIL", nome:"Armazem de Vilanculos"},{codigo:"XAI", nome:"Armazem de Xai-Xai"},{codigo:"BEIRA", nome:"Armazem da Beira"},{codigo:"QLM", nome:"Armazem de Quelimane"},{codigo:"TET", nome:"Armazem de Tete"},{codigo:"NPL", nome:"Armazem de Nampula"},{codigo:"PEM", nome:"Armazem de Pemba"}]


							if(y.beneficiario_ref!="V3nd1d0"){
							await oper;
							var coo=await stock_item_db.findOne({_id:y.ref_Item})
							var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
								var indicc=await armazenz.findIndex(x=>x.nome==y.request_from);
							if(indicc!=-1)
							daddos.Armazem=await armazenz[indicc].codigo;
							else
								daddos.Armazem=await y.request_from;
							daddos.Numero=await y.numero;
							daddos.Artigo=await coo.part_number;
						
					      	daddos["Descricão"]=await y.nome_item;
					      	
					      	
					      	daddos.quatidade= y.quantidade;
					      	daddos.Categoria=await coo.grupo;
					      	// daddos.Precos=  varaido.length>0? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):("-"+await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0));
					      	daddos.Proprietario=await y.cliente_name;
					      	daddos.Departamento=await y.departamento;
					      	daddos.To=await y.beneficiario;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);
					      }

							
					      }, 0);

					//  var encontr_peso=await person_stock_db.find({}).lean();

					// await elels.reduce(async(ac, obj, i)=>{
					// 	await ac;
					// 	await sleep(10);
					// 	// var nome=await obj.nome;
					//  	await obj.items.reduce(async(ac1,obj1, i1)=>{
					//  		await ac1;
					//  		await sleep(0)
					//  		var tt=await {};
					//  		var iitem=await stock_item_db.findOne({_id:obj1.referencia});
					//  		if(iitem!=null){
					//  			tt.armazem=await obj.nome;
					//  			tt.descricao=await iitem.description_item;
					//  			tt.Part_number=await iitem.part_number;
					//  			tt.quatidade=await obj1.disponivel;
					//  			tt.grupo=await iitem.grupo;
					//  			tt.proprietario=await iitem.cliente_name;
					//  			await dados.push(tt);

					//  		}

					 		
					 		

					//  	});
					//  	await ac;
					//  	sleep(10)
					 	
					//  })
					

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


	}

	if(temp.tipo_reporter=="GRV"){

		
			var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end }, request_from:"PO"}).sort({_id:-1})

		
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){

							await oper
							var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity=  y.quantidade? y.quantidade:""
					      	daddos.Precos=  y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):"";
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


	}

	if(temp.tipo_reporter=="Retornado"){


		var elesl=await armazem_db.find({}).sort({_id:-1});
		var dados1=await [];
		await Promise.all(elesl.map(async(okn, i)=>{
			let yu=await okn._id.toString();
			await dados1.push(yu);
		}))

		var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end}, beneficiario_ref:{$in:dados1}, request_from:{$ne:"PO"}}).sort({_id:-1})

		

		
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){

							await oper
							// var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity=  y.quantidade? y.quantidade:""
					      	daddos.Precos=  y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):"";
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


	}

	if(temp.tipo_reporter=="Used spares"){

		var usuus=await usuario_db.find({})
		var elesl=await armazem_db.find({}).sort({_id:-1});
		var dados1=await [];
		await Promise.all(elesl.map(async(okn, i)=>{
			let yu=await okn._id.toString();
			await dados1.push(yu);
		}))

		await Promise.all(usuus.map(async(okn, i)=>{
			let yu=await okn._id.toString();
			await dados1.push(yu);
		}))

		var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end}, beneficiario_ref:{$nin:dados1}}).sort({_id:-1})


		

		 
		
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){

							await oper
							// var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity=  y.quantidade? y.quantidade:""
					      	daddos.Precos=  y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):"";
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


	}

		if(temp.tipo_reporter=="Voda_Hua"){

		var dados=await [];
		var final = await [];

		var data = await jobcard_db.find({data_registojobcard:{$gt:start, $lt:end}, sparesArrayJobcard:{$size:1}},{sparesArrayJobcard:1, jobcard_tecniconome:1, jobcard_site:1, jobcard_regiao:1, jobcard_ttnumber:1, jobcard_jobtype:1})
		var dataprojects = await jobcardprojects.find({sparesArrayJobcard:{$size:1}},{sparesArrayJobcard:1, jobcard_tecniconome:1, jobcard_site:1, jobcard_regiao:1, jobcard_projectnumber:1, jobcard_jobtype:1})

		await data.reduce(async (ac, obj, i) =>{
			await ac
			await Promise.all(obj.sparesArrayJobcard.map(async (obj1, i1)=>{
				var stock = await stock_item_db.find({_id:obj1.jobcard_itemid});
				var armazem = await armazem_db.find({pessoas_permitidas:{$in:[obj.jobcard_tecniconome]},nome:{$regex: new RegExp("Armazem"), $options: 'i' }}, {nome:1});
				// console.log(armazem);
				
				if(obj1.jobcard_itemowner=="Vodacom" || obj1.jobcard_itemowner=="Huawei"){
					let tn = await {};
					tn.tecnico=await obj.jobcard_tecniconome;
					tn.site=await obj.jobcard_site;
					tn.ttnumber= await obj.jobcard_ttnumber;
					tn.regiao=await obj.jobcard_regiao;
					tn.tipo=await obj.jobcard_jobtype;
					tn.descricao=await obj1.jobcard_item;
					tn.part_number=await stock[0].part_number;
					tn.serial=await obj1.jobcard_itemnrserie;
					tn.serialAntigo=await obj1.jobcard_nomeitemreplace;
					tn.razao=await obj1.jobcard_itemreplacereason;
					tn.quantidade=await obj1.jobcard_quantityuse;
					tn.data=await obj1.jobcard_datauso;
					tn.propretario=await obj1.jobcard_itemowner;
					tn.armazem= await armazem[0].nome;
					await final.push(tn);
				}
			}))
		}, 0);
		console.log(final.length)

		await dataprojects.reduce(async (ac, obj, i) =>{
			await ac
			await Promise.all(obj.sparesArrayJobcard.map(async (obj1, i1)=>{
				var stock = await stock_item_db.find({_id:obj1.jobcard_itemid});
				var armazem = await armazem_db.find({pessoas_permitidas:{$in:[obj.jobcard_tecniconome]},nome:{$regex: new RegExp("Armazem"), $options: 'i' }}, {nome:1});

				if(obj1.jobcard_itemowner=="Vodacom" || obj1.jobcard_itemowner=="Huawei"){
					let tn = await {};
					tn.tecnico=await obj.jobcard_tecniconome;
					tn.site=await obj.jobcard_site;
					tn.ttnumber=await obj.jobcard_projectnumber;
					tn.regiao=await obj.jobcard_regiao;
					tn.tipo=await obj.jobcard_jobtype;
					tn.descricao=await obj1.jobcard_item;
					tn.part_number=await stock[0].part_number;
					tn.serial=await obj1.jobcard_itemnrserie;
					tn.serialAntigo=await obj1.jobcard_nomeitemreplace;
					tn.razao=await obj1.jobcard_itemreplacereason;
					tn.quantidade=await obj1.jobcard_quantityuse;
					tn.data=await obj1.jobcard_datauso;
					tn.propretario=await obj1.jobcard_itemowner;
					tn.armazem= await armazem[0].nome;
					await final.push(tn);
				}
			}))
		}, 0);

			// console.log(final);

			if(typeof XLSX == 'undefined') XLSX = require('xlsx');

				/* make the worksheet */
				var ws = await XLSX.utils.json_to_sheet(final);

				/* add to workbook */
				var wb = await XLSX.utils.book_new();
				await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

				/* generate an XLSX file */
				await XLSX.writeFile(wb, "sheetjs.xlsx");

				res.download("./sheetjs.xlsx")


		}


			// *******************************************************************************************************************************************
		
		}else
			if(temp.supplier1!='any'){

				if(temp.tipo_reporter=="Book out"){

				var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end}, request_from:temp.supplier1}).sort({_id:-1})
				console.log(dad)
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){
							await oper;
							// var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity= y.quantidade? y.quantidade:"";
					      	daddos.Precos= y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):("-"+await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0));
					      	
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


		}

		if(temp.tipo_reporter=="GRV"){

				var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end}, request_from:"PO"}).sort({_id:-1})
				console.log(dad)
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){
							await oper;
							// var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity=await y.quantidade? y.quantidade:"";
					      	daddos.Precos=await y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):"";
					      	
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


		}

		if(temp.tipo_reporter=="Retornado"){

			var referencia_wz=await armazem_db.findOne({nome:temp.supplier1})

			var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end},  request_from:{$ne:"PO"}, beneficiario_ref:referencia_wz._id}).sort({_id:-1})



				 
				console.log(dad)
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){
							await oper;
							// var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity=await y.quantidade? y.quantidade:"";
					      	daddos.Precos=await y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):"";
					      	
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


		}

		if(temp.tipo_reporter=="Used spares"){

			var usuus=await usuario_db.find({})
					var elesl=await armazem_db.find({}).sort({_id:-1});
					var dados1=await [];
					await Promise.all(elesl.map(async(okn, i)=>{
						let yu=await okn._id.toString();
						await dados1.push(yu);
					}))

					await Promise.all(usuus.map(async(okn, i)=>{
						let yu=await okn._id.toString();
						await dados1.push(yu);
					}))

						var dad=await stock_req_history_db.find({data:{$gt:start, $lt:end}, beneficiario_ref:{$nin:dados1}}).sort({_id:-1})

				 
				console.log(dad)
						var todo= await dad;
						console.log("**************************************************")
						console.log(todo);
						var dados=[];
						var exemplo= await  todo.reduce(async function(oper, y){
							await oper;
							// var varaido=await armazem_db.find({_id:y.beneficiario_ref})
							await sleep(10);
							daddos= await {};
					      	daddos.Descriptin=await y.nome_item;
					      	daddos.From=await y.request_from 
					      	daddos.To=await y.beneficiario;
					      	daddos.Quantity=await y.quantidade? y.quantidade:"";
					      	daddos.Precos=await y.precos? (await y.precos.reduce(async(isso, mesmo)=>{await isso;await sleep(5);var te=parseInt(mesmo); return ((await isso)+te);},0)):"";
					      	
					      	daddos.Stock_owner=await y.cliente_name;
					      	daddos.Datee=((y.data).getDate()<10? '0'+(y.data).getDate():(y.data).getDate())+'/'+(((y.data).getMonth()+1)<10? ('0'+((y.data).getMonth()+1)):((y.data).getMonth()+1))+'/'+((y.data).getFullYear())+'   '+((y.data).getHours()<10? ('0'+(y.data).getHours()): (y.data).getHours() )+' : '+((y.data).getMinutes()<10? ('0'+(y.data).getMinutes()):(y.data).getMinutes());
					      	await dados.push(daddos)
					      	await sleep(10);

							
					      }, 0);

										console.log(dados);

										if(typeof XLSX == 'undefined') XLSX = require('xlsx');

											/* make the worksheet */
											var ws = await XLSX.utils.json_to_sheet(dados);

											/* add to workbook */
											var wb = await XLSX.utils.book_new();
											await XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

											/* generate an XLSX file */
											await XLSX.writeFile(wb, "sheetjs.xlsx");

											res.download("./sheetjs.xlsx")


		}

	}
		

  }else
  res.redirect("/inicio");
   
})


const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}


router.get("/editar_armazem/:id", async function(req, res){

	var userData=req.session.usuario;

var data2=await pessoas.find({$and:[{nome:{$ne:"administrador"}},{nome:{$ne:"Oficina"}},{nome:{$ne:"Parque"}}]}).sort({nome:1}).lean();
var data1= await armazem_db.find({}).lean();
var data= await data2.concat(data1);

var dado=await armazem_db.find({_id:req.params.id}).lean();

res.render("armazem_edit", {DataU:userData, 'Departamento':dados_provinciais.departamentos, 'provincias':dados_provinciais.provincias, Escolher:data, Armazem:dado, title:"EagleI" })



})


router.post("/editar09", upload.any(), async function(req, res){
	var userData=await req.session.usuario;
	console.log(req.body)
	let stockk= await req.body;
	stockk.registado_por=await userData.nome;
	

	await armazem_db.updateOne({_id:req.body.novo}, {$set:stockk}, function(err, data){
		if(err)
			console.log("erross");
		else 
			console.log("dados actualizados")
	})

	res.json({feito:"done"})

})

module.exports=router;