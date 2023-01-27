var express = require('express');
var router = express.Router();
var model = require('../entities/usuario');
var clientes= require("../entities/cliente.js");
var fornecedores= require("../entities/fornecedor.js");
var admin_db=require("../entities/sisadmin");
var clienteshvac = require("../entities/cliente_hvac.js");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var multer = require('multer');
var path = require("path");
var viaturas_db=require("../entities/oficina");

var upload = multer({storage: multer.diskStorage({
	destination: function(req, file,cb){
		cb(null, './public/Documentos_Fornecedores');
	},
	filename: function(req, file, cb){
		var namefile = req.body.fornecedor_cod + "_"+ file.fieldname + "_" + Date.now() + "_" + file.originalname;
		cb(null, namefile);
	}
}) });


/*Exportar os dados dos ficheiros excel*/
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/Clientes')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
});

var uploader = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

router.post('/upload', function(req, res) {
        var exceltojson;
        uploader(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            console.log(req.file.path);
            try {
                exceltojson({
                    input: req.file.path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    else{
                    	if(result[0].supplier == undefined){
                    		for (var i = 0, j = result.length; i < j; i++) {
                    			var cliente = {};
                    			cliente.cliente_cod= result[i].customer;
								cliente.cliente_nome= result[i].name;
								cliente.cliente_nuit= result[i].taxid;
								cliente.cliente_filial= result[i].taxname;
								cliente.cliente_telefone= result[i].phone;
								cliente.cliente_web= "";
								cliente.cliente_outros= "";
								cliente.cliente_endfisico= result[i].address;
								cliente.cliente_bairrofisico= "";
								cliente.cliente_cidadefisico= "";
								cliente.cliente_provinciafisico= "";
								cliente.cliente_codpostalfisico= "";
								cliente.cliente_paisfisico= "";
								cliente.cliente_endpostal= "";
								cliente.cliente_bairropostal= "";
								cliente.cliente_cidadepostal= "";
								cliente.cliente_provinciapostal= "";
								cliente.cliente_codpostalpostal= "";
								cliente.cliente_paispostal= "";
								cliente.dataregistocliente = "";
								cliente.contactosArrayCliente = [];
								cliente.clienteeditadopor =  "";
								cliente.dataedicaocliente =  "";

								clientes.gravarDados(cliente, function(err){
                                    if(err){
                                        console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                        console.log(err)
                                    }
                                    else {
                                        console.log("Clientes upload");
                                    }
                                });
                    		}
                    		res.redirect("/cliente/clientesupplier/client_home");	
                    	}
                    	else{
                    		for (var i = 0, j = result.length; i < j; i++) {
                    			var cliente = {};
                    			cliente.fornecedor_cod= result[i].supplier;
								cliente.cliente_nome= result[i].name;
								cliente.cliente_nuit= result[i].taxid;
								cliente.cliente_filial= result[i].taxname;
								cliente.cliente_telefone= result[i].phone;
								cliente.cliente_web= "";
								cliente.cliente_outros= "";
								cliente.cliente_endfisico= "";
								cliente.cliente_bairrofisico= "";
								cliente.cliente_cidadefisico= "";
								cliente.cliente_provinciafisico= "";
								cliente.cliente_codpostalfisico= "";
								cliente.cliente_paisfisico= "";
								cliente.cliente_endpostal= "";
								cliente.cliente_bairropostal= "";
								cliente.cliente_cidadepostal= "";
								cliente.cliente_provinciapostal= "";
								cliente.cliente_codpostalpostal= "";
								cliente.cliente_paispostal= "";
								cliente.dataregistocliente = "";
								cliente.cliente_termos =  "";
								cliente.contactosArrayCliente = [];
								cliente.clienteeditadopor =  "";
								cliente.dataedicaocliente =  "";
								cliente.carta_apresentacao_empresa =  "";
								cliente.alvara =  "";
								cliente.certidao_entidades_legais =  "";
								cliente.nuit =  "";
								cliente.nuel =  "";
								cliente.carta_confirmacao_banco =  "";

								fornecedores.gravarDados(cliente, function(err){
                                    if(err){
                                        console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                        console.log(err)
                                    }
                                    else {
                                        console.log("fornecedores upload");
                                    }
                                });
                    		}
                    		res.redirect("/cliente/clientesupplier/supplier_home");
                    	}
                        
                    }
                    
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
       
});


/* GET users listing. */
router.get('/', function(req, res) {
	var userData=req.session.usuario;
	clientes.find({}, function(err, dataClientes){
		if(err){
			console.log(err); 
		}
		else{
			
			fornecedores.find({}, function(err, dataFornecedores){
				if(err){
					console.log(err); 
				}
				else{
					//console.log(dataFornecedores);
					res.render('client_supplier_menu', { DataU:userData,Cliente:dataClientes, Fornecedor:dataFornecedores ,title: 'COMSERV' });
				}
			});
		}
			 
	});
 
});

router.get('/clientesupplier/:name', function(req, res) {
	var userData=req.session.usuario;
	var name = req.params.name;

	if(name == "client_home"){
		clientes.find({}, function(err, dataClientes){
			if(err){
				console.log(err); 
			}else{
				// console.log(dataClientes); 
				res.render('cliente_home', { DataU:userData, Cliente:dataClientes,title: 'EagleI' });
			}
		}).sort({cliente_nome:1});
	}else{
		fornecedores.find({}, function(err, dataFornecedores){
			if(err){
				console.log(err); 
			}
			else{
				// console.log(dataFornecedores);
				res.render('fornecedor_home', { DataU:userData, Fornecedor:dataFornecedores ,title: 'EagleI' });
			}
		}).sort({cliente_nome:1});
	}
 
});


router.get("/detalhesClienteshvac/:id",  function(req, res){
	var userData= req.session.usuario;

	clienteshvac.find({_id:req.params.id}, function(err, dataClientes){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("clientehvac_details", {DataU:userData, Cliente:dataClientes, title: 'EagleI'});
		}
	});

});

router.get('/clienteshvac', function(req, res) {
	var userData=req.session.usuario;
    console.log("jjjjjjjjjjj");
	var name = req.params.name;
	console.log(name);
		clienteshvac.find({}, function(err, dataClientes){
			if(err){
				console.log("errou aqui");
				console.log(err); 
			}else{
				console.log(dataClientes);
				console.log("yaaaa");
				res.render('clientehvac_home', { DataU:userData, Cliente:dataClientes,title: 'EagleI' });
			}
		}).sort({cliente_nome:1});
});


router.get("/editarClientehvac/:id", async function(req, res){
	var userData= await req.session.usuario;
    var flag = "true";
    var admin_case= await admin_db.find({});
    
	clienteshvac.find({_id:req.params.id}, function(err, dataCliente){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
            console.log(admin_case);
			res.render("clientehvac_editar", {DataU:userData, AdMagen:admin_case, Signal:flag, Cliente:dataCliente, title: 'EagleI'});
		}
	});

});

router.get("/criarcliente", async(req, res)=>{
    var userData= await req.session.usuario;
    var flag = "false";
    var admin_case=await admin_db.find({});
    res.render("criar_cliente_hvac", {DataU:userData, AdMagen:admin_case, Signal:flag, title:"eagleI"});
});

router.get("/novafilial/:id", async(req, res)=>{
    var userData= await req.session.usuario;
    var flag = "true";
    console.log(flag, "Aqui");
    var admin_case=await admin_db.find({});
    var clinet=await clienteshvac.find({_id:req.params.id});

    var viaturd =await viaturas_db.find({}).sort({matricula:1});
    res.render("hvac_filial", {DataU:userData, AdMagen:admin_case, Signal:flag, Clientes:clinet, title:"eagleI"})

});

router.get('/filialclimatizacao/:id', function(req, res){
    var userData=req.session.usuario;
    var id = req.params.id;
    console.log(id, "este");
    clienteshvac.find({_id:id}, function(err, data){
        if (err) {
            console.log("erro ao encontrar o cliente", err);
        } else {
            console.log("encontrou");
            res.render('filialhvac_home', {DataU:userData, Cliente:data, title:'EagleI'})
        }
    });
});

router.get("/detalhesFilialhvac/:id/:index",  function(req, res){
	var userData= req.session.usuario;
    var index = req.params.index;

	clienteshvac.find({_id:req.params.id}, function(err, dataClientes){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("filialhvac_details", {DataU:userData, Cliente:dataClientes, Posicao:index ,title: 'EagleI'});
		}
	});

});

router.post("/updateClienteHvac/:id", upload.any(), async function(req, res){
	var userData= await req.session.usuario;
    var clientid = await req.params.id;
    var cliente = await req.body;

    clienteshvac.updateOne({_id:clientid}, {$set:{nome_cliente:cliente.nome_cliente, numero_primavera:cliente.numero_primavera, regiao:cliente.regiao, provincia:cliente.provincia, rua:cliente.rua}}, function(err, data){
        if (err) {
            console.log("Nao actualizado");
        } else {
            console.log("Cliente Actualizado");            
        }
    });

});

router.get("/editarFilialhvac/:id/:index", async function(req, res){
	var userData= req.session.usuario;
    var index = req.params.index;
    var admin_case= await admin_db.find({});

	clienteshvac.find({_id:req.params.id}, function(err, dataClientes){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("filialhvac_editar", {DataU:userData, Cliente:dataClientes, Pessoacontacto: JSON.stringify(dataClientes[0].pessoa_contactoArray) , Posicao:index , AdMagen:admin_case, title: 'EagleI'});
		}
	});

});

router.post("/updateFilialHvac/:id/:index", upload.any(), async function(req, res){
	var userData= await req.session.usuario;
    var clientid = await req.params.id;
    var index = await req.params.index;
    var filial = await req.body;
    var filialId = await filial.filialId;
    var pessoaContacto;
    console.log(clientid);
    console.log(filial);
    console.log(index);
    
    
    var pca = JSON.parse(filial.pessoasContacto_Array);
    console.log("pca",pca, typeof(pca));

    var pessoa_contactoArray = await [];
    
    if(Array.isArray(filial.pessoacontacto_nome)){
        for(var i = 0; i < filial.pessoacontacto_nome.length; i++){
            var pessoa_contactoObject = await {};
            
            pessoa_contactoObject.filial_id = await filialId;
            pessoa_contactoObject.filial_nome = await filial.filial_nome;
            pessoa_contactoObject.pessoacontacto_nome = await filial.pessoacontacto_nome[i];
            pessoa_contactoObject.pessoacontacto_telefone = await filial.pessoacontacto_telefone[i];
            pessoa_contactoObject.pessoacontacto_email = await filial.pessoacontacto_email[i];
            
            pessoa_contactoArray.push(pessoa_contactoObject);
        }
    }else{
        if(filial.pessoacontacto_nome != undefined){
            var pessoa_contactoObject = await {};
            pessoa_contactoObject.filial_id = await filialId;
            pessoa_contactoObject.filial_nome = await filial.filial_nome;
            pessoa_contactoObject.pessoacontacto_nome = await filial.pessoacontacto_nome;
            pessoa_contactoObject.pessoacontacto_telefone = await filial.pessoacontacto_telefone;
            pessoa_contactoObject.pessoacontacto_email = await filial.pessoacontacto_email;
            
            pessoa_contactoArray.push(pessoa_contactoObject);
        }
    }   
        console.log("pessoa_contactoArray", pessoa_contactoArray, typeof(pessoa_contactoArray));

        pessoaContacto = pca.concat(pessoa_contactoArray);
        console.log("pessoaContacto",pessoaContacto,typeof(pessoaContacto));

    console.log("unica cena",pessoa_contactoArray);
            
    clienteshvac.updateOne({'filial._id':filialId}, {$set:{"filial.$.nome":filial.filial_nome, "filial.$.regiao":filial.regiao, "filial.$.provincia":filial.provincia, "filial.$.rua":filial.rua, "filial.$.bairro":filial.bairro, "filial.$.numero":filial.numero, "filial.$.lat":filial.lat, "filial.$.long":filial.long}}, function(err, data){
        if (err) {
            console.log(err);
        } else {
            clienteshvac.updateOne({nome_cliente:filial.nome_cliente}, {$set:{pessoa_contactoArray:pessoaContacto}}, function(err,datafili){
                if (err) {
                    console.log("Nao deu certo");
                } else {
                    console.log("Ja dzomou");
                    console.log("Pessoa de contacto")
                    if(index == 0){
                        clienteshvac.updateOne({nome_cliente:filial.nome_cliente}, {$set:{regiao:filial.regiao, provincia:filial.provincia, rua:filial.rua, bairro:filial.bairro, numero_cliente:filial.numero}}, function(err, datacliente){
                            if (err) {
                                console.log("Informação do cliente não actualizada");
                            } else {
                                console.log("Informação do cliente actualizada com sucesso!");
                            }
                        })
                    }
                }
            })
        }
    });

});

router.get("/novo/:tipoform",  function(req, res){
	var userData= req.session.usuario;
	var escolha = req.params.tipoform;

	if(escolha == "cliente"){
		clientes.find({}, function(err, dataClientes){
			if(err){
				console.log(err); 
			}else{
				res.render("cliente_form", {DataU:userData, MostrarOpt:escolha , DadosSupCl:JSON.stringify(dataClientes), title: 'EagleI'})
			}
		});
	}else{
		fornecedores.find({}, function(err, dataFornecedores){
			if(err){
				console.log(err); 
			}else{
				res.render("fornecedor_form", {DataU:userData, MostrarOpt:escolha, DadosSupCl:JSON.stringify(dataFornecedores), title: 'EagleI'})
			}
		})
	}

	
});

router.get("/detalhesClientes/:id",  function(req, res){
	var userData= req.session.usuario;

	clientes.find({_id:req.params.id}, function(err, dataClientes){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("cliente_form", {DataU:userData, Cliente:dataClientes, title: 'EagleI'});
		}
	});

});

router.get("/detalhesFornecedores/:id",  function(req, res){
	var userData= req.session.usuario;

	fornecedores.find({_id:req.params.id}, function(err, dataFornecedores){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("fornecedor_form", {DataU:userData, Fornecedor:dataFornecedores, title: 'EagleI'});
		}
	});

});

router.get("/editarCliente/:id",  function(req, res){
	var userData= req.session.usuario;
	

	clientes.find({_id:req.params.id}, function(err, dataCliente){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			clientes.find({}, function(err, dataClientes){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}
				else{
					// console.log(dataClientes);
					res.render("cliente_form", {DataU:userData, Cliente:dataCliente, DadosClientes:JSON.stringify(dataClientes), referenciaCliente:req.params.id, title: 'EagleI'});
				}
			});

			
		}
	});

});

router.post("/editarCliente/:id", upload.any(), function(req, res){

	var userData= req.session.usuario;
	var cliente = req.body;
	cliente.clienteeditadopor=req.session.usuario.nome;
	var temp = JSON.parse(cliente.contactosArrayCliente);
	cliente.contactosArrayCliente = temp;


	

	clientes.update({_id:req.params.id}, {$set:{clienteeditadopor:cliente.clienteeditadopor, dataedicaocliente:cliente.dataedicaocliente, cliente_cod:cliente.cliente_cod, cliente_nome:cliente.cliente_nome, cliente_filial:cliente.cliente_filial, cliente_nuit:cliente.cliente_nuit, cliente_telefone:cliente.cliente_telefone, cliente_web:cliente.cliente_web, cliente_outros:cliente.cliente_outros, cliente_endfisico:cliente.cliente_endfisico, cliente_bairrofisico:cliente.cliente_bairrofisico, cliente_cidadefisico:cliente.cliente_cidadefisico, cliente_provinciafisico:cliente.cliente_provinciafisico, cliente_codpostalfisico:cliente.cliente_codpostalfisico, cliente_paisfisico:cliente.cliente_paisfisico, cliente_endpostal:cliente.cliente_endpostal, cliente_bairropostal:cliente.cliente_bairropostal, cliente_cidadepostal:cliente.cliente_cidadepostal, cliente_provinciapostal:cliente.cliente_provinciapostal, cliente_codpostalpostal:cliente.cliente_codpostalpostal, cliente_paispostal:cliente.cliente_paispostal, contactosArrayCliente:cliente.contactosArrayCliente}}, function(err, dataClientes){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.redirect("/inicio");
		}
	});

});

router.get("/editarFornecedor/:id",  function(req, res){
	var userData= req.session.usuario;

	fornecedores.find({_id:req.params.id}, function(err, dataFornecedor){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			fornecedores.find({}, function(err, dataFornecedores){
				if(err){
					console.log("ocorreu um erro ao tentar aceder os dados")
				}else{
					console.log(dataFornecedores);
					res.render("fornecedor_form", {DataU:userData, Fornecedor:dataFornecedor, DadosFornecedores:JSON.stringify(dataFornecedores), referenciaFornecedor:req.params.id, title: 'EagleI'});
				}
			});
			
		}
	});

});

router.post("/editarFornecedor/:id", upload.any(), function(req, res){

	var userData= req.session.usuario;
	var cliente = req.body;
	cliente.clienteeditadopor=req.session.usuario.nome;
	var temp = JSON.parse(cliente.contactosArrayCliente);
	cliente.contactosArrayCliente = temp;


	

	fornecedores.update({_id:req.params.id}, {$set:{clienteeditadopor:cliente.clienteeditadopor, dataedicaocliente:cliente.dataedicaocliente, fornecedor_cod:cliente.fornecedor_cod, cliente_nome:cliente.cliente_nome, cliente_filial:cliente.cliente_filial, cliente_nuit:cliente.cliente_nuit, cliente_telefone:cliente.cliente_telefone, cliente_web:cliente.cliente_web, cliente_outros:cliente.cliente_outros, cliente_endfisico:cliente.cliente_endfisico, cliente_bairrofisico:cliente.cliente_bairrofisico, cliente_cidadefisico:cliente.cliente_cidadefisico, cliente_provinciafisico:cliente.cliente_provinciafisico, cliente_codpostalfisico:cliente.cliente_codpostalfisico, cliente_paisfisico:cliente.cliente_paisfisico, cliente_endpostal:cliente.cliente_endpostal, cliente_bairropostal:cliente.cliente_bairropostal, cliente_cidadepostal:cliente.cliente_cidadepostal, cliente_provinciapostal:cliente.cliente_provinciapostal, cliente_codpostalpostal:cliente.cliente_codpostalpostal, cliente_paispostal:cliente.cliente_paispostal, cliente_termos:cliente.cliente_termos, contactosArrayCliente:cliente.contactosArrayCliente}}, function(err, dataFornecedores){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.redirect("/inicio");
		}
	});

});

router.post("/novo", upload.any(),  function(req, res){

	var userData= req.session.usuario;
	var cliente = req.body
	cliente.clienteregistadopor=req.session.usuario.nome;
	cliente.contactosArrayCliente = JSON.parse(req.body.contactosArrayCliente);
	cliente.clienteeditadopor =  "";
	cliente.dataedicaocliente =  "";
	
	

	clientes.gravarDados(cliente, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}else{
			console.log("dados gravados com sucesso!!");
		}
	});

	res.redirect("/inicio");

});

router.post("/novofornecedor", upload.any(), function(req, res){

	var userData= req.session.usuario;
	var fornecedor = req.body;
	fornecedor.clienteregistadopor=req.session.usuario.nome;
	fornecedor.contactosArrayCliente = JSON.parse(req.body.contactosArrayCliente);
	fornecedor.clienteeditadopor =  "";
	fornecedor.dataedicaocliente =  "";
	console.log(req.files);

	var directorio = '/Documentos_Fornecedores/';

	if (req.files) {

		var comprimento = req.files.length;

		for (var i = 0; i < comprimento; i++) {

			if (req.files[i].fieldname == "carta_apresentacao_empresa") {
                fornecedor.carta_apresentacao_empresa = directorio + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "alvara") {
                fornecedor.alvara = directorio + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "certidao_entidades_legais") {
                fornecedor.certidao_entidades_legais = directorio + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "nuit") {
                fornecedor.nuit = directorio + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "nuel") {
                fornecedor.nuel = directorio + req.files[i].filename;
                continue;
            }

            if (req.files[i].fieldname == "carta_confirmacao_banco") {
                fornecedor.carta_confirmacao_banco = directorio + req.files[i].filename;
                continue;
            }
		}
	}

	fornecedores.gravarDados(fornecedor, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}else{
			console.log("dados gravados com sucesso!!");
		}
	});

	res.redirect("/inicio");

});

router.post("/downloaddocumento", upload.any(), function(req, res){
	console.log(req.body)
	res.download("./public"+req.body.documento)
})


module.exports = router;
