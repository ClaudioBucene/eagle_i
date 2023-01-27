var express = require('express');
var router = express.Router();
var car_service_db = require("../entities/car_service.js");
var oficina_db=require("../entities/oficina");
var fornecedor_db=require("../entities/fornecedor.js")
var multer  = require('multer');
var path = require("path");

// let pdf = require("html-pdf");
var upload = multer({storage: multer.diskStorage({
	destination: function(req, file,cb){
		cb(null, './public/uploads');
	},
	filename: function(req, file, cb){
		cb(null, req.session.usuario.nome+ "_"+ Date.now()+ path.extname(file.originalname));
	}
}) });

router.get('/', function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;

	
	car_service_db.find({}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("car_service_home", {DataU:userData, Car_Service:data, title: 'EagleI'});
		}
	});
 
});

router.get('/novo', function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;
	fornecedor_db.find({}, function(err1, data){
		if(err1)
			console.log(err1)
		else
		{


	oficina_db.find({}, function(err, dados){
		if(err)
			console.log("Ocorreu um erro ao tentar achar carros na oficna no ccar_service router")
		else{
			res.render("car_service_form", {DataU:userData, Forncedorres:JSON.stringify(dados), Oficina:dados, Fornecedor:data, title: 'EagleI'});
		}
	}).sort({matricula:1});

	}
	}).sort({cliente_nome:1})

	
 
});

router.post("/novo", upload.any(), async function(req, res){
	console.log(req.files);
	console.log(req.body);

	if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "primeiro_ficheiro") {
                req.body.ficheiro_cotacao= "/uploads/" + req.files[i].filename;
                continue;
            }


        }
    }


	if(Array.isArray(req.body.item_nome))
		req.body.problemas= await req.body.item_nome;
	else
		req.body.problemas=await [req.body.item_nome];

	req.body.estagio=await [1];
	req.body.intervenientes=await [req.session.usuario.nome, "Faiza Tricamo", req.session.usuario.nome];
	req.body.data_acao= await [new Date()];
	req.body.actores=await [req.session.usuario.nome];

	car_service_db.gravarDados(req.body, function(err){
		if(err)
			console.log("Ocorreu um erro ao tentar gravar manutencao da viatura")
		else
			console.log("dados gravados com sucesso!")
	})


})

router.post("/aprovarcarservice", upload.any(), function(req, res){
	car_service_db.updateOne({_id:req.body.novo},{$push:{estagio:{$each:[1,1]}, data_acao:new Date(), actores:req.session.usuario.nome}, }, function(err, dados){
		if(err)
			console.log("ocorreu um erro ao tentar fazer actalizacao de servicos")
		else
			console.log(dados)
	})
})

router.post("/reprovarcarservice", upload.any(), function(req, res){
	car_service_db.updateOne({_id:req.body.novo},{$push:{estagio:{$each:[0,0]}, data_acao:new Date(), actores:req.session.usuario.nome}, }, function(err, dados){
		if(err)
			console.log("ocorreu um erro ao tentar fazer actalizacao de servicos")
		else
			console.log(dados)
	})
})




module.exports = router;
