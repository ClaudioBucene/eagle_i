var express=require("express")
var router=express.Router();
// var pettycashops = require("../entities/pettycashcontrol.js");
var pettycashops = require("../entities/pettycashoperations.js");
var usuarios= require("../entities/usuario.js");
var numeral   = require('numeral');
var multer  = require('multer');
var path = require("path");
let ejs = require("ejs");
// let pdf = require("html-pdf");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var multer = require('multer');
var path = require("path");
require("../scheduled/pettycashcontrol_schedule.js");

var xl = require('excel4node');

                // setTimeout(async function(){
                    
                //     var procura = await pettycashops.find({pettycash_credito:"-"}, function(err, dta){
                //          if(err){
                //              console.log("ocorreu "+err)
                //          }else{
                //              console.log("done")
                //          }

                //      });
                //     console.log(procura.length)

                //     for(let [i,test] of procura.entries()){

                //         if(procura[i].pettycash_verify.length == 2){
                //             var auditObject = {};

                //             auditObject.audittrail_username = "Amancio Mazivila";
                //             auditObject.auditrail_action = "Refuse Pettycash Operation";
                //             auditObject.auditrail_date = procura[i].pettycash_data;

                            

                //             pettycashops.update({_id:procura[i]._id}, {$push:{"pettycash_audittrail":auditObject}}, {upsert:false, multi:false}, function(err, dta){
                //                  if(err){
                //                      console.log("ocorreu "+err)
                //                  }else{
                //                      console.log("Actualizado")
                //                  }

                //              });
                //         }

                //     }

                // }, 1000)

//Config. to excel file
// var wb = new xl.Workbook();
// var ws = wb.addWorksheet('Sheet 1');
// //set column width
// ws.column(1).setWidth(8);
// ws.column(2).setWidth(20);
// ws.column(3).setWidth(25);
// ws.column(4).setWidth(20);
// ws.column(5).setWidth(20);
// ws.column(6).setWidth(20);
// ws.column(7).setWidth(28);
// ws.column(8).setWidth(25);
// ws.column(9).setWidth(18);
// ws.column(10).setWidth(28);

// // ws.column(1).setWidth(8);
// // ws.column(2).setWidth(13);
// // ws.column(3).setWidth(28);
// // ws.column(6).setWidth(15);
// // ws.column(7).setWidth(20);
// // ws.column(5).setWidth(28);
// // ws.column(4).setWidth(13);

// //add image
// ws.addImage({
//   path: './public/img/logo.png',
//   type: 'picture',
//   position: {
//     type: 'twoCellAnchor',
//     from: {
//       col: 1,
//       colOff: 0,
//       row: 1,
//       rowOff: 0,
//     },
//     to: {
//       col: 4,
//       colOff: 0,
//       row: 6,
//       rowOff: 0,
//     },
//   },
// });

// var style = wb.createStyle({
//   font: {
//     color: '000000',
//     size: 12,
//   },
//   alignment:{
//     horizontal:'center',
//     vertical:'center'
//   }
// });


// var style1 = wb.createStyle({
//   font: {
//     color: '000000',
//     size: 12,
//   },
//   alignment:{
//     horizontal:'left',
//     vertical:'center',
//     shrinkToFit:true,
//     wrapText:true
//   }
// });

// //title style
// var style2 = wb.createStyle({
//   font: {
//     color: '000000',
//     size: 14,
//   },
//   alignment:{
//     horizontal:'left',
//     vertical:'center',
//     shrinkToFit:true,
//     wrapText:true
//   }
// });

// var style3 = wb.createStyle({
//   font: {
//     color: '000000',
//     size: 13,
//   },
//   alignment:{
//     horizontal:'left',
//     vertical:'center',
//     shrinkToFit:true,
//     wrapText:true
//   }
// });

// var style4 = wb.createStyle({
//   font: {
//     color: '000000',
//     size: 12,
//   },
//   border:{
//     left:{
//         style:'thin',
//         color:'000000'
//     },

//     right:{
//         style:'thin',
//         color:'000000'
//     },

//     top:{
//         style:'thin',
//         color:'000000'
//     },

//     bottom:{
//         style:'thin',
//         color:'000000'
//     }
//   },

//   alignment:{
//     horizontal:'center',
//     vertical:'center',
//     shrinkToFit:true,
//     wrapText:true
//   }
// });

// var style5 = wb.createStyle({
//   font: {
//     color: '000000',
//     size: 12,
//   },
//   border:{
//     left:{
//         style:'thin',
//         color:'000000'
//     },

//     right:{
//         style:'thin',
//         color:'000000'
//     },

//     top:{
//         style:'thin',
//         color:'000000'
//     },

//     bottom:{
//         style:'thin',
//         color:'000000'
//     }
//   },

//   alignment:{
//     horizontal:'justify',
//     vertical:'center',
//     shrinkToFit:true,
//     wrapText:true
//   }
// });



var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            //console.log(file);
            var year = new Date().getFullYear();
    		var month = new Date().getMonth();

    		// if(month < 2){
    		// 	year = parseInt(year) - 1;
    		// }

            var dir = './public/Pettycash_Control/' + year;
            cb(null, dir);
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + "_"+Date.now() + file.originalname);
        }
    })
});

/*Exportar os dados dos ficheiros excel*/
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/PettyCash')
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
        var userData = req.session.usuario;
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
                }, async function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    else{
                        console.log(result)
                        // verificar a compatibiliade do ficheiro

                        if((result[0].nome != undefined) && (result[0].saldocarregar != undefined) && (result[0].plafond != undefined)){

                            // verificar se a coleccao pettycashop esta vazia ou nao

                            var procura =  await pettycashops.find({}, function(err, data){
                                if(err)
                                    console.log(err)
                                else{
                                    console.log("Utilzador encontrado");
                                }
                            });

                            if(procura.length == 0){
                                console.log("vazio")

                                for(let [i,test] of result.entries()){

                                    // encontrar o ultimo saldo do user
                                    var nome = result[i].nome;
                                    var procura1 =  await usuarios.find({ nome:  nome}, function(err, data){
                                        if(err)
                                            console.log(err)
                                        else{
                                            console.log("Utilzador encontrado");
                                        }
                                    });

                                    // console.log(procura1.length)

                                    if(procura1.length != 0){

                                        
                                        var procura2 =  await pettycashops.find({ pettycashuser_nome: nome}, function(err, data){
                                            if(err)
                                                console.log(err)
                                            else{
                                                console.log("Utilzador encontrado");
                                            }
                                        }).sort({_id:-1});

                                        //criar a data
                                        var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
                                        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
                                        var anoFiscal = (new Date()).getFullYear();
                                        var ano = (new Date()).getFullYear();

                                        if(parseInt(mes) < 2 ){
                                            anoFiscal = anoFiscal - 1;
                                        }
                                        
                                        //Objecto do pettycashop
                                        var pettycashObject = {};
                                        
                                        pettycashObject.pettycashuser_code = procura1[0].user_code;
                                        pettycashObject.pettycashuser_nome = procura1[0].nome;
                                        pettycashObject.pettycashuser_region = procura1[0].regiao;
                                        pettycashObject.pettycash_anoFiscal = anoFiscal;
                                        pettycashObject.pettycash_ano = ano;
                                        pettycashObject.pettycash_mes = parseInt(mes);
                                        pettycashObject.pettycash_data = dia + "/" + mes + "/" + ano;
                                        pettycashObject.pettycash_credito = numeral(result[i].plafond).format('0,0.00');
                    
                                        pettycashObject.pettycash_debito = "-";

                                        if(procura2.length == 0){
                                            pettycashObject.pettycash_saldo = numeral(result[i].plafond).format('0,0.00');
                                        }else{

                                            var credito = numeral(result[i].plafond);
                                            var saldodisponivel = numeral(procura2[0].pettycash_saldo);
                                            var saldoActualizado = saldodisponivel.value() + credito.value();
                                            var saldoAct = numeral(saldoActualizado).format('0,0.00');

                                            pettycashObject.pettycash_saldo = saldoAct;

                                        }

                                        pettycashObject.pettycash_notas = "";
                                        pettycashObject.pettycash_purchase = [];
                                        pettycashObject.pettycash_verify = [1];
                                        pettycashObject.pettycash_verifyReason = [];

                                        // audit trail info
                                        var audittrailObject = {};

                                        audittrailObject.audittrail_username = userData.nome;
                                        audittrailObject.auditrail_action = "Credit Operation";
                                        audittrailObject.auditrail_date = dia + "/" + mes + "/" + ano;

                                        var audittrailArray = [];
                                        audittrailArray.push(audittrailObject);
                                        pettycashObject.pettycash_audittrail = audittrailArray;



                                        pettycashops.gravarDados(pettycashObject, function(err){
                                            if(err){
                                                console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                                console.log(err)
                                            }
                                            else{
                                                console.log('add novo petty cash');
                                            }
                                        });  
                                    }
                                }

                            }else{

                                console.log("existem documentos")

                                for(let [i,test] of result.entries()){

                                    // encontrar o ultimo saldo do user
                                    var nome = result[i].nome;
                                    var procura1 =  await usuarios.find({ nome:  nome}, function(err, data){
                                        if(err)
                                            console.log(err)
                                        else{
                                            console.log("Utilzador encontrado");
                                        }
                                    });

                                    // console.log(procura1.length)

                                    if(procura1.length != 0){

                                        
                                        var procura2 =  await pettycashops.find({ pettycashuser_nome: nome}, function(err, data){
                                            if(err)
                                                console.log(err)
                                            else{
                                                console.log("Utilzador encontrado");
                                            }
                                        }).sort({_id:-1});

                                        //criar a data
                                        var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
                                        var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
                                        var anoFiscal = (new Date()).getFullYear();
                                        var ano = (new Date()).getFullYear();

                                        if(parseInt(mes) < 2 ){
                                            anoFiscal = anoFiscal - 1;
                                        }
                                        
                                        //Objecto do pettycashop
                                        var pettycashObject = {};
                                        
                                        pettycashObject.pettycashuser_code = procura1[0].user_code;
                                        pettycashObject.pettycashuser_nome = procura1[0].nome;
                                        pettycashObject.pettycashuser_region = procura1[0].regiao;
                                        pettycashObject.pettycash_anoFiscal = anoFiscal;
                                        pettycashObject.pettycash_ano = ano;
                                        pettycashObject.pettycash_mes = parseInt(mes);
                                        pettycashObject.pettycash_data = dia + "/" + mes + "/" + ano;
                                        pettycashObject.pettycash_credito = numeral(result[i].saldocarregar).format('0,0.00');
                    
                                        pettycashObject.pettycash_debito = "-";

                                        if(procura2.length == 0){
                                            pettycashObject.pettycash_saldo = numeral(result[i].saldocarregar).format('0,0.00');
                                        }else{

                                            var credito = numeral(result[i].saldocarregar);
                                            var saldodisponivel = numeral(procura2[0].pettycash_saldo);
                                            var saldoActualizado = saldodisponivel.value() + credito.value();
                                            var saldoAct = numeral(saldoActualizado).format('0,0.00');

                                            pettycashObject.pettycash_saldo = saldoAct;

                                        }

                                        pettycashObject.pettycash_notas = "";
                                        pettycashObject.pettycash_purchase = [];
                                        pettycashObject.pettycash_verify = [1];
                                        pettycashObject.pettycash_verifyReason = [];


                                        // audit trail info
                                        var audittrailObject = {};

                                        audittrailObject.audittrail_username = userData.nome;
                                        audittrailObject.auditrail_action = "Credit Operation";
                                        audittrailObject.auditrail_date = dia + "/" + mes + "/" + ano;

                                        var audittrailArray = [];
                                        audittrailArray.push(audittrailObject);
                                        pettycashObject.pettycash_audittrail = audittrailArray;



                                        pettycashops.gravarDados(pettycashObject, function(err){
                                            if(err){
                                                console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                                console.log(err)
                                            }
                                            else{
                                                console.log('add novo petty cash');
                                            }
                                        });  
                                    }
                                }

                            }

                        }


                        res.redirect("/pettycash/accountbalance_home");      
                        
                    }
                    
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
       
});

router.get("/menupettycash", function(req, res){
    var userData = req.session.usuario;
    var nome = userData.nome;

    
        res.render('pettycash_menu', { DataU:userData,title: 'EagleI' });
    
});

router.get("/accountbalance_home", function(req, res){

    var userData = req.session.usuario;
    var nome = userData.nome;

        if ((nome == "Amancio Mazivila") || (nome == "Luis Brazuna") || (userData.nivel_acesso == "admin")){

            pettycashops.find({pettycash_debito:"-"}, function(err, data){
                if(err)
                    console.log(err)
                else{
                    // console.log(data.length);
                    res.render('pettycashbalance_home', { DataU:userData, DadosPettyCash:data,title: 'EagleI' });
                }
            }).sort({_id:-1});
        }else{
            pettycashops.find({pettycashuser_nome:nome, pettycash_debito:"-"}, function(err, data){
                if(err)
                    console.log(err)
                else{
                    res.render('pettycashbalance_home', { DataU:userData, DadosPettyCash:data,title: 'EagleI' });
                }
            }).sort({_id:-1});

        }
        
});


// router.get("/accountcontrol_home", function(req, res){

//     var userData = req.session.usuario;
//     var nome = userData.nome;

//     if ((userData.departamento == "Finanças") || (nome == "Luis Brazuna") || (userData.nivel_acesso == "admin")){

//         pettycashops.find({}, function(err, data) {
//             if (err)
//                 console.log(err);
            
//             else {
//                 pettycashops.aggregate([{$group:{_id:{"ano":"$pettycash_anoFiscal", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.ano", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:-1}}], function (err, dataAnoMes) {
//                     if(err){      
//                         console.log("ocorreu um erro ao tentar aceder os dados")
//                     }else{
                        
//                         for(var j = 0; j < dataAnoMes.length; j++){
//                             dataAnoMes[j].listames.sort(compararNumeros);
                            
//                         }

//                         function compararNumeros(a, b) {
//                             return a - b;
//                         }

//                         pettycashops.aggregate([{$group:{_id:"$pettycashuser_nome"}}, {$sort:{_id:1}}], function (err, dataColaboradores) {

//                             if (err)
//                                 console.log(err);
//                             else{
//                                 // pettycashops.aggregate([{$group:{_id:{"nome":"$pettycashuser_nome", "ano":"$pettycash_anoFiscal"}}}, {$group :{_id:"$_id.nome", "listaanos":{$push:{ano:"$_id.ano"}}}}, {$sort:{_id:1}}], function (err, dataNomeAnoMes) {
//                                 pettycashops.aggregate([{$group:{_id:{"nome":"$pettycashuser_nome", "ano":"$pettycash_anoFiscal"}, "mes":{$push:"$pettycash_mes"}}}, {$group :{_id:"$_id.nome", "listaanos":{$push:{ano:"$_id.ano", listames:"$mes"}}}}, {$sort:{_id:1}}], function (err, dataNomeAnoMes) {

//                                     if (err)
//                                         console.log(err);
//                                     else{

//                                         // console.log(dataNomeAnoMes[0])
//                                         res.render("pettycash_home", {DataU:userData, Pettycash:data, Colaboradores:JSON.stringify(dataColaboradores), AnosMeses:JSON.stringify(dataAnoMes), NomesAnosMeses:JSON.stringify(dataNomeAnoMes),title:"COMSERV"});
//                                     }

//                                 });
                                
                           
//                             }

//                         });

                        
//                     }
//                 });                   
                
//             }
//         });

//     }else
//         if(userData.nivel_acesso == "normal"){
//             pettycashops.find({pettycashuser_nome:nome}, function(err, data) {
//                 if (err)
//                     console.log(err);
//                 else {
//                     pettycashops.aggregate([{ $match: {pettycashuser_nome:nome}}, {$group:{_id:{"ano":"$pettycash_anoFiscal", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.ano", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:-1}}], function (err, dataAnoMes) {
//                         if(err){
//                             console.log("ocorreu um erro ao tentar aceder os dados")
//                         }else{
//                             for(var j = 0; j < dataAnoMes.length; j++){
//                             dataAnoMes[j].listames.sort(compararNumeros);
                            
//                         }

//                         function compararNumeros(a, b) {
//                             return a - b;
//                         }
//                             // console.log(dataAnoMes);
//                             var dataColaboradores = [{_id:userData.nome}];
//                             var dataNomeAnoMes = [];

//                             res.render("pettycash_home", {DataU:userData, Pettycash:data, Colaboradores:JSON.stringify(dataColaboradores), AnosMeses:JSON.stringify(dataAnoMes), NomesAnosMeses:JSON.stringify(dataNomeAnoMes),title:"COMSERV"});
//                         }
//                     });
//                 }
//             });
//         }

// });

router.get("/accountcontrol_home", function(req, res){

    var userData = req.session.usuario;
    var nome = userData.nome;

    if ((nome == "Amancio Mazivila") || (nome == "Luis Brazuna") || (userData.nivel_acesso == "admin")){

        pettycashops.find({pettycash_credito:"-"}, function(err, data) {
            if (err)
                console.log(err);
            
            else {
                // console.log(data);
                pettycashops.aggregate([{$group:{_id:{"ano":"$pettycash_anoFiscal", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.ano", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:1}}], function (err, dataAnoMes) {
                    if(err){      
                        console.log("ocorreu um erro ao tentar aceder os dados")
                    }else{
                        // console.log(dataAnoMes);
                        for(var j = 0; j < dataAnoMes.length; j++){
                            dataAnoMes[j].listames.sort(compararNumeros);
                            
                        }

                        function compararNumeros(a, b) {
                            return a - b;
                        }

                        pettycashops.aggregate([{$group:{_id:{"nome":"$pettycashuser_nome", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.nome", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:1}}], function (err, dataColaboradoresMes) {

                            if (err)
                                console.log(err);
                            else{
                                

                                for(var k = 0; k < dataColaboradoresMes.length; k++){
                                    dataColaboradoresMes[k].listames.sort(compararNumeros1);
                            
                                }

                                function compararNumeros1(a, b) {
                                    return a - b;
                                }
                                // console.log(dataColaboradoresMes);
                                
                                pettycashops.aggregate([{$group:{_id:{"nome":"$pettycashuser_nome", "ano":"$pettycash_anoFiscal"}, "mes":{$addToSet:"$pettycash_mes"}}}, {$group :{_id:"$_id.nome", "listaanos":{$push:{ano:"$_id.ano", listames:"$mes"}}}}, {$sort:{_id:1}}], function (err, dataNomeAnoMes) {

                                    if (err)
                                        console.log(err);
                                    else{

                                        for(var z = 0; z < dataNomeAnoMes.length; z++){

                                            dataNomeAnoMes[z].listaanos.sort(compararObjects);
                                            

                                            for(var y = 0; y < dataNomeAnoMes[z].listaanos.length; y++){

                                                dataNomeAnoMes[z].listaanos[y].listames.sort(compararNumeros1);
                                            }
                            
                                        }

                                        function compararObjects(a, b) {
                                            const anoA = parseInt(a.ano);
                                            const anoB = parseInt(b.ano);

                                            return anoA - anoB;

                                        }


                                        pettycashops.aggregate([{$group:{_id:"$pettycash_mes"}}, {$sort:{_id:1}}], function (err, dataMeses) {
                                            if (err){
                                                console.log(err);
                                            }
                                            else{
                                                // console.log(dataMeses);
                                                res.render("pettycash_home", {DataU:userData, Pettycash:data, ColaboradoresMes:JSON.stringify(dataColaboradoresMes), Meses:JSON.stringify(dataMeses), AnosMeses:JSON.stringify(dataAnoMes), NomesAnosMeses:JSON.stringify(dataNomeAnoMes),title:"EagleI"});

                                            }


                                        });
                                        
                                    }

                                });
                                
                           
                            }

                        });

                        
                    }
                });                   
                
            }
        }).sort({_id:-1});

    }else
        if(userData.nivel_acesso == "normal"){
            pettycashops.find({pettycashuser_nome:nome, pettycash_credito:"-"}, function(err, data) {
                if (err)
                    console.log(err);
                else {
                    // console.log(data);
                    pettycashops.aggregate([{$match:{pettycashuser_nome: nome}}, {$group:{_id:{"ano":"$pettycash_anoFiscal", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.ano", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:1}}], function (err, dataAnoMes) {
                        if(err){
                            console.log("ocorreu um erro ao tentar aceder os dados")
                        }else{
                            for(var j = 0; j < dataAnoMes.length; j++){
                                dataAnoMes[j].listames.sort(compararNumeros);
                            
                            }

                            function compararNumeros(a, b) {
                                return a - b;
                            }
                            console.log(dataAnoMes);
                            
                            var dataColaboradoresMes = [];

                            pettycashops.aggregate([{$group:{_id:"$pettycash_mes"}}, {$sort:{_id:1}}], function (err, dataMeses) {
                                if (err){
                                    console.log(err);
                                }
                                else{

                                    var dataNomeAnoMes = [];
                                    res.render("pettycash_home", {DataU:userData, Pettycash:data, ColaboradoresMes:JSON.stringify(dataColaboradoresMes), Meses:JSON.stringify(dataMeses), AnosMeses:JSON.stringify(dataAnoMes), NomesAnosMeses:JSON.stringify(dataNomeAnoMes),title:"COMSERV"});
                                }
                            });

                            
                        }
                    });
                }
            });
        }

});

router.get('/printreportall/:colaborador', function(req, res) {

    var userData = req.session.usuario;

    var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
//set column width
ws.column(1).setWidth(8);
ws.column(2).setWidth(20);
ws.column(3).setWidth(25);
ws.column(4).setWidth(20);
ws.column(5).setWidth(20);
ws.column(6).setWidth(20);
ws.column(7).setWidth(28);
ws.column(8).setWidth(25);
ws.column(9).setWidth(18);
ws.column(10).setWidth(28);

// ws.column(1).setWidth(8);
// ws.column(2).setWidth(13);
// ws.column(3).setWidth(28);
// ws.column(6).setWidth(15);
// ws.column(7).setWidth(20);
// ws.column(5).setWidth(28);
// ws.column(4).setWidth(13);

//add image
ws.addImage({
  path: './public/img/logo.png',
  type: 'picture',
  position: {
    type: 'twoCellAnchor',
    from: {
      col: 1,
      colOff: 0,
      row: 1,
      rowOff: 0,
    },
    to: {
      col: 4,
      colOff: 0,
      row: 6,
      rowOff: 0,
    },
  },
});

var style = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'center',
    vertical:'center'
  }
});


var style1 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

//title style
var style2 = wb.createStyle({
  font: {
    color: '000000',
    size: 14,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style3 = wb.createStyle({
  font: {
    color: '000000',
    size: 13,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style4 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'center',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style5 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'justify',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

    if( req.params.colaborador == "All"){

        pettycashops.find({}, function(err, data) {
            if (err)
                    console.log(err);
                else {
                    var contador = 12;

                    //Merge cells
                    ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                    ws.cell(7, 3).string("ALL").style(style1);
                    ws.cell(3, 5).string("Relatório / Report").style(style2);
                    ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                    ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                    ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                    ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                    ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                    ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                    ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                    ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                    ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                    ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                    
                    for(var j = 0; j < data.length; j++){

                        ws.cell(contador, 1).number(j+1).style(style4);
                        ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                        ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                        ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                        ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                        ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                        if(data[j].pettycash_purchase.length == 0){

                            ws.cell(contador, 7).string("-").style(style5);
                            ws.cell(contador, 8).string("-").style(style5);
                            ws.cell(contador, 9).string("-").style(style5);
                            ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                        }else{
                            ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                            ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                            ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                            ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                        }
                        
                        contador = contador + 1;
                    }



                    wb.write('Excel.xlsx', res);
                    
                    // res.render('index', { title: 'Express'});
                }
        }).sort({_id:1});
        
    }else{

        var nome = req.params.colaborador;
        var nome1 = nome.split("_")[0] + ' ' + nome.split("_")[1];

        pettycashops.find({pettycashuser_nome:nome1}, function(err, data) {
            if (err)
                    console.log(err);
                else {
                    var contador = 12;

                    //Merge cells
                    ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                    ws.cell(7, 3).string(data[0].pettycashuser_nome).style(style1);
                    ws.cell(3, 5).string("Relatório / Report").style(style2);
                    ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                    ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                    ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                    ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                    ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                    ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                    ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                    ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                    ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                    ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                    
                    for(var j = 0; j < data.length; j++){

                        ws.cell(contador, 1).number(j+1).style(style4);
                        ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                        ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                        ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                        ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                        ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                        if(data[j].pettycash_purchase.length == 0){

                            ws.cell(contador, 7).string("-").style(style5);
                            ws.cell(contador, 8).string("-").style(style5);
                            ws.cell(contador, 9).string("-").style(style5);
                            ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                        }else{
                            ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                            ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                            ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                            ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                        }
                        
                        contador = contador + 1;
                    }



                    wb.write('Excel.xlsx', res);
                    
                    // res.render('index', { title: 'Express'});
                }
        }).sort({_id:1});
    }



});

router.get('/printreportmonth/:colaborador/:rangeMonth', function(req, res) {

    var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
//set column width
ws.column(1).setWidth(8);
ws.column(2).setWidth(20);
ws.column(3).setWidth(25);
ws.column(4).setWidth(20);
ws.column(5).setWidth(20);
ws.column(6).setWidth(20);
ws.column(7).setWidth(28);
ws.column(8).setWidth(25);
ws.column(9).setWidth(18);
ws.column(10).setWidth(28);

// ws.column(1).setWidth(8);
// ws.column(2).setWidth(13);
// ws.column(3).setWidth(28);
// ws.column(6).setWidth(15);
// ws.column(7).setWidth(20);
// ws.column(5).setWidth(28);
// ws.column(4).setWidth(13);

//add image
ws.addImage({
  path: './public/img/logo.png',
  type: 'picture',
  position: {
    type: 'twoCellAnchor',
    from: {
      col: 1,
      colOff: 0,
      row: 1,
      rowOff: 0,
    },
    to: {
      col: 4,
      colOff: 0,
      row: 6,
      rowOff: 0,
    },
  },
});

var style = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'center',
    vertical:'center'
  }
});


var style1 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

//title style
var style2 = wb.createStyle({
  font: {
    color: '000000',
    size: 14,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style3 = wb.createStyle({
  font: {
    color: '000000',
    size: 13,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style4 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'center',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style5 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'justify',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

    var userData = req.session.usuario;

    var rangedate = req.params.rangeMonth.split('_');
    // console.log(rangedate)
    var mesfrom = parseInt(rangedate[0]);
    var mesto = parseInt(rangedate[2]);
    var mesmaior, mesmenor;
    var mesF;
    var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept','Oct', 'Nov', 'Dec'];

    if(mesfrom > mesto){

        mesmaior = mesfrom;
        mesmenor = mesto;

    }else{

        mesmaior = mesto;
        mesmenor = mesfrom;

    }

    if(mesfrom == mesto){
         mesF = meses[mesfrom-1];
    }else{
         mesF = meses[mesfrom-1] + " - " + meses[mesto-1];
    }
    

    if( req.params.colaborador == "All"){

        pettycashops.find({pettycash_mes:{$gte: mesmenor, $lte: mesmaior}}, function(err, data) {
            if (err)
                    console.log(err);
                else {
                    if(data.length != 0){
                            var contador = 12;
                            console.log(mesF)
                            //Merge cells
                            ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                            ws.cell(7, 3).string("ALL").style(style1);
                            ws.cell(6, 6).string("Mês").style(style3);
                            ws.cell(6, 7).string(mesF).style(style3);
                            ws.cell(3, 5).string("Relatório / Report").style(style2);
                            ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                            ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                            ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                            ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                            ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                            ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                            ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                            ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                            ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                            ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                            
                            for(var j = 0; j < data.length; j++){

                                ws.cell(contador, 1).number(j+1).style(style4);
                                ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                                ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                                ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                                ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                                ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                                if(data[j].pettycash_purchase.length == 0){

                                    ws.cell(contador, 7).string("-").style(style5);
                                    ws.cell(contador, 8).string("-").style(style5);
                                    ws.cell(contador, 9).string("-").style(style5);
                                    ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                                }else{
                                    ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                                    ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                                    ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                                    ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                                }
                                
                                contador = contador + 1;
                            }

                    }else{

                        ws.cell(6, 1, 8, 2, true).string("Sem Dados para mostrar \n No data to display").style(style4);

                    }
                    



                    wb.write('Excel.xlsx', res);
                    
                    // res.render('index', { title: 'Express'});
                }
        }).sort({_id:1});
        
    }else{

        var nome = req.params.colaborador;
        var nome1 = nome.split("_")[0] + ' ' + nome.split("_")[1];

        pettycashops.find({pettycashuser_nome:nome1, pettycash_mes:{$gte: mesmenor, $lte: mesmaior}}, function(err, data) {
            if (err)
                    console.log(err);
                else {

                    if(data.length != 0){

                            var contador = 12;

                        //Merge cells
                        ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                        ws.cell(7, 3).string(data[0].pettycashuser_nome).style(style1);
                        ws.cell(6, 6).string("Mês").style(style3);
                        ws.cell(6, 7).string(mesF).style(style3);
                        ws.cell(3, 5).string("Relatório / Report").style(style2);
                        ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                        ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                        ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                        ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                        ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                        ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                        ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                        ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                        ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                        ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                        
                        for(var j = 0; j < data.length; j++){

                            ws.cell(contador, 1).number(j+1).style(style4);
                            ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                            ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                            ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                            ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                            ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                            if(data[j].pettycash_purchase.length == 0){

                                ws.cell(contador, 7).string("-").style(style5);
                                ws.cell(contador, 8).string("-").style(style5);
                                ws.cell(contador, 9).string("-").style(style5);
                                ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                            }else{
                                ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                                ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                                ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                                ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                            }
                            
                            contador = contador + 1;
                        }



                        
                        
                        // res.render('index', { title: 'Express'});
                    }else{
                        ws.cell(6, 1, 8, 2, true).string("Sem Dados para mostrar \n No data to display").style(style4);
                    }

                    wb.write('Excel.xlsx', res);

                    }
                    
        }).sort({_id:1});
    }



});

router.get('/printreportyear/:colaborador/:rangeYear', function(req, res) {

    var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
//set column width
ws.column(1).setWidth(8);
ws.column(2).setWidth(20);
ws.column(3).setWidth(25);
ws.column(4).setWidth(20);
ws.column(5).setWidth(20);
ws.column(6).setWidth(20);
ws.column(7).setWidth(28);
ws.column(8).setWidth(25);
ws.column(9).setWidth(18);
ws.column(10).setWidth(28);

// ws.column(1).setWidth(8);
// ws.column(2).setWidth(13);
// ws.column(3).setWidth(28);
// ws.column(6).setWidth(15);
// ws.column(7).setWidth(20);
// ws.column(5).setWidth(28);
// ws.column(4).setWidth(13);

//add image
ws.addImage({
  path: './public/img/logo.png',
  type: 'picture',
  position: {
    type: 'twoCellAnchor',
    from: {
      col: 1,
      colOff: 0,
      row: 1,
      rowOff: 0,
    },
    to: {
      col: 4,
      colOff: 0,
      row: 6,
      rowOff: 0,
    },
  },
});

var style = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'center',
    vertical:'center'
  }
});


var style1 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

//title style
var style2 = wb.createStyle({
  font: {
    color: '000000',
    size: 14,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style3 = wb.createStyle({
  font: {
    color: '000000',
    size: 13,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style4 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'center',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style5 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'justify',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

    var userData = req.session.usuario;

    var rangedate = req.params.rangeYear.split('_');
    // console.log(rangedate)
    var anofrom = parseInt(rangedate[0]);
    var anoto = parseInt(rangedate[2]);
    

    if(anofrom == anoto){
        var anoF = anofrom + "";
    }else{
        var anoF = anofrom + " - " + anoto;
    }
    

    if( req.params.colaborador == "All"){

        pettycashops.find({pettycash_anoFiscal:{$gte: anofrom, $lte: anoto}}, function(err, data) {
            if (err)
                    console.log(err);
                else {
                    if(data.length != 0){
                            var contador = 12;

                            //Merge cells
                            ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                            ws.cell(7, 3).string("ALL").style(style1);
                            ws.cell(5, 6).string("Ano Fiscal").style(style3);
                            ws.cell(5, 7).string(anoF).style(style3);
                            ws.cell(3, 5).string("Relatório / Report").style(style2);
                            ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                            ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                            ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                            ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                            ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                            ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                            ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                            ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                            ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                            ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                            
                            for(var j = 0; j < data.length; j++){

                                ws.cell(contador, 1).number(j+1).style(style4);
                                ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                                ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                                ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                                ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                                ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                                if(data[j].pettycash_purchase.length == 0){

                                    ws.cell(contador, 7).string("-").style(style5);
                                    ws.cell(contador, 8).string("-").style(style5);
                                    ws.cell(contador, 9).string("-").style(style5);
                                    ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                                }else{
                                    ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                                    ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                                    ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                                    ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                                }
                                
                                contador = contador + 1;
                            }

                    }else{

                        ws.cell(6, 1, 8, 2, true).string("Sem Dados para mostrar \n No data to display").style(style4);

                    }
                    



                    wb.write('Excel.xlsx', res);
                    
                    // res.render('index', { title: 'Express'});
                }
        }).sort({_id:1});
        
    }else{

        var nome = req.params.colaborador;
        var nome1 = nome.split("_")[0] + ' ' + nome.split("_")[1];

        pettycashops.find({pettycashuser_nome:nome1, pettycash_anoFiscal:{$gte: anofrom, $lte: anoto}}, function(err, data) {
            if (err)
                    console.log(err);
                else {

                    if(data.length != 0){

                        var contador = 12;

                        //Merge cells
                        ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                        ws.cell(7, 3).string(data[0].pettycashuser_nome).style(style1);
                        ws.cell(5, 6).string("Ano Fiscal").style(style3);
                        ws.cell(5, 7).string(anoF).style(style3);
                        ws.cell(3, 5).string("Relatório / Report").style(style2);
                        ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                        ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                        ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                        ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                        ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                        ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                        ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                        ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                        ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                        ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                        
                        for(var j = 0; j < data.length; j++){

                            ws.cell(contador, 1).number(j+1).style(style4);
                            ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                            ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                            ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                            ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                            ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                            if(data[j].pettycash_purchase.length == 0){

                                ws.cell(contador, 7).string("-").style(style5);
                                ws.cell(contador, 8).string("-").style(style5);
                                ws.cell(contador, 9).string("-").style(style5);
                                ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                            }else{
                                ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                                ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                                ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                                ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                            }
                            
                            contador = contador + 1;
                        }



                        
                        
                        // res.render('index', { title: 'Express'});
                    }else{
                        ws.cell(6, 1, 8, 2, true).string("Sem Dados para mostrar \n No data to display").style(style4);
                    }

                    wb.write('Excel.xlsx', res);

                    }
                    
        }).sort({_id:1});
    }



});

router.get('/printreportfull/:colaborador/:rangeTime', function(req, res) {

    var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
//set column width
ws.column(1).setWidth(8);
ws.column(2).setWidth(20);
ws.column(3).setWidth(25);
ws.column(4).setWidth(20);
ws.column(5).setWidth(20);
ws.column(6).setWidth(20);
ws.column(7).setWidth(28);
ws.column(8).setWidth(25);
ws.column(9).setWidth(18);
ws.column(10).setWidth(28);

// ws.column(1).setWidth(8);
// ws.column(2).setWidth(13);
// ws.column(3).setWidth(28);
// ws.column(6).setWidth(15);
// ws.column(7).setWidth(20);
// ws.column(5).setWidth(28);
// ws.column(4).setWidth(13);

//add image
ws.addImage({
  path: './public/img/logo.png',
  type: 'picture',
  position: {
    type: 'twoCellAnchor',
    from: {
      col: 1,
      colOff: 0,
      row: 1,
      rowOff: 0,
    },
    to: {
      col: 4,
      colOff: 0,
      row: 6,
      rowOff: 0,
    },
  },
});

var style = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'center',
    vertical:'center'
  }
});


var style1 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

//title style
var style2 = wb.createStyle({
  font: {
    color: '000000',
    size: 14,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style3 = wb.createStyle({
  font: {
    color: '000000',
    size: 13,
  },
  alignment:{
    horizontal:'left',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style4 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'center',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

var style5 = wb.createStyle({
  font: {
    color: '000000',
    size: 12,
  },
  border:{
    left:{
        style:'thin',
        color:'000000'
    },

    right:{
        style:'thin',
        color:'000000'
    },

    top:{
        style:'thin',
        color:'000000'
    },

    bottom:{
        style:'thin',
        color:'000000'
    }
  },

  alignment:{
    horizontal:'justify',
    vertical:'center',
    shrinkToFit:true,
    wrapText:true
  }
});

    var userData = req.session.usuario;

    var rangedate = req.params.rangeTime.split('_');
    // console.log(rangedate)
    var mesfrom = parseInt(rangedate[0]) - 1;
    var anofrom = parseInt(rangedate[1]);
    var mesto = parseInt(rangedate[3]);
    var anoto = parseInt(rangedate[4]);
    
    var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept','Oct', 'Nov', 'Dec'];

    var start = new Date(anofrom, mesfrom, 1, 2,0,0,0).toISOString();
    var end = new Date(anoto, mesto, 1, 2,0,0,0).toISOString();

    console.log(start)
    console.log(end)

    if(anofrom == anoto){
        var anoF = anofrom + "";
    }else{
        var anoF = anofrom + " - " + anoto;
    }

    if(mesfrom == mesto){
         mesF = meses[mesfrom-1];
    }else{
         mesF = meses[mesfrom-1] + " - " + meses[mesto-1];
    }
    

    if( req.params.colaborador == "All"){

        pettycashops.find({data_registo:{$gte: start, $lt: end}}, function(err, data) {
            if (err)
                    console.log(err);
                else {
                    if(data.length != 0){
                            var contador = 12;

                            //Merge cells
                            ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                            ws.cell(7, 3).string("ALL").style(style1);
                            ws.cell(5, 6).string("Ano Fiscal").style(style3);
                            ws.cell(5, 7).string(anoF).style(style3);
                            ws.cell(6, 6).string("Mês").style(style3);
                            ws.cell(6, 7).string(mesF).style(style3);
                            ws.cell(3, 5).string("Relatório / Report").style(style2);
                            ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                            ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                            ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                            ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                            ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                            ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                            ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                            ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                            ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                            ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                            
                            for(var j = 0; j < data.length; j++){

                                ws.cell(contador, 1).number(j+1).style(style4);
                                ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                                ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                                ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                                ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                                ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                                if(data[j].pettycash_purchase.length == 0){

                                    ws.cell(contador, 7).string("-").style(style5);
                                    ws.cell(contador, 8).string("-").style(style5);
                                    ws.cell(contador, 9).string("-").style(style5);
                                    ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                                }else{
                                    ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                                    ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                                    ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                                    ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                                }
                                
                                contador = contador + 1;
                            }

                    }else{

                        ws.cell(6, 1, 8, 2, true).string("Sem Dados para mostrar \n No data to display").style(style4);

                    }
                    



                    wb.write('Excel.xlsx', res);
                    
                    // res.render('index', { title: 'Express'});
                }
        }).sort({_id:1});
        
    }else{

        var nome = req.params.colaborador;
        var nome1 = nome.split("_")[0] + ' ' + nome.split("_")[1];

        pettycashops.find({pettycashuser_nome:nome1, data_registo:{$gte: start, $lt: end}}, function(err, data) {
            if (err)
                    console.log(err);
                else {

                    if(data.length != 0){

                        var contador = 12;

                        //Merge cells
                        ws.cell(6, 1, 8, 2, true).string("Nome do colaborador").style(style);
                        ws.cell(7, 3).string(data[0].pettycashuser_nome).style(style1);
                        ws.cell(5, 6).string("Ano Fiscal").style(style3);
                        ws.cell(5, 7).string(anoF).style(style3);
                        ws.cell(6, 6).string("Mês").style(style3);
                        ws.cell(6, 7).string(mesF).style(style3);
                        ws.cell(3, 5).string("Relatório / Report").style(style2);
                        ws.cell(10, 1, 11, 1, true).string("Nº").style(style4);
                        ws.cell(10, 2, 11, 2, true).string("Nome \n Name").style(style4);
                        ws.cell(10, 3, 11, 3, true).string("Data \n Date").style(style4);
                        ws.cell(10, 4, 11, 4, true).string("Crédito \n Credit").style(style4);
                        ws.cell(10, 5, 11, 5, true).string("Débito \n Debit").style(style4);
                        ws.cell(10, 6, 11, 6, true).string("Saldo \n Ballance").style(style4);
                        ws.cell(10, 7, 11, 7, true).string("Descrição \n Description").style(style4);
                        ws.cell(10, 8, 11, 8, true).string("Fornecedor \n Supplier").style(style4);
                        ws.cell(10, 9, 11, 9, true).string("Nº Doc").style(style4);
                        ws.cell(10, 10, 11, 10, true).string("Notas \n Notes").style(style4);
                        
                        for(var j = 0; j < data.length; j++){

                            ws.cell(contador, 1).number(j+1).style(style4);
                            ws.cell(contador, 2).string(data[j].pettycashuser_nome).style(style5);
                            ws.cell(contador, 3).string(data[j].pettycash_data).style(style5);
                            ws.cell(contador, 4).string(data[j].pettycash_credito).style(style5);
                            ws.cell(contador, 5).string(data[j].pettycash_debito).style(style5);
                            ws.cell(contador, 6).string(data[j].pettycash_saldo).style(style5);

                            if(data[j].pettycash_purchase.length == 0){

                                ws.cell(contador, 7).string("-").style(style5);
                                ws.cell(contador, 8).string("-").style(style5);
                                ws.cell(contador, 9).string("-").style(style5);
                                ws.cell(contador, 10).string(data[j].pettycash_notas).style(style5);

                            }else{
                                ws.cell(contador, 7).string(data[j].pettycash_purchase[0].purchase_description).style(style5);
                                ws.cell(contador, 8).string(data[j].pettycash_purchase[0].purchase_supplier).style(style5);
                                ws.cell(contador, 9).string(data[j].pettycash_purchase[0].purchase_docno).style(style5);
                                ws.cell(contador, 10).string(data[j].pettycash_purchase[0].purchase_comments).style(style5);

                            }
                            
                            contador = contador + 1;
                        }



                        
                        
                        // res.render('index', { title: 'Express'});
                    }else{
                        ws.cell(6, 1, 8, 2, true).string("Sem Dados para mostrar \n No data to display").style(style4);
                    }

                    wb.write('Excel.xlsx', res);

                    }
                    
        }).sort({_id:1});
    }



});

router.get("/detalhesUso/:nome/:rangedate",  async function(req, res){

    var userData= req.session.usuario;
    var nome1 = req.params.nome;
    var comp = nome1.split("_");
    var nome = comp[0] + ' ' + comp[1];
    var cam = req.params.nome + "/" + req.params.rangedate;
    // console.log(cam);

    var rangedate = req.params.rangedate.split('_');
    // console.log(rangedate)
    var mesfrom = parseInt(rangedate[0]);
    var anofrom = parseInt(rangedate[1]);
    var mesto = parseInt(rangedate[3]);
    // if(mesto == 12){
    //     mesto = 11;
    // }
    var anoto = parseInt(rangedate[4]);

    procura = await pettycashops.find({pettycashuser_nome:nome}, function(err, dataPettyCash){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            console.log("done");
        }
    }).sort({_id:-1});


    

    if((mesfrom == mesto) && (anofrom == anoto)){
        month = mesfrom + 1;
        year = anofrom;

        pettycashops.find({pettycashuser_nome:nome, pettycash_ano:year, pettycash_mes:month}, function(err, dataPettyCash){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{

            pettycashops.aggregate([{ $match: {pettycashuser_nome:nome}},{$group:{_id:{"ano":"$pettycash_ano", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.ano", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:-1}}], function (err, dataAnoMes) {
                
                if(err){
                    console.log("ocorreu um erro ao tentar aceder os dados")
                }else{
                    for(var j = 0; j < dataAnoMes.length; j++){
                        dataAnoMes[j].listames.sort(compararNumeros);   
                    }

                    function compararNumeros(a, b) {
                        return a - b;
                    }
                    console.log(dataAnoMes)
                    res.render("pettycash_detalhesUso", {DataU:userData, DadosPettyCash:dataPettyCash, nomeUser: nome, saldoUser:procura[0].pettycash_saldo, listaanomes:dataAnoMes, MesFrom:mesfrom, MesTo:mesto, YearFrom:anofrom, YearTo:anoto, AnosMeses:JSON.stringify(dataAnoMes), Caminho:cam, title: 'COMSERV'});
                }

            });
            
        }
        }).sort({_id:1});

    }else{

        var start = new Date(anofrom, mesfrom, 1, 2,0,0,0).toISOString();
        var end = new Date(anoto, (mesto+1), 1, 2,0,0,0).toISOString();

        console.log(start, end)

        pettycashops.find({pettycashuser_nome:nome,data_registo:{$gte: start, $lt: end}}, function(err, dataPettyCash){
            if(err){
                console.log("ocorreu um erro ao tentar aceder os dados")
            }
            else{

                pettycashops.aggregate([{ $match: {pettycashuser_nome:nome}},{$group:{_id:{"ano":"$pettycash_ano", "mes":"$pettycash_mes"}}}, {$group :{_id:"$_id.ano", "listames":{$push:"$_id.mes"}}}, {$sort:{_id:-1}}], function (err, dataAnoMes) {
                    
                    if(err){
                        console.log("ocorreu um erro ao tentar aceder os dados")
                    }else{
                        for(var j = 0; j < dataAnoMes.length; j++){
                            dataAnoMes[j].listames.sort(compararNumeros);   
                        }

                        function compararNumeros(a, b) {
                            return a - b;
                        }
                        console.log(dataAnoMes)
                        res.render("pettycash_detalhesUso", {DataU:userData, nomeUser: nome, saldoUser:procura[0].pettycash_saldo,DadosPettyCash:dataPettyCash, listaanomes:dataAnoMes, MesFrom:mesfrom, MesTo:mesto, YearFrom:anofrom, YearTo:anoto, AnosMeses:JSON.stringify(dataAnoMes), Caminho:cam, title: 'COMSERV'});
                    }

                });
                
            }
        }).sort({_id:1});


    }

    

});

router.get("/detalhesRegistrosCredit/:id",  function(req, res){

    var userData= req.session.usuario;

    pettycashops.find({_id:req.params.id}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            res.render("pettycash_detallhescredit", {DataU:userData, Pettycash:data, title: 'COMSERV'});
        }
    });

});

router.get("/detalhesRegistros/:id",  function(req, res){

    var userData= req.session.usuario;

    pettycashops.find({_id:req.params.id}, function(err, data){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        else{
            res.render("pettycash_form", {DataU:userData, Pettycash:data, title: 'COMSERV'});
        }
    });

});

router.get("/novoregistro", function(req, res){

    var userData=req.session.usuario;

    var year = new Date().getFullYear();
    var month = new Date().getMonth();

    if(month < 2){
    	year = parseInt(year) - 1;
    }

    pettycashops.find({pettycashuser_nome:userData.nome}, function(err, dataPettyCash){

        if(err){
            console.log("ocorreu "+err)
        }else{
            // console.log(dataPettyCash)
            if(dataPettyCash.length == 0){
                var saldonumeral = numeral("0");
            }else{
                var saldonumeral = numeral(dataPettyCash[0].pettycash_saldo);
            }
            // console.log(dataPettyCash[0].pettycash_saldo);
            // var refIdPettyCashHistory = dataPettyCash[0].pettycashuser_history[dataPettyCash[0].pettycashuser_history.length-1].pettycash_historymeses._id;
            res.render("pettycash_form", {DataU:userData, DadosPettyCash:JSON.stringify(dataPettyCash), SaldoDisponivel:saldonumeral.value(), FinancialYear: year, title:"COMSERV"});
        }

    }).sort({_id:-1});

    
});

router.post("/editCreditPettycash/:nome/:rangedate/:id", upload.any(), async function(req, res) {

    var userData = req.session.usuario;
    var pettycashinfo = req.body;
    var idref = req.params.id;
    var nome1 = req.params.nome;
    var comp = nome1.split("_");
    var nome = comp[0] + ' ' + comp[1];

    // dados
    var creditoantigo = pettycashinfo.creditovalorantigo;
    var creditoantigovalue = numeral(creditoantigo).value();

    var saldoanterior = pettycashinfo.saldovaloranterior;
    var saldoanteriorvalue = numeral(saldoanterior).value();

    var creditonovo = pettycashinfo.creditovalornovo;
    var creditonovovalue = numeral(creditonovo).value();

    var diferencacreditovalue = creditonovovalue - creditoantigovalue;



    // calcular o novo saldo
    var saldoantigovalue = saldoanteriorvalue - creditoantigovalue;
    var saldonovovalue = saldoantigovalue + creditonovovalue;

    var saldonovo = numeral(saldonovovalue).format('0,0.00');

    // audit trail info
    var audittrailObject = {};

    audittrailObject.audittrail_username = userData.nome;
    audittrailObject.auditrail_action = "Edit Credit Operation";
    var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
    var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
    var anoFiscal = (new Date()).getFullYear();
    var ano = (new Date()).getFullYear();
    audittrailObject.auditrail_date = dia + "/" + mes + "/" + ano;

    // alterar  credito e saldo nessa operacao
    pettycashops.updateOne({_id:idref}, {$push:{"pettycash_audittrail":audittrailObject}, $set:{"pettycash_saldo":saldonovo, "pettycash_credito":creditonovo}}, function(err, data) {

        if(err){
            console.log("ocorreu "+err)
        }else{
            console.log("update done");
        }

    });

    // alterar os saldos das operacoes feitas por essa pessoa depois dessa data

    var procura = await pettycashops.find({_id:{$gt: idref}, pettycashuser_nome:nome}, function(err, dataPettyCash){

        if(err){
            console.log("ocorreu "+err)
        }else{
            console.log(dataPettyCash)
            
        }

    });

    if(procura.length != 0){

        for(let [i,test] of procura.entries()){

            var saldo = procura[i].pettycash_saldo;
            var saldovalue = numeral(saldo).value();
            var saldoactualvalue = saldovalue + diferencacreditovalue;
            var saldoactual = numeral(saldoactualvalue).format('0,0.00');

            // audit trail info
            var audittrailObject1 = {};

            audittrailObject1.audittrail_username = userData.nome;
            audittrailObject1.auditrail_action = "Edit Balance";
            var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
            var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
            var anoFiscal = (new Date()).getFullYear();
            var ano = (new Date()).getFullYear();
            audittrailObject1.auditrail_date = dia + "/" + mes + "/" + ano;

            pettycashops.updateOne({_id:procura[i]._id}, {$push:{"pettycash_audittrail":audittrailObject1}, $set:{"pettycash_saldo":saldoactual}}, function(err, data) {

                if(err){
                    console.log("ocorreu "+err)
                }else{
                    console.log("update done");
                }

            });

        }

    }



});

router.post("/refusepettycash/:nome/:rangedate/:id", upload.any(), async function(req, res) {

    var userData = req.session.usuario;
    var pettycashinfo = req.body;
    var idref = req.params.id;
    var nome1 = req.params.nome;
    var comp = nome1.split("_");
    var nome = comp[0] + ' ' + comp[1];

    var arrVerify = [1,1];
    var arrVerifyReason = JSON.parse(pettycashinfo.reasonoptions);

    // audit trail info
    var audittrailObject = {};

    audittrailObject.audittrail_username = userData.nome;
    audittrailObject.auditrail_action = "Refuse Pettycash Operation";
    var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
    var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
    var anoFiscal = (new Date()).getFullYear();
    var ano = (new Date()).getFullYear();
    audittrailObject.auditrail_date = dia + "/" + mes + "/" + ano;

    

    pettycashops.update({_id:idref}, {$push:{"pettycash_audittrail":audittrailObject}, $set:{"pettycash_verify":arrVerify, "pettycash_verifyReason":arrVerifyReason}}, function(err, data) {

        if(err){
            console.log("ocorreu "+err)
        }else{
            console.log("update done");
        }

    });

    var procura = await pettycashops.find({pettycashuser_nome:nome}, function(err, dataPettyCash){

        if(err){
            console.log("ocorreu "+err)
        }else{
            console.log("search operation done");
        }

    }).sort({_id:-1});

    var debitovalor = numeral(pettycashinfo.debitovalor).value();
    var saldoactual = numeral(procura[0].pettycash_saldo).value();
    var novosaldo = debitovalor + saldoactual;

    var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
    var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
    var anoFiscal = (new Date()).getFullYear();
    var ano = (new Date()).getFullYear();

    if(parseInt(mes) < 2 ){
        anoFiscal = anoFiscal - 1;
    }

    var pettycashObject = {};
    pettycashObject.pettycashuser_code = procura[0].pettycashuser_code;
    pettycashObject.pettycashuser_nome = nome;
    pettycashObject.pettycash_anoFiscal = anoFiscal;
    pettycashObject.pettycash_ano = ano;
    pettycashObject.pettycash_mes = parseInt(mes);
    pettycashObject.pettycash_data = dia + "/" + mes + "/" + ano;
    pettycashObject.pettycash_credito = pettycashinfo.debitovalor;
    pettycashObject.pettycash_debito = "-";
    pettycashObject.pettycash_saldo = numeral(novosaldo).format('0,0.00');
    pettycashObject.pettycash_notas = "";
    pettycashObject.pettycash_purchase = [];
    pettycashObject.pettycash_verify = [1];
    pettycashObject.pettycash_verifyReason = [];

    // audit trail info
    var audittrailObject1 = {};

    audittrailObject1.audittrail_username = userData.nome;
    audittrailObject1.auditrail_action = "Credit Operation";
    audittrailObject1.auditrail_date = dia + "/" + mes + "/" + ano;

    var audittrailArray1 = [];
    audittrailArray1.push(audittrailObject1);
    pettycashObject.pettycash_audittrail = audittrailArray1;

    pettycashops.gravarDados(pettycashObject, function(err){
        if(err){
            console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
            console.log(err)
        }
        else{
            console.log('add novo petty cash');
        }
    });



});

router.post("/novoregistro", upload.any(), function(req, res) {

	var userData = req.session.usuario;
	var pettycashinfo = req.body;
    pettycashinfo.pettycash_purchase = JSON.parse(req.body.pettycash_purchase);
    pettycashinfo.pettycash_anoFiscal = parseInt(req.body.pettycash_anoFiscal);
    pettycashinfo.pettycash_ano = parseInt(req.body.pettycash_ano);
    pettycashinfo.pettycash_mes = parseInt(req.body.pettycash_mes);
    pettycashinfo.pettycash_debito = numeral(req.body.pettycash_debito).format('0,0.00');
    pettycashinfo.pettycash_saldo = numeral(req.body.pettycash_saldo).format('0,0.00');
    pettycashinfo.pettycash_purchase[0].purchase_value = numeral(pettycashinfo.pettycash_purchase[0].purchase_value).format('0,0.00');
	pettycashinfo.pettycash_purchase[0].purchase_imagem = [];
    pettycashinfo.pettycash_verify = [1];
    pettycashinfo.pettycash_verifyReason = [];


    // audit trail info
    var audittrailObject = {};

    audittrailObject.audittrail_username = userData.nome;
    audittrailObject.auditrail_action = "Debit Operation";
    audittrailObject.auditrail_date = pettycashinfo.pettycash_data;

    var audittrailArray = [];
    audittrailArray.push(audittrailObject);
    pettycashinfo.pettycash_audittrail = audittrailArray;



	var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

	var directorio = '/Pettycash_Control/' + year + '/';
    // console.log(req.files);
	if (req.files) {

		let comprimento = req.files.length;

		for (let i = 0; i < comprimento; i++) {
			pettycashinfo.pettycash_purchase[0].purchase_imagem.push((directorio + req.files[i].filename));
		}
	}

    // console.log()

    //guardar os dados do PettyCash
	var guardar = pettycashops.gravarDados(pettycashinfo, function(err){
		if(err){
			console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
			console.log(err)
		}else{
			console.log("dados gravados com sucesso!!");
		}
	});

	res.redirect("/inicio");

});



module.exports=router