var express=require("express");
var router = express.Router();
var po_db=require("../entities/po");
var cambio_db=require("../entities/cambio");
var stock_req_history_db=require("../entities/stock_request_history")
var emailSender=require('../util/sendEmail');
var model = require('../entities/usuario');
var armazem_db=require("../entities/armazem")
var stock_pessoal_db=require("../entities/stock_pessoal");
var stock_item_db=require("../entities/stock_item");
var rastreio_db=require("../entities/rastreio");
var dados_provinciais = require('../util/provincias-distritos');
var cliente_name_db=require("../entities/cliente")
var admin_db=require("../entities/sisadmin")
var multer = require('multer');
var path = require("path");
const { createInvoice } = require("./createInvoice.js");
var fornecedor_db=require("../entities/fornecedor")
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


router.get("/", function(req, res){
	var userData= req.session.usuario;

	po_db.find({}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("po_home_opcoes", {DataU:userData, Po_data:data, title:"EagleI"})
		}
	})
})

router.post("/retornar_poo", upload.any(), async function(req, res){
	var userData = req.session.usuario;
	console.log(req.body)

	var procurapo = await po_db.findOne({_id:req.body.novo});

	var k = "";
		for(let [i,test] of procurapo.items.entries()) {

	        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ procurapo.items[i].nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].total +"</td>" + "</tr>";

	    }



	var procurarequestor = await model.findOne({nome:procurapo.requested_by});

	emailSender.createConnection();
	emailSender.sendEmailPorequestsendback(procurarequestor, req.body.razoes_return, k);

	// await po_db.updateOne({_id:req.body.novo}, { $set:{returned:true, returned_reason:req.body.razoes_return}});

	await po_db.updateOne({_id:req.body.novo}, {$push:{po_approvers:userData.nome, date_actions:new Date(), accao:"RETURNED"}, $set:{actual_situation:"retornado", returned:true, returned_reason:req.body.razoes_return, estagio:[1]}})

	res.json({feito:"feito"});
	
})

router.get("/emprogresso", function(req, res){
	var userData= req.session.usuario;
	if(userData.nivel_acesso=="admin" || userData.funcao=="Procurement")
		po_db.find({$or:[{estagio: { $size: 1}, intervenientes:{$in:[userData.nome]}},{estagio: { $size: 2}, intervenientes:{$in:[userData.nome]}}, {returned:{$exists:true}}, {estagio: { $size: 1}}], decline_reasons:{$exists:false} }, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar stock_items!!")
			else

			{
				console.log(data)
				res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
			}
		})

	else
		if(userData.funcao=="Manager")
			po_db.find({$or:[{estagio: { $size: 1}, intervenientes:{$in:[userData.nome]}},{estagio: { $size: 2}, intervenientes:{$in:[userData.nome]}}, {razoes_return:{$exists:true}}, {estagio: { $size: 1}, department:userData.departamento}]}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
				}
			})
		else
			po_db.find({$or:[{estagio: { $size: 1}, intervenientes:{$in:[userData.nome]}},{estagio: { $size: 2}, intervenientes:{$in:[userData.nome]}}, {razoes_return:{$exists:true}}]}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
				}
			})

})

router.post("/reporteer_Po", upload.any(), async function(req, res){

   var dataUser=req.session.usuario;
  
  // relatt.nome_cliente=req.body.nome_cliente;
  
var datta=await po_db.findOne({_id:req.body.fitchero})

			var invoice= datta;
			var nome="PurchaseOrder.pdf";
			var partnumbers=await [];

			await Promise.all(datta.items.map(async(it, indice)=>{
			var este=await stock_item_db.findOne({description_item:it.nome_item});
			if(este.part_number && este.part_number!=null && este.part_number!=undefined)
				partnumbers.push(este.part_number);
			else
				partnumbers.push("");
			})
			)
			 createInvoice(invoice, nome, partnumbers );
			// res.header("Content-Type","application/pdf")
			// *********************malabarismo***********************
			var pd=path.join(__dirname, 'invoice.pdf')
			var buscar="./"+nome;
			setTimeout(function(){
			res.download(buscar);}, 2000);

})




router.get("/aprovados",async function(req, res){
	var userData= req.session.usuario;
	var admin_case=await admin_db.find({});
	var depatrmento_owner=await admin_case[0].departamento;



	if(userData.nivel_acesso=="admin")
		po_db.find({actual_situation:"aprovado" ,estagio: { $size: 3}}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar stock_items!!")
			else
			{
				res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
			}
		})
	
		else
			po_db.find({actual_situation:"aprovado",  intervenientes:{$in:[userData.nome]},estagio: { $size: 3}}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
				}
			})


})


router.get("/relatorios", function(req, res){
	var userData=req.session.usuario;


		fornecedor_db.find({}, function(err1, data1){
			if(err1)
				console.log("encontrou erro ao tentar fazer fornecedores")
			else
			{
				cambio_db.find({}, function(err2, data2){
					if(err2)
						console.log("Ocorreu um erro ao tentar encontrar cambio")
					else
						{	armazem_db.find({}, function(err3, data3){
							if(err3)
								console.log("ocorreuum erro ao tentar encontrar os armazens")
							else
								{
									console.log("cheguei")
									res.render("po_report", {DataU:userData, 'Departamento':dados_provinciais.departamentos, Fornecedor:data1, Forncedorres:JSON.stringify(data1),   Cambio:JSON.stringify(data2), Armazem:data3, title:"EagleI" })
								}		

						}).sort({nome:1})
							
						}		
				})
				
			

			}

		}).sort({cliente_nome:1})
		
	
	// res.render("po_reports",{DataU:userData, title:"EagleI"})

})


router.post("/relatorios", upload.any(), async function(req, res){
	console.log(req.body)
	if(req.body.data_inicio!='' && req.body.data_fim!=''){
	var start=await new Date(req.body.data_inicio.split("/").reverse().join("-"));
	var end =await new Date(req.body.data_fim.split("/").reverse().join("-")+"T23:00");
	console.log(start, end)
	// console.log(req.session.usuario)

	var userData=req.session.usuario;
	// res.render("inicio", {DataU:temp, title:"EagleI"})
	if(req.body.supplier1=='any' && req.body.department =='all'){
		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3}}, function(err, dados){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(dados)
			res.render("Po_report_home", {DataU:userData, Po_data:dados, pacote:JSON.stringify(req.body), title:"EagleI"})
		}
	})

	}	

	if(req.body.supplier1=='any' && req.body.department !='all'){
		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3}, department:req.body.department}, function(err, dados){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(dados)
			res.render("Po_report_home", {DataU:userData, Po_data:dados, pacote:JSON.stringify(req.body), title:"EagleI"})
		}
	})

	}	
	if(req.body.supplier1!='any' && req.body.department =='all'){
		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3}, department:req.body.department}, function(err, dados){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(dados)
			res.render("Po_report_home", {DataU:userData, Po_data:dados, pacote:JSON.stringify(req.body), title:"EagleI"})
		}
	})

	}	

	if(req.body.supplier1!='any' && req.body.department!='all' )
	po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3}, department:req.body.department, supplier:req.body.supplier1}, function(err, dados){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(dados)
			res.render("Po_report_home", {DataU:userData, Po_data:dados, pacote:JSON.stringify(req.body), title:"EagleI"})
		}
	})

	}
	
		// res.render("Po_report_home", {DataU:userData, Po_data:[], pacote:JSON.stringify(req.body), title:"EagleI"})
})

router.post("/extrair_relatoro", upload.any(), async function(req, res){

  var temp=JSON.parse(req.body.fitchero);
  if(temp.data_inicio!='' && temp.data_fim!=''){
  	var start=await new Date(temp.data_inicio.split("/").reverse().join("-"));
	var end =await new Date(temp.data_fim.split("/").reverse().join("-")+"T23:00");
	if(temp.supplier1=='any' && temp.department=='all'){

		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3}}, async function(err, datta){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(datta)
			if(datta.length>0){
      console.log()
      var dados=[]

     var exemplo= await Promise.all( datta.map(async function(y, i){
      	dados[i]= await {};
      	dados[i].Po_number=y.po_number;
      	dados[i].Requestor=y.po_approvers[0];
      	dados[i].Po_date=((y.data_po).getDate()<10? '0'+(y.data_po).getDate():(y.data_po).getDate())+'/'+(((y.data_po).getMonth()+1)<10? ('0'+((y.data_po).getMonth()+1)):((y.data_po).getMonth()+1))+'/'+((y.data_po).getFullYear())+'   '+((y.data_po).getHours()<10? ('0'+(y.data_po).getHours()): (y.data_po).getHours() )+' : '+((y.data_po).getMinutes()<10? ('0'+(y.data_po).getMinutes()):(y.data_po).getMinutes());
      	dados[i].Quotation_number=y.quotation_number;
      	dados[i].Department=y.department;
      	dados[i].Supplier=y.supplier;
      	dados[i].Destination=y.for_store;
      	dados[i].Total="MZN "+y.valor_em_metical;
      	dados[i].Approved_by=y.po_approvers[1];
      	dados[i].Approved_date=((y.date_actions[1]).getDate()<10? '0'+(y.date_actions[1]).getDate():(y.date_actions[1]).getDate())+'/'+(((y.date_actions[1]).getMonth()+1)<10? ('0'+((y.date_actions[1]).getMonth()+1)):((y.date_actions[1]).getMonth()+1))+'/'+((y.date_actions[1]).getFullYear())+'   '+((y.date_actions[1]).getHours()<10? ('0'+(y.date_actions[1]).getHours()): (y.date_actions[1]).getHours() )+' : '+((y.date_actions[1]).getMinutes()<10? ('0'+(y.date_actions[1]).getMinutes()):(y.date_actions[1]).getMinutes());






      }))
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
	})

	}

		if(temp.supplier1=='any' && temp.department!='all'){

		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3},  department:temp.department}, async function(err, datta){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(datta)
			if(datta.length>0){
      console.log()
      var dados=[]

     var exemplo= await Promise.all( datta.map(async function(y, i){
      	dados[i]= await {};
      	dados[i].Po_number=y.po_number;
      	dados[i].Requestor=y.po_approvers[0];
      	dados[i].Po_date=((y.data_po).getDate()<10? '0'+(y.data_po).getDate():(y.data_po).getDate())+'/'+(((y.data_po).getMonth()+1)<10? ('0'+((y.data_po).getMonth()+1)):((y.data_po).getMonth()+1))+'/'+((y.data_po).getFullYear())+'   '+((y.data_po).getHours()<10? ('0'+(y.data_po).getHours()): (y.data_po).getHours() )+' : '+((y.data_po).getMinutes()<10? ('0'+(y.data_po).getMinutes()):(y.data_po).getMinutes());
      	dados[i].Quotation_number=y.quotation_number;
      	dados[i].Department=y.department;
      	dados[i].Supplier=y.supplier;
      	dados[i].Destination=y.for_store;
      	dados[i].Total="MZN "+y.valor_em_metical;
      	dados[i].Approved_by=y.po_approvers[1];
      	dados[i].Approved_date=((y.date_actions[1]).getDate()<10? '0'+(y.date_actions[1]).getDate():(y.date_actions[1]).getDate())+'/'+(((y.date_actions[1]).getMonth()+1)<10? ('0'+((y.date_actions[1]).getMonth()+1)):((y.date_actions[1]).getMonth()+1))+'/'+((y.date_actions[1]).getFullYear())+'   '+((y.date_actions[1]).getHours()<10? ('0'+(y.date_actions[1]).getHours()): (y.date_actions[1]).getHours() )+' : '+((y.date_actions[1]).getMinutes()<10? ('0'+(y.date_actions[1]).getMinutes()):(y.date_actions[1]).getMinutes());






      }))
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
	})

	}

	if(temp.supplier1!='any' && temp.department=='all'){

		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3},  supplier:temp.supplier1}, async function(err, datta){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(datta)
			if(datta.length>0){
			      console.log()
			      var dados=[]

			     var exemplo= await Promise.all( datta.map(async function(y, i){
			      	dados[i]= await {};
			      	dados[i].Po_number=y.po_number;
			      	dados[i].Requestor=y.po_approvers[0];
			      	dados[i].Po_date=((y.data_po).getDate()<10? '0'+(y.data_po).getDate():(y.data_po).getDate())+'/'+(((y.data_po).getMonth()+1)<10? ('0'+((y.data_po).getMonth()+1)):((y.data_po).getMonth()+1))+'/'+((y.data_po).getFullYear())+'   '+((y.data_po).getHours()<10? ('0'+(y.data_po).getHours()): (y.data_po).getHours() )+' : '+((y.data_po).getMinutes()<10? ('0'+(y.data_po).getMinutes()):(y.data_po).getMinutes());
			      	dados[i].Quotation_number=y.quotation_number;
			      	dados[i].Department=y.department;
			      	dados[i].Supplier=y.supplier;
			      	dados[i].Destination=y.for_store;
			      	dados[i].Total="MZN "+y.valor_em_metical;
			      	dados[i].Approved_by=y.po_approvers[1];
			      	dados[i].Approved_date=((y.date_actions[1]).getDate()<10? '0'+(y.date_actions[1]).getDate():(y.date_actions[1]).getDate())+'/'+(((y.date_actions[1]).getMonth()+1)<10? ('0'+((y.date_actions[1]).getMonth()+1)):((y.date_actions[1]).getMonth()+1))+'/'+((y.date_actions[1]).getFullYear())+'   '+((y.date_actions[1]).getHours()<10? ('0'+(y.date_actions[1]).getHours()): (y.date_actions[1]).getHours() )+' : '+((y.date_actions[1]).getMinutes()<10? ('0'+(y.date_actions[1]).getMinutes()):(y.date_actions[1]).getMinutes());






			      }))
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
		})

	}

		if(temp.supplier1!='any' && temp.department!='all'){

		po_db.find({data_po:{$lt:end, $gt:start}, estagio:{$size:3},  supplier:temp.supplier1, department:temp.department}, async function(err, datta){
		if(err)
			console.log("ocoreu um erro ao tentar achar o relatorio");
		else{
			console.log(datta)
			if(datta.length>0){
      console.log()
      var dados=[]

     var exemplo= await Promise.all( datta.map(async function(y, i){
      	dados[i]= await {};
      	dados[i].Po_number=y.po_number;
      	dados[i].Requestor=y.po_approvers[0];
      	dados[i].Po_date=((y.data_po).getDate()<10? '0'+(y.data_po).getDate():(y.data_po).getDate())+'/'+(((y.data_po).getMonth()+1)<10? ('0'+((y.data_po).getMonth()+1)):((y.data_po).getMonth()+1))+'/'+((y.data_po).getFullYear())+'   '+((y.data_po).getHours()<10? ('0'+(y.data_po).getHours()): (y.data_po).getHours() )+' : '+((y.data_po).getMinutes()<10? ('0'+(y.data_po).getMinutes()):(y.data_po).getMinutes());
      	dados[i].Quotation_number=y.quotation_number;
      	dados[i].Department=y.department;
      	dados[i].Supplier=y.supplier;
      	dados[i].Destination=y.for_store;
      	dados[i].Total="MZN "+y.valor_em_metical;
      	dados[i].Approved_by=y.po_approvers[1];
      	dados[i].Approved_date=((y.date_actions[1]).getDate()<10? '0'+(y.date_actions[1]).getDate():(y.date_actions[1]).getDate())+'/'+(((y.date_actions[1]).getMonth()+1)<10? ('0'+((y.date_actions[1]).getMonth()+1)):((y.date_actions[1]).getMonth()+1))+'/'+((y.date_actions[1]).getFullYear())+'   '+((y.date_actions[1]).getHours()<10? ('0'+(y.date_actions[1]).getHours()): (y.date_actions[1]).getHours() )+' : '+((y.date_actions[1]).getMinutes()<10? ('0'+(y.date_actions[1]).getMinutes()):(y.date_actions[1]).getMinutes());






      }))
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
	})

	}


  }
   
})


router.get("/reprovados", function(req, res){
	var userData= req.session.usuario;

	if(userData.nivel_acesso=="admin")
		po_db.find({actual_situation:"reprovado"}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar stock_items!!")
			else
			{
				res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
			}
		})

		else
			po_db.find({actual_situation:"reprovado",  intervenientes:{$in:[userData.nome]}}, function(err, data){
				if(err)
					console.log("ocorreu um erro ao tentar selecionar stock_items!!")
				else
				{
					res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
				}
			})

});

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

	router.post("/aprovar", upload.any(), async function(req, res){
		// var userData=req.session.usuario;

		
	
	
	var userData=req.session.usuario;
	var ultimo =  await po_db.countDocuments({po_number:{$exists:true}}, function(err , count){
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
	var numero = "PO"+ano + mes + dia + criar(ultimo);
	console.log(numero)

	var procurapo = await po_db.findOne({_id:req.body.novo});

	// var valores_limites=[5000000, 2475000, 400000, 1500000, 1735000, 600000, 5470000, 10000000, 10000000, 1200000, 12000000];
	// var departamentochefe=[{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Luis Brazuna", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];

	var valores_manager11= await admin_db.find({});
	var valores_manager12= await valores_manager11[0].departamento;
	console.log(valores_manager12);


	// var departamentochefe = [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology"}, {nome:"Luis Brazuna", departamento:"Fleet Management"}, {nome:"William Goldswain", departamento:"Power"}, {nome:"Sandra Dias", departamento:"Health & Safety"}, {nome:"Luis Brazuna", departamento:"Telco"}, {nome:"Amancio Mazivila", departamento:"Finance"}, {nome:"Teresa Guimaraes", departamento:"Data Center"}];
	var posicaodepartamento = valores_manager12.findIndex(x => x._id == procurapo.department_ref);


		var procurarequestor = await model.findOne({nome:procurapo.requested_by});
		var procurawhm= await model.findOne({nome:procurapo.intervenientes[3]});

		var procuramanager = await model.findOne({nome:valores_manager12[posicaodepartamento].chefe_depart});

		var k = "";
		for(let [i,test] of procurapo.items.entries()) {

	        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ procurapo.items[i].nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].total +"</td>" + "</tr>";

	    }


		

		var tttmp= parseFloat(procurapo.valor_em_metical.replace(/,/g,''));
		// var ttmp=tttmp.parseFloat()
	


if(tttmp<=valores_manager12[posicaodepartamento].limite_po || userData.nome=="Luis Brazuna")
	{
		await po_db.updateOne({_id:req.body.novo}, {$push:{estagio:[1,1], po_approvers:userData.nome, date_actions:new Date(), accao:"APPROVED"}, $set:{actual_situation:"aprovado", po_number:numero}});
		emailSender.createConnection();
		emailSender.sendEmailPorequestapproved(procurarequestor, k);
		emailSender.sendEmailPorequestapprovedmanager(procurapo,procurawhm, k, numero);
		emailSender.sendEmailPorequestapprovedmanager(procurapo,procuramanager, k, numero);
}
else
	{
		await po_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, po_approvers:userData.nome, date_actions:new Date(), accao:"APPROVED"}, $set:{actual_situation:"aprovado",  po_number:numero}});
		var alvo=await model.findOne({nome:procurapo.intervenientes[3]})
		emailSender.createConnection();
		emailSender.sendEmailPorequestapproved(procurarequestor, k);
		emailSender.sendEmailPorequestapprovedmanager(procurapo,procurawhm, k, numero);
		emailSender.sendEmailPorequestapprovedmanager(procurapo,procuramanager, k, numero);
		emailSender.sendEmailPosendforapproval(alvo, procurapo.requested_by,k);

	}


	res.json({feito:"feito"});


	})

// router.post("/receber_productos", function(req, res){
// 		var userData=req.session.usuario;

// 	po_db.findOneAndUpdate({_id:req.body.novo}, {$push:{estagio:1, po_approvers:userData.nome, date_actions:new Date()}, $set:{actual_situation:"Finalizado"}}, function(err, data){
// 		if(err)
// 			console.log("ocorreu um erro ao tentar actualizar po")
// 		else
// 			console.log(data)
// 	})
// 	})

router.get("/reprovar/:id", function(req, res){
	var userData=req.session.usuario;
	po_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("erro na tentativa de reprovar")
		else
		{
			res.render("razoes_reprovacao_po", {DataU:userData, Po_data:data, title:"EagleI"})
		}
	})

})


router.post("/reprovar", upload.any(), async function(req, res){
		var userData=req.session.usuario;
		console.log(req.body)

		var procurapo = await po_db.findOne({_id:req.body.novo});
		console.log(procurapo);

		var departamentochefe= await [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Luis Brazuna", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];
		console.log(departamentochefe)

		var valores_manager11= await admin_db.find({});
		var valores_manager12= await valores_manager11[0].departamento;


		// var departamentochefe = [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology"}, {nome:"Luis Brazuna", departamento:"Fleet Management"}, {nome:"William Goldswain", departamento:"Power"}, {nome:"Sandra Dias", departamento:"Health & Safety"}, {nome:"Luis Brazuna", departamento:"Telco"}, {nome:"Amancio Mazivila", departamento:"Finance"}, {nome:"Teresa Guimaraes", departamento:"Data Center"}];
		var posicaodepartamento = valores_manager12.findIndex(x => x._id == procurapo.department_ref);



		// var departamentochefe = [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology"}, {nome:"Luis Brazuna", departamento:"Fleet Management"}, {nome:"William Goldswain", departamento:"Power"}, {nome:"Valeriano Hilario", departamento:"SHEQ"}, {nome:"Luis Brazuna", departamento:"Telco"}, {nome:"Amancio Mazivila", departamento:"Finance"}, {nome:"Teresa Guimaraes", departamento:"Data center"}];
		// var posicaodepartamento = await departamentochefe.findIndex(x => x.departamento==procurapo.department);


		var procurarequestor = await model.findOne({nome:procurapo.requested_by});

		var procuramanager = await model.findOne({nome:valores_manager12[posicaodepartamento].chefe_depart});

		var k = "";
		for(let [i,test] of procurapo.items.entries()) {

	        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ procurapo.items[i].nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + procurapo.items[i].total +"</td>" + "</tr>";

	    }


		

	await po_db.updateOne({_id:req.body.novo}, {$push:{estagio:0, po_approvers:userData.nome, date_actions:new Date(), accao:"DECLINED"}, $set:{actual_situation:"reprovado", decline_reasons:req.body.razoes_return}})

		emailSender.createConnection();
		emailSender.sendEmailPorequestdeclined(procurapo,procuramanager, req.body.razoes_return, k);
		emailSender.sendEmailPorequestdeclined(procurapo, procurarequestor, req.body.razoes_return, k);

		res.json({feito:"feito"});
	})

router.post("/cancelar", upload.any(), async function(req, res){
		var userData=req.session.usuario;
		console.log(req.body)

		var procurapo = await po_db.findOne({_id:req.body.novo});
		console.log(procurapo);

		// var departamentochefe= await [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Luis Brazuna", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];
		// console.log(departamentochefe)

		// // var departamentochefe = [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology"}, {nome:"Luis Brazuna", departamento:"Fleet Management"}, {nome:"William Goldswain", departamento:"Power"}, {nome:"Valeriano Hilario", departamento:"SHEQ"}, {nome:"Luis Brazuna", departamento:"Telco"}, {nome:"Amancio Mazivila", departamento:"Finance"}, {nome:"Teresa Guimaraes", departamento:"Data center"}];
		// var posicaodepartamento = await departamentochefe.findIndex(x => x.departamento==procurapo.department);

		var valores_manager11= await admin_db.find({});
		var valores_manager12= await valores_manager11[0].departamento;


		// var departamentochefe = [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology"}, {nome:"Luis Brazuna", departamento:"Fleet Management"}, {nome:"William Goldswain", departamento:"Power"}, {nome:"Sandra Dias", departamento:"Health & Safety"}, {nome:"Luis Brazuna", departamento:"Telco"}, {nome:"Amancio Mazivila", departamento:"Finance"}, {nome:"Teresa Guimaraes", departamento:"Data Center"}];
		var posicaodepartamento = valores_manager12.findIndex(x => x._id == procurapo.department_ref);


		var procurarequestor = await model.findOne({nome:procurapo.requested_by});

		var procuramanager = await model.findOne({nome:valores_manager12[posicaodepartamento].chefe_depart});


		

	await po_db.updateOne({_id:req.body.novo}, {$push:{estagio:0, po_approvers:userData.nome, date_actions:new Date(), accao:"CANCELED"}, $set:{actual_situation:"reprovado", decline_reasons:req.body.razoes_return}})

		emailSender.createConnection();
		emailSender.sendEmailPorequestdeclined(procurapo,procuramanager, req.body.razoes_return);
		emailSender.sendEmailPorequestdeclined(procurapo, procurarequestor, req.body.razoes_return);

		res.json({feito:"feito"});
	})

router.get("/finalizados", function(req, res){
	var userData= req.session.usuario;
	if(userData.nivel_acesso=="admin")
		po_db.find({$or:[{actual_situation:"Finalizado"}, {actual_situation:"reprovado"}]}, function(err, data){
			if(err)
				console.log("ocorreu um erro ao tentar selecionar stock_items!!")
			else
			{
				res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
			}
		})
		else
			if(userData.funcao=="Manager" && userData.nome!="David Nhantumbo")
				po_db.find({department:userData.departamento, $or:[{actual_situation:"Finalizado",  intervenientes:{$in:[userData.nome]}}, {actual_situation:"reprovado",  intervenientes:{$in:[userData.nome]}}]}, function(err, data){
					if(err)
						console.log("ocorreu um erro ao tentar selecionar stock_items!!")
					else
					{
						res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
					}
				})
			else

				po_db.find({$or:[{actual_situation:"Finalizado",  intervenientes:{$in:[userData.nome]}}, {actual_situation:"reprovado",  intervenientes:{$in:[userData.nome]}}]}, function(err, data){
					if(err)
						console.log("ocorreu um erro ao tentar selecionar stock_items!!")
					else
					{
						res.render("po_home", {DataU:userData, Po_data:data, title:"EagleI"})
					}
				})

})


router.get("/detalhes/:id", function(req, res){
	var userData =req.session.usuario;
	po_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu um rro ao tentar ")
		else
		{
			res.render("po_detalhes_form", {DataU:userData, Po_data:data, title:"EagleI"})
		}

	})
})

router.get("/cambio", function(req, res){
	var userData = req.session.usuario;
	cambio_db.find({}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar encontrar cambio")
		else
		{
			res.render("cambio_home", {Cambio:data, DataU:userData, title:"EagleI"})
		}
	}).limit(50);

})


router.get("/cambio/novo", function(req, res){
	var userData=req.session.usuario;
	res.render("cambio_form", {DataU:userData, title:"EagleI"})
})

router.post("/cambio/novo", upload.any(), function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)
	let camb=req.body;
	camb.data_string = (new Date()).getDate()+'/'+((new Date()).getMonth()+1)+'/'+(new Date()).getFullYear();
	camb.criado_por = userData.nome;
	cambio_db.gravar_cambio(camb, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar registar cambio do dia!")
		else
		{
			console.log("cambio saved!!")
		}
	})

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
	var userData=req.session.usuario;
	var comprovativo;
	if (req.files) {
        let comprimento = await req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "comprovativo") {
                comprovativo= "/uploads/" + req.files[i].filename;
                continue;
            }

        }
    }
var custo_medio=await [1];
await po_db.updateOne({_id:req.body.novo}, {$push:{estagio:1, po_approvers:userData.nome, date_actions:new Date(), accao:"RECEIVED"}, $set:{actual_situation:"Finalizado", comprovativo:comprovativo, invoice_number:req.body.invoice_number }})
custo_medio.reduce(async function(acT, idiotaT){
	await acT;
	await sleep(500);
// ***************************************************************************************************************************
if(Array.isArray(req.body.referencia)){
	var array_bruto=req.body.e || [];
	var encontradoso = await getAllIndexes(req.body.serialized, "sim");
	var numeros_de_seriess=[]

	for(let i=0; i<req.body.serialized.length; i++){
		numeros_de_seriess.push([]);

	}

	if(encontradoso.length>0)
	for(let j=0; j<encontradoso.length; j++){
		let vallor=parseInt(req.body.received[encontradoso[j]])
		if(Array.isArray(req.body.e)){
		let t = array_bruto.splice(0,vallor)
		numeros_de_seriess[encontradoso[j]]=t;
		}
		else
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
				var numeros_de_seriess=[[]];
	}

	

	console.log(numeros_de_seriess);

	var procurapo = await po_db.findOne({_id:req.body.novo});


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
							rastreo.pod=await procurapo.po_number;
							rastreo.status=await "disponivel";
							rastreo.datas_local_actual=await [new Date()];
							rastreo.meio_atribuicao=await ["Purchase Order"];
							rastreo.atribuidores=await [req.session.usuario.nome];
							rastreo.referencia=await dados._id;
							rastreo.owner=await dados.cliente_name;
							rastreo.description=await dados.description_item;
							rastreo.local_actual=await [procurapo.for_store];
							  rastreo.ref_local_actual=await [procurapo.for_store_ref];
							  
							  rastreio_db.gravar_rastreio(rastreo, function(erro){
								  if(erro)
								  	console.log("ocorreu um erro ao tenatr ");
								  else
								  	console.log("dados gravados com sucesso");
							  })

							}


			}))
		}

	}))


	// 

// ****************************************************************************************************************************************************

	// recepcao de ficheiros de comprovativo
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
	

	

	var k = "";

	if(Array.isArray(req.body.received)){

		
		for(var i=0; i<1; i++ ){
		k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ req.body.decricao[i] + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + req.body.received[i] +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + req.body.price[i] +"</td>" + "</tr>";
}
			await req.body.received.map(async function(idiota, i){
				var controlo= await parseInt(idiota);
				var precos= await Array.from({length:controlo}, (v, p)=>req.body.precos[i]);
				console.log(precos)
				// await ac;
				// await sleep(10);
				
			await po_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia[i]}}}, { $set:{ "items.$.received":idiota , "items.$.precos":precos}})
			await sleep(10);

			})
			
	}

	else
		{
				
				var controlo= await parseInt(req.body.received);
				var precos= await Array.from({length:controlo}, (v, p)=>req.body.precos);
				console.log(precos)

					k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ req.body.decricao + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + req.body.received +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + req.body.price +"</td>" + "</tr>";

					await po_db.updateOne({_id:req.body.novo , items:{$elemMatch:{referencia:req.body.referencia}}}, { $set:{ "items.$.received":req.body.received,  "items.$.precos":precos}})
			

		}


		







		

// *****************************************************************actualizacao do stock do tecnico******************************************************



var data1=await po_db.findOne({_id:req.body.novo})
if(Array.isArray(req.body.received)){
					var urls = await req.body.received;
					console.log(req.body);
  
				  // async function getTodos() {
					  
					// for (var [i, urll] of urls.entries())
						await urls.reduce(async function(ac, idiota, i){
							await ac;
							// await sleep(100);
							
					//  urls.map(async function(){
					
					var controlo= await parseInt(idiota);
					var precos= await Array.from({length:controlo}, (v, p)=>req.body.precos[i]);
					console.log(precos)
					var incme= await parseFloat(req.body.received[i])/2;
					var incme1=  await parseFloat(req.body.received[i])
					var decremento_stock= 1*incme1;
					  var tgt = await armazem_db.updateOne({_id:data1.for_store_ref, items:{$elemMatch:{referencia:req.body.referencia[i]}}}, {$inc:{"items.$.disponivel":decremento_stock}, $push:{"items.$.serial_number":numeros_de_seriess[i], "items.$.pod":data1.po_number, "items.$.data_received":new Date, "items.$.precos":precos}});

					  if(tgt.n==0){
								 await armazem_db.updateOne({_id:data1.for_store_ref }, {$push:{items:{"disponivel":incme1, "referencia":req.body.referencia[i], "description_item":req.body.decricao[i] , "cliente_name":req.body.cliente_name[i],"serialized":req.body.serialized[i] ,"defeituosa":0, "serial_number":numeros_de_seriess[i],  "pod":[data1.po_number], "data_received":[new Date], "precos":precos}}});
								
									}

					  // ************************************************inicio de insercao de hitorico****************************
					  await stock_req_history_db.gravar_historico({beneficiario:data1.for_store, request_from:"PO", beneficiario_ref:data1.for_store_ref, ref_Item:req.body.referencia[i], numero:data1.po_number, quantidade:incme1, nome_item:req.body.decricao[i], serialized:req.body.serialized[i],  cliente_name:req.body.cliente_name[i], precos:precos, num_serie:numeros_de_seriess[i]}, function(errp, d){
				 			if(errp)
				 				console.log("ocorreu um erro ao tentar gravar historico")
				 			else
				 				console.log("Historico gravado com sucesso!!")
				 		})
					  // **************************************************fim insercao de historico**********************************


					  // console.log(`Received Todo`, todo);
					


						}, 0)
					
						// )
						console.log('Finished!');
				  	// }
			

				  
					// getTodos();

					}
					else
					{

				var urls = await [req.body.received];
				// urls[0]=await req.body.received
  
				//   async function getTodos() {
					  
				// 	for (var [i, urll] of urls.entries()) {
					await urls.reduce(async function(ac, idiota, i){
						await ac;
						await sleep(20);

						var controlo= await parseInt(idiota);
					var precos= await Array.from({length:controlo}, (v, p)=>req.body.precos);
					console.log(precos)

					var incme=await parseInt(req.body.received)/2;
					var incme1=await parseInt(req.body.received)
					var decremento_stock= await 1*incme1;
					  var tgt = await armazem_db.updateOne({_id:data1.for_store_ref, items:{$elemMatch:{referencia:req.body.referencia}}}, {$inc:{"items.$.disponivel":decremento_stock}, $push:{"items.$.serial_number":numeros_de_seriess[0], "items.$.pod":data1.po_number, "items.$.data_received":new Date,  "items.$.precos":precos}});

					  if(tgt.n==0){
								await armazem_db.updateOne({_id:data1.for_store_ref }, {$push:{items:{"disponivel":incme1, "referencia":req.body.referencia, "description_item":req.body.decricao, "serialized":req.body.serialized, "cliente_name":req.body.cliente_name,  "serial_number":numeros_de_seriess[0],  "pod":[data1.po_number], "data_received":[new Date], precos:precos}}})
								

									}

					   // ************************************************inicio de insercao de hitorico****************************
					 await stock_req_history_db.gravar_historico({beneficiario:data1.for_store, request_from:"PO",  beneficiario_ref:data1.for_store_ref, ref_Item:req.body.referencia, numero:data1.po_number, quantidade:incme1, nome_item:req.body.decricao, serialized:req.body.serialized, cliente_name:req.body.cliente_name, precos:precos, num_serie:numeros_de_seriess[0]}, function(errp, d){
				 			if(errp)
				 				console.log("ocorreu um erro ao tentar gravar historico")
				 			else
				 				console.log("Historico gravado com sucesso!!")
				 		})
					  // **************************************************fim insercao de historico**********************************



					  // console.log(`Received Todo`, todo);
					// }
				}, 0)
				  
					console.log('Finished!');
				//   }

				  
				// getTodos();



				}
		
		}, 0);

var procurapo = await po_db.findOne({_id:req.body.novo});

var departamentochefe=[{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Luis Brazuna", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];

		var departamentochefe = [{nome:"Luis Brazuna", departamento:"Administration"},{nome:"Rogerio Galrito", departamento:"HVAC"},{nome:"Ernest Mckay", departamento:"Information Technology"}, {nome:"Luis Brazuna", departamento:"Fleet Management"}, {nome:"William Goldswain", departamento:"Power"}, {nome:"Valeriano Hilario", departamento:"SHEQ"}, {nome:"Luis Brazuna", departamento:"Telco"}, {nome:"Amancio Mazivila", departamento:"Finance"}, {nome:"Teresa Guimaraes", departamento:"Data Center"}];
var posicaodepartamento = departamentochefe.findIndex(x => x.departamento == procurapo.department);
console.log(posicaodepartamento)

var procuradepartmentmanager = await model.findOne({nome:departamentochefe[posicaodepartamento].nome});

var procuramanagdirector = await model.findOne({nome:departamentochefe[0].nome});

var procurafinancemanager = await model.findOne({nome:departamentochefe[7].nome});



// emailSender.createConnection();
// emailSender.sendEmailPoreceivegoods(procuradepartmentmanager, procurapo, k);
// emailSender.sendEmailPoreceivegoods(procuramanagdirector, procurapo, k);
// await emailSender.sendEmailPoreceivegoods(procurafinancemanager, procurapo, k);


res.json({feito:"feito"})

		// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

})



router.get("/receiving/:id", function(req, res){
	
var userData= req.session.usuario;

po_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!");
		else
		{
			res.render("po_receivegods_form", {DataU:userData, Stock_request:data, title:"EagleI"})
		}
	})	
})


router.get("/novo", async function(req, res){
	var userData=req.session.usuario;
	var admin_case=await admin_db.find({});
	if(admin_case.length>0)
stock_item_db.find({}, function(err, data){
	if(err)
		console.log("ocrreu um erro ao tentar....")
	else
	{
		fornecedor_db.find({}, function(err1, data1){
			if(err1)
				console.log("encontrou erro ao tentar fazer fornecedores")
			else
			{
				cambio_db.find({}, function(err2, data2){
					if(err2)
						console.log("Ocorreu um erro ao tentar encontrar cambio")
					else
						{	armazem_db.find({}, function(err3, data3){
							if(err3)
								console.log("ocorreuum erro ao tentar encontrar os armazens")
							else
								{
									cliente_name_db.find({}, function(err4, data4){
										if(err4)
											console.log("correu erro 4")
										else
											res.render("po_form", {DataU:userData, 'Clientte':data4, 'Departamento':dados_provinciais.departamentos, Fornecedor:data1, Forncedorres:JSON.stringify(data1), Items:data, Itemms:JSON.stringify(data), AdMagen:admin_case,  Cambio:JSON.stringify(data2), Armazem:data3, title:"EagleI" })
								

									}).sort({nome:1})

									
									// res.render("po_form", {DataU:userData, 'Departamento':dados_provinciais.departamentos, Fornecedor:data1, Forncedorres:JSON.stringify(data1), Items:data, Itemms:JSON.stringify(data),  Cambio:JSON.stringify(data2), Armazem:data3, title:"EagleI" })
								}		

						}).sort({nome:1})
							
						}		
				})
				
			

			}

		}).sort({cliente_nome:1})
		
	}
}).sort({description_item:1})
	
})

router.get("/editar_requestedPoo/:id", async function(req, res){
	var userData=req.session.usuario;

var tgsh=await admin_db.find({});
stock_item_db.find({}, function(err, data){
	if(err)
		console.log("ocrreu um erro ao tentar....")
	else
	{
		fornecedor_db.find({}, function(err1, data1){
			if(err1)
				console.log("encontrou erro ao tentar fazer fornecedores")
			else
			{
				cambio_db.find({}, function(err2, data2){
					if(err2)
						console.log("Ocorreu um erro ao tentar encontrar cambio")
					else
						{	armazem_db.find({}, function(err3, data3){
							if(err3)
								console.log("ocorreuum erro ao tentar encontrar os armazens")
							else
								{
									po_db.find({_id:req.params.id}, function(erro, dados){
										if(erro)
											console.log("ocorreu um erro ao tentar achar item editado")
										else
										{
											 
											cliente_name_db.find({}, function(err9, data9){
												if(err9)
													console.log("correu um erro")
												else
													res.render("po_form_edit", {DataU:userData, Clientte:data9, AdMagen: tgsh, 'Departamento':dados_provinciais.departamentos, Fornecedor:data1, Forncedorres:JSON.stringify(data1), Items:data, Po_data:dados, Cambio:JSON.stringify(data2), Armazem:data3, title:"EagleI" })
										

											})
											// res.render("po_form_edit", {DataU:userData, 'Departamento':dados_provinciais.departamentos, Fornecedor:data1, Forncedorres:JSON.stringify(data1), Items:data, Po_data:dados, Cambio:JSON.stringify(data2), Armazem:data3, title:"EagleI" })
										}
									})
									
									// res.render("po_form", {DataU:userData, 'Departamento':dados_provinciais.departamentos, Fornecedor:data1, Forncedorres:JSON.stringify(data1), Items:data,  Cambio:JSON.stringify(data2), Armazem:data3, title:"EagleI" })
								}		

						}).sort({nome:1})
							
						}		
				})
				
			

			}

		}).sort({cliente_nome:1})
		
	}
})
	
})

router.post("/download_fichero", upload.any(), async function(req, res){
	console.log(req.body)
	res.download("./public"+req.body.fitchero)
})


router.post("/novo", upload.any(),async function(req, res){
	var userData=req.session.usuario;
	console.log(req.body);
	
	var valores_limites=[5000000, 2475000, 400000, 1500000, 1735000, 600000, 5470000, 10000000, 10000000, 1200000, 12000000];
	var valores_manager=[{nome:"Faiza Tricamo", departamento:"Administration", valor_limite:100000000},{nome:"Rogerio Galrito", departamento:"HVAC", valor_limite:10000},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Antonio Biquiza", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];
var valores_manager11= await admin_db.find({});
var valores_manager12= await valores_manager11[0].departamento;
console.log(valores_manager12)
if((req.body.payment_method=="Cash") && (userData.nome=="Henk Brutten" || userData.nome=="David Nhantumbo")){


// *******************************************acrescentar propriedades de aprovacao***************************************************************
var userData=req.session.usuario;
	var ultimo =  await po_db.countDocuments({po_number:{$exists:true}}, function(err , count){
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
	var numero = "PO"+ano + mes + dia + criar(ultimo);
	console.log(numero)




// *******************************************************end acrescenetar propriedades de aprovacao***********************************************

	var parametro =new Date();
	var start=parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-01T05:00:00";
	var end= parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-31T20:00:00";
	console.log(start, end);
	var dataa=await po_db.find({data_po:{$lte:end, $gte:start}, department_ref:req.body.department_ref});

	let stockk= req.body;
	console.log(req.body)
			var indx= await dados_provinciais.departamentos.indexOf(stockk.department);
			stockk.estagio=await [1,1,1];
			var t= parseFloat(stockk.valor_em_metical.replace(/,/g, ""));
			var soma=parseFloat(0);
			if(dataa.length>0){
				for(let r=0; r<dataa.length; r++){
					soma=await soma+parseFloat(dataa[r].valor_em_metical.replace(/,/g, ""))
				}
			}

		console.log("***************************************************")
		console.log(soma, t, indx)
		console.log("***************************************************")

			var posicaodepartamento = await valores_manager12.findIndex(x => x._id == req.body.department_ref);


			// var procuramd = await model.findOne({nome:valores_manager[0].nome});

			var procuramanager = await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id});


			var warhm=await armazem_db.findOne({nome:stockk.for_store}); 



		

		stockk.items=[];
		
// *****************************************  Tratamento de ficheiro de cotacao******************************
    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "primeiro_ficheiro") {
                stockk.primeiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "segundo_ficheiro") {
                stockk.segundo_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

            if (req.files[i].fieldname == "terceiro_ficheiro") {
                 stockk.terceiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

        }
    }

// **********************************************fim de tratamentode ficheiros ****************************



	if(Array.isArray(stockk.quantidades))
		stockk.quantidades.map(async function(vvalor, iindex){
			stockk.items[iindex]={};
			stockk.items[iindex].nome_item=req.body.item_nome[iindex];
			stockk.items[iindex].price=req.body.item_preco[iindex];
			stockk.items[iindex].quantity=req.body.quantidades[iindex].replace(/,/g, "");
			stockk.items[iindex].total=req.body.total[iindex];
			stockk.items[iindex].referencia=req.body.referencia[iindex];
			stockk.items[iindex].serialized=req.body.serialized[iindex];
			stockk.items[iindex].cliente_name=req.body.cliente_name[iindex];
			// console.log(temporario);

		})
		// for(let i=0;i<stockk.quantidades.length; i++){
		// 	stockk.items[i]={};
		// 	stockk.items[i].nome_item=req.body.item_nome[i];
		// 	stockk.items[i].price=req.body.item_preco[i];
		// 	stockk.items[i].quantity=req.body.quantidades[i].replace(/,/g, "");
		// 	stockk.items[i].total=req.body.total[i];
		// 	stockk.items[i].referencia= getreferencia(req.body.item_nome[i]);

		// }
	else
		for(let i=0;i<1; i++){
			stockk.items[i]={};
			stockk.items[i].nome_item=req.body.item_nome;
			stockk.items[i].price=req.body.item_preco;
			stockk.items[i].quantity=req.body.quantidades.replace(/,/g, "");
			stockk.items[i].total=req.body.total;
			stockk.items[i].referencia=req.body.referencia;
			stockk.items[i].serialized=req.body.serialized;
			stockk.items[i].cliente_name=req.body.cliente_name;

		}

		if(req.body.proposito=="project")
		{
			stockk.clientte_name = req.body.clientte_name;
			stockk.quotation_number_project = req.body.quotation_number_project;
		}


		stockk.iva=req.body.iva;
		stockk.subtotal=req.body.sub_total;
		stockk.total_to_pay=req.body.total_a_pagar;
		stockk.accao=["SENT FOR APPROVAL", "APPROVED","APPROVED"]; 
		stockk.po_number=await numero;
		console.log(stockk);

		var k = "";
		for(let [i,test] of stockk.items.entries()) {

	        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ stockk.items[i].nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].total +"</td>" + "</tr>";

	    }

	   // await Promise.all(stockk.items.map(async(ele, i)=>{
	   //  	 k= await k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ ele.nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + ele.quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + ele.price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + ele.total +"</td>" + "</tr>";


	   //  })
	   // )

		
			stockk.intervenientes= await [stockk.requested_by, req.session.usuario.nome, req.session.usuario.nome, warhm.responsavel[0]];
			var alvo=await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id})
			// emailSender.createConnection();
			// emailSender.sendEmailPosendforapproval(alvo, stockk.requested_by, k);
		

		


		



	stockk.registado_por=userData.nome;
	// if(stockk.comserv_stock=="sim")

	console.log(stockk)
	stockk.date_actions=await [new Date(), new Date(), new Date()];
	stockk.actual_situation=await "aprovado";
	stockk.po_approvers=await [req.session.usuario.nome, req.session.usuario.nome, req.session.usuario.nome ];
	if(stockk.items.length>0)
		await po_db.gravar_po(stockk, function(err, data){
			if(err)
				console.log(err);
			else 
				{
					console.log("saved");
				res.json({feito:"feito"});
			}
		})
	else
	res.redirect("/inicio");

}
else
{


	var parametro =new Date();
	var start=parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-01T05:00:00";
	var end= parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-31T20:00:00";
	console.log(start, end);
	var dataa=await po_db.find({data_po:{$lte:end, $gte:start}, department:req.body.department});

	let stockk= req.body;
	console.log(req.body)
			var indx= await dados_provinciais.departamentos.indexOf(stockk.department);
			stockk.estagio=[1];
			var t= parseFloat(stockk.valor_em_metical.replace(/,/g, ""));
			var soma=parseFloat(0);
			if(dataa.length>0){
				for(let r=0; r<dataa.length; r++){
					soma=await soma+parseFloat(dataa[r].valor_em_metical.replace(/,/g, ""))
				}
			}

		console.log("***************************************************")
		console.log(soma, t, indx)
		console.log("***************************************************")

			var posicaodepartamento =await  valores_manager12.findIndex(x => x._id == req.body.department_ref);


			// var procuramd = await model.findOne({nome:valores_manager[0].nome});
			

			var procuramanager = await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id});


			var warhm=await armazem_db.findOne({nome:stockk.for_store}); 



		

		stockk.items=[];
		
// *****************************************  Tratamento de ficheiro de cotacao******************************
    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "primeiro_ficheiro") {
                stockk.primeiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "segundo_ficheiro") {
                stockk.segundo_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

            if (req.files[i].fieldname == "terceiro_ficheiro") {
                 stockk.terceiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

        }
    }

// **********************************************fim de tratamentode ficheiros ****************************



	if(Array.isArray(stockk.quantidades))
		stockk.quantidades.map(async function(vvalor, iindex){
			stockk.items[iindex]={};
			stockk.items[iindex].nome_item=req.body.item_nome[iindex];
			stockk.items[iindex].price=req.body.item_preco[iindex];
			stockk.items[iindex].quantity=req.body.quantidades[iindex].replace(/,/g, "");
			stockk.items[iindex].total=req.body.total[iindex];
			stockk.items[iindex].referencia=req.body.referencia[iindex];
			stockk.items[iindex].serialized=req.body.serialized[iindex];
			stockk.items[iindex].cliente_name=req.body.cliente_name[iindex];
			// console.log(temporario);

		})
		// for(let i=0;i<stockk.quantidades.length; i++){
		// 	stockk.items[i]={};
		// 	stockk.items[i].nome_item=req.body.item_nome[i];
		// 	stockk.items[i].price=req.body.item_preco[i];
		// 	stockk.items[i].quantity=req.body.quantidades[i].replace(/,/g, "");
		// 	stockk.items[i].total=req.body.total[i];
		// 	stockk.items[i].referencia= getreferencia(req.body.item_nome[i]);

		// }
	else
		for(let i=0;i<1; i++){
			stockk.items[i]={};
			stockk.items[i].nome_item=req.body.item_nome;
			stockk.items[i].price=req.body.item_preco;
			stockk.items[i].quantity=req.body.quantidades.replace(/,/g, "");
			stockk.items[i].total=req.body.total;
			stockk.items[i].referencia=req.body.referencia;
			stockk.items[i].serialized=req.body.serialized;
			stockk.items[i].cliente_name=req.body.cliente_name;

		}

		if(req.body.proposito=="project")
		{
			stockk.clientte_name = req.body.clientte_name;
			stockk.quotation_number_project = req.body.quotation_number_project;
		}


		stockk.iva=req.body.iva;
		stockk.subtotal=req.body.sub_total;
		stockk.total_to_pay=req.body.total_a_pagar;
		stockk.accao=["SENT FOR APPROVAL"];
		console.log(stockk);

		var k = "";
		for(let [i,test] of stockk.items.entries()) {

	        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ stockk.items[i].nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].total +"</td>" + "</tr>";

	    }

	   // await Promise.all(stockk.items.map(async(ele, i)=>{
	   //  	 k= await k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ ele.nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + ele.quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + ele.price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + ele.total +"</td>" + "</tr>";


	   //  })
	   // )

		if(soma>valores_manager12[posicaodepartamento].limite_mensal || t>valores_manager12[posicaodepartamento].limite_po ){
			stockk.intervenientes= await [stockk.requested_by, valores_manager12[posicaodepartamento].chefe_depart, "Luis Brazuna", warhm.responsavel[0]];
			var alvo=await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id})
			emailSender.createConnection();
			emailSender.sendEmailPosendforapproval(alvo, stockk.requested_by, k);
		}

		else{
			stockk.intervenientes= await [stockk.requested_by, valores_manager12[posicaodepartamento].chefe_depart, valores_manager12[posicaodepartamento].chefe_depart,  warhm.responsavel[0]];
			var alvo=await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id})
			emailSender.createConnection();
			emailSender.sendEmailPosendforapproval(alvo, stockk.requested_by, k);
		}


		



	stockk.registado_por=userData.nome;
	// if(stockk.comserv_stock=="sim")

	console.log(stockk)
	stockk.date_actions=await [new Date()];
	stockk.actual_situation=await "pendente";
	stockk.po_approvers=await [req.session.usuario.nome];
	if(stockk.items.length>0)
		await po_db.gravar_po(stockk, function(err, data){
			if(err)
				console.log(err);
			else 
				{
					console.log("saved");
				res.json({feito:"feito"});
			}
		})
	else
	res.redirect("/inicio");

}
	


	

})

router.post("/gravar_", upload.any(),async function(req, res){
	var userData=req.session.usuario;
	var valores_limites=[5000000, 2475000, 400000, 1500000, 1735000, 600000, 5470000, 10000000, 10000000, 1200000, 12000000];
	var valores_manager=[{nome:"Faiza Tricamo", departamento:"Administration", valor_limite:100000000},{nome:"Rogerio Galrito", departamento:"HVAC", valor_limite:10000},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Antonio Biquiza", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];
	
	var valores_manager11= await admin_db.find({});
	var valores_manager12= await valores_manager11[0].departamento;

var warhm=await armazem_db.findOne({nome:req.body.for_store}); 
	var parametro =new Date();
	var start=parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-01T05:00:00";
	var end= parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-31T20:00:00";
	console.log(start, end);
	po_db.find({data_po:{$lte:end, $gte:start}, department:req.body.department}, async function(errr, dataa){
		if(errr)
			console.log("ocorreu um erro ao tentar encontrar po deste mes")
		else
		{

			let stockk= req.body;
			var indx= await dados_provinciais.departamentos.indexOf(stockk.department);
			stockk.estagio=[1];
			var t= parseFloat(stockk.valor_em_metical.replace(/,/g, ""));
			var soma=parseFloat(0);
			if(dataa.length>0){
				for(let r=0; r<dataa.length; r++){
					soma=await soma+parseFloat(dataa[r].valor_em_metical.replace(/,/g, ""))
				}
			}

		console.log("***************************************************")
		console.log(soma, t, indx)
		console.log("***************************************************")

			var posicaodepartamento = await valores_manager12.findIndex(x => x._id == req.body.department_ref);


			// var procuramd = await model.findOne({nome:valores_manager[0].nome});

			var procuramanager = await model.findOne({nome:valores_manager[posicaodepartamento].nome});

				if(soma>valores_manager12[posicaodepartamento].limite_mensal || t>valores_manager12[posicaodepartamento].limite_po ){
			stockk.intervenientes= await [stockk.requested_by, valores_manager12[posicaodepartamento].chefe_depart, "Luis Brazuna", warhm.responsavel[0]];
			// emailSender.createConnection();
			// emailSender.sendEmailPosendforapproval(procuramd, stockk.requested_by);
		}

		else{
			stockk.intervenientes= await [stockk.requested_by, valores_manager12[posicaodepartamento].chefe_depart, valores_manager12[posicaodepartamento].chefe_depart,  warhm.responsavel[0]];
			// emailSender.createConnection();
			// emailSender.sendEmailPosendforapproval(procuramanager, stockk.requested_by);
		}




		// if(soma > valores_limites[posicaodepartamento] || t>valores_manager[posicaodepartamento].valor_limite ){
		// 	stockk.intervenientes= await [stockk.requested_by, "Luis Brazuna", stockk.requested_by];
		// 	emailSender.createConnection();
		// 	emailSender.sendEmailPosendforapproval(procuramd, stockk.requested_by);
		// }

		// else{
		// 	stockk.intervenientes= await [stockk.requested_by, valores_manager[posicaodepartamento].nome, stockk.requested_by];
		// 	emailSender.createConnection();
		// 	emailSender.sendEmailPosendforapproval(procuramanager, stockk.requested_by);
		// }

		stockk.items=[];
		
// *****************************************  Tratamento de ficheiro de cotacao******************************
    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "primeiro_ficheiro") {
                stockk.primeiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "segundo_ficheiro") {
                stockk.segundo_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

            if (req.files[i].fieldname == "terceiro_ficheiro") {
                 stockk.terceiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

        }
    }

// **********************************************fim de tratamentode ficheiros ****************************



	if(Array.isArray(stockk.quantidades))
		stockk.quantidades.map(async function(vvalor, iindex){
			stockk.items[iindex]={};
			stockk.items[iindex].nome_item= await req.body.item_nome[iindex];
			stockk.items[iindex].price=await req.body.item_preco[iindex];
			stockk.items[iindex].quantity=await req.body.quantidades[iindex].replace(/,/g, "");
			stockk.items[iindex].total=await req.body.total[iindex];
			stockk.items[iindex].referencia=await req.body.referencia[iindex];
			stockk.items[iindex].serialized=await req.body.serialized[iindex];
			stockk.items[iindex].cliente_name=await req.body.cliente_name[iindex];
			// console.log(temporario);

		})
		// for(let i=0;i<stockk.quantidades.length; i++){
		// 	stockk.items[i]={};
		// 	stockk.items[i].nome_item=req.body.item_nome[i];
		// 	stockk.items[i].price=req.body.item_preco[i];
		// 	stockk.items[i].quantity=req.body.quantidades[i].replace(/,/g, "");
		// 	stockk.items[i].total=req.body.total[i];
		// 	stockk.items[i].referencia= getreferencia(req.body.item_nome[i]);

		// }
	else
		await Promise.all([2].map(async function(vvalor, i){
		// for(let i=0;i<1; i++){
			stockk.items[i]=await {};
			stockk.items[i].nome_item=await req.body.item_nome;
			stockk.items[i].price=await req.body.item_preco;
			stockk.items[i].quantity=await req.body.quantidades.replace(/,/g, "");
			stockk.items[i].total=await req.body.total;
			stockk.items[i].referencia=await req.body.referencia;
			stockk.items[i].serialized=await req.body.serialized;
			stockk.items[i].cliente_name=await req.body.cliente_name;

		})
	)

		if(req.body.proposito=="project")
		{
			stockk.clientte_name = await req.body.clientte_name;
			stockk.quotation_number_project =await req.body.quotation_number_project;
		}


		stockk.iva=req.body.iva;
		stockk.subtotal=await req.body.sub_total;
		stockk.total_to_pay=await req.body.total_a_pagar;
		console.log(stockk);

		if(req.body.proposito=="project")
		{
			stockk.clientte_name = await req.body.clientte_name;
			stockk.quotation_number_project =await req.body.quotation_number_project;
		}



	stockk.registado_por=await userData.nome;
	// if(stockk.comserv_stock=="sim")

	console.log(stockk)
	stockk.date_actions=await [new Date()];
	stockk.actual_situation=await "pendente";
	stockk.po_approvers=await [req.session.usuario.nome];
	stockk.accao=await ["Saved"];
	if(stockk.items.length>0)
		await po_db.gravar_po(stockk, function(err, data){
			if(err)
				console.log(err);
			else 
				{
					console.log("saved");
				res.json({feito:"feito"});
			}
		})
	else
	res.redirect("/inicio");




		}
	})


	

})

const sleep = ms =>{
	return new Promise(resolve => setTimeout(resolve, ms))
}

function getreferencia(name){
	var query=stock_item_db.findOne({description_item:name}, function(erro, dados){
		if(erro)
			return "erro"
		else
			return dados;
	});
	return query._id
}

router.post("/po_editado", upload.any(), async function(req, res){
	var userData=req.session.usuario;
	// var valores_limites=[5000000, 2475000, 400000, 1500000, 1735000, 600000, 5470000, 10000000];
	// var valores_manager=[{nome:"Luis Brazuna", departamento:"Administration", valor_limite:100000000},{nome:"Rogerio Galrito", departamento:"Facilities", valor_limite:247500},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Luis Brazuna", departamento:"Fleet Management", valor_limite:100000000}, {nome:"William Goldswain", departamento:"Power", valor_limite:300000}, {nome:"Valeriano Hilario", departamento:"SHEQ", valor_limite:100000}, {nome:"Humberto Barros", departamento:"Telco", valor_limite:5470000}, {nome:"Luis Brazuna", departamento:"Warehouse", valor_limite:100000000}];
var stockk= req.body;
	var valores_limites=[5000000, 2475000, 400000, 1500000, 1735000, 600000, 5470000, 10000000, 10000000];
	var valores_manager=[{nome:"Faiza Tricamo", departamento:"Administration", valor_limite:100000000},{nome:"Rogerio Galrito", departamento:"HVAC", valor_limite:10000},{nome:"Ernest Mckay", departamento:"Information Technology", valor_limite:100000}, {nome:"Faiza Tricamo", departamento:"Fleet", valor_limite:10000}, {nome:"William Goldswain", departamento:"Power", valor_limite:10000}, {nome:"Sandra Dias", departamento:"Health & Safety", valor_limite:10000}, {nome:"Antonio Biquiza", departamento:"Telco", valor_limite:10000}, {nome:"Amancio Mazivila", departamento:"Finance", valor_limite:10000}, {nome:"Teresa Guimaraes", departamento:"Data Center", valor_limite:10000}, {nome:"David Nhantumbo", departamento:"Logistics", valor_limite:10000}, {nome:"Henk Brutten", departamento:"Procurement", valor_limite:10000}];
	var valores_manager11= await admin_db.find({});
	var valores_manager12= await valores_manager11[0].departamento;
	var warhm=await armazem_db.findOne({nome:stockk.for_store}); 
var parametro =new Date();
var start=parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-01T05:00:00";
var end= parametro.getFullYear()+"-"+((parametro.getMonth()+1)<10? "0"+(parametro.getMonth()+1):(parametro.getMonth()+1))+"-31T20:00:00";
	console.log(start, end);
	var dataa=await po_db.find({data_po:{$lte:end, $gte:start}, department:req.body.department})

		// let stockk= req.body;
			var indx=valores_manager12.findIndex(x => x._id == stockk.department_ref);
			// var indx=dados_provinciais.departamentos.indexOf(stockk.department);
			stockk.estagio=[1];
			var t= parseFloat(stockk.valor_em_metical.replace(/,/g, ""));
			var soma=0;
			if(dataa.length>0){
				for(let r=0; r<dataa.length; r++){
					soma= await soma+parseFloat(dataa[r].valor_em_metical.replace(/,/g, ""))
				}
			}
			console.log("***************************************************")
		console.log(soma)
		console.log("***************************************************")



		// if(soma > valores_limites[indx] || t>valores_manager[indx].valor_limite ){
		// 	stockk.intervenientes= await [stockk.requested_by, valores_manager[indx].nome, "Luis Brazuna",  warhm.responsavel[0]];
		// 	// emailSender.createConnection();
		// 	// emailSender.sendEmailPosendforapproval(procuramd, stockk.requested_by);
		// }

		// else{
		// 	stockk.intervenientes= await [stockk.requested_by, valores_manager[indx].nome , valores_manager[indx].nome, warhm.responsavel[0]];
		// 	// emailSender.createConnection();
		// 	// emailSender.sendEmailPosendforapproval(procuramanager, stockk.requested_by);
		// }


		// if(soma > valores_limites[indx] || t>valores_manager[indx].valor_limite )
		// 	stockk.intervenientes=[stockk.requested_by, "Luis Brazuna", stockk.requested_by];
		// else
		// 	stockk.intervenientes= await [stockk.requested_by, valores_manager[posicaodepartamento].nome, stockk.requested_by];

		stockk.items=[];
		var posicaodepartamento = valores_manager12.findIndex(x => x._id == req.body.department_ref);
		
// *****************************************  Tratamento de ficheiro de cotacao******************************
    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "primeiro_ficheiro") {
                stockk.primeiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "segundo_ficheiro") {
                stockk.segundo_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

            if (req.files[i].fieldname == "terceiro_ficheiro") {
                 stockk.terceiro_ficheiro= "/uploads/" + req.files[i].filename;
                continue
            }

        }
    }

// **********************************************fim de tratamentode ficheiros ****************************



	if(Array.isArray(stockk.quantidades))
		for(let i=0;i<stockk.quantidades.length; i++){
			stockk.items[i]={};
			stockk.items[i].nome_item=req.body.item_nome[i];
			stockk.items[i].price=req.body.item_preco[i];
			stockk.items[i].quantity=req.body.quantidades[i].replace(/,/g, "");
			stockk.items[i].total=req.body.total[i];
			stockk.items[i].referencia=req.body.referencia[i];
			stockk.items[i].serialized=req.body.serialized[i];
			stockk.items[i].cliente_name=req.body.cliente_name[i];

		}
	else
		for(let i=0;i<1; i++){
			stockk.items[i]={};
			stockk.items[i].nome_item=req.body.item_nome;
			stockk.items[i].price=req.body.item_preco;
			stockk.items[i].quantity=req.body.quantidades.replace(/,/g, "");
			stockk.items[i].total=req.body.total;
			stockk.items[i].referencia=req.body.referencia;
			stockk.items[i].serialized=req.body.serialized;
			stockk.items[i].cliente_name=req.body.cliente_name;

		}

		if(req.body.proposito=="project")
		{
			stockk.clientte_name = req.body.clientte_name;
			stockk.quotation_number_project = req.body.quotation_number_project;
		}else
		{
			stockk.clientte_name = '';
			stockk.quotation_number_project = '';
		}

		var procuramanager = await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id});


		stockk.iva=req.body.iva;
		stockk.subtotal=req.body.sub_total;
		stockk.total_to_pay=req.body.total_a_pagar;
		console.log(stockk);

		var k = "";
		for(let [i,test] of stockk.items.entries()) {

	        k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ stockk.items[i].nome_item + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].quantity +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].price +"</td>" + "<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + stockk.items[i].total +"</td>" + "</tr>";

	    }

		// if(soma > valores_limites[posicaodepartamento] || t>valores_manager[posicaodepartamento].valor_limite ){
		// 	stockk.intervenientes= await [stockk.requested_by, valores_manager[posicaodepartamento].nome, "Luis Brazuna", warhm.responsavel[0]];
		// 	emailSender.createConnection();
		// 	emailSender.sendEmailPosendforapproval(procuramd, stockk.requested_by, k);
		// }

		// else{
		// 	stockk.intervenientes= await [stockk.requested_by, valores_manager[posicaodepartamento].nome, valores_manager[posicaodepartamento].nome,  warhm.responsavel[0]];

		// 	emailSender.createConnection();
		// 	emailSender.sendEmailPosendforapproval(procuramanager, stockk.requested_by,k);
		// }

		if(soma>valores_manager12[posicaodepartamento].limite_mensal || t>valores_manager12[posicaodepartamento].limite_po ){
			stockk.intervenientes= await [stockk.requested_by, valores_manager12[posicaodepartamento].chefe_depart, "Luis Brazuna", warhm.responsavel[0]];
			var alvo=await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id})
			emailSender.createConnection();
			emailSender.sendEmailPosendforapproval(alvo, stockk.requested_by, k);
		}

		else{
			stockk.intervenientes= await [stockk.requested_by, valores_manager12[posicaodepartamento].chefe_depart, valores_manager12[posicaodepartamento].chefe_depart,  warhm.responsavel[0]];
			var alvo=await model.findOne({_id:valores_manager12[posicaodepartamento].chefe_depart_id})
			emailSender.createConnection();
			emailSender.sendEmailPosendforapproval(alvo, stockk.requested_by, k);
		}




	stockk.registado_por=userData.nome;
	// if(stockk.comserv_stock=="sim")

	console.log(stockk)
	// stockk.date_actions=[new Date()];
	stockk.actual_situation="pendente";
	// stockk.po_approvers=[req.session.usuario.nome];
	// po_db.gravar_po(stockk, function(err, data){
	// 	if(err)
	// 		console.log("erross");
	// 	else 
	// 		console.log("saved")
	// })
	if(stockk.items.length>0)
	po_db.updateOne({_id:req.body.idee},{$set:stockk, $unset:{returned:1, returned_reason:1, unprocessed:1}, $push:{po_approvers:req.session.usuario.nome, date_actions:new Date(), accao:"SENT FOR APPROVAL" }}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar editar po")
		else
			{console.log("dadods editados com sucesso!!")
			res.json({feito:"feito"});
	}
	})



	

})

module.exports=router;


