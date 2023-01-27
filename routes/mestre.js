var express = require('express');
var router = express.Router();
var userM=require("../entities/usuario");
var incidente_db=require("../entities/incidente");
var axios=require("axios");
var stock_history_db=require("../entities/stock_request_history");
var armazem_backup_db=require("../entities/armazemm_backup");
var armazem_db=require("../entities/armazem");
var stock_item_db=require("../entities/stock_item");
var rastreio_stock_db=require("../entities/rastreio");
var stock_pessoal_db=require("../entities/stock_pessoal");
var stock_request_db=require("../entities/stock_request");
var stock_req_history_db=require("../entities/stock_request_history");


var moment_zone=require("moment-timezone");
var cronJob=require("cron").CronJob;

router.get("/", async(req, res)=>{
	var tempo=new Date();
	var dia=await tempo.getDate()<10? ("0"+tempo.getDate()): tempo.getDate();
	var mes =await tempo.getMonth()+1<10? ("0"+(tempo.getMonth()+1)) : tempo.getMonth()+1;
	var ano=await tempo.getFullYear();

	var inicio =await ano+"-"+mes+"-"+dia+"T00:00:00";
	var fim=await ano+"-"+mes+"-"+dia+"T23:00";
	var inicio1=await new Date(inicio);
	var fim1=await new Date(fim);
	console.log(fim1);
	var tods=await stock_history_db.find({data:{$gt:inicio1}, $or:[{request_from:"Armazem de Xai-Xai"},{request_from:"Armazem de Quelimane"},{request_from:"Armazem de Vilanculos"},{request_from:"Armazem de Tete"},{request_from:"Armazem de Pemba"},{request_from:"Armazem de Lichinga"},{request_from:"Armazem da Matola"},{request_from:"Armazem da Beira"},{request_from:"Armazem de Nampula"},{request_from:"IT"}]}).lean();
	var entregas=await [];
	await tods.reduce(async(acu,obj, i)=>{
		await acu;
		await sleep(20);
		if(obj.beneficiario_ref!="V3nd1d0" && obj.numero!="TR4N5F3R3NC14"){
		var encon_per=await userM.findOne({_id:obj.beneficiario_ref}).lean();
		console.log(encon_per)
		var encontr_item=await stock_item_db.findOne({$or:[{description_item:obj.nome_item}, {_id:obj.ref_Item}]}).lean();
		console.log(encontr_item)
		if(encon_per!=null && encontr_item!=null){
		var armazenz=await [{codigo:"LIC", nome:"Armazem de Lichinga"},{codigo:"MPT", nome:"Armazem da Matola"},{codigo:"MPT", nome:"IT"},{codigo:"VIL", nome:"Armazem de Vilanculos"},{codigo:"XAI", nome:"Armazem de Xai-Xai"},{codigo:"BEIRA", nome:"Armazem da Beira"},{codigo:"QLM", nome:"Armazem de Quelimane"},{codigo:"TET", nome:"Armazem de Tete"},{codigo:"NPL", nome:"Armazem de Nampula"},{codigo:"PEM", nome:"Armazem de Pemba"}]

		var este=await {};
		este["Item"]=await encontr_item.part_number;
		este["Item Description"]=await encontr_item.description_item;
			var indicc=await armazenz.findIndex(x=>x.nome==obj.request_from);
		if(indicc!=-1)
			este["Source Warehouse"]=await armazenz[indicc].codigo;
		else
			este["Source Warehouse"]=await obj.request_from;
		
		este["Quantity"]=await obj.quantidade;
		este["unidade"]=await encontr_item.unit_sale;
		este["Employee"]=await encon_per.user_code? encon_per.user_code: "";
		este["Document"]=await "SS";
		este["Request Number"]=await obj.numero;
		este["Bookout Date"]=await (obj.data.getDate()<10? '0'+obj.data.getDate():obj.data.getDate())+'-'+((obj.data.getMonth()+1)<10? ('0'+(obj.data.getMonth()+1)):(obj.data.getMonth()+1))+'-'+(obj.data.getFullYear())+'   '+(obj.data.getHours()<10? ('0'+obj.data.getHours()): obj.data.getHours() )+' : '+(obj.data.getMinutes()<10? ('0'+obj.data.getMinutes()):obj.data.getMinutes());
		if(obj.quantidade!="0")
			await entregas.push(este);

		}
		}

	}, 0)
	

	// console.log(entregas);
	res.json(entregas);
})



// var armazenz=await [{codigo:"LIC", nome:"Armazem de Lichinga"},{codigo:"MPT", nome:"Armazem da Matola"},{codigo:"VIL", nome:"Armazem de Vilanculos"},{codigo:"XAI", nome:"Armazem de Xai-Xai"},{codigo:"BEIRA", nome:"Armazem da Beira"},{codigo:"QLM", nome:"Armazem de Quelimane"},{codigo:"TET", nome:"Armazem de Tete"},{codigo:"NPL", nome:"Armazem de Nampula"},{codigo:"PEM", nome:"Armazem de Pemba"}]




/* ********************************************************************induzir que todos os stocks sejam expedido*/
// var actualizacao_book_out=new cronJob("30 10 20 * * *", async()=>{

// // (async  function(){
// 	var tempo=new Date();
// 	var dia=await tempo.getDate()<10? ("0"+tempo.getDate()): tempo.getDate();
// 	var mes =await tempo.getMonth()+1<10? ("0"+(tempo.getMonth()+1)) : tempo.getMonth()+1;
// 	var ano=await tempo.getFullYear();

// 	var inicio =await "2022-08-01T00:00:00";

// 	var find_all= await stock_request_db.find({date_request:{$gt:new Date(inicio)}, $or:[{actual_situation:"Recebido"},{actual_situation:"Expedido"}]}).lean();
// 	console.log(JSON.stringify(find_all))
// 	await find_all.reduce(async(ac, obj, i)=>{
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

// var kkkk=await stock_request_db.updateOne({_id:obj._id , items:{$elemMatch:{referencia:obj1.referencia}}}, { $set:{ "items.$.received":quant_rece, "items.$.data_recepcao":new Date()}})

// var hhhhh1=await stock_request_db.findOne({_id:obj._id})
// if(hhhhh1.actual_situation=="Expedido")
//  	var hhhhh2=await stock_request_db.updateOne({_id:obj._id}, {$push:{estagio:1, stock_approvers:obj.requested_by, date_actions:new Date()}, $set:{actual_situation:"Recebido"}})


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
// // })()



// }
// 	,null, true, "Africa/Maputo" )


// ****************************************************************fim de inducao dos expedidos



// ======================================================abastecimento das entradas===================================

var carregar_crone=new cronJob("30 3 3 * * *", async()=>{
var todos_arma=await armazem_db.find({}).lean();
// await Promise.all(todos_arma.map(async(obj, i)=>{
// 	await armazem_db.updateOne({_id:obj._id}, {$set:{items:[]}})
// })
// )

var response=await axios.get("http://192.168.0.74:3400/entradas");
var nao_carregado=await [];

var tempo=new Date();
var dia=await tempo.getDate()<10? ("0"+tempo.getDate()): tempo.getDate();
var mes =await tempo.getMonth()+1<10? ("0"+(tempo.getMonth()+1)) : (tempo.getMonth()+1);
var ano=await tempo.getFullYear();
var numerro=await "PRVR"+ano+mes+dia;

var dados=await response.data;
await dados.reduce(async(ac, obj, i)=>{
	await ac;
	await sleep(50);
var armazenz=await [{codigo:"LIC", nome:"Armazem de Lichinga"},{codigo:"MPT", nome:"Armazem da Matola"},{codigo:"VIL", nome:"Armazem de Vilanculos"},{codigo:"XAI", nome:"Armazem de Xai-Xai"},{codigo:"BEIRA", nome:"Armazem da Beira"},{codigo:"QLM", nome:"Armazem de Quelimane"},{codigo:"TET", nome:"Armazem de Tete"},{codigo:"NPL", nome:"Armazem de Nampula"},{codigo:"PEM", nome:"Armazem de Pemba"},{codigo:"IT", nome:"IT"}]
var indicc=await armazenz.findIndex(x=>x.codigo==obj.armazem);
		if(indicc!=-1)
			var armado_zem=await armazenz[indicc].nome;
		else
			var armado_zem=await obj.armazem;



	var find_whz=await armazem_db.findOne({nome:armado_zem})
	var itemm=await stock_item_db.findOne({$or:[{part_number:{ $regex: new RegExp(`${obj.artigo}`), $options: 'i' }}, {description_item:obj.descricao}]}).lean();
	if(itemm!=null && find_whz!=null){
	var este=await {};
	este.referencia=await itemm._id;
	este.description_item=await itemm.description_item;
	este.serialized=await itemm.serialized_item;
	este.part_number=await itemm.part_number;
	este.disponivel=await parseInt(obj.quantidade);
	este.cliente_name=await itemm.cliente_name;
	este.grupo=await itemm.grupo;
	// este.serial_number=[]

	var teste=await armazem_db.updateOne({nome:armado_zem, items:{$elemMatch:{referencia:itemm._id}}},{$inc:{"items.$.disponivel":este.disponivel}})
	if(teste.n==0){
		await armazem_db.updateOne({nome:armado_zem}, {$push:{items:este}});
	}


	await stock_history_db.gravar_historico({beneficiario:armado_zem, request_from:"Primavera", beneficiario_ref:find_whz._id, ref_Item:itemm._id, numero:numerro, quantidade:este.disponivel, nome_item:itemm.description_item, serialized:este.serialized,  cliente_name:itemm.cliente_name}, function(errp, d){
				 			if(errp)
				 				console.log("ocorreu um erro ao tentar gravar historico")
				 			else
				 				console.log("Historico gravado com sucesso!!")
				 		})

	}
	else{
		var este1=await {};
		este1.descricao=await obj.descricao;
		este1.quantidade=await obj.quantidade;
		este1.armazem=await obj.armazem;

		await nao_carregado.push(este1);


	}
	

},0);

if(typeof XLSX == 'undefined') XLSX = require('xlsx');

/* make the worksheet */
var ws = await XLSX.utils.json_to_sheet(nao_carregado);

/* add to workbook */
var wb = await XLSX.utils.book_new();
await XLSX.utils.book_append_sheet(wb, ws, "Relatorio_Nao_carregado");

/* generate an XLSX file */
await XLSX.writeFile(wb, "sheetjs.xlsx");




console.log(response.data)

}
	,null, true, "Africa/Maputo" )

// =====================================fim do abastecimento das entradas==============================================




// ***************************************************entregas de bookouts**********************************************





// ***************************************************fimde entregas de bookouts=================================================

// *****************************************************criacao de Backup do armazem********************************

var armazem_diario=new cronJob("30 21 1 * * *", async()=>{
	var todos_whz=await armazem_db.find({}).lean();

	await todos_whz.reduce(async(ac, obj, i)=>{
		await ac;
		await sleep(10);
		await delete obj._id;
		let feito=await armazem_backup_db.create(obj);
		console.log(feito)

	},0)


}
	,null, true, "Africa/Maputo" )




const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

armazem_diario.start();




// *****************************************************fim da criacao do armazem***********************************


module.exports = router;