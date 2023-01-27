var inspsites_db = require("../entities/site");
var inspsiteinfo_db = require("../entities/siteinfo");
var usuario_db = require("../entities/usuario");
var emailSender=require('../util/sendEmail');
var moment_zone=require("moment-timezone");
var CronJob = require("cron").CronJob;
var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var obj = {};
obj.nome = "Ernest Mckay";
obj.email = "ernestmckay@comserv.co.mz";
var obj1 = {};
obj1.nome = "Antonio Biquiza";
obj1.email = "antoniobiquiza@comserv.co.mz";

var fs = require('fs');

//criar a pasta anual
var pasta_anual = new CronJob('0 30 22 31 11 *', function(){

	var dir = './public/Inspecção_Site/' + new Date().getFullYear();

	if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
	

}, null, true, "Africa/Maputo")

pasta_anual.start();

//criar a pasta mensal
var pasta_mensal = new CronJob('0 0 0 1 * *', function(){

	var direct = './public/Inspecção_Site/' + new Date().getFullYear() + '/' + meses[new Date().getMonth()];

    if (!fs.existsSync(direct)){
        fs.mkdirSync(direct);
    }

    inspsiteinfo_db.find({}, function(err, data) {
        if (err)
            console.log(err);
        else {
           
           for (var i = 0; i < data.length; i++) {
                var dir = './public/Inspecção_Site/' + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + data[i].siteinfo_sitenum;

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
           } 
        }
    }).distinct("siteNumber");
	

}, null, true, "Africa/Maputo")

pasta_mensal.start();

//Mandar emails diarios para lembrar a inspecção
// var email_tecnico = new CronJob('0 0 8 * * 1-5', function(){

//     var dia =  new Date().getDate();
//     var mes = new Date().getMonth();
//     var ano = new Date().getFullYear();
//     // new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
//     var dataActual1 = new Date(ano, mes, dia).getTime();

//     inspsites_db.aggregate( [{ $match: { $and: [ { diaAntes: { $lte: dataActual1 } }, { dataPlaneada2: { $gte: dataActual1 } }, { tobedoneby: { $ne: "" } } ] } }, { $group: {_id: "$tobedoneby", dataplaneada: { $push: "$dateplanned" }, sitenumber: { $push: "$siteNumber" }, sitename: { $push: "$siteName" }}}], async function (err, dataSite) {

//         if (err) {

//             return res.status(500).json({ err });
//         }else{

//             if(dataSite.length != 0 ){

//                 for(let [i,test] of dataSite.entries()) {

//                     var procura = await usuario_db.findOne({nome:dataSite[i]._id}, function(err,data2){

//                         if(err){
//                             console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
//                             console.log(err)
//                         }else{
//                             console.log("find user")
//                         }

//                     });

//                     var k = "";

//                     for(let [j,test] of dataSite[i].dataplaneada.entries()) {

//                         k= k +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ dataSite[i]._id + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + dataSite[i].sitenumber[j] +"</td>"+ "<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>" + dataSite[i].sitename[j] +"</td>"+ "<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>" + dataSite[i].dataplaneada[j] + "</td>" + "</tr>";

//                     }


//                     emailSender.createConnection();
//                     emailSender.sendEmail(k,procura);
                    
//                 }

//             }

            
//         }

//     });
    

// }, null, true, "Africa/Maputo")

// email_tecnico.start();

//Mandar email sobre as inspeccoes atrasadas
// var email_atraso = new CronJob('0 0 9 * * 1-5', function(){

//     var dia =  new Date().getDate();
//     var mes = new Date().getMonth();
//     var ano = new Date().getFullYear();
//     // new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
//     var dataActual2 = new Date(ano, mes, dia).getTime();

//     inspsites_db.aggregate( [{ $match: { $and: [ { dataPlaneada2: { $lt: dataActual2 } }, { diaDepois: { $gte: dataActual2 } }, {status: "Awaiting Inspection"},{ tobedoneby: { $ne: "" } } ] } }, { $group: {_id: "$tobedoneby", dataplaneada: { $push: "$dateplanned" }, sitenumber: { $push: "$siteNumber" }, sitename: { $push: "$siteName" }, maintenanceoffic: { $push: "$maintenanceofficer" }, ids: { $push: "$_id" }}}], async function (err, dataSiteAtrasado) {

//         if (err) {

//             return res.status(500).json({ err });
//         }else{

//             if(dataSiteAtrasado.length != 0 ){

//                 for(let [i,test] of dataSiteAtrasado.entries()) {

//                     // var procura = await usuario_db.findOne({nome:dataSiteAtrasado[i]._id}, function(err,data2){

//                     //     if(err){
//                     //         console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
//                     //         console.log(err)
//                     //     }else{
//                     //         console.log("find user")
//                     //     }

//                     // });

//                     var b = "";

//                     for(let [j,test] of dataSiteAtrasado[i].dataplaneada.entries()) {

//                         b= b +"<tr style='border: 1px solid black;border-collapse: collapse;'>"+"<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>"+ dataSiteAtrasado[i]._id + "</td>" +"<td style='border: 1px solid black;border-collapse: collapse; padding: 15px;'>" + dataSiteAtrasado[i].sitenumber[j] +"</td>"+ "<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>" + dataSiteAtrasado[i].sitename[j] +"</td>"+ "<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>" + dataSiteAtrasado[i].dataplaneada[j] + "</td>" + "<td style='border: 1px solid black;border-collapse: collapse;padding: 15px;'>" + dataSiteAtrasado[i].maintenanceoffic[j] + "</td>"+"</tr>";

//                     }


//                     emailSender.createConnection();
//                     // emailSender.sendEmail1(b,procura);
//                     emailSender.sendEmail1(k,obj1);
//                     emailSender.sendEmail1(k,obj);

//                 }

//             }

            
//         }

//     });
    

// }, null, true, "Africa/Maputo")

// email_atraso.start();


// alterar status da inspeccao
var alterar_status = new CronJob('0 0 4 * * 1-5', function(){

    var dia =  new Date().getDate();
    var mes = new Date().getMonth();
    var ano = new Date().getFullYear();
    // new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
    var dataActual3 = new Date(ano, mes, dia).getTime();

    inspsites_db.updateMany( {diaDepois: { $lt: dataActual3 }, status: "Awaiting Inspection", tobedoneby: { $ne: "" } }, {$set:{status:"Delayed Inspection"}} , function (err, data3) {

        if (err) {

            return res.status(500).json({ err });
        }else{
            
        }

    });
    

}, null, true, "Africa/Maputo")

alterar_status.start();


exports.pasta1 = pasta_anual;
exports.pasta2 = pasta_mensal;
// exports.pasta3 = email_tecnico;
// exports.pasta3 = email_atraso;