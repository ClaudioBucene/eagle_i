const nodemailer = require('nodemailer');
const jobcard = require('../entities/jobcard.js');
const model = require('../entities/usuario.js');
var smtpTransport;
var CronJob = require("cron").CronJob;
var moment_zone=require("moment-timezone");

function createConnection(){
    // Use Smtp Protocol to send Email
    smtpTransport = nodemailer.createTransport({
        // host: '192.168.0.2', // Comserv host Host
        host: '52.98.16.210',
        // port: 25, // Port
        port: 587, // Port
       // secure: false, // this is true as port is 465
       secureConnection: true,
       tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        requireTLS: true,
        debug: true, // show debug output
        logger: true, // log information in console
        
        auth: {
            
      user: 'comservsystem@comserv.co.mz', //Gmail username
      pass: 'App@cc352020' // Gmail password
        }
        
    });

}

var job = new CronJob('* * * * *', async function() {
  console.log('You will see this message every second');
  var now = Date.now();
  console.log(now);
  var times = 4;
  var contr = 3;
  var horas = 1;
  var contador = 0;
  var nivelEscalonamento = 0;


  var escalated = [];
  var secondescalated = [];

    //   jobcard.find({jobcard_jobtype:"Callout", ttnumber_status:"New"}, {jobcard_tecniconome:1, jobcard_ttnumber:1, jobcard_jobinfo:1, jobcard_site:1, jobcard_regiao:1, jobcard_dataregistojobcard:1, data_ultimaactualizacaojobcard:1}, function(err, data){

  await jobcard.find({jobcard_jobtype:"Callout", ttnumber_status:"New", jobcard_restorationhrs:{$exists:true}}, {data_registojobcardms:1, data_ultimaactualizacaojobcard:1, jobcard_restorationhrs:1, jobcard_tecniconome:1, jobcard_linemanagerid:1, jobcard_ttnumber:1, jobcard_jobinfo:1, jobcard_site:1, jobcard_regiao:1, jobcard_siteclassif:1, jobcard_escalationlevel:1}, function(err, data){
      if(err){
          console.log("Ocorreu um erro na pesquisa");
      }else{
        //   console.log(data);

            for (let i = 0; i < data.length; i++) {
                if (data[i].jobcard_restorationhrs != undefined) {
                    nivelEscalonamento = data[i].jobcard_escalationlevel;
                    if (( now > (data[i].data_registojobcardms + data[i].jobcard_restorationhrs * (nivelEscalonamento + 1) * 3600000 )) && (data[i].jobcard_escalationlevel == nivelEscalonamento)) {
                        if (nivelEscalonamento > 0) {
                            while ((nivelEscalonamento >= 1) && (nivelEscalonamento <= 24)) {
                                nivelEscalonamento ++;
                                secondescalated.push(data[i]);
                                break;
                            }
                        }
                        if(nivelEscalonamento == 0){
                            escalated.push(data[i]);
                            nivelEscalonamento ++;
                        }
                    }
                   
                }
            }

            console.log("Pronto");
            console.log("Array dos jobcards escalados", escalated);
            console.log("Array dos jobcards escalados pela segunda vez", secondescalated);
        }
  });

  
  escalated.forEach(async function(element) {
    // var procuralinemanager = await model.findOne({_id:element.jobcard_linemanagerid}, {_id:0, email:1}, function(err,dataLineManager){
    //     if(err){
    //         console.log("ocorreu um erro ao tentar aceder os dados")
    //     }else{
    //         console.log("Find Line Manager", dataLineManager);
    //     }
    // }).lean();
    console.log("Chegou!")
    var procuratecnico = await model.findOne({nome:element.jobcard_tecniconome}, {_id:0, email:1}, function (err, dataTecnico) {
        if (err) {
            console.log("Ocorreu um erro ao tentar aceder aos dados", err);
        }else{
            console.log("Find Tecnico", dataTecnico);
        }
    });

    // var procuraItmanager = await model.findOne({nome:"Ernest Mckay"}, {_id:0, email:1}, function (err, dataItManager) {
    //     if (err) {
    //         console.log("Ocorreu um erro ao tentar aceder aos dados", err);
    //     }else{
    //         console.log("Find IT Manager", dataItManager);
    //     }
    // });

    var procuraregionalmanager = await model.findOne({regiao:element.jobcard_regiao, funcao:"Regional Manager"}, {_id:0, email:1}, function(err,dataRegionalManager){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find Regional Manager", dataRegionalManager);
        }
    }).lean();

    var procuraopmanager = await model.findOne({nome:"Antonio Biquiza"}, {_id:0, email:1}, async function(err,dataOpManager){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find Operations Manager", dataOpManager);
            await jobcard.updateOne({_id:element._id}, {$set:{jobcard_escalationlevel:nivelEscalonamento}}, function(err, data){
                if (err) {
                    console.log("Ocorreu um erro ao tentar alterar o escalation level");
                } else {
                    console.log("Escalation level alterado!");
                }
            });
        }
    }).lean();

    // var procurageneralmanager = await model.findOne({nome:"Luis Brazuna"}, {_id:0, email:1}, async function(err,dataGenManager){
    //     if(err){
    //         console.log("ocorreu um erro ao tentar aceder os dados")
    //     }else{
    //         console.log("Find General Manager", dataGenManager);

    //         await jobcard.updateOne({_id:element._id}, {$set:{jobcard_escalationlevel:nivelEscalonamento}}, function(err, data){
    //             if (err) {
    //                 console.log("Ocorreu um erro ao tentar alterar o escalation level");
    //             } else {
    //                 console.log("Escalation level alterado!");
    //             }
    //         });
            
    //     }
    // }).lean();

    
    var recipients = [];

    // if(procuratecnico != null){
    //     recipients.push(procuratecnico.email);
    // }else{
    //     console.log("Tecnico Nao adicionado a lista de destinatarios");
    // }

    if (procuraregionalmanager != null) {
        recipients.push(procuraregionalmanager.email);
    }else{
        console.log("Regional Manager Nao adicionado na lista de destinatarios");
    }

    if (procuraopmanager != null) {
        recipients.push(procuraopmanager.email);
    }else{
        console.log("Operations Manager Nao adicionado na lista de destinatarios");
    }

    // if (procurageneralmanager != null) {
    //     recipients.push(procurageneralmanager.email);
    // }else{
    //     console.log("General Manager Nao adicionado na lista de destinatarios");
    // }

    if (procuraItmanager != null) {
        recipients.push(procuraItmanager.email);
    }else{
        console.log("IT Manager Nao adicionado na lista de destinatarios");
    }



    createConnection();
    sendEmailTecnico(element, procuratecnico.email);
    createConnection();
    sendEmailManager(element,recipients);
    
  });


  secondescalated.forEach(async function(element) {
      var controlador = parseInt(element.jobcard_escalationlevel);
      console.log("Controlador é "+ controlador, typeof(controlador));
      controlador ++;
      controlador = controlador.toString();

      console.log("O novo controlador é "+ controlador, typeof(controlador));

      

    var procuratecnico = await model.findOne({nome:element.jobcard_tecniconome}, {_id:0, email:1}, function (err, dataItManager) {
    if (err) {
        console.log("Ocorreu um erro ao tentar aceder aos dados", err);
    }else{
        console.log("Find Tecnico");
        }
    }).lean();
      
    var procuralinemanager = await model.findOne({_id:element.jobcard_linemanagerid}, {_id:0, email:1}, function(err,dataLineManager){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find Line Manager", dataLineManager);
        }
    }).lean();

    var procuraregionalmanager = await model.findOne({regiao:element.jobcard_regiao, funcao:"Regional Manager"}, {_id:0, email:1}, function(err,dataRegionalManager){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find Regional Manager", dataRegionalManager);
        }
    }).lean();

    // var procuraItmanager = await model.findOne({nome:"Ernest Mckay"}, {_id:0, email:1}, function (err, dataItManager) {
    //     if (err) {
    //         console.log("Ocorreu um erro ao tentar aceder aos dados", err);
    //     }else{
    //         console.log("Find IT Manager,")
    //     }
    // });

    var procuraopmanager = await model.findOne({nome:"Antonio Biquiza"}, {_id:0, email:1}, function(err,dataOpManager){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find Operations Manager", dataOpManager);
        }
    }).lean();

    var procurageneralmanager = await model.findOne({nome:"Luis Brazuna"}, {_id:0, email:1}, async function(err,dataGenManager){
        if(err){
            console.log("ocorreu um erro ao tentar aceder os dados")
        }else{
            console.log("Find General Manager", dataGenManager);
            await jobcard.updateOne({_id:element._id}, {$set:{jobcard_escalationlevel:nivelEscalonamento}}, function(err, data){
                if (err) {
                    console.log("Ocorreu um erro ao tentar alterar o escalation level");
                } else {
                    console.log("Escalation level alterado!");
                }
            });
        }
    }).lean();

    var recipients = [];

    // if(procuratecnico != null){
    //     recipients.push(procuratecnico.email);
    // }else{
    //     console.log("Tecnico Nao adicionado a lista de destinatarios");
    // }

    if (procuraregionalmanager != null) {
        recipients.push(procuraregionalmanager.email);
    }else{
        console.log("Regional Manager Nao adicionado na lista de destinatarios");
    }

    if (procuraopmanager != null) {
        recipients.push(procuraopmanager.email);
    }else{
        console.log("Operations Manager Nao adicionado na lista de destinatarios");
    }

    if (procurageneralmanager != null) {
        recipients.push(procurageneralmanager.email);
    }else{
        console.log("General Manager Nao adicionado na lista de destinatarios");
    }

    if (procuraItmanager != null) {
        recipients.push(procuraItmanager.email);
    }else{
        console.log("IT Manager Nao adicionado na lista de destinatarios");
    }

    console.log()
    createConnection();
    sendEmailTecnico(element,procuratecnico.email);
    createConnection();
    sendEmailManager(element,recipients);
    
  });

}, null, true, 'Africa/Maputo');
job.start();


function sendEmailTecnico(element, tecnicoemail){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: tecnicoemail,  
        subject: 'Aviso de escalonamento de Site Crítico', // Subject line
    }


    mail.html = "Prezado(a) Senhor <b style='text-transform: capitalize;'>"+element.jobcard_tecniconome +"  </b>, O problema no site <b style='text-transform: capitalize;'> "+element.jobcard_site+"  </b> ainda não foi resolvido. Por favor, faça o acompanhamento deste problema.<br><br>" +"TTNumber: <b>"+element.jobcard_ttnumber+"</b> <br>"+"Site Type: <b> "+element.jobcard_siteclassif+" </b> <br>"+"Alarm Type: <b> "+element.jobcard_jobinfo+" </b> <br>"+"O tempo de resolução para este problema é de <b> "+element.jobcard_restorationhrs+" horas </b>. Por favor, resolva para evitar penalizações. <br><br>"+"Eagle I Notifications";

    //mail.to = usr.email
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response);
        }                
     }); 
    smtpTransport.close();
}

function sendEmailManager(element,recipients){
    console.log("recipientes ", recipients);
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: recipients,  
            subject: 'Aviso de escalonamento de Site Crítico', // Subject line
        }
    
    
        mail.html = "O técnico <b style='text-transform: capitalize;'> "+element.jobcard_tecniconome +" </b> ainda não resolveu o problema no site <b style='text-transform: capitalize;'> "+element.jobcard_site+" </b>.<br>" +"TTNumber: <b>"+element.jobcard_ttnumber+"</b> <br>"+"Site Type: <b> "+element.jobcard_siteclassif+" </b> <br>"+"Alarm Type: <b> "+element.jobcard_jobinfo+" </b> <br>"+"O tempo de resolução para este problema é de <b> "+element.jobcard_restorationhrs+" horas </b>.  Por favor, faça o acompanhamento deste problema. <br><br>"+"Eagle I Notifications";
    
        //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response);
            }                
         }); 
        smtpTransport.close();
    
}



module.exports.createConnection = createConnection;
// module.exports.sendEmail1 = sendEmail1;
module.exports.sendEmailTecnico = sendEmailTecnico;
module.exports.sendEmailManager = sendEmailManager;
