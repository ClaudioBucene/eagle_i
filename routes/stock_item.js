var express=require("express");
var router = express.Router();
var stock_db=require("../entities/stock_item");
var dados_provinciais = require('../util/provincias-distritos');
var cliente_db=require("../entities/cliente");
var multer = require('multer');
var armazem_db=require("../entities/armazem")
// var path = require("path");
// var cors=require("cors");
const stock_item = require("../entities/stock_item");
// var fetch=require("node-fetch");
// const Bluebird = require('bluebird');
// var cors=require("cors");

// fetch.Promise = Bluebird;
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

var corsOptions = {
  origin: 'http://127.0.0.1:2000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get("/", async function(req, res){
	var userData= req.session.usuario;
	var cont=1;
	stock_items = await [];

	var sst = await stock_db.find({}).limit(50).skip(0).lean();
	var itens = await armazem_db.find({}).select({_id:1, items:1}).lean();
	console.log(itens.length)

	await sst.reduce(async(ac, obj, i)=>{
		await ac;
		// await sleep(10);
		var cont1=await 0;
		await itens.reduce(async(ac1, obj1, i)=>{
			await ac1;
			var indice=await obj1.items.findIndex(x=>x.referencia==obj._id)
			console.log(indice)
			if(indice!=-1)
				cont1= await cont1+obj1.items[indice].disponivel;
		},0)

		var yu={...obj, cont:cont1};
		await stock_items.push(yu);

	}, 0)

	console.log(stock_items)
	res.render("stock_Item_home", {DataU:userData, Stock_item:stock_items, title:"EagleI", cont:0})
	
// router.get("/", function(req, res){
// 	var userData= req.session.usuario;
// 	var cont=1;

// 	stock_db.find({}, function(err, data){
// 		if(err)
// 			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
// 		else
// 		{
// 			res.render("stock_Item_home", {DataU:userData, Stock_item:data, title:"EagleI", cont:0})
// 		}
// 	}).sort({description_item:1}).limit(50).skip(0);
})

router.get("/proximo/:id", async function(req, res){
	var userData= req.session.usuario;
	var salto=await parseInt(req.params.id)*50;
	var cont= await parseInt(req.params.id);
	// await cont++;

	console.log(salto, cont);

	if(cont==0)
		res.redirect("/stock_item")
	else

	stock_db.find({}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
		else
		{
			res.render("stock_Item_home", {DataU:userData, Stock_item:data, title:"EagleI", cont:cont})
		}
	}).sort({description_item:1}).limit(50).skip(salto);
})

// router.get("/anterior/:id", async function(req, res){
// 	var userData= req.session.usuario;
// 	var salto=await (parseInt(req.params.id)-1)*50;
// 	var cont= await parseInt(req.params.id);
// 	await cont--;
// 	console.log(salto, cont)

// 	if(cont==0)
// 		res.redirect("/stock_item")
// 	else

// 	stock_db.find({}, function(err, data){
// 		if(err)
// 			console.log("ocorreu um erro ao tentar selecionar stock_items!!")
// 		else
// 		{
// 			res.render("stock_Item_home", {DataU:userData, Stock_item:data, title:"EagleI", cont:cont})
// 		}
// 	}).sort({description_item:1}).limit(50).skip(salto);
// }) 


router.get("/novo",  function(req, res){
	var userData=req.session.usuario;
	cliente_db.find({}, function(err, cliente){
		if(err)
			console.log("correu um erro ao tentar achar os clientes")
		else{
			res.render("stock_item_form", {DataU:userData, 'categoriias':dados_provinciais.category, Cliente:cliente,  'subcategoriias':dados_provinciais.subcategory, title:"EagleI" })
		}
	}).sort({cliente_nome:1})



	
})


router.post("/buscar", upload.any(), async(req, res)=>{
	console.log(req.body)
	var userData=req.session.usuario;
	var teste=await req.body.pesquisador;
	var b=await stock_db.find({$or:[{ description_item:{ $regex: new RegExp(`${teste}`), $options: 'i' } }, { part_number:{ $regex: new RegExp(`${teste}`), $options: 'i' } }]}).lean().exec();
	res.render("stock_Item_home", {DataU:userData, Stock_item:b, title:"EagleI", cont:0})
})
router.get("/editar/:id", function(req, res){
	var userData=req.session.usuario;
	stock_item.find({_id:req.params.id}, function(erro, dados){
		if(erro)
			console.log("ocorreu um erro ao tentar aditar stock")
		else{
			cliente_db.find({}, function(err, cliente){
				if(err)
					console.log("correu um erro ao tentar achar os clientes")
				else{
					res.render("stock_item_edit", {DataU:userData, 'categoriias':dados_provinciais.category, Cliente:cliente, Stock_item:dados, 'subcategoriias':dados_provinciais.subcategory, title:"EagleI" })
				}
			}).sort({cliente_nome:1})

		}
	})
});


router.get("/detalhes/:id", function(req, res){
	var userData=req.session.usuario;
	console.log("cheguei")
	stock_db.find({_id:req.params.id}, function(err, data){
		if(err)
			console.log("error ocured on details of ");
		else
		{
			cliente_db.find({}, function(erro, dados){
				if(erro)
					console.log("ocorreu um erro ao tentar achar clientes na seccao dos detalhes")
				else{
					res.render("stock_item_detalhes", {DataU:userData, 'categoriias':dados_provinciais.category, Stock_item:data, 'subcategoriias':dados_provinciais.subcategory, Cliente:dados, title:"EagleI" })

				}
			}).sort({cliente_nome:1})
			
		}
	})
	
});

router.post("/novo", upload.any(), async function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)
	var stockk= await req.body;
	stockk.registado_por=userData.nome;
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
	// if(stockk.comserv_stock=="sim")

	if(req.body.part_number){
	await stock_db.create(stockk)
	res.json({feito:"done"})
}
else{
	var res= await req.body.subcategory.substr(0,4);
	var ultimo =  await stock_db.countDocuments({part_number:{$exists:true}, part_number:{$regex:res}}, function(err , count){
		if(err)
			return err
		else 
		{	console.log(count)
			return count

		}
			})
		ultimo ++;
		 delete req.body.part_number;

		req.body.part_number = await res + criar(ultimo);

		stock_db.gravarStock_item(stockk, function(err, data){
			if(err)
				console.log("erross");
			else 
				res.json({feito:"done"})
		})

		
}

});

router.post("/verificacao", upload.any(), async (req, res)=>{
	console.log(req.body);
	const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Use a proxy to avoid CORS error
            const api_key = "yu5bx68acy932itf665y5fdnqdcj1n";
            const url ="https://api.barcodelookup.com/v2/products?barcode=42299837&formatted=y&key="+api_key;
            fetch(url)
                    .then(response => {console.log(response.json())})
      //               .then((data) => {
      //                 console.log(data)
      //                 // alert("feito")
      // //         document.getElementById("description_item").innerHTML = (data.products[0].barcode_number);
      // // document.getElementById("ProductName").innerHTML = (data.products[0].product_name);
      // // document.getElementById("EntireResponse").innerHTML = JSON.stringify(data, null,"<br/>");
      //               })
                    .catch(err => { 
                        throw err 
                    });
})

router.post("/editar/item", upload.any(), async function(req, res){
	var userData=req.session.usuario;
	console.log(req.body)
	let stockk= req.body;
	stockk.registado_por=userData.nome;
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
	// if(stockk.comserv_stock=="sim")

	if(req.body.part_number){
	stock_db.update({_id:req.body.fisher},{$set:stockk}, function(err, data){
		if(err)
			console.log("erross");
		else 
			res.json({feito:"done"})
	})
}
else{
	var res= await req.body.subcategory.substr(0,4);
	var ultimo =  await stock_db.countDocuments({part_number:{$exists:true}, part_number:{$regex:res}}, function(err , count){
		if(err)
			return err
		else 
		{	console.log(count)
			return count

		}
			})
		ultimo ++;
		 delete req.body.part_number;

		req.body.part_number = await res + criar(ultimo);

		stock_db.update({_id:req.body.fisher}, {$set:stockk}, function(err, data){
			if(err)
				console.log("erross");
			else 
				res.json({feito:"done"})
		})

		
}

})

module.exports=router;