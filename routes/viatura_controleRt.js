var express=require("express");
var multer  = require('multer');
var path = require("path");
var model=require("../entities/usuario");
var dados_provinciais = require('../util/provincias-distritos');
var upload = multer({storage: multer.diskStorage({
	destination: function(req, file,cb){
		cb(null, './public/uploads');
	},
	filename: function(req, file, cb){
		cb(null, req.session.usuario.nome+ "_"+ Date.now()+ path.extname(file.originalname));
	}
}) });
var router= express.Router()
var veiculo_controle=require("../entities/veiculo_controle");

router.get("/", function(req, res){
	var sessao=req.session.usuario;

	veiculo_controle.find({existencia:true}, function(err, data){
		if(err)
			console.log("ocorreum um erro ao tentar fazer control de viaturas")
		else
			res.render("veiculo_chome", {DataU:sessao, Veiculos: data, title: 'EagleI'});
	})
})

router.post("/novo", upload.any(), function(req, res){
	 var sessao=req.session.usuario;
	 var novo=req.body
	  console.log(novo)
	novo.registado_por=sessao.nome;
	veiculo_controle.gravarVeiculo(req.body, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar registar veiculo")
		else
			console.log("dados do veiculo_controle grvados com sucesso!")
	});


})
router.get("/novo", function(req, res){
	var sessao=req.session.usuario;

	res.render("veiculo_cform", {DataU:sessao, 'provincias': dados_provinciais.provincias, 'distritos': dados_provinciais.distritos, title: 'EagleI'})
})

router.get("/detalhes/:id", function(req, res){
	var userData= req.session.usuario;
	if(req.session.usuario.nivel_acesso=="admin"){
veiculo_controle.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('veiculo_cform', {DataU:userData, Veiculos: data, funcionario: "logged!!", 'provincias': dados_provinciais.provincias,title: 'EagleI'});

})}

})




module.exports=router;