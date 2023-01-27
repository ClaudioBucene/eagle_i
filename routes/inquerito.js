var express = require('express');
var router = express.Router();
var respostass = require("../entities/respostasinquerito.js");
var multer  = require('multer');
var path = require("path");
let ejs = require("ejs");
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

	
	respostass.find({}, function(err, data){
		if(err){
			console.log("ocorreu um erro ao tentar aceder os dados")
		}
		else{
			res.render("inquerito_home", {DataU:userData, Respostas:data, title: 'EagleI'});
		}
	});
 
});

router.get('/novo', function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;

	res.render("inquerito_form", {DataU:userData, NomeSession: userData.nome, title: 'EagleI'});
 
});

router.post("/novo",  upload.any(), function(req, res){
		var userData= req.session.usuario;
		var inqueritorespostas = req.body;
		inqueritorespostas.anexo = JSON.parse(req.body.anexo);



		respostass.gravarDados(inqueritorespostas, function(err, data){
	        if(err){
	        	console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
				console.log(err); 
	        }else{
	            console.log("dados gravados com sucesso!!");
	            res.redirect("/inicio");
	        }
	    });

		
		
		

	});

router.get('/imprimirFormulario/:id', function(req, res) {
	var userData=req.session.usuario;
	var nome = userData.nome;

	respostass.find({_id:req.params.id}, function(err, dataRepostas){
		if(err){
            console.log(err); 
        }else{
        	ejs.renderFile(path.join(__dirname, '../views/', "report-template.ejs"), {Respostas: dataRepostas}, function(err, data){

                if (err) {
                    res.send(err);
                } else {
                     let options = {
                        // "height": "11.25in",
                        // "width": "8.5in",
                        "format": "Letter",
                        "orientation": "portrait",
                        
                        // "border":"0"
                        "border": {
                            "top": "0cm",
                            "right": "2.54cm",
                            "bottom": "0cm",
                            "left": "1.76cm"
                        },
                        paginationOffset: 1,
                        "header": {
                            "height": "20mm"
                        },
                        "footer": {
                            "height": "20mm",
                        }

                    };

                    var datetimestamp = dataRepostas[0].data;
                    pdf.create(data, options).toFile("./public/Inqueritos/Inquerito_"+ nome +".pdf", function (err, data) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.download("./public/Inqueritos/Inquerito_"+ nome +".pdf");
                        }
                    });
                }
    

            });
        }
	});
 
});

module.exports = router;
