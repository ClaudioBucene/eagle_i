const nodemailer = require('nodemailer');
var smtpTransport;

function createConnection(){
    // Use Smtp Protocol to send Email
    smtpTransport = nodemailer.createTransport({
        // host: '192.168.0.2', // Comserv host Host
        host: '52.98.18.18',
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

function testAttachment(empresa,  filial, job){
    if(!smtpTransport){
        return;
    }
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz',
        to: filial.email,  
        subject: 'Manutenção da COMSERV', // Subject line
    }


    mail.html = " Encontrem em anexo o relatorio do trabalho feito no dia "+job.data_inicio +" pela empresa COMSERV</b>.<br> <br> Para mais informações contacte:  <b>+258 84 990 3038 </b>";
    mail.attachments=[{path:"./PurchaseOrder.pdf"}];

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

function transferenciaManager(usuario){
    if(!smtpTransport){
        return;
    }
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz',
        to: usuario.email,  
        subject: 'Transferencia de Viatura', // Subject line
    }


    mail.html = "Prezado(a) Senhor <b style='text-transform: capitalize;'>" + usuario.nome + "</b>, Tem uma transferencia por despachar na plataforma EagleI.<br><br>";

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

function problemasSeguranca(usuario){
    if(!smtpTransport){
        return;
    }
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz',
        to: "HST@comserv.co.mz",  
        subject: 'Problemas na Seguranca de Viatura', // Subject line



    }

    let troubl =  usuario.razaoextintor.join()+", "+usuario.razaosocorros.join()+", "+usuario.razaocintoSeg.join();
    mail.html = "Prezado(a) Senhor, a viatura do Senhor <b style='text-transform: capitalize;'>"+usuario.motorista+"</b> tem problema(s) de <b style='text-transform: capitalize;'>"+troubl+"<b>. <br><br>Para mais detalhes aceda a plataforma EagleI.<br><br>";

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


function sendEmail(dados,usuario){
    if(!smtpTransport){
        return;
    }
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz',
        to: usuario.email,  
        subject: 'Aviso de Inspecção de Sites', // Subject line
    }


    mail.html = "Prezado(a) Senhor <b style='text-transform: capitalize;'>" + usuario.nome + "</b>, verifique as inspecções que se aproximam e que devem ser realizadas de acordo com as datas planeadas<br><br>" +"<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Name </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Site Number </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Site Name </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Date </th> </tr>"+ dados + "</table>";

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

function sendEmail1(dados1,usuario){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuario.email,  
        subject: 'Atraso na Inspecção de Sites', // Subject line
    }


    mail.html = "Prezado(a) Senhor <b style='text-transform: capitalize;'>"+ usuario.nome + "</b>, verifique as inspecções que não foram realizadas de acordo com as datas planeadas<br><br>" +"<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Name </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Site Number </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Site Name </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Date </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Maintenance Officer </th> </tr>"+ dados1 + "</table>";

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


function sendEmailCreateTTNumber(dados,usuariotecnico, usermanager, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usermanager.email)
    mailrecip.push(usuariotecnico.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Manutenção Correctiva / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Novo Registo', // Subject line
        }


        mail.html = "Uma nova manutenção precisa ser atendida pelo técnico <b>" + dados.jobcard_tecniconome + "</b>:<br> Cliente: <b>" + dados.jobcard_clientenome + "</b>, número de ticket: <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> com os seguintes problemas: <b>" + dados.jobcard_jobinfo + " </b> criada no dia " + dados.jobcard_datareporte + " às " + dados.jobcard_horareporte + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Corrective Maintenance / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - New record', // Subject line
        }


        mail.html = "A new maintenance needs to be attended by the technician <b>" + dados.jobcard_tecniconome + "</b>:<br> Client: <b>" + dados.jobcard_clientenome + "</b>, ticket number: <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + "-" + dadossiteinfo.siteinfo_sitename + "</b> with the following problems: <b>" + dados.jobcard_jobinfo + " </b> on " + dados.jobcard_datareporte + " at " + dados.jobcard_horareporte + ".<br> Log in to <i>Eagle I</i> to take action. <br> Regards";

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
    
}

function sendEmailCreateTTNumberhvacassistants(dados, tecnico, usermanager){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(tecnico[0].email);
    console.log("entrou no email");
    console.log("dados", dados);
    console.log("tecnico",tecnico);
    console.log("usermanager",usermanager);

    for(var i = 0; i<usermanager.length; i++){
        mailrecip.push(usermanager[i].email);
    }
    
    console.log("mailrecip ", mailrecip);

    if((!tecnico.idioma) || (tecnico.idioma == "pt")){
        if(dados.cliente == dados.filial){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: mailrecip,  
                subject: 'Tarefa Correctiva / Local ' + dados.cliente +' / Sede - Novo Registo', // Subject line
            }
            
            if(Array.isArray(dados.assistente)){
                mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> e seu(s) assistente(s) <b>"+dados.assistente.join()+"<br> Cliente: <b>" + dados.cliente + "</b>, na <b> sua sede </b>  em <b>"+dados.provincia+"</b> com os seguinte motivo <b>" + dados.razao + ". Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"
            }else{
                if(dados.assistente != undefined){
                    mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> e seu assistente <b>"+dados.assistente+"<br> Cliente: <b>" + dados.cliente + "</b>, na <b> sua sede </b> em <b>"+dados.provincia+"</b> com o seguinte motivo <b>" + dados.razao + ". Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos."
                }else{
                    mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> <br> Cliente: <b>" + dados.cliente + "</b>, na <b> sua sede </b> em <b>"+dados.provincia+"</b> com o seguinte motivo <b>" + dados.razao + ". Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos."
                }
            }
    
        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();

        }else{
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: mailrecip,  
                subject: 'Tarefa Correctiva / Local ' + dados.cliente +' / '+dados.filial + ' - Novo Registo', // Subject line
            }

            if(Array.isArray(dados.assistente)){
                mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> e seu(s) assistente(s) <b>"+dados.assistente.join()+"<br> Cliente: <b>" + dados.cliente + "</b>, na filial <b>" + dados.filial + "</b> em <b>"+dados.provincia+"</b> com os seguinte motivo <b>" + dados.razao + ". Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"
            }else{
                if(dados.assistente != undefined){
                    mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> e seu assistente <b>"+dados.assistente+"<br> Cliente: <b>" + dados.cliente + "</b>, na filial <b>" + dados.filial + "</b> em <b>"+dados.provincia+"</b> com o seguinte motivo <b>" + dados.razao + ". Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos."
                }else{
                    mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> <br> Cliente: <b>" + dados.cliente + "</b>, na filial <b>" + dados.filial + "</b> em <b>"+dados.provincia+"</b> com o seguinte motivo <b>" + dados.razao + ". Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos."
                }
            }
    
            // mail.html = "Uma nova tarefa precisa ser atendida pelo técnico <b>" + dados.tecnico + "</b> e seu(s) assistente(s) <b>"+dados.assistente.join()+"<br> Cliente: <b>" + dados.cliente + "</b>, </b> na filial <b>" + dados.filial + "</b> em <b>"+dados.provincia+"</b> com os seguinte motivo <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"
    
            //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        };
    }else{
        if(dados.cliente == dados.filial){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: mailrecip,  
                subject: 'Corrective Task / Location ' + dados.cliente +' - New Record', // Subject line
            }

            if(Array.isArray(dados.assistente)){
                mail.html = "A new task needs to be attended by the technician <b>" + dados.tecnico + "</b> and his assistant(s) <b>"+dados.assistente.join()+"<br> Client: <b>" + dados.cliente + "</b>, </b> on it's <b> Main branch </b> in <b>"+dados.provincia+"</b> with the following reasons <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Regards";
            }else{
                if(dados.assistente != undefined){
                    mail.html = "A new task needs to be attended by the technician <b>" + dados.tecnico + "</b> and his assistant <b>"+dados.assistente+"<br> Client: <b>" + dados.cliente + "</b>, </b> on it's <b> Main branch </b> in <b>"+dados.provincia+"</b> with the following reasons <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Regards";
                }else{
                    mail.html = "A new task needs to be attended by the technician <b>" + dados.tecnico + "</b> <br> Client: <b>" + dados.cliente + "</b>, on it's <b> Main branch </b> in <b>"+dados.provincia+"</b> with the following reasons <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Regards";
                }
            }
            //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: mailrecip,  
                subject: 'Corrective Task / Location ' + dados.cliente +' / '+dados.filial + ' - New Record', // Subject line
            }
            
            if(Array.isArray(dados.assistente)){
                mail.html = "A new task needs to be attended by the technician <b>" + dados.tecnico + "</b> and his assistant(s) <b>"+dados.assistente.join()+"<br> Client: <b>" + dados.cliente + "</b>, on <b>" + dados.filial + "</b> branch in <b>"+dados.provincia+"</b> with the following reasons <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Regards";
            }else{
                if(dados.assistente != undefined){
                    mail.html = "A new task needs to be attended by the technician <b>" + dados.tecnico + "</b> and his assistant <b>"+dados.assistente+"<br> Client: <b>" + dados.cliente + "</b>, on <b>" + dados.filial + "</b> branch in <b>"+dados.provincia+"</b> with the following reasons <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Regards";
                }else{
                    mail.html = "A new task needs to be attended by the technician <b>" + dados.tecnico + "</b> <br> Client: <b>" + dados.cliente + "</b>, on <b>" + dados.filial + "</b> branch in <b>"+dados.provincia+"</b> with the following reasons <b>" + dados.razao + " Aceda o <i>Eagle I</i> para tomar uma acção. <br> Regards";
                }
            }
    
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }

    }
    
}

function sendEmailCallcenterhvac(dados, usuarios, manageremail){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
        console.log("objecto manageremal "+ manageremail);
        console.log("O proprio email "+ manageremail[0].email);
        mailrecip.push(usuarios);
        mailrecip.push(manageremail[0].email);

    if(dados.cliente == dados.filial){

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Tarefa Correctiva / Ticket ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - Sede - Técnico está a caminho do local', // Subject line
        }
    
    
        mail.html = "O Técnico <b>" + dados.tecnico + "</b> aceitou a tarefa e está a caminho do local <b>" + dados.cliente + " - Sede </b> para atender o número do ticket <b>" + dados.jobcard_cod + "</b>. <br> Aceda o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Tarefa Correctiva / Ticket ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Técnico está a caminho do local', // Subject line
        }
    
    
        mail.html = "O Técnico <b>" + dados.tecnico + "</b> aceitou a tarefa e está a caminho do local <b>" + dados.cliente + " - " + dados.filial + "</b> para atender o número do ticket <b>" + dados.jobcard_cod + "</b>. <br> Aceda o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

    }


    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        console.log(error);
        }else{
        console.log("Message sent: " + response);
        }                
    }); 
    smtpTransport.close();
    
    
}

function sendEmailCallcenterchegadasite(dados, usuarios, manageremail){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
        console.log("objecto manageremal "+ manageremail);
        console.log("O proprio email "+ manageremail[0].email);
        mailrecip.push(usuarios);
        mailrecip.push(manageremail[0].email);
    
    if(dados.cliente == dados.filial){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Tarefa Correctiva / Ticket ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - Sede - Técnico chegou ao site', // Subject line
        }
    
        mail.html = "O Técnico <b>" + dados.tecnico + "</b> chegou ao local <b>" + dados.cliente + " - Sede </b> para resolver a ocorrência com o número de ticket <b>" + dados.jobcard_cod + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos"

    }else{
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Tarefa Correctiva / Ticket ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Técnico chegou ao site', // Subject line
        }
    
        mail.html = "O Técnico <b>" + dados.tecnico + "</b> chegou ao local <b>" + dados.cliente + " - " + dados.filial + " </b> para resolver a ocorrência com o número de ticket <b>" + dados.jobcard_cod + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos"
    }
    
    
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        console.log(error);
        }else{
        console.log("Message sent: " + response);
        }                
    });
    smtpTransport.close();

}

function sendEmailSendJobcardAprrovalhvac(dados,usuarios, comercialemail){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    console.log("estou aqui!")
    console.log("usuarios", usuarios)
    var mailrecip = [];
        console.log("objecto manageremal "+ comercialemail);
        console.log("O proprio email "+ comercialemail[0].email);
        mailrecip.push(usuarios);
        mailrecip.push(comercialemail[0].email);
    
    if(dados.cliente == dados.filial){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Tarefa Correctiva / Ticket ' + dados.jobcard_cod + ' / Local ' + dados.cliente + ' - Sede  - Aprovação Requerida', // Subject line
        }
    
    
        mail.html = "Saudações <br> A tarefa com o código <b>" + dados.jobcard_cod + "</b> em <b>" + dados.cliente + " - Sede </b>, alocada ao técnico <b>" + dados.tecnico + "</b> foi enviado para a sua avaliação, por favor verifique e dê a sua aprovação se tudo estiver em ordem. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

    }else{
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Tarefa Correctiva / Ticket ' + dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Aprovação Requerida', // Subject line
        }
    
    
        mail.html = "Saudações <br> A tarefa com o código <b>" + dados.jobcard_cod + "</b> em <b>" + dados.cliente + " - " + dados.filial + "</b>, alocada ao técnico <b>" + dados.tecnico + "</b> foi enviado para a sua avaliação, por favor verifique e dê a sua aprovação se tudo estiver em ordem. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"
    }
    

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

function sendEmailSendJobcardApprovedhvac(dados,usuario){
    if(!smtpTransport){
        return;
    }

    console.log("dados",dados);
    console.log("usuario",usuario);
    // comservsystems@comserv.co.mzs
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        
        if(dados.cliente == dados.filial){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario,  
                subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' Sede - Aprovado' // Subject line
            }
    
            
            mail.html = "O call center aprovou a folha de serviço com o código <b>" + dados.jobcard_cod + "</b> no local <b>" + dados.cliente + " Sede </b>. <br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        
        }else{
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario,  
                subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Aprovado' // Subject line
            }
    
            
            mail.html = "O call center aprovou a folha de serviço com o código <b>" + dados.jobcard_cod + "</b> no local <b>" + dados.cliente + " - " + dados.filial + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        }
        
        

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Corrective Task / Ticket ' +  dados.jobcard_cod + ' / Location ' + dados.cliente + ' - ' + dados.filial + ' - Approved', // Subject line
        }

        mail.html = "Call center approved the jobcard with the code <b>" + dados.jobcard_cod + "</b> on site <b>" + dados.cliente + " - " + dados.filial + "</b>. <br> Log in to <i>Eagle I</i> for more information. <br> Regards";
         

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
    
}

function sendEmailSendJobcardRejectedhvac(dados,usuario, mensagem){
    if(!smtpTransport){
        return;
    }

    console.log("dados ",dados);
    console.log("usuario ",usuario);
    console.log("mensagem ",mensagem)
    // comservsystems@comserv.co.mzs
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        
        if(dados.cliente == dados.filial){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario,  
                subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' Sede - Enviado de volta' // Subject line
            }
    
            
            mail.html = "O call center devolveu a folha de serviço com o código <b>" + dados.jobcard_cod + "</b> no local <b>" + dados.cliente + " Sede </b> pelo seguinte motivo: <b> "+mensagem+"</b>. <br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        
        }else{
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario,  
                subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Enviado de volta' // Subject line
            }
    
            
            mail.html = "O call center devolveu a folha de serviço com o código <b>" + dados.jobcard_cod + "</b> no local <b>" + dados.cliente + " - " + dados.filial + "</b> pelo seguinte motivo: <b> "+mensagem+"</b>.<br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        }
        
        

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Corrective Task / Ticket ' +  dados.jobcard_cod + ' / Location ' + dados.cliente + ' - ' + dados.filial + ' - Approved', // Subject line
        }

        mail.html = "Call center approved the jobcard with the code <b>" + dados.jobcard_cod + "</b> on site <b>" + dados.cliente + " - " + dados.filial + "</b>. <br> Log in to <i>Eagle I</i> for more information. <br> Regards";
         

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
    
}

function sendEmailCallcenter2hvac(dados, usuarios){
    if(!smtpTransport){
        return;
    }
        console.log("dados", dados);
        console.log("usuarios", usuarios);
        
        if(dados.cliente == dados.filial){
            var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - Sede - Técnico saiu do site', // Subject line
            }

            mail.html = "O Técnico <b>" + dados.tecnico + "</b> está a sair do local da manutenção: <b>" + dados.cliente + " - Sede </b>. Por favor, assegure-se e verifique que todo o trabalho feito para o número de ticket <b>" + dados.jobcard_cod + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"
        
        }else{
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuarios,  
                subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Técnico saiu do site', // Subject line
            }
    
            mail.html = "O Técnico <b>" + dados.tecnico + "</b> está a sair do local da manutenção: <b>" + dados.cliente + " - " + dados.filial + " </b>. Por favor, assegure-se e verifique que todo o trabalho feito para o número de ticket <b>" + dados.jobcard_cod + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"
        }
        
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    
    
}

function sendEmailSendJobcardRejected(dados,usuario, mensagem, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){

        if(dados.cliente == dados.filial){

        }else{

        }
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Tarefa Correctiva / Código ' +  dados.jobcard_cod + ' / Local ' + dados.cliente + ' - ' + dados.filial + ' - Devolvido' // Subject line
        }


        mail.html = "<b>" + dados.jobcard_linemanager + "</b> devolveu para correcção a folha de serviço com o código <b>" + dados.jobcard_cod + "</b> para o local <b>" + dados.cliente + " - " + dados.filial + "</b>. <br>Razões: <b>" + mensagem + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Corrective Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Sent Back' // Subject line
        }


        mail.html = "Your line manager <b>" + dados.jobcard_linemanager + "</b> returned for correction the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> for the site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br>Reasons: <b>" + mensagem + "</b>. <br> Log in to <i>Eagle I<i> to take action <br> Regards"

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
    
}

function sendEmailCreateProject(dados,usuariotecnico, usermanager){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usermanager.email)
    mailrecip.push(usuariotecnico.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Projecto Número ' + dados.jobcard_projectnumber + ' - Novo Registo', // Subject line
        }


        mail.html = "Um novo projecto precisa ser atendido pelo técnico <b>" + dados.jobcard_tecniconome + "</b>:<br> Cliente: <b>" + dados.jobcard_clientenome + "</b>, número de projecto: <b>" + dados.jobcard_projectnumber + "</b> no(s) site(s) <b>" + dados.jobcard_site + "</b> pelas seguintes razões : <b>" + dados.jobcard_jobinfo + " </b> criada no dia " + dados.jobcard_datacreated + ". <br> Acesse o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Project Number ' + dados.jobcard_projectnumber + ' - New Record', // Subject line
        }


        mail.html = "A new project needs to be attended by the technician <b>" + dados.jobcard_tecniconome + "</b>:<br> Client: <b>" + dados.jobcard_clientenome + "</b>, project number: <b>" + dados.jobcard_projectnumber + "</b> on site(s) <b>" + dados.jobcard_site + "</b> for the following reasons : <b>" + dados.jobcard_jobinfo + " </b> created on the day " + dados.jobcard_datacreated + ". <br> Access <i>Eagle I</i> to take action. <br> Regards"

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
    
}


function sendEmailTecnicoReceiveNewJobPlanned(dados,usuariotecnico, usermanager, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usermanager.email)
    mailrecip.push(usuariotecnico.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject:'Nova Manutenção Preventiva / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename, // Subject line
        }


        mail.html = "Saudações, <br>O técnico <b>" + usuariotecnico.nome + "</b> recebeu uma nova manutenção preventiva que deve ser atendida no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> para mais informações. <br> Acesse o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject:'New Preventative Maintenance / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename, // Subject line
        }


        mail.html = "Hi, <br>The technician <b>" + usuariotecnico.nome + "</b> Received a new preventive maintenance that must be attended on the site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> for more information. <br> Log in to <i>Eagle I</i> to take action. <br> Regards";

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
    
}


function sendEmailCallcenter(dados, usuarios, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuarios,  
        subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico está a caminho do site', // Subject line
    }


    mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> aceitou a ocorrência e está a caminho do site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> para atender o número do ticket <b>" + dados.jobcard_ttnumber + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        console.log(error);
        }else{
        console.log("Message sent: " + response);
        }                
    }); 
    smtpTransport.close();
    
    
}

function sendEmailAceitarProjecto(dados, user,usuarios){
    if(!smtpTransport){
        return;
    }

    
    if((!user.idioma) || (user.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: user.email,
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - O Técnico está caminho do site', // Subject line
        }


        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> aceitou o projecto e está a caminho do site <b>" + dados.jobcard_site + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";
    
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: user.email,
            subject: 'Project Number / ' +  dados.jobcard_projectnumber + ' - Technician Going To Site', // Subject line
        }


         mail.html = "The technician <b>" + dados.jobcard_tecniconome + "</b> has accepted the project and is on its way to the site <b>" + dados.jobcard_site + "</b>. <br> Access <i>Eagle I</i> for more information.<br> Regards";
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
    
}

function sendEmailCallcenterPlanned(dados, usuarios, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuarios,  
        subject: 'Manutenção Preventiva / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico está a caminho do site', // Subject line
    }


    mail.html = "Saudações <br> O técnico <b>" + dados.jobcard_tecniconome + "</b> aceitou a ocorrência e está a caminho do site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção. <br> Cumprimentos"

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        console.log(error);
        }else{
        console.log("Message sent: " + response);
        }                
    }); 
    smtpTransport.close();
    
    
}

function sendEmailCallcenter1(dados, usuarios, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuarios,  
        subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico chegou ao site', // Subject line
    }


    mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> chegou ao site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + " </b> para resolver a ocorrência com o número de ticket <b>" + dados.jobcard_ttnumber + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos"
    
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        console.log(error);
        }else{
        console.log("Message sent: " + response);
        }                
    });
    smtpTransport.close();

    
    
}

function sendEmailChegadaProjecto(dados,user){
    if(!smtpTransport){
        return;
    }

    
    if((!user.idioma) || (user.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: user.email,
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - Técnico chegou ao site', // Subject line
        }


        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> chegou ao site <b>" + dados.jobcard_site  + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos"
        
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: user.email,  
            subject: 'Project Number / ' + dados.jobcard_projectnumber + ' - Technician Arrived On Site', // Subject line
        }


        mail.html = "Technician <b>" + dados.jobcard_tecniconome + "</b> has arrived on site <b>" + dados.jobcard_site + "</b>. <br> Log in to <i>Eagle I</i> to see details. <br> Regards"
    
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}

function sendEmailCallcenter1Planned(dados,usuarios, ticketnumber, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Manutenção Preventiva / Ticket ' +  ticketnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico chegou ao site', // Subject line
        }


        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> chegou ao site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + " </b> para resolver a ocorrência com o número de ticket <b>" + ticketnumber + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    
    
}

function sendEmailCallcenter2(dados, usuarios, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico saiu do site', // Subject line
        }


        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> está a sair do site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + " </b>. Por favor, assegure-se e verifique que todo o trabalho feito para o número de ticket <b>" + dados.jobcard_ttnumber + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    
    
}


function sendEmailLeavesiteproject(dados,user){
    if(!smtpTransport){
        return;
    }

    if((!user.idioma) || (user.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: user.email,  
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - Técnico saiu do site', // Subject line
        }


        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> está a sair do site <b>" + dados.jobcard_site + " </b>. Por favor, assegure-se e verifique que todo o trabalho feito para o projecto número <b>" + dados.jobcard_projectnumber + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: user.email,  
            subject: 'Project Number / ' +  dados.jobcard_projectnumber + ' - Technician leaving site', // Subject line
        }


        mail.html = "Technician <b>" + dados.jobcard_tecniconome + "</b> is leaving site  <b>" + dados.jobcard_site + " </b>. Please ensure ensure and verify that all work for the project number <b>" + dados.jobcard_projectnumber + "</b>. <br> Log in to <i>Eagle I</i> to take action. <br> Regards"
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
    
}


function sendEmailCallcenter2Planned(dados,users, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: users,  
        subject: 'Manutenção Preventiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico saiu do site', // Subject line
    }


    mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> está a sair do site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + " </b>. Por favor, assegure-se e verifique que todo o trabalho feito para o número de ticket <b>" + dados.jobcard_ttnumber + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos";

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        console.log(error);
        }else{
        console.log("Message sent: " + response);
        }                
    }); 
    smtpTransport.close();
    
    
}

function sendEmailHSProblem(dados,userhs1, problemashs, dadossiteinfo, usertecnico){
    if(!smtpTransport){
        return;
    }

    if((!userhs1.idioma) || (userhs1.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userhs1.email,  
            subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Incidente Reportado', // Subject line
        }

        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> reportou um incidente na folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br><b> Problema:</b> " + problemashs + ". <br>Contacte " + usertecnico.telefone_1 + " ou acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos"

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userhs1.email,  
            subject: 'Corrective Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Technician leaving site', // Subject line
        }


        mail.html = "The technician <b>" + dados.jobcard_tecniconome + "</b> reported an incident on the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br><b> Problem:</b> " + problemashs + ". <br>Contact " + usertecnico.telefone_1 + " or access o <i>Eagle I</i> for more information. <br> Regards"
    
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}

function sendEmailHSProblemProject(dados,userhs, problemashs, usertecnico){
    if(!smtpTransport){
        return;
    }


    if((!userhs.idioma) || (userhs.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userhs.email,  
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - Incidente Reportado', // Subject line
        }

        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> reportou um incidente na folha de serviço com o projecto número <b>" + dados.jobcard_projectnumber + "</b> no(s) site(s) <b>" + dados.jobcard_site + "</b>. <br><b> Problema:</b> " + problemashs + ". <br>Contacte " + usertecnico.telefone_1 + " ou acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos"

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userhs.email,  
            subject: 'Project Number / ' +  dados.jobcard_projectnumber + ' - Technician leaving site', // Subject line
        }


        mail.html = "The technician <b>" + dados.jobcard_tecniconome + "</b> reported an incident on the jobcard with the project number <b>" + dados.jobcard_projectnumber + "</b> on site(s) <b>" + dados.jobcard_site + "</b>. <br><b> Problem:</b> " + problemashs + ". <br>Contact " + usertecnico.telefone_1 + " or access o <i>Eagle I</i> for more information. <br> Regards"
    
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}

function sendEmailHSProblemPlanned(dados,userhs1, problemashs, dadossiteinfo, usertecnico){
    if(!smtpTransport){
        return;
    }
   

    if((!userhs1.idioma) || (userhs1.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userhs1.email,  
            subject: 'Manutenção Preventiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Incidente Reportado', // Subject line
        }

        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> reportou um incidente na folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br><b> Problema:</b> " + problemashs + ". <br>Contacte " + usertecnico.telefone_1 + " ou acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos"

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userhs1.email,  
            subject: 'Preventative Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Technician leaving site', // Subject line
        }


        mail.html = "The technician <b>" + dados.jobcard_tecniconome + "</b> reported an incident on the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br><b> Problem:</b> " + problemashs + ". <br>Contact " + usertecnico.telefone_1 + " or access o <i>Eagle I</i> for more information. <br> Regards"
    
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}

function sendEmailSendJobcardAprrovalProject(dados,usuario){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - Aprovação Requerida', // Subject line
        }


        mail.html = "Saudações <b>" + usuario.nome + "</b> <br> O projecto número <b>" + dados.jobcard_projectnumber + "</b> para o site <b>" + dados.jobcard_site + "</b> , alocada ao técnico <b>" + dados.jobcard_tecniconome + "</b> foi enviado para a sua avaliação, por favor verifique e dê a sua aprovação se tudo estiver em ordem. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Project Number / ' +  dados.jobcard_projectnumber + ' - Approval Required', // Subject line
        }


        mail.html = "Hi <b>" + usuario.nome+ "</b><br> The project number <b>" + dados.jobcard_ttnumber + "</b> for the site <b>" + dados.jobcard_site + "</b> , allocated to the technician <b>" + dados.jobcard_tecniconome + "</b> was sent for your evaluation, please review and give your approval if all is in order.<br> Log in to <i>Eagle I<i> to take action <br> Regards"

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
    
}

function sendEmailSendJobcardAprroval(dados,usuarios, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuarios,  
        subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Aprovação Requerida', // Subject line
    }


    mail.html = "Saudações <br> A folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> para o site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> , alocada ao técnico <b>" + dados.jobcard_tecniconome + "</b> foi enviado para a sua avaliação, por favor verifique e dê a sua aprovação se tudo estiver em ordem. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

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


function sendEmailSendJobcardAprrovalPlanned(dados,usuarios, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuarios,  
        subject: 'Manutenção Preventiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Aprovação Requerida', // Subject line
    }

    
    mail.html = "Saudações <br> A folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> para o site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> , alocada ao técnico <b>" + dados.jobcard_tecniconome + "</b> foi enviado para a sua avaliação, por favor verifique e dê a sua aprovação se tudo estiver em ordem. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

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


function sendEmailSendJobcardApprovedProject(dados,usuario){
    if(!smtpTransport){
        return;
    }

    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - Aprovado' // Subject line
        }

        
        mail.html = "O seu Line Manager <b>" + dados.jobcard_linemanager + "</b> aprovou o projecto número <b>" + dados.jobcard_projectnumber + "</b> no(s) site(s) <b>" + dados.jobcard_site + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Project Number / ' +  dados.jobcard_projectnumber + ' - Approved', // Subject line
        }

        mail.html = "Your Line Manager <b>" + dados.jobcard_linemanager + "</b> approved the project number <b>" + dados.jobcard_projectnumber + "</b> on site(s) <b>" + dados.jobcard_site + "</b>. <br> Log in to <i>Eagle I</i> for more information. <br> Regards";
         

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
    
}


function sendEmailSendJobcardApproved(dados,usuario, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Aprovado' // Subject line
        }

        
        mail.html = "O call center aprovou a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Corrective Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Approved', // Subject line
        }

        mail.html = "Call center approved the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br> Log in to <i>Eagle I</i> for more information. <br> Regards";
         

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
    
}


function sendEmailSendJobcardApprovedPlanned(dados,usuario, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Manutenção Preventiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Aprovado' // Subject line
        }

        
        mail.html = "O Call Center aprovou a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br> Acesse o <i>Eagle I</i> para mais informações. <br> Cumprimentos";
        

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Preventative Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Approved', // Subject line
        }

        mail.html = "Call Center approved the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br> Log in to <i>Eagle I</i> for more information. <br> Regards";
         

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
    
}

function sendEmailSendJobcardRejectedProject(dados,usuario, mensagem){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Projecto Número / ' +  dados.jobcard_projectnumber + ' - Devolvido' // Subject line
        }


        mail.html = "O seu line manager <b>" + dados.jobcard_linemanager + "</b> devolveu para correcção o projecto número <b>" + dados.jobcard_projectnumber + "</b> para o(s) site(s) <b>" + dados.jobcard_site + "</b>. <br>Razões: <b>" + mensagem + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Project Number / ' +  dados.jobcard_projectnumber + ' - Sent Back' // Subject line
        }


        mail.html = "Your line manager <b>" + dados.jobcard_linemanager + "</b> returned for correction the project number <b>" + dados.jobcard_projectnumber + "</b> for the site(s) <b>" + dados.jobcard_site + "</b>. <br>Reasons: <b>" + mensagem + "</b>. <br> Log in to <i>Eagle I<i> to take action <br> Regards"

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
    
}


function sendEmailSendJobcardRejected(dados,usuario, mensagem, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Devolvido' // Subject line
        }


        mail.html = "O seu line manager <b>" + dados.jobcard_linemanager + "</b> devolveu para correcção a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> para o site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br>Razões: <b>" + mensagem + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Corrective Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Sent Back' // Subject line
        }


        mail.html = "Your line manager <b>" + dados.jobcard_linemanager + "</b> returned for correction the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> for the site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br>Reasons: <b>" + mensagem + "</b>. <br> Log in to <i>Eagle I<i> to take action <br> Regards"

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
    
}


function sendEmailSendJobcardRejectedPlanned(dados,usuario, mensagem, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Manutenção Preventiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Devolvido' // Subject line
        }


        mail.html = "O seu line manager <b>" + dados.jobcard_linemanager + "</b> devolveu para correcção a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> para o site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br>Razões: <b>" + mensagem + "</b>. <br> Acesse o <i>Eagle I</i> para tomar uma acção <br> Cumprimentos"

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Preventative Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Sent Back' // Subject line
        }


        mail.html = "Your line manager <b>" + dados.jobcard_linemanager + "</b> returned for correction the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> for the site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>. <br>Reasons: <b>" + mensagem + "</b>. <br> Log in to <i>Eagle I<i> to take action <br> Regards"

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
    
}

function transferenciaManager( usuario){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Transferência de Viatura ', // Subject line
        }


        mail.html = "Saudações Senhor(a) <b>" + usuario.nome + "</b>! Tem uma transferência por despachar na plataforma <b><i>EagleI</i></b>.<br> Acesse o <i>EagleI</i> para tomar uma acção. <br>Cumprimentos";

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
    
}

function sendEmailCallcenterCommentsProjects(dados, usuario, usuariocallcenter,mensagem){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Projecto Número ' + dados.jobcard_projectnumber + ' - Call Center adicionou um comentário', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> adicionou um comentário a folha de serviço com o número de projecto <b>" + dados.jobcard_projectnumber + "</b> no site <b>" + dados.jobcard_site + "</b> , alocada ao técnico <b>" + dados.jobcard_tecniconome + "</b>. <br><b>Comentário: </b>" + mensagem + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. <br>Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuario.email,  
            subject: 'Project Number ' + dados.jobcard_projectnumber + ' - Call Center made comment', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> added a comment to the jobcard with the project number <b>" + dados.jobcard_projectnumber + "</b> on site <b>" + dados.jobcard_site + "</b>, allocated to the technician <b>" + dados.jobcard_tecniconome + "</b>. <br><b>Comment: </b>" + mensagem + ".<br> Log in to <i>Eagle I</i> to take action. <br>Regards";

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}


function sendEmailCallcenterComments(dados,usuarios, usuario, usuariocallcenter,mensagem, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Manutenção Correctiva / Ticket + ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Call Center adicionou um comentário', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> adicionou um comentário a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> , alocada ao técnico <b>" + dados.jobcard_tecniconome + "</b>. <br><b>Comentário: </b>" + mensagem + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. <br>Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Corrective Maintenance / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Call Center made comment', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> added a comment to the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>, allocated to the technician <b>" + dados.jobcard_tecniconome + "</b>. <br><b>Comment: </b>" + mensagem + ".<br> Log in to <i>Eagle I</i> to take action. <br>Regards";

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}


function sendEmailCallcenterCommentsPlanned(dados,usuarios, usuario, usuariocallcenter,mensagem, dadossiteinfo){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Manutenção Preventiva / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Call Center adicionou um comentário', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> adicionou um comentário a folha de serviço para o site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> , alocada ao técnico <b>" + dados.jobcard_tecniconome + "</b>. <br><b>Comentário: </b>" + mensagem + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. <br>Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Preventative Maintenance / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Call Center made comment', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> added a comment to the jobcard for the site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>, allocated to the technician <b>" + dados.jobcard_tecniconome + "</b>. <br><b>Comment: </b>" + mensagem + ".<br> Log in to <i>Eagle I</i> to take action. <br>Regards";

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}


function sendEmailTecnicoJobWait(dados, dadossiteinfo, razoestroca, usuarioscallcenter){
    if(!smtpTransport){
        return;
    }

    
    // comservsystems@comserv.co.mz
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarioscallcenter,  
            subject: 'Manutenção Correctiva / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Colocado em Espera', // Subject line
        }


        mail.html = "O Line Manager <b>" + dados.jobcard_linemanager + "</b> colocou em espera a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> pelas seguintes razões: "  + razoestroca + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. Cumprimentos";

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

function sendEmailTecnicoJobWaitPlanned(dados, dadossiteinfo, usuarios, razoestroca){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuarios,  
            subject: 'Manutenção Preventiva / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Colocado em Espera', // Subject line
        }


        mail.html = "O Line Manager <b>" + dados.jobcard_linemanager + "</b> colocou em espera a folha de serviço no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> pelas seguintes razões: "  + razoestroca + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. Cumprimentos";

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

function sendEmailTecnicoChangeJobWait(dados, dadossiteinfo, usuariotecnico, razoestroca){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuariotecnico.email,  
            subject: 'Manutenção Correctiva / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Mudança de Técnico', // Subject line
        }


        mail.html = "O seu Line Manager <b>" + dados.jobcard_linemanager + "</b> atribuiu a outro técnico a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> pelas seguintes razões: "  + razoestroca + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuariotecnico.email,  
            subject: 'Corrective Maintenance / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Change of Technician', // Subject line
        }


        mail.html = "Your Line Manager <b>" + dados.jobcard_linemanager + "</b> assigned another technician the jobcard with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> for the following reasons: "  + razoestroca + ".<br> Log in to <i>Eagle I</i> to take action. Regards";

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}

function sendEmailTecnicoChangeJobWaitPlanned(dados, dadossiteinfo, usuariotecnico, razoestroca){
    if(!smtpTransport){
        return;
    }
    
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuariotecnico.email,  
            subject: 'Manutenção Preventiva / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Mudança de Técnico', // Subject line
        }


        mail.html = "O seu Line Manager <b>" + dados.jobcard_linemanager + "</b> atribuiu a outro técnico a folha de serviço no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> pelas seguintes razões: "  + razoestroca + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção. Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuariotecnico.email,  
            subject: 'Preventative Maintenance / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Change of Technician', // Subject line
        }


        mail.html = "Your Line Manager <b>" + dados.jobcard_linemanager + "</b> assigned another technician the jobcard with the ticket number on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> for the following reasons: "  + razoestroca + ".<br> Log in to <i>Eagle I</i> to take action. Regards";

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();

    }
    
}

function sendEmailCallCenterHoraestimada(dados,userscallcenter, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: userscallcenter,  
            subject: 'Manutenção Correctiva / Ticket ' +  dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Técnico está atrasado', // Subject line
        }


        mail.html = "O Técnico <b>" + dados.jobcard_tecniconome + "</b> ainda não chegou ao site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> para atender o número do ticket <b>" + dados.jobcard_ttnumber + "</b>. Excedeu tempo estimado de viagem. <br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";
    
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    
    
}

function sendEmailCallCenterTecnicoChangeJobWait(dados, dadossiteinfo, tecniconovo, razoestroca, usuarioscallcenter){
    if(!smtpTransport){
        return;
    }

    // usuariocallcenter.idioma = "pt";
    
    // comservsystems@comserv.co.mz
   
    var mail = {
        from: '"COMSERV" <comservsystem@comserv.co.mz>',
        to: usuarioscallcenter,  
        subject: 'Manutenção Correctiva / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Mudança de Técnico', // Subject line
    }


    mail.html = "O line Manager <b>" + dados.jobcard_linemanager + "</b> atribuiu ao técnico <b>" + tecniconovo.nome + "</b> a folha de serviço com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> pelas seguintes razões: "  + razoestroca + ".<br> Acesse o <i>Eagle I</i> para tomar uma acção.<br> Cumprimentos";

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

function sendEmailUpdatedProject(dadosprojecto, projectonovo, usuariotecnico, usuariomanager, dadosUser){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usuariotecnico.email)
    mailrecip.push(usuariomanager.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Projecto Número ' + projectonovo.jobcard_projectnumber + ' - Nova Actualização', // Subject line
        }


        mail.html = "<b>" + dadosUser.nome + "</b> actualizou a folha de serviço alocada ao técnico <b>" + usuariotecnico.nome + "</b> com o projecto número <b>" + dadosprojecto.jobcard_projectnumber + "</b> no(s) site(s) <b>" + dadosprojecto.jobcard_site + "</b> para o cliente <b>" + dadosprojecto.cliente_nome + "</b>.<br> A folha de serviço passa a ter como número de projecto <b>" + projectonovo.jobcard_projectnumber + "</b> no(s) site(s) <b>" + projectonovo.jobcard_site + "</b> para o cliente <b>" + projectonovo.jobcard_clientenome + "</b>.<br> Acesse o <i>Eagle I</i> para verificar os detalhes.<br> Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Project Number ' + projectonovo.jobcard_projectnumber + ' - New Update', // Subject line
        }


        mail.html = "<b>" + dadosUser.nome + "</b> updated the jobcard allocated to the technician <b>" + usuariotecnico.nome + "</b> with project number <b>" + dadosprojecto.jobcard_projectnumber + "</b> on site(s) <b>" + dadosprojecto.jobcard_site + "</b> for the client <b>" + dadosprojecto.cliente_nome + "</b>.<br> The jobcard will now have as project number <b>" + projectonovo.jobcard_projectnumber + "</b> on site(s) <b>" + projectonovo.jobcard_site + "</b> for the client <b>" + projectonovo.jobcard_clientenome + "</b>.<br> Access <i>Eagle I</i> to verify the details.<br> Regards";

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
    
}

function sendEmailUpdatedProject1(dadosprojecto, projectonovo, usuariotecnico, usuariomanager, dadosUser){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usuariotecnico.email)
    mailrecip.push(usuariomanager.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Projecto Número ' + dadosprojecto.jobcard_projectnumber + ' - Nova Actualização', // Subject line
        }


        mail.html = "<b>" + dadosUser.nome + "</b> actualizou a folha de serviço alocada ao técnico <b>" + usuariotecnico.nome + "</b> com o projecto número <b>" + dadosprojecto.jobcard_projectnumber + "</b> no(s) site(s) <b>" + dadosprojecto.jobcard_site + "</b> para o cliente <b>" + dadosprojecto.cliente_nome + "</b>.<br> Acesse o <i>Eagle I</i> para verificar os detalhes.<br> Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Project Number ' + projectonovo.jobcard_projectnumber + ' - New Update', // Subject line
        }


        mail.html = "<b>" + dadosUser.nome + "</b> updated the service sheet allocated to the technician <b>" + usuariotecnico.nome + "</b> with project number <b>" + dadosprojecto.jobcard_projectnumber + "</b> on site(s) <b>" + dadosprojecto.jobcard_site + "</b> for the client <b>" + dadosprojecto.cliente_nome + "</b>.<br> Access <i>Eagle I</i> to verify the details.<br> Regards";

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
    
}

function sendEmailUpdatedJobcardCallCenter(dados, dadosnovos, usuariotecnico, usuariomanager, usuariocallcenter, dadossiteinfo, dadossiteinfoantigo, dadosclientes){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usuariotecnico.email)
    mailrecip.push(usuariomanager.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Manutenção Correctiva / Ticket ' + dadosnovos.jobcard_ttnumber + ' / Site ' + dadosnovos.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Nova Actualização', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter.nome + "</b> actualizou a folha de serviço alocada ao técnico <b>" + usuariotecnico.nome + "</b> com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfoantigo.siteinfo_sitename + "</b> para o cliente <b>" + dados.jobcard_clientenome + "</b>.<br> A folha de serviço passa a ter como número de ticket <b>" + dadosnovos.jobcard_ttnumber + "</b> no site <b>" + dadosnovos.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> para o cliente <b>" + dadosnovos.jobcard_clientenome + "</b>.<br> Acesse o <i>Eagle I</i> para verificar os detalhes.<br> Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Corrective Maintenance / Ticket ' + dadosnovos.jobcard_ttnumber + ' / Site ' + dadosnovos.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - New Update', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter.nome + "</b> updated the jobcard allocated to the technician <b>" + usuariotecnico.nome + "</b> with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfoantigo.siteinfo_sitename + "</b> to the client <b>" + dados.jobcard_clientenome + "</b>.<br> The jobcard now has as ticket number <b>" + dadosnovos.jobcard_ttnumber + "</b> on site <b>" + dadosnovos.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b> to the client <b>" + dadosnovos.jobcard_clientenome + "</b>.<br> Access <i>Eagle I</i> to verify the details.<br> Regards";;

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
    
}

function sendEmailUpdatedJobcardCallCenterPlanned(dados, dadosnovos, usuariotecnico, usuariomanager, usuariocallcenter, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usuariotecnico.email)
    mailrecip.push(usuariomanager.email)
    // comservsystems@comserv.co.mz
    
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Manutenção Preventiva / Ticket ' + dadosnovos.jobcard_ttnumber + ' / Site ' + dadosnovos.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Nova Actualização', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter.nome + "</b> actualizou a folha de serviço alocada ao técnico <b>" + usuariotecnico.nome + "</b> com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>.<br> A folha de serviço passa a ter como número de ticket <b>" + dadosnovos.jobcard_ttnumber + "</b>.<br> Acesse o <i>Eagle I</i> para verificar os detalhes.<br> Cumprimentos";

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

function sendEmailUpdatedJobcardCallCenter1Planned(dados, usuariotecnico, usuariomanager, usuariocallcenter, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usuariotecnico.email)
    mailrecip.push(usuariomanager.email)
    // comservsystems@comserv.co.mz

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Manutenção Preventiva / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Nova Actualização', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter.nome + "</b> actualizou a folha de serviço alocada ao técnico <b>" + usuariotecnico.nome + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>.<br> Acesse o <i>Eagle I</i> para verificar os detalhes.<br> Cumprimentos";

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

function sendEmailUpdatedJobcardCallCenter1(dados, usuariotecnico, usuariomanager, usuariocallcenter, dadossiteinfo){
    if(!smtpTransport){
        return;
    }

    var mailrecip = [];
    mailrecip.push(usuariotecnico.email)
    mailrecip.push(usuariomanager.email)
    // comservsystems@comserv.co.mz
    if((!usuariotecnico.idioma) || (usuariotecnico.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Manutenção Correctiva / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - Nova Actualização', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter.nome + "</b> actualizou a folha de serviço alocada ao técnico <b>" + usuariotecnico.nome + "</b> com o número de ticket <b>" + dados.jobcard_ttnumber + "</b> no site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>.<br> Acesse o <i>Eagle I</i> para verificar os detalhes.<br> Cumprimentos";

    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: mailrecip,  
            subject: 'Corrective Maintenance / Ticket ' + dados.jobcard_ttnumber + ' / Site ' + dados.jobcard_site + ' - ' + dadossiteinfo.siteinfo_sitename + ' - New Update', // Subject line
        }


        mail.html = "<b>" + usuariocallcenter + "</b> updated the jobcard allocated to the technician <b>" + usuariotecnico.nome + "</b> with the ticket number <b>" + dados.jobcard_ttnumber + "</b> on site <b>" + dados.jobcard_site + " - " + dadossiteinfo.siteinfo_sitename + "</b>.<br> Access <i>Eagle I</i> to verify the details.<br> Regards";;

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
    
}

function sendEmailNewStockRequest(dados,usuario, usuariolinemanager,items){
    if(!smtpTransport){
        return;
    }
    // comservsystems@comserv.co.mz
    if((!usuario.idioma) || (usuario.idioma == "pt")){
        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuariolinemanager.email,  
            subject: 'Nova requisição de estoque para ' + usuario.nome, // Subject line
        }


        // mail.html = "Um pedido de estoque foi submetido à sua aprovação, por favor verifique."

         mail.html = "Um pedido de estoque foi submetido à sua aprovação.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th></tr>"+ items + "</table><br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";


    //mail.to = usr.email
        smtpTransport.sendMail(mail, function(error, response){
            if(error){
            console.log(error);
            }else{
            console.log("Message sent: " + response);
            }                
        }); 
        smtpTransport.close();
    }else{

        var mail = {
            from: '"COMSERV" <comservsystem@comserv.co.mz>',
            to: usuariolinemanager.email,  
            subject: 'New stock request for ' + usuario.nome, // Subject line
        }


        // mail.html = "A request for stock has been submitted for your approval please action."

         mail.html = "A request for stock has been submitted for your approval please action.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th></tr>"+ items + "</table><br> Access <i>Eagle I</i> to take action.<br> Regards";


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
    
}

    function sendEmailAprovadoStockRequest(usuario){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!usuario.idioma) || (usuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Pedido de stock aprovado', // Subject line
            }


            mail.html = "O seu pedido de stock foi aprovado. Receberá uma notificação do armazém para recolher os seus artigos requeridos."

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Stock request approved ', // Subject line
            }


            mail.html = "Your stock request has been approved. You will receive a notification from the warehouse to collect your required items."

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
        
    }


    function sendEmailAprovadoStockRequestWarehouse(usuario, items){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!usuario.idioma) || (usuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Pedido de stock aprovado', // Subject line
            }

             mail.html = "Foi-lhe enviado um pedido de reserva de estoque. Por favor, recolha os materiais necessários e notifique o requerente.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th></tr>"+ items + "</table><br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";



            // mail.html = "Foi-lhe enviado um pedido de reserva de estoque. Por favor, recolha os materiais necessários e notifique o requerente. "

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Stock request approved ', // Subject line
            }

             mail.html = "A stock request has been sent to you for bookout. Please gather the required materials and notify the requestor.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th></tr>"+ items + "</table><br> Access <i>Eagle I</i> to take action.<br> Regards";



            // mail.html = "A stock request has been sent to you for bookout. Please gather the required materials and notify the requestor."

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
        
    }


    function sendEmailReprovadoStockRequest(usuario, mensagemrazoes){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!usuario.idioma) || (usuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Pedido de stock declinado', // Subject line
            }


            mail.html = "O seu pedido de stock foi recusado pela seguinte razão - <b>" + mensagemrazoes + "</b>";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Stock request decllined ', // Subject line
            }


            mail.html = "Your request for stock has been declined for the following reason - <b>" + mensagemrazoes + "</b>";

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
        
    }


    function sendEmailReturnStockRequest(usuario, mensagemrazoes){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!usuario.idioma) || (usuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Devolução do pedido de requisição de estoque', // Subject line
            }


            mail.html = "<b>" + usuario.nome_supervisor + "</b> enviou de volta o pedido de requisição de stock para correcção. Razão - <b>" + mensagemrazoes + "</b>. Faça a alteração necessária e reenvie para aprovação.";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Stock request sent back ', // Subject line
            }


            mail.html = "<b>" + usuario.nome_supervisor + "</b> has sent back the stock request for correction. Reason - <b>" + mensagemrazoes + "</b>. Make the necessary change and resend for approval.";

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
        
    }

    function sendEmailBookout(dados,usuario){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!usuario.idioma) || (usuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Requisição de estoque nr ' + dados.stocK_request_number + ' - Pronto para recolha', // Subject line
            }


            mail.html = "O seu pedido de stock está pronto para recolha no armazém <b>" + dados.request_from + "</b>. Por favor, verifique as quantidades no momento da recepção. Se não verificar as quantidades, a sua lista de stock não será actualizada."

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Stock request no ' + dados.stocK_request_number + ' - Ready for collection', // Subject line
            }


            mail.html = "Your stock request is ready for collection at <b>" + dados.request_from + "</b>. Please verify the quantities upon receipt. If you do not verify the quantities your stock list will not be updated."

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
        
    }


    function sendEmailStockVerification(dados,usuario){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!usuario.idioma) || (usuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Estoque Verificado', // Subject line
            }


            mail.html = "Lista de todos itens:<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th> </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> BookOut </th>  <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Recebidos </th></tr>"+ dados + "</table>";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: usuario.email,  
                subject: 'Stock Verified', // Subject line
            }

  mail.html = "List of all items:<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th> </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> BookOut </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Received </th></tr>"+ dados + "</table>";


            // mail.html = "List of all items:<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantity </th> </tr>"+ dados + "</table>";

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
        
    }


     function sendEmailPosendforapproval(dadossupervisor,nomerequisitor, items){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!dadossupervisor.idioma) || (dadossupervisor.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadossupervisor.email,  
                subject: 'Nova Ordem de Compra de ' + nomerequisitor, // Subject line
            }

            mail.html = "Uma PO para foi submetido à sua aprovação.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preço </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table><br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

            // mail.html = "Uma PO para foi submetido à sua aprovação.<br> Acesse o <i>Eagle I</i> para tomar uma acção.<br> Cumprimentos";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadossupervisor.email,  
                subject: 'New Purchase Order for ' + nomerequisitor, // Subject line
            }

             mail.html = "A Purchase Order has been submitted for your approval.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preço </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table><br> Access <i>Eagle I</i> to take action.<br> Regards";



            // mail.html = "A Purchase Order has been submitted for your approval.<br> Access <i>Eagle I</i> to take action.<br> Regards";

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
        
    }

    function sendEmailPorequestapproved(dadosrequisitor, items){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!dadosrequisitor.idioma) || (dadosrequisitor.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosrequisitor.email,  
                subject: 'Ordem de Compra Aprovada', // Subject line
            }

             mail.html = "A sua ordem de compra foi aprovada. Imprima a ordem de compra em pdf ou papel se necessário e envie-o para o fornecedor.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preço </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table><br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

            // mail.html = "A sua ordem de compra foi aprovada. Imprima a ordem de compra em pdf ou papel se necessário e envie-o para o fornecedor.<br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosrequisitor.email,  
                subject: 'PO Approved', // Subject line
            }

             mail.html = "Your purchase order has been approved. Print the PO to pdf or paper if needed and send it to the supplier.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preço </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table><br> Access <i>Eagle I</i> to take action.<br> Regards";

            // mail.html = "Your purchase order has been approved. Print the PO to pdf or paper if needed and send it to the supplier.<br> Access <i>Eagle I</i> to see details.<br> Regards";

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
        
    }

    function sendEmailPorequestapprovedmanager(dadospo, dadosmanager, dadositems, ponumero){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!dadosmanager.idioma) || (dadosmanager.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosmanager.email,  
                subject: 'Ordem de Compra Aprovada', // Subject line
            }


            mail.html = "A ordem de compra <b>" + ponumero + "</b> foi aprovada. Será notificado quando os itens abaixo chegarem.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preço </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ dadositems + "</table><br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosmanager.email,  
                subject: 'PO Approved', // Subject line
            }


            mail.html = "The purchase order <b>" + ponumero + "</b> has been approved. You will be notified when the below items arrive.<br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantity </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Price </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ dadositems + "</table><br> Access <i>Eagle I</i> to see details.<br> Regards";

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
        
    }


    function sendEmailPorequestdeclined(dadospo,dadosusuario, razoes, items){
        if(!smtpTransport){
            return;
        }

        // var mailrecip = [];
        // mailrecip.push(dadosmanager.email)
        // mailrecip.push(dadosrequestor.email)


        // comservsystems@comserv.co.mz
        if((!dadosusuario.idioma) || (dadosusuario.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosusuario.email,  
                subject: 'Ordem de Compra Recusado', // Subject line
            }


            mail.html = "O seu pedido de compra foi recusado pela seguinte razão: <b>" +  razoes+ "</b>."+"<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preco </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table>"+ "<br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosusuario.email,  
                subject: 'Purchase Order Declined', // Subject line
            }


            mail.html = "Your purchase order has been declined for the following reason: <b>" +  razoes+ "</b>."+"<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantity </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Price </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table>"+"<br> Access <i>Eagle I</i> to see details.<br> Regards";

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
        
    }

    function sendEmailPorequestsendback(dadosrequestor, razoes, items){
        if(!smtpTransport){
            return;
        }

        // comservsystems@comserv.co.mz
        if((!dadosrequestor.idioma) || (dadosrequestor.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosrequestor.email,  
                subject: 'Ordem de Compra Devolvido', // Subject line
            }


            mail.html = "O seu line manager <b>" + dadosrequestor.nome_supervisor + "</b> devolveu a ordem de compra. Razão: <b>" +  razoes+ "</b>. Faça a alteração necessária e reenvie para aprovação.<br>"+"<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantidade </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preco </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table>"+"<br> Accesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosrequestor.email,  
                subject: 'Purchase Order Sent Back', // Subject line
            }


            mail.html = "Your line manager <b>" + dadosrequestor.nome_supervisor + "</b> has sent back the purchase order. Reason: <b>" +  razoes+ "</b>. Make the necessary change and resend for approval.<br>"+"<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Quantity </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Price </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Total </th></tr>"+ items + "</table>"+" Access <i>Eagle I</i> to see details.<br> Regards";

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
        
    }

    function sendEmailPoreceivegoods(dadosmanager, dadospo, itens){
        if(!smtpTransport){
            return;
        }
        // comservsystems@comserv.co.mz
        if((!dadosmanager.idioma) || (dadosmanager.idioma == "pt")){
            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosmanager.email,  
                subject: 'Itens para a ordem de compra ' + dadospo.po_number + ' recebidos', // Subject line
            }


            mail.html = "Os itens para a ordem de compra acabam de ser verificados. A lista de stock será actualizada com as quantidades abaixo indicadas: <br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Recebido </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Preço </th></tr>"+ itens + "</table><br> Acesse o <i>Eagle I</i> para mais informações.<br> Cumprimentos";

        //mail.to = usr.email
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                console.log(error);
                }else{
                console.log("Message sent: " + response);
                }                
            }); 
            smtpTransport.close();
        }else{

            var mail = {
                from: '"COMSERV" <comservsystem@comserv.co.mz>',
                to: dadosmanager.email,  
                subject: 'Goods for PO ' + dadospo.po_number + ' received', // Subject line
            }


            mail.html = "The goods for the purchase order has just been verified. The stocklist will be updated with below quantities: <br>" + "<table style='border: 1px solid black;border-collapse: collapse;'>"+"<tr> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Item </th> <th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Received </th><th style='border: 1px solid black;border-collapse: collapse;padding: 15px;'> Price </th></tr>"+ itens + "</table><br> Access <i>Eagle I</i> to see details.<br> Regards";

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
        
    }

    
module.exports.createConnection = createConnection;
module.exports.sendEmail = sendEmail;
module.exports.sendEmail1 = sendEmail1;
module.exports.sendEmailCreateTTNumber = sendEmailCreateTTNumber;
module.exports.sendEmailCallCenterHoraestimada = sendEmailCallCenterHoraestimada;
module.exports.sendEmailCallcenter = sendEmailCallcenter;
module.exports.sendEmailCallcenterPlanned = sendEmailCallcenterPlanned;
module.exports.sendEmailCallcenter1 = sendEmailCallcenter1;
module.exports.sendEmailCallcenter1Planned = sendEmailCallcenter1Planned;
module.exports.sendEmailCallcenter2 = sendEmailCallcenter2;
module.exports.sendEmailCallcenter2Planned = sendEmailCallcenter2Planned;
module.exports.sendEmailHSProblem = sendEmailHSProblem;
module.exports.sendEmailSendJobcardAprroval = sendEmailSendJobcardAprroval;
module.exports.sendEmailSendJobcardAprrovalPlanned = sendEmailSendJobcardAprrovalPlanned;
module.exports.sendEmailSendJobcardApproved = sendEmailSendJobcardApproved;
module.exports.sendEmailSendJobcardRejected = sendEmailSendJobcardRejected;
module.exports.sendEmailCallcenterComments = sendEmailCallcenterComments;
module.exports.sendEmailNewStockRequest = sendEmailNewStockRequest;
module.exports.sendEmailAprovadoStockRequest = sendEmailAprovadoStockRequest;
module.exports.sendEmailAprovadoStockRequestWarehouse = sendEmailAprovadoStockRequestWarehouse;
module.exports.sendEmailReprovadoStockRequest = sendEmailReprovadoStockRequest;
module.exports.sendEmailReturnStockRequest = sendEmailReturnStockRequest;
module.exports.sendEmailBookout = sendEmailBookout;
module.exports.sendEmailStockVerification = sendEmailStockVerification;
module.exports.sendEmailTecnicoJobWait = sendEmailTecnicoJobWait;
module.exports.sendEmailTecnicoJobWaitPlanned = sendEmailTecnicoJobWaitPlanned;
module.exports.sendEmailTecnicoChangeJobWait = sendEmailTecnicoChangeJobWait;
module.exports.sendEmailCallCenterTecnicoChangeJobWait = sendEmailCallCenterTecnicoChangeJobWait;
module.exports.sendEmailTecnicoJobWaitPlanned = sendEmailTecnicoJobWaitPlanned;
module.exports.sendEmailTecnicoReceiveNewJobPlanned = sendEmailTecnicoReceiveNewJobPlanned;
module.exports.sendEmailTecnicoChangeJobWaitPlanned = sendEmailTecnicoChangeJobWaitPlanned;
module.exports.sendEmailSendJobcardApprovedPlanned = sendEmailSendJobcardApprovedPlanned;
module.exports.sendEmailCallcenterCommentsPlanned = sendEmailCallcenterCommentsPlanned;
module.exports.sendEmailHSProblemPlanned = sendEmailHSProblemPlanned;
module.exports.sendEmailSendJobcardRejectedPlanned = sendEmailSendJobcardRejectedPlanned;
module.exports.sendEmailUpdatedJobcardCallCenterPlanned = sendEmailUpdatedJobcardCallCenterPlanned;
module.exports.sendEmailUpdatedJobcardCallCenter = sendEmailUpdatedJobcardCallCenter;
module.exports.sendEmailUpdatedJobcardCallCenter1 = sendEmailUpdatedJobcardCallCenter1;
module.exports.sendEmailUpdatedJobcardCallCenter1Planned = sendEmailUpdatedJobcardCallCenter1Planned;
module.exports.sendEmailPosendforapproval = sendEmailPosendforapproval;
module.exports.sendEmailPorequestapproved = sendEmailPorequestapproved;
module.exports.sendEmailPorequestapprovedmanager = sendEmailPorequestapprovedmanager;
module.exports.sendEmailPorequestdeclined = sendEmailPorequestdeclined;
module.exports.sendEmailPorequestsendback = sendEmailPorequestsendback;
module.exports.sendEmailPoreceivegoods = sendEmailPoreceivegoods;
module.exports.sendEmailCreateProject = sendEmailCreateProject;
module.exports.sendEmailUpdatedProject = sendEmailUpdatedProject;
module.exports.sendEmailUpdatedProject1 = sendEmailUpdatedProject1;
module.exports.sendEmailAceitarProjecto= sendEmailAceitarProjecto;
module.exports.sendEmailChegadaProjecto = sendEmailChegadaProjecto;
module.exports.sendEmailLeavesiteproject = sendEmailLeavesiteproject;
module.exports.sendEmailHSProblemProject = sendEmailHSProblemProject;
module.exports.sendEmailSendJobcardAprrovalProject = sendEmailSendJobcardAprrovalProject;
module.exports.sendEmailSendJobcardApprovedProject = sendEmailSendJobcardApprovedProject;
module.exports.sendEmailSendJobcardRejectedProject = sendEmailSendJobcardRejectedProject;
module.exports.sendEmailCallcenterCommentsProjects = sendEmailCallcenterCommentsProjects;
module.exports.transferenciaManager = transferenciaManager;
module.exports.sendEmailCreateTTNumberhvacassistants = sendEmailCreateTTNumberhvacassistants;
module.exports.sendEmailCallcenterhvac = sendEmailCallcenterhvac;
module.exports.sendEmailCallcenterchegadasite = sendEmailCallcenterchegadasite;
module.exports.sendEmailSendJobcardAprrovalhvac = sendEmailSendJobcardAprrovalhvac;
module.exports.sendEmailSendJobcardApprovedhvac = sendEmailSendJobcardApprovedhvac;
module.exports.sendEmailCallcenter2hvac = sendEmailCallcenter2hvac;
module.exports.sendEmailSendJobcardRejectedhvac = sendEmailSendJobcardRejectedhvac;

module.exports.problemasSeguranca = problemasSeguranca;
module.exports.testAttachment = testAttachment;
