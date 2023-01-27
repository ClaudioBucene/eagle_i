var express = require('express');
var router = express.Router();
var Bcrypt=require("bcryptjs");
var incidente_db=require("../entities/incidente");
var admin_db=require("../entities/sisadmin")
// const Nexmo = require('nexmo');
// const nexmo = new Nexmo({
//   apiKey: '1c9b0e39',
//   apiSecret: 'qwUsBdVPEf1SAPIh'
// });
var model = require('../entities/usuario');
var dados_provinciais = require('../util/provincias-distritos');
var sender = require('../util/sendText');
const client=require('twilio')('AC656b0627abf5972676ad1377de0f6f8a', 'b11538b57de450aab1ec0389d7140b2e')

var multer = require('multer');
var path = require("path");
var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/photo_perfil');
        },
        filename: function(req, file, cb) {
            cb(null, req.session.usuario.nome + "_" + Date.now() + path.extname(file.originalname));
        }
    })
});


/* GET users listing.  {}, null, {sort: {username: 1} */
router.get("/", function(req, res){
	var userData= req.session.usuario;
	if(req.session.usuario.nivel_acesso=="admin"){
	var userData=req.session.usuario;


	model.find({$and:[{nome:{$ne:'administrador'}}, {nome:{$ne:'Parque'}}, {nome:{$ne:'Oficina'}}, {status:"activo"}] },null, {sort:{nome:1}}, function(err, data){
		if(err)
			console.log(err); 
		else {
			console.log(userData)
			res.render('utilizador_home', {Usuarios: data, DataU:userData, title: 'EagleI'});
		}
	})


}
else
	res.redirect("/inicio")
});


router.get("/profile_edit", async function(req, res){
	var userData =  req.session.usuario;
	console.log(userData);
	model.find({nome:userData.nome}, function(err, data){
		if(err)
			console.log("ocorreu um erro ao tentar actualizar o perfil")
			res.render("profile_edit_form", {Usuarios:data, DataU:userData, title:"EagleI"})
	})
	// res.render("profile_edit_form", {DataU:userData, title:"EagleI"})
});

router.post("/profile_edit", upload.any(),  async function(req, res){

	console.log(req.body)
	// console.log(req.body);
var userr= await model.findOne({nome:req.session.usuario.nome});
console.log(userr);

if(Bcrypt.compareSync(req.body.password_actual, userr.senha)){
	console.log("passei no if*************");
	// var nova_senha =  await Promise.all(criarSenha(req.body.novo_pasword));
	// // await sleep(500)
	// console.log(nova_senha);


	

	// var nova_senha =  Bcrypt.hashSync(req.body.novo_pasword, 10);
	var new_objecto=criarSenha(req.body)

	 model.update({_id:req.session.usuario._id,  username:req.body.username_actual}, {$set:new_objecto}, function(err, fg){
		if(err){
			console.log(err)
		}
		else
			console.log(fg)
	})
console.log("passei no if**********+++++***")
	// await sleep(10);

	await model.findOne({nome:req.session.usuario.nome}, function(erro, dados){
			if(erro)
				console.log("ocorreu um erro ao tentar actualizar a foto")
			else
				{
					// req.session.usuario=dados;
					var userData=req.session.usuario;
					// console.log(dados)
					// res.render("inicio", {DataU:userData, title:'EagleI'});

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
								var pacote= Object.assign(dados, temp)
								pacote.data=await diffDays

								req.session.usuario= await pacote;
								req.session.usuario.data= diffDays;

								var userData=req.session.usuario;
								userData.data=diffDays
								console.log(pacote)
								console.log(temp)
								res.render("inicio", {DataU:userData, title:'EagleI'});
								
							}
					}).sort({_id:-1})
				}
		})


	}
else
	res.redirect("/inicio");

// model.update({nome:req.body.nome, senha:req.body.password_actual, username:req.body.username_actual}, {$set:{username:req.body.novo_username, senha:Bcrypt.hashSync(req.body.novo_pasword,10), idioma:req.body.idoma}},  function(er, data){
// 	if(er)
// 		console.log("ocorreu um erro ao tentar actualizar o perfil ")
// 	else
// 		{
// 			model.findOne({nome:req.session.usuario.nome}, function(erro, dados){
// 				if(erro)
// 					console.log("ocorreu um erro ao tentar actualizar a foto")
// 				else
// 					{
// 						req.session.usuario=dados;
// 						var userData=req.session.usuario;
// 						console.log(dados)
// 						res.render("inicio", {DataU:userData, title:'EagleI'});
// 					}
// 			})

// 		}
// 	})
})

const sleep=ms=>{
	return new Promise(resolve => setTimeout(resolve, ms));

}

router.get("/novo",  async function(req, res){
	var userData= req.session.usuario;
	var admin_case=await admin_db.find({});
	if(req.session.usuario.nivel_acesso=="admin" ){
		if(admin_case.length>0)
	res.render("utilizadorer", {DataU:userData,'provincias': dados_provinciais.provincias, AdMagen:admin_case, 'distritos': dados_provinciais.distritos})
else
	res.redirect("/inicio")
}
})


router.post("/carregar_photo", upload.any(), async function(req, res){

	console.log(req.files)
	if (req.files) {
        let comprimento = req.files.length;
       
            
                let pictu= "/uploads/photo_perfil/" + req.files[0].filename;
               await model.updateOne({nome:req.session.usuario.nome}, {$set:{profile_pic:pictu}}, function(err, data){
					if(err)
						console.log("ocorreu um erro ao tentar actualizar o perfil")
					else
						console.log("photo do perfil actualizada")
				})

            
				model.findOne({nome:req.session.usuario.nome}, function(erro, dados){
					if(erro)
						console.log("ocorreu um erro ao tentar actualizar a foto")
					else
						{
							req.session.usuario=dados;
							var userData=req.session.usuario;
							console.log(dados)
							res.render("inicio", {DataU:userData, title:'EagleI'});
						}
				})
           

        
	}



	


})

router.post("/actualzacao_Hr",  async function(req, res){
	var userData= req.session.usuario;
	console.log(req.body.m)
	var utilizador = await JSON.parse(req.body.m);
	var thsy= utilizador.map(async function(e){
		model.updateOne({nome:e.nome}, {$set:{nome_proprio:e.nome_proprio, user_code:e.codigo}}, function(erro, dados){
			if(erro)
				return "erro da actualizacao";
			else
				if(dados.n==0){
					var user = {};

									user.user_code = e.codigo;
									user.nome_proprio=e.nome_proprio;
	                    			user.nome = e.nome;
	                    			user.carta_conducao = "11111111"
	                    			user.supervisor = "";
	                    			user.data_nascimento = "11/11/11";
	                    			user.provincia_trabalho = "Maputo Cidade";
	                    			user.cidade_sede = "";
	                    			user.Validade_carta = "11/11/11";
	                    			user.modelo = "SEM VEICULO";
	                    			user.naturalidade_provincia = "Maputo Cidade";
	                    			user.naturalidade = "";
	                    			user.telefone_1 = "";
	                    			user.telefone_supervisor =""; 
	                    			user.nome_supervisor = "";
	                    			user.email =e.nome.toLowerCase().replace(" ", '') +"@comserv.co.mz" ;
	                    			user.username =e.nome.replace(" ", '');
	                    			user.nivel_acesso = "normal";
	                    			user.senha = e.nome.replace(" ", '');
	                    			user.matricula = "SEM VEICULO";
	                    			user.ano_aquisicao = "SEM VEICULO";
	                    			user.departamento = "Telco";
	                    			user.kilometragem = 0
	                    			user.funcao = "XXXX";
	                    			// var reg = result[i].selmecregion.split(' ');
	                    			user.regiao = "maputo";
	                    			user.marca = "SEM VEICULO";
	                    			// user.status = "activo";
	                    			// user.data_registo =
	                    			user.registado_por = "Ginatoria Chambe"
	                    			// user.loged =
	                    			user.user_pettycash = 0;

	                    			console.log(user);

	                    			model.gravarDados(user, function(err){
										if(err){
											console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
											return "erro"
										}
										else{
											return "feito"
										}
									});


				}
		})

		
	})

	
})

router.post("/update", function(req, res){
	if(req.session.usuario.nivel_acesso=="admin"){
	var utilizador = JSON.parse(req.body.m);
	for(var i=0; i<utilizador.length; i++){
		console.log(utilizador[i].kilometragem);
		var a=utilizador[i].kilometragem;
		var b=utilizador[i].matricula;
	model.find({matricula:utilizador[i].matricula}, function(err1, ft){
		if(err1)
			console.log("erro ao tentar encontrar ficheiro!!")
		else
			if(ft.length>0)
		{
			var t=parseInt(ft[0].kilometragem);
			var s=parseInt(a);
			if(s > t){

		model.updateMany({matricula:b}, {$set:{kilometragem:s}}, function(err, dta){
		if(err){
			console.log("Ocorreu um erro ao tentar actualizar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else
			if(dta!=null){
			console.log(dta);
			var msg = "prezado Senhor Helio Mahesse, o Senhor "+req.session.usuario.nome+", actualizou a kilometragem dos veiculos na plataforma da EagleI \n \n ";
			// textSender({telefone: utilizador.telefone_1}, msg);
			// client.messages.create({
			// 	body:msg,
			// 	from: '+12027937981',
			// 	to:'+258849905789'
			// }, function(err, message){
			// 	console.log("mensagem enviada")
			// });
			//var msg="Hi Mr leonardo, kilometer file was updated... Comserv" ;
			// const from = 'EagleI'
			// const to = '+258842440144'
			// const text = msg

			// nexmo.message.sendSms(from, to, text)

		}
		else
			console.log(dta)

	});




			}
		}
	})




	// model.findOneAndUpdate({nome:utilizador[i].nome}, {$set:{telefone_1:utilizador[i].telefone_1, email:utilizador[i].email, regiao:utilizador[i].regiao, departamento:utilizador[i].departamento, nome_supervisor:utilizador[i].nome_supervisor }}, function(err, dta){
	// 	if(err){
	// 		console.log("Ocorreu um erro ao tentar actualizar os dados!\n contacte o administrador do sistema");
	// 		console.log(err)
	// 	}
	// 	else
	// 		if(dta!=null){
	// 		console.log(dta);
	// 		var msg = "prezado Senhor Helio Mahesse, o Senhor "+req.session.usuario.nome+", actualizou a kilometragem dos veiculos na plataforma da EagleI \n \n ";
	// 		// textSender({telefone: utilizador.telefone_1}, msg);
	// 		// client.messages.create({
	// 		// 	body:msg,
	// 		// 	from: '+12027937981',
	// 		// 	to:'+258849905789'
	// 		// }, function(err, message){
	// 		// 	console.log("mensagem enviada")
	// 		// });
	// 		//var msg="Hi Mr leonardo, kilometer file was updated... Comserv" ;
	// 		// const from = 'EagleI'
	// 		// const to = '+258842440144'
	// 		// const text = msg

	// 		// nexmo.message.sendSms(from, to, text)

	// 	}
	// 	else
	// 		console.log(dta)

	// });

}
}






model.findOne({nome:req.session.usuario.nome}, function(err, data){
		if(err)
			console.log("erro ao tentar aceder o utilizador!!");
		else
			if(data){

				req.session.usuario=data;
				
			}
			else
				//res.redirect("/utilizador")
				console.log("dados actualizados com sucesso!");
				// res.redirect("/utilizador")
	})
})

router.post("/novo",upload.any() ,async function(req, res){
	if(req.session.usuario.nivel_acesso=="admin"){
	var utilizador = await getUtilizador(req.body);
	utilizador.registado_por=await req.session.usuario.nome
	console.log(utilizador);
	await model.gravarDados(utilizador, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}
		else{
			console.log("dados gravados com sucesso");
			res.json({done:"feito"})
		}

		
			

	});

}

else
	
	
	res.redirect("/inicio");
})

router.get("/remove/:id", function(req, res){

	if(req.session.usuario.nivel_acesso=="admin"){
	model.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log("ocorreu um erro ao tentar apagar os dados!");
		else{
			console.log("inspeção Removido com sucesso!!");
			res.redirect("/utilizador")}
	})}
})


router.get("/detalhes/:id", async function(req, res){
	var userData= req.session.usuario;
	if(req.session.usuario.nivel_acesso=="admin"){
var ttys= await admin_db.find({});
console.log(ttys)

model.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('utalizadores_detalhes', {DataU:userData, Usuarios: data, AdMagen:ttys, funcionario: "logged!!", 'provincias': dados_provinciais.provincias,title: 'EagleI'});

})}

})

router.get("/editar/:id", async function(req, res){
	var userData= req.session.usuario;
	if(req.session.usuario.nivel_acesso=="admin"){
var ttys= await admin_db.find({});
model.find({_id:req.params.id}, function(err, data){
	if(err){
		console.log("ocorreu um erro ao tentar aceder os dados")
	}
	res.render('utilizador_edittar', {DataU:userData, Usuarios: data, AdMagen:ttys, funcionario: "logged!!", 'provincias': dados_provinciais.provincias,title: 'EagleI'});

})}

})

router.get("/modulos/:id", async(req, res)=>{
	var userData=req.session.usuario;
	var utili= await model.find({_id:req.params.id});
	if(utili.length>0 ){
		var estee=await [];
		var moduls=  utili[0].modulos.length>0? await Promise.all(utili[0].modulos.map(async(este, yu)=>{
			
		
			console.log(yu)
			await estee.push(este.referencia);
			// return este
		})):[];

		console.log(estee)

		todos_modulus=await admin_db.find({});
		todos_modulus1=await todos_modulus[0].nivel_acesso;

		var entregas=await [];

		
			await Promise.all(estee.map(async(ju)=>{
				
				let gft=await {};
				gft.__id=await ju;
				gft.nome=await todos_modulus1[todos_modulus1.findIndex(x=>x._id==ju)].nome;
				gft.registed_by=await utili[0].modulos[utili[0].modulos.findIndex(x=>x.referencia==ju)].adcionado_por;
				gft.datta=await utili[0].modulos[utili[0].modulos.findIndex(x=>x.referencia==ju)].data;
				await entregas.push(gft);
				
			}));


		
		console.log(entregas)
		res.render("user_modulus_", {DataU:userData, Entregas:entregas, refr:utili[0], title:"EagleI"})
		



	}
	else
		res.redirect("/inicio")
})

router.get("/addmodulule/:id", async(req, res)=>{

	var userData=await req.session.usuario;
	var admin_case=await admin_db.find({});
	var person=await model.findOne({_id:req.params.id})
	
	if(userData.nivel_acesso=="admin")
		res.render("add_modulule_forms", {DataU:userData,  AdMagen:admin_case ,Person:person, title:"Eaglei"})
	else
		res.redirect("/inicio");
})

router.post("/addmodululedf", upload.any(), async(req, res)=>{
	console.log(req.body);
	var userData=req.session.usuario;
	var edd=await ((new Date()).getDate()<10? '0'+(new Date()).getDate():(new Date()).getDate())+'/'+(((new Date()).getMonth()+1)<10? ('0'+((new Date()).getMonth()+1)):((new Date()).getMonth()+1))+'/'+((new Date()).getFullYear())+'   '+((new Date()).getHours()<10? ('0'+(new Date()).getHours()): (new Date()).getHours() )+' : '+((new Date()).getMinutes()<10? ('0'+(new Date()).getMinutes()):(new Date()).getMinutes());
	var kampa=await model.find({_id:req.body.hgusm, modulos:{$elemMatch:{referencia:req.body.frere}}});
	console.log(kampa)
	if(kampa.length==0){
		await model.updateOne({_id:req.body.hgusm}, {$push:{modulos:{referencia:req.body.frere, adcionado_por:userData.nome, data:edd}}});
		res.json({feito:"feito"})

	}
	else

	res.json({feito:"feito"})

})

router.get("/removerm0dulo/:id1/:id2", async(req, res)=>{
	console.log(req.params)

	var teste=await model.update({_id:req.params.id1},{$pull:{modulos:{referencia:req.params.id2}}} )
	var utl=await "/utilizador/modulos/"+req.params.id1;
	res.redirect(utl);
})

router.post("/editar",upload.any(), async function(req, res){
	if(req.session.usuario.nivel_acesso=="admin"){
	var utilizador = await editarr(req.body);
	var bom=await utilizador.bom;
	var removido=await utilizador.editar;
	console.log(utilizador)
	utilizador.registado_por=await req.session.usuario.nome;
	console.log(utilizador);
	await model.updateOne({_id:req.body.identificacao}, {$set:bom, $unset:removido});
	res.json({done:"feito"})
	
	
	
}
})


function getExcel(body){
	var ficheiroActual=ficheiroActual
}

async function getUtilizador(body){
	var usuario= {};

if(body.nivel_acesso=="cliente"){
	usuario.nome=await body.nome;
	usuario.regiao_id=await body.regiao_id;
	usuario.provincia_id=await body.provincia_id;
	
	usuario.provincia_trabalho=await body.provincia_trabalho;
	
	usuario.telefone_1=await body.telefone_1;
	usuario.regiao=await body.regiao.toLowerCase();
	
	
	usuario.email=await body.email;
	usuario.username=await body.username.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	usuario.nivel_acesso=await  body.nivel_acesso;
	usuario.senha=await body.senha.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	

}
else

	{
	usuario.nome=await body.nome;
	usuario.carta_conducao=await body.carta_conducao;
	usuario.supervisor=await body.supervisor;
	usuario.data_nascimento=await  body.data_nascimento;
	usuario.provincia_trabalho=await body.provincia_trabalho;
	usuario.departamento=await body.departamento;
	usuario.funcao=await body.funcao;
	usuario.telefone_supervisor=await body.telefone_supervisor;
	usuario.nome_supervisor=await body.nome_supervisor;
	usuario.Validade_carta=await body.Validade_carta;
	usuario.telefone_1=await body.telefone_1;
	usuario.regiao=await body.regiao.toLowerCase();
	usuario.matricula=await body.matricula;
	usuario.modelo=await body.modelo;
	usuario.marca=await body.marca;
	usuario.regiao_id=await body.regiao_id;
	usuario.provincia_id=await body.provincia_id;
	usuario.funcao_id=await body.funcao_id;
	usuario.departamento_id=await body.departamento_id;
	usuario.ano_aquisicao=await body.ano_aquisicao;
	usuario.email=await body.email;
	usuario.username=await body.username.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	usuario.nivel_acesso=await  body.nivel_acesso;
	usuario.senha=await body.senha.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	usuario.kilometragem=await body.kilometragem;

	}
	
	//usuario.status: {type: String, 'default':'activo'},
	//usuario.data_registo: {type: Date, 'default': Date.now

	return usuario;

}

async function editarr(body){
		var usuario= {};
		usuario.bom={};
		usuario.editar={}

if(body.nivel_acesso=="cliente"){
	usuario.bom.nome=await body.nome;
	
	usuario.bom.provincia_trabalho=await body.provincia_trabalho;
	
	usuario.bom.telefone_1=await body.telefone_1;
	usuario.bom.regiao=await body.regiao.toLowerCase();
	usuario.bom.regiao_id=await body.regiao_id;
	usuario.bom.provincia_id=await body.provincia_id;

	usuario.bom.email=await body.email;
	usuario.bom.username=await body.username.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	usuario.bom.nivel_acesso=await  body.nivel_acesso;
	usuario.bom.senha=await body.senha.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');

	usuario.editar.carta_conducao=await 1;
	usuario.editar.supervisor=await 1;
	usuario.editar.data_nascimento=await 1;
	usuario.editar.funcao=await 1;
	usuario.editar.departamento=await 1;
	usuario.editar.nome_supervisor=await 1;
	usuario.editar.telefone_supervisor=await 1;
	usuario.editar.Validade_carta=await 1;
	usuario.editar.matricula=await 1;
	usuario.editar.modelo=await 1;
	usuario.editar.marca=await 1;
	
	usuario.editar.funcao_id=await 1;
	usuario.editar.departamento_id=await 1;

	usuario.editar.ano_aquisicao=await 1;
	usuario.editar.kilometragem=await 1;

}
else

	{
	usuario.bom.nome=await body.nome;
	usuario.bom.carta_conducao=await body.carta_conducao;
	usuario.bom.supervisor=await body.supervisor;
	usuario.bom.data_nascimento=await  body.data_nascimento;
	usuario.bom.provincia_trabalho=await body.provincia_trabalho;
	usuario.bom.departamento=await body.departamento;
	usuario.bom.funcao=await body.funcao;
	usuario.bom.telefone_supervisor=await body.telefone_supervisor;
	usuario.bom.nome_supervisor=await body.nome_supervisor;
	usuario.bom.Validade_carta=await body.Validade_carta;
	usuario.bom.telefone_1=await body.telefone_1;
	usuario.bom.regiao=await body.regiao.toLowerCase();
	usuario.bom.matricula=await body.matricula;
	usuario.bom.modelo=await body.modelo;
	usuario.bom.marca=await body.marca;
	usuario.bom.regiao_id=await body.regiao_id;
	usuario.bom.provincia_id=await body.provincia_id;
	usuario.bom.funcao_id=await body.funcao_id;
	usuario.bom.departamento_id=await body.departamento_id;
	usuario.bom.ano_aquisicao=await body.ano_aquisicao;
	usuario.bom.email=await body.email;
	usuario.bom.username=await body.username.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	usuario.bom.nivel_acesso=await  body.nivel_acesso;
	usuario.bom.senha=await body.senha.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
	usuario.bom.kilometragem=await body.kilometragem;

	}
	
	//usuario.status: {type: String, 'default':'activo'},
	//usuario.data_registo: {type: Date, 'default': Date.now

	return usuario;

}

(
	function(){
		model.countDocuments({}, function(err, numUsuarios){
			if(err){
				console.log(err)
				console.log('Encerrando o servidor');
				process.exit(1);
			} else if(!numUsuarios){
				model.gravarDados({	

				'nome': 'administrador',
				'carta_conducao':'00000000/0',
				'supervisor':'Luis Bazuna',
				'ano_aquisicao': '2018',
				'departamento': 'IT ',
				'funcao':'Administrador de Sistemas',
				'data_nascimento': '03/12/2000',
				'provincia_trabalho': 'Maputo Cidade',
				'Validade_carta':'31/12/2099',
				'profissao': 'Administrador de Sistemas',
				'modelo': 'BT-50',
				'regiao': 'Maputo Cidade',
				'marca': 'Mazda',
				'telefone_1': '+25884990XXXX',
				'telefone_supervisor': '+25884990YYYY',
				'email':'mail@comserv.co.mz',
				'username': 'admin',
				'nivel_acesso':'admin',
				'senha': 'admin',
				'matricula':'AAA 000 MC',
				'status': 'activo',
				// 'data_registo': ((new Date().getDate())+'/'+(new Date().getMonth())+'/'+(new Date().getFullYear())),
				'registado_por':'Auto'

				}, function(err, data){
					if(err){
						console.log(err)
						console.log('Encerrando o servidor');
						process.exit(1);
					} else {
						console.log('Usuario Primario criado');
					}
				})
			}
		})
	}
)();

 async function criarSenha(plaintext){

 	var novo_objecto=await {};
 	novo_objecto.senha=await plaintext.novo_password.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
 	novo_objecto.username=await plaintext.novo_username.trim().replace(/[{}$\/*-+/#@!)()><?\\^\'%$&:,;`]/g,'');
 	novo_objecto.idioma=await plaintext.idioma;
 	return novo_objecto;
	
}

module.exports = router;
