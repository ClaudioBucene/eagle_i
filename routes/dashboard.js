var express=require("express");
var router=express.Router();
var insp_veiculo_db=require("../entities/veiculo");
var trasnferencias_db=require("../entities/transferencia_veiculo");
var viaturas_db=require("../entities/oficina");
var stock_request_db=require("../entities/stock_request");
var po_db=require("../entities/po");
var model_db=require("../entities/usuario")

router.get("/", async function(req, res){
    var userData=req.session.usuario;
    var dia=await (new Date()).getDate()<10? ("0"+(new Date()).getDate()):((new Date()).getDate());
    var mes= await (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)):((new Date()).getMonth()+1);
    var ano =await (new Date()).getFullYear();
    var argumento=await ano+"-"+mes+"-"+dia+"T00:00:00";
    console.log(argumento)
   var veiculos= await insp_veiculo_db.aggregate([{$match:{data_inspecao:{$gt:new Date(argumento)}}}, {$group:{_id:"$observacao", soma:{$sum:1}}}]).sort({_id:-1});
    console.log(JSON.stringify(veiculos));

    // *********** "datta":{ $regex:controle, $options: "i" }****************************************************viaturas****************************************************************************

    var viaturas= await viaturas_db.aggregate([{$group:{_id:{$cond:{if:{$eq:["$responsavel","Oficina" ] }, then:"Oficina", else:{$cond:{if:{$eq:["$responsavel", "Parque"]}, then:"Parque", else:"Activo"}}}}, soma:{$sum:1}} }])
    var transferencias= await trasnferencias_db.aggregate([{$group:{_id:{$cond:{if:{$eq:[{$size:"$estagio"}, 1]}, then:"Pendente", else:{$cond:{if:{$eq:[{"$arrayElemAt": ["$estagio", -1]},0]}, then:"Reprovado", else:"Aprovado"}}}}, soma:{$sum:1}}}])
    console.log(transferencias);
   res.render("inicio1", {DataU:userData, Inspecao:JSON.stringify(veiculos), Insp:veiculos, Viaturas:JSON.stringify(viaturas), Viat:viaturas, Transferenciasa:JSON.stringify(transferencias), Transff:transferencias ,title:"EagleI"})
})



router.get("/inspecoes/:id", async function(req, res){
    var userData=req.session.usuario;
    var dia=await (new Date()).getDate()<10? ("0"+(new Date()).getDate()):((new Date()).getDate());
    var mes= await (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)):((new Date()).getMonth()+1);
    var ano =await (new Date()).getFullYear();
    var tmp=req.params.id;
    var argumento=await ano+"-"+mes+"-"+dia+"T00:00:00";
    if(userData.nivel_acesso=="admin"|| userData.funcao=="Manager"){
        var inspec= await insp_veiculo_db.aggregate([{$match:{data_inspecao:{$gt:new Date(argumento)}, observacao:req.params.id}}, {$group:{_id:"$regiao", soma:{$sum:1}}}])
        console.log(JSON.stringify(inspec), req.params.id.toString());
        res.render("dashboard_inspv_regional",{backgrnd:tmp, DataU:userData, Mensagem:JSON.stringify(inspec), title:"EagleI" })
        }
    else
        res.redirect("/inicio")


})



router.get("/inspveh/:regiao/:observac", async (req, res)=>{

    var userData=req.session.usuario;
    var userData=req.session.usuario;
    var dia=await (new Date()).getDate()<10? ("0"+(new Date()).getDate()):((new Date()).getDate());
    var mes= await (new Date()).getMonth()+1<10? ("0"+((new Date()).getMonth()+1)):((new Date()).getMonth()+1);
    var ano =await (new Date()).getFullYear();
    
    var argumento=await ano+"-"+mes+"-"+dia+"T00:00:00";
    insp_veiculo_db.find({regiao:req.params.regiao.toLowerCase(), observacao:req.params.observac, data_inspecao:{$gt:new Date(argumento)}}, function(err, data){
        if(err)
            console.log("dados nao encontrado")
        else
            {
                console.log(data)
                res.render('inspdiaria_home', {DataU:userData, veiculos: data,   title:'EagleI'});
            }
            }).lean()
    
})


router.get("/viaturas/:id", async function(req, res){
    var userData=req.session.usuario;
    

    if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.id=="operacional"){
        var viaturras= await viaturas_db.aggregate([{$match:{$and:[{responsavel:{$ne:"Parque"}}, {responsavel:{$ne:"Oficina"}}]}}, {$group:{_id:"$regiao", soma:{$sum:1}}}])
        console.log(viaturras);
        res.render("dashboard_viaturas_regional",{backgrnd:"green", DataU:userData, Mensagem:JSON.stringify(viaturras), title:"EagleI" })
        // res.render("dashboard_inspv_regional",{backgrnd:tmp, DataU:userData, Mensagem:JSON.stringify(inspec), title:"EagleI" })
        }
    else
        if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.id=="parque"){
            var viaturras= await viaturas_db.aggregate([{$match:{responsavel:"Parque"}}, {$group:{_id:"$regiao", soma:{$sum:1}}}])
            console.log(viaturras);
            res.render("dashboard_viaturas_regional",{backgrnd:"orange", DataU:userData, Mensagem:JSON.stringify(viaturras), title:"EagleI" })
        }
        else
            if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.id=="oficina"){
                var viaturras= await viaturas_db.aggregate([{$match:{responsavel:"Oficina"}}, {$group:{_id:"$regiao", soma:{$sum:1}}}])
                console.log(viaturras);
                res.render("dashboard_viaturas_regional",{backgrnd:"red", DataU:userData, Mensagem:JSON.stringify(viaturras), title:"EagleI" })

            }
            else
                res.redirect("/inicio")


})

router.get("/enconrt/:if/:jk", async (req, res)=>{
    var userData=req.session.usuario;
   var filtro1=req.params.if.replace(/_/g, " ");
   var filtro2=req.params.jk;
   
    var viaturras= await model_db.find({departamento:filtro1, $and:[{responsavel:{$ne:"Parque"}}, {responsavel:{$ne:"Oficina"}}], regiao:filtro2.toLowerCase()})

        var matriculas=[];
        await Promise.all(viaturras.map(async (v, it)=>{
            matriculas.push(v.nome)
        })
        )
        // console.log(matriculas);
         viaturas_db.find({responsavel:{$in:matriculas}},  function(err, dados){
            if(err)
                console.log("erro")
            else
               { 
               console.log(dados);
            res.render('ferramenta_home', {DataU: userData, Ferramenta: dados,  title: 'EagleI'});
         }
        })



    


})


router.get("/listveh/:regiao/:observac", async (req, res)=>{

    var userData=req.session.usuario;


     if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.observac=="green"){
         var viaturras= await viaturas_db.find({regiao:req.params.regiao.toLowerCase(), $and:[{responsavel:{$ne:"Parque"}}, {responsavel:{$ne:"Oficina"}}]})
        // console.log(viaturras);
        var matriculas=[];
        await Promise.all(viaturras.map(async (v, it)=>{
            matriculas.push(v.responsavel)
        })
        )
        // console.log(matriculas);
         var test=model_db.aggregate([{$match:{nome:{$in:matriculas}}}, {$group:{_id:"$departamento", soma:{$sum:1}}}], function(err, dados){
            if(err)
                console.log("erro")
            else
               { 
               console.log(dados);
             res.render("dashboard_viaturas_regional_depart",{backgrnd:"green", DataU:userData, Mensagem:JSON.stringify(dados),regiao:req.params.regiao,title:"EagleI" })}
        }).sort({_id:1})


        // 
         // res.render('ferramenta_home', {DataU:userData, Ferramenta: viaturras,  title: 'EagleI'});
        // res.render("dashboard_inspv_regional",{backgrnd:tmp, DataU:userData, Mensagem:JSON.stringify(inspec), title:"EagleI" })
        }
    else
        if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.observac=="orange"){
            var viaturras= await viaturas_db.find({regiao:req.params.regiao.toLowerCase(), responsavel:"Parque"})
            console.log(viaturras);
            res.render('ferramenta_home', {DataU:userData, Ferramenta: viaturras,  title: 'EagleI'});
        }
        else
            if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.observac=="red"){
                var viaturras= await viaturas_db.find({regiao:req.params.regiao.toLowerCase(), responsavel:"Oficina"})
                console.log(viaturras);
                 res.render('ferramenta_home', {DataU:userData, Ferramenta: viaturras,  title: 'EagleI'});

            }
            else
                res.redirect("/inicio")




})

// *******************************************************inicio de ++++++++++++++++++++++++++++++++++************************************************************************************************

// router.get("/listveh/:regiao/:observac", async (req, res)=>{

//     var userData=req.session.usuario;
   
    
   
//     // viaturas_db.find({regiao:req.params.regiao.toLowerCase(), responsavel:temp}, function(err, data){
//     //     if(err)
//     //         console.log("dados nao encontrado")
//     //     else
//     //         {
//     //             console.log(data)
//     //             res.render('ferramenta_home', {DataU:userData, Ferramenta: data, Usuarios:dataUsuarios, title: 'EagleI'});
//     //         }
//     //         }).lean()

//      if(userData.nivel_acesso=="admin" && req.params.observac=="green"){
//         var viaturras= await viaturas_db.find({regiao:req.params.regiao.toLowerCase(), $and:[{responsavel:{$ne:"Parque"}}, {responsavel:{$ne:"Oficina"}}]})
//         console.log(viaturras);
//          res.render('ferramenta_home', {DataU:userData, Ferramenta: viaturras,  title: 'COMSERV'});
//         // res.render("dashboard_inspv_regional",{backgrnd:tmp, DataU:userData, Mensagem:JSON.stringify(inspec), title:"EagleI" })
//         }
//     else
//         if(userData.nivel_acesso=="admin" && req.params.observac=="orange"){
//             var viaturras= await viaturas_db.find({regiao:req.params.regiao.toLowerCase(), responsavel:"Parque"})
//             console.log(viaturras);
//             res.render('ferramenta_home', {DataU:userData, Ferramenta: viaturras,  title: 'EagleI'});
//         }
//         else
//             if(userData.nivel_acesso=="admin" && req.params.observac=="red"){
//                 var viaturras= await viaturas_db.find({regiao:req.params.regiao.toLowerCase(), responsavel:"Oficina"})
//                 console.log(viaturras);
//                  res.render('ferramenta_home', {DataU:userData, Ferramenta: viaturras,  title: 'EagleI'});

//             }
//             else
//                 res.redirect("/inicio")


    
// })

// ******************************************************************************************fim do ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get("/transferencias/:id", async function(req, res){

var userData=req.session.usuario;

if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.id=="aprovados"){
        var viaturras= await trasnferencias_db.find({"estagio.1":1}).lean()
        console.log(viaturras);
         res.render('transferencia_home',  {DataU:userData,Transferencias: viaturras, funcionario: "logged!!", title: 'EagleI'});
        // res.render("dashboard_inspv_regional",{backgrnd:tmp, DataU:userData, Mensagem:JSON.stringify(inspec), title:"EagleI" })
        }
    else
        if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.id=="pendentes"){
            var viaturras= await trasnferencias_db.find({"estagio.2":{$exists:false}}).lean()
            console.log(viaturras);
             res.render('transferencia_home',  {DataU:userData, Transferencias: viaturras, funcionario: "logged!!", title: 'EagleI'});
        }
        else
            if((userData.nivel_acesso=="admin"|| userData.funcao=="Manager") && req.params.id=="reprovados"){
                var viaturras= await trasnferencias_db.find({"estagio.2":0}).lean()
                console.log(viaturras);
                  res.render('transferencia_home',  {DataU:userData,Transferencias: viaturras, funcionario: "logged!!", title: 'EagleI'});

            }
            else
                res.redirect("/inicio")




})






module.exports=router;

