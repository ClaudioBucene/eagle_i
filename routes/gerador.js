var express = require('express');
var router = express.Router();
var csv = require("csv-express");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var gerador = require("../entities/gerador.js");
var model = require('../entities/usuario');
var sitee = require("../entities/site.js");
var siteinfo = require("../entities/siteinfo.js");
var usuarios = require('../entities/usuario');
var multer = require('multer');
var path = require("path");
var emailSender=require('../util/sendEmail');
var fs = require('fs');
var moment = require('moment');
var mdq = require('mongo-date-query');
var json2csv = require('json2csv').parse;
// var path = require('path')
var fields = ['siteNumber', 'dateplanned','tobedoneby','maintenanceofficer','status'];
var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
require("../scheduled/inspsites_schedule.js");
    
    

var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            //console.log(file);
            var dir = './public/Inspecção_Site/' + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1;
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
            cb(null, './uploads/')
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

    var dia = ((new Date()).getDate()<10) ? ("0" + (new Date()).getDate()): ((new Date()).getDate());
    var mes = (((new Date()).getMonth()+1)<10) ? ("0" + ((new Date()).getMonth()+1)): (((new Date()).getMonth())+1);
    var ano = (new Date()).getFullYear();
    var dataActual = dia + "/" + mes + "/" + ano;
    var estadocedo = "Done early";
    var estadoactual = "Done on time";
    var estadotarde = "Done later";
    

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
                }, function(err, result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    else{
                        if(result[0].maintenanceofficer == undefined){
                            for (var i = 0, j = result.length; i < j; i++) {

                                var site = {};
                                var safetyOb = {};
                                var EDBoardOb = {};
                                var container = {};
                                var roofTop = {};
                                var mast = {};
                                var airCond = {};
                                var site_general = {};
                                var alarms = {};
                                var generator = {};


                                site.siteNumber = result[i].basestationno;
                                site.siteName = result[i].sitename;
                                site.tobedoneby = result[i].doneby;
                                site.ticketNumber = result[i].ttnumber;
                                site.regiaoselmec = "";
                                site.siteType = result[i].typeofsite;
                                site.dateplanned = result[i].planneddate;


                                var datap = result[i].planneddate.split('/');
                                //console.log(datap);
                                var dia2 = datap[0];
                                var mes2 = datap[1] - 1;
                                site.mesplaneado = mes2;
                                var ano2 = datap[2];
                                site.anoplaneado = ano2;
                                // var dataPlaneada2 = (new Date(ano2, mes2, dia2).getTime()) + 86400000;
                                var dataPlaneada2 = (new Date(ano2, mes2, dia2).getTime());
                                site.dataPlaneada2 = dataPlaneada2;
                                var cincodias = 86400000 * 5;
                                var quatrodias = 86400000 * 4;
                                var diaAntes = dataPlaneada2 - cincodias;
                                site.diaAntes = diaAntes;
                                var diaDepois = dataPlaneada2 + quatrodias;
                                site.diaDepois = diaDepois;

                                var month1 = parseInt(mes);
                                var dataActual3 = new Date(parseInt(ano), (month1 - 1), parseInt(dia), 2, 0, 0).getTime();
                                console.log(new Date(parseInt(ano), (month1 - 1), parseInt(dia), 2, 0, 0))
                                site.espera = false;

                                if(result[i].status == "Inspection Done"){
                                    if(dataPlaneada2 > dataActual3){
                                        site.status = "Done early";
                                        
                                    } else{
                                        site.status = "Done on time";
                                    }
                                }else{
                                    if(diaDepois < dataActual3){
                                        site.status = "Delayed Inspection";
                                    }
                                    else{
                                        site.status = result[i].status;
                                    }
                                }
                                
                               
                                site.company = "";
                                site.dateChecked = "";
                                site.maintenanceofficer = "";
                                

                                /*Safety*/
                                site.safetyOb = safetyOb;
                                site.safetyOb.veiculo_safe = result[i].qadecision1_1;
                                site.safetyOb.veiculo_safe_comment = result[i].cacomment1_1;
                                site.safetyOb.people_safe = result[i].qadecision1_2;
                                site.safetyOb.people_safe_comment = result[i].cacomment1_2;
                                site.safetyOb.red_hat = result[i].qadecision1_3;
                                site.safetyOb.red_hat_comment = result[i].cacomment1_3;
                                site.safetyOb.fall_Arrest_devices = result[i].qadecision1_4;
                                site.safetyOb.fall_Arrest_devices_comment = result[i].cacomment1_4;

                                /*EDBoardOb*/
                                site.EDBoardOb = EDBoardOb;
                                site.EDBoardOb.connections = result[i].qadecision2_1;
                                site.EDBoardOb.connections_comment = result[i].cacomment2_1;
                                site.EDBoardOb.energy_meter = result[i].qadecision2_2;
                                site.EDBoardOb.energy_meter_comment = result[i].cacomment2_2;
                                site.EDBoardOb.switching_mec = result[i].qadecision2_3;
                                site.EDBoardOb.switching_mec_comment = result[i].cacomment2_3;
                                site.EDBoardOb.d_board_sleeves = result[i].qadecision2_4;
                                site.EDBoardOb.d_board_sleeves_comment = result[i].cacomment2_4;
                                site.EDBoardOb.light_switch = result[i].qadecision2_5;
                                site.EDBoardOb.light_switch_comment = result[i].cacomment2_5;
                                site.EDBoardOb.paintwork_sitelight = result[i].qadecision2_6;
                                site.EDBoardOb.paintwork_sitelight_comment = result[i].cacomment2_6;
                                site.EDBoardOb.ac_supplier_defects = result[i].qadecision2_7;
                                site.EDBoardOb.ac_supplier_defects_comment = result[i].cacomment2_7;

                                /* container*/
                                site.container = container;
                                site.container.container_light = result[i].qadecision3_1;
                                site.container.container_light_comment = result[i].cacomment3_1;
                                site.container.circuit_breaker = result[i].qadecision3_2;
                                site.container.circuit_breaker_comment = result[i].cacomment3_2;
                                site.container.earth_connections = result[i].qadecision3_3;
                                site.container.earth_connections_comment = result[i].cacomment3_3;
                                site.container.conditions = result[i].qadecision3_4;
                                site.container.conditions_comment = result[i].cacomment3_4;
                                site.container.paintwork = result[i].qadecision3_5;
                                site.container.paintwork_comment = result[i].cacomment3_5;
                                site.container.roof_water = result[i].qadecision3_6;
                                site.container.roof_water_comment = result[i].cacomment3_6;
                                site.container.joints_cables_holes = result[i].qadecision3_7;
                                site.container.joints_cables_holes_comment = result[i].cacomment3_7;
                                site.container.transmission_radio = result[i].qadecision3_8;
                                site.container.transmission_radio_comment = result[i].cacomment3_8;


                                /* roofTop*/
                                site.roofTop = roofTop;
                                site.roofTop.mounting_poles = result[i].qadecision4_1;
                                site.roofTop.mounting_poles_comment = result[i].cacomment4_1;
                                site.roofTop.poles_corrosions = result[i].qadecision4_2;
                                site.roofTop.poles_corrosions_comment = result[i].cacomment4_2;
                                site.roofTop.poles_earthed = result[i].qadecision4_3;
                                site.roofTop.poles_earthed_comment = result[i].cacomment4_3;
                                site.roofTop.cabinet_damage = result[i].qadecision4_4;
                                site.roofTop.cabinet_damage_comment = result[i].cacomment4_4;
                                site.roofTop.transmission_radio = result[i].qadecision4_5;
                                site.roofTop.transmission_radio_comment = result[i].cacomment4_5;

                                /* mast*/
                                site.mast = mast;
                                site.mast.aw_light = result[i].qadecision5_1;
                                site.mast.aw_light_comment = result[i].cacomment5_1;
                                site.mast.aw_light_db_fitting = result[i].qadecision5_2;
                                site.mast.aw_light_db_fitting_comment = result[i].cacomment5_2;
                                site.mast.tower_inspection = result[i].qadecision5_3;
                                site.mast.tower_inspection_comment = result[i].cacomment5_3;
                                site.mast.paint_tower = result[i].qadecision5_4;
                                site.mast.paint_tower_comment = result[i].cacomment5_4;
                                site.mast.visual_inpection_trans_radio = result[i].qadecision5_5;
                                site.mast.visual_inpection_trans_radio_comment = result[i].cacomment5_5;

                                /* airCond*/
                                site.airCond = airCond;
                                site.airCond.fan_blade = result[i].qadecision6_1;
                                site.airCond.fan_blade_comment = result[i].cacomment6_1;
                                site.airCond.noise_vibration = result[i].qadecision6_2;
                                site.airCond.noise_vibration_comment = result[i].cacomment6_2;
                                site.airCond.refrigerant_line = result[i].qadecision6_3;
                                site.airCond.refrigerant_line_comment = result[i].cacomment6_3;
                                site.airCond.casing_sealed = result[i].qadecision6_4;
                                site.airCond.casing_sealed_comment = result[i].cacomment6_4;
                                site.airCond.rust = result[i].qadecision6_5;
                                site.airCond.rust_comment = result[i].cacomment6_5;


                                /* site_general*/
                                site.site_general = site_general;
                                site.site_general.fence_gate_locks_hinges = result[i].qadecision7_1;
                                site.site_general.fence_gate_locks_hinges_comment = result[i].cacomment7_1;
                                site.site_general.signage = result[i].qadecision7_2;
                                site.site_general.signage_comment = result[i].cacomment7_2;
                                site.site_general.water_damage = result[i].qadecision7_3;
                                site.site_general.water_damage_comment = result[i].cacomment7_3;
                                site.site_general.crushed_stone = result[i].qadecision7_4;
                                site.site_general.crushed_stone_comment = result[i].cacomment7_4;
                                site.site_general.site_clean = result[i].qadecision7_5;
                                site.site_general.site_clean_comment = result[i].cacomment7_5;
                                site.site_general.weeds_grass = result[i].qadecision7_6;
                                site.site_general.weeds_grass_comment = result[i].cacomment7_6;
                                site.site_general.rubish = result[i].qadecision7_7;
                                site.site_general.rubish_comment = result[i].cacomment7_7;
                                site.site_general.defect_access_road = result[i].qadecision7_8;
                                site.site_general.defect_access_road_comment = result[i].cacomment7_8;

                                /* alarms*/
                                site.alarms = alarms;
                                site.alarms.intruder = result[i].qadecision8_1;
                                site.alarms.intruder_comment = result[i].cacomment8_1;
                                site.alarms.movement = result[i].qadecision8_2;
                                site.alarms.movement_comment = result[i].cacomment8_2;
                                site.alarms.high_temp = result[i].qadecision8_3;
                                site.alarms.high_temp_comment = result[i].cacomment8_3;
                                site.alarms.rectifier_system = result[i].qadecision8_4;
                                site.alarms.rectifier_system_comment = result[i].cacomment8_4;
                                site.alarms.rectifier_module = result[i].qadecision8_5;
                                site.alarms.rectifier_module_comment = result[i].cacomment8_5;
                                site.alarms.aircon1 = result[i].qadecision8_6;
                                site.alarms.aircon1_comment = result[i].cacomment8_6;
                                site.alarms.aircon2 = result[i].qadecision8_7;
                                site.alarms.aircon2_comment = result[i].cacomment8_7;
                                site.alarms.generator_fuel = result[i].qadecision8_8;
                                site.alarms.generator_fuel_comment = result[i].cacomment8_8;
                                site.alarms.generator_abnormal = result[i].qadecision8_9;
                                site.alarms.generator_abnormal_comment = result[i].cacomment8_9;
                                site.alarms.aircraft_warning = result[i].qadecision8_10;
                                site.alarms.aircraft_warning_comment = result[i].cacomment8_10;
                                site.alarms.smoke = result[i].qadecision8_11;
                                site.alarms.smoke_comment = result[i].cacomment8_11;
                                site.alarms.ac_mains_failure = result[i].qadecision8_12;
                                site.alarms.ac_mains_failure_comment = result[i].cacomment8_12;
                                site.alarms.battery_low = result[i].qadecision8_13;
                                site.alarms.battery_low_comment = result[i].cacomment8_13;
                                site.alarms.generator_running = result[i].qadecision8_14;
                                site.alarms.generator_running_comment = result[i].cacomment8_14;


                                /* generator*/
                                site.generator = generator;
                                site.generator.generator_current_hours = result[i].generatorcurrenthours;
                                site.generator.generator_fuel_level = result[i].generatorfuellevel;
                                site.generator.engine_oil = result[i].qadecision9_1;
                                site.generator.engine_oil_comment = result[i].cacomment9_1;
                                site.generator.oil_leak = result[i].qadecision9_2;
                                site.generator.oil_leak_comment = result[i].cacomment9_2;
                                site.generator.radiator_hoses = result[i].qadecision9_3;
                                site.generator.radiator_hoses_comment = result[i].cacomment9_3;
                                site.generator.air_filter = result[i].qadecision9_4;
                                site.generator.air_filter_comment = result[i].cacomment9_4;
                                site.generator.coolant_leaks = result[i].qadecision9_5;
                                site.generator.coolant_leaks_comment = result[i].cacomment9_5;
                                site.generator.v_belt = result[i].qadecision9_6;
                                site.generator.v_belt_comment = result[i].cacomment9_6;
                                site.generator.fuel_leaks = result[i].qadecision9_7;
                                site.generator.fuel_leaks_comment = result[i].cacomment9_7;
                                site.generator.electrolyte_connection_cond = result[i].qadecision9_8;
                                site.generator.electrolyte_connection_cond_comment = result[i].cacomment9_8;
                                site.generator.switcher_breaker = result[i].qadecision9_9;
                                site.generator.switcher_breaker_comment = result[i].cacomment9_9;
                                site.generator.control_panel_record_level = result[i].qadecision9_10;
                                site.generator.control_panel_record_level_comment = result[i].cacomment9_10;
                                site.generator.abnormal_vibrations = result[i].qadecision9_11;
                                site.generator.abnormal_vibrations_comment = result[i].cacomment9_11;
                                site.generator.rust = result[i].qadecision9_12;
                                site.generator.rust_comment = result[i].cacomment9_12;
                                site.generator.moutings_brackets = result[i].qadecision9_13;
                                site.generator.moutings_brackets_comment = result[i].cacomment9_13;
                                site.generator.overal_cond = result[i].qadecision9_14;
                                site.generator.overal_cond_comment = result[i].cacomment9_14;

                                sitee.gravarSite(site, function(err){
                                    if(err){
                                        console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                        console.log(err)
                                    }
                                    else {
                                        console.log("SiteInspection Complete.xlsx upload");
                                    }
                                });

                            
                            }
                        }
                        else  
                            if(result[0].forsite == undefined){
                                for (var i = 0, j = result.length; i < j; i++) {
                                    sitee.update({siteNumber:result[i].basestationno}, {$set:{siteType:result[i].typeofsite, regiaoselmec:result[i].selmecregion, siteName:result[i].sitename, maintenanceofficer:result[i].maintenanceofficer}},{multi:true}, function(err){
                                        if(err){
                                            console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                            console.log(err);
                                        }
                                        else {
                                            console.log("Site Information Update");
                                        }
                                    });
                                }
                            }
                            else{


                                for (var i = 0, j = result.length; i < j; i++) {
                                    var site = {};

                                    site.tobedoneby = result[i].tobedoneby;
                                    site.company = "";
                                    site.dateChecked = "";
                                    site.maintenanceofficer = result[i].maintenanceofficer;
                                    site.siteNumber = result[i].forsite;
                                    site.siteName = "";
                                    site.siteType = "";
                                    site.ticketNumber = "";
                                    site.dateplanned = result[i].planneddate;
                                    site.regiaoselmec = "";
                                    site.espera = false;



                                    var datap = result[i].planneddate.split('/');
                                    var dia2 = datap[0];
                                    var mes2 = datap[1] - 1;
                                    site.mesplaneado = mes2;
                                    var ano2 = datap[2];
                                    site.anoplaneado = ano2;
                                    // var dataPlaneada2 = (new Date(ano2, mes2, dia2).getTime()) + 86400000;
                                    var dataPlaneada2 = (new Date(ano2, mes2, dia2).getTime());
                                    site.dataPlaneada2 = dataPlaneada2;
                                    var cincodias = 86400000 * 5;
                                    var quatrodias = 86400000 * 4;
                                    var diaAntes = dataPlaneada2 - cincodias;
                                    site.diaAntes = diaAntes;
                                    var diaDepois = dataPlaneada2 + quatrodias;
                                    site.diaDepois = diaDepois;
                                    var month1 = parseInt(mes);
                                    var dataActual4 = new Date(parseInt(ano), (month1 - 1), parseInt(dia), 2, 0, 0).getTime();

                                    if(diaDepois < dataActual4){
                                        site.status = "Delayed Inspection";
                                    }
                                    else{
                                        site.status = result[i].status;
                                    }

                                    sitee.gravarSite(site, function(err){
                                        if(err){
                                            console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
                                            console.log(err)
                                        }
                                        else {
                                            console.log("SiteInspection Awaiting Inspection.xlsx upload");
                                        }
                                    });

                                }

                            }


                        res.redirect("/gerador");
                    }
                    
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
       
    });
/*FIM: "Exportar os dados dos ficheiros excel" */

    

router.get("/", function(req, res) {
    if (req.session.usuario) {
        var userData = req.session.usuario;
        var nome = userData.nome;
        var regiaovar = userData.regiao;
        var regiao = regiaovar.charAt(0).toUpperCase() + regiaovar.slice(1);
        


        if ((req.session.usuario.nivel_acesso != "normal" ) || (nome == "Luis Brazuna") || (nome == "Antonio Biquiza")) {
            /*organizar a lista de inspecções de acordo com o número de site(ordem crescente)*/
            sitee.find({}, function(err, data) {
                if (err)
                    console.log(err);
                else {
                    res.render('site_home', { DataU: userData, Site: data, funcionario: "logged!!", title: 'EagleI' });
                }
            }).sort({ _id: 1 });
            /*FIM: organizar a lista de inspecções de acordo com o número de site(ordem crescente)*/
        } else 
            if ((userData.nivel_acesso != "regional_manager" ) || (userData.nivel_acesso == "supervisor")){
            
                /*organizar a lista de inspecções de acordo com o número de site(ordem crescente), individual*/
                sitee.find({regiaoselmec:regiao}, function(err, data) {
                    if (err)
                        console.log(err);
                    else {
                        res.render('site_home', { DataU: userData, Site: data, funcionario: "logged!!", title: 'EagleI' });
                    }
                }).sort({ _id:-1 });
                
                /*FIM: organizar a lista de inspecções de acordo com o número de site(ordem crescente), individual*/
            }

    } else
        res.redirect("/")
})





//+++++++++++++++++++++++++++++++++++++++++++++++


router.get('/exportartocsvGerador', function(req, res, next) {
    var filename = "Pre-utilizacaoGerador" + (new Date().getTime()) + ".csv";
    var dataArray;
    gerador.find().lean().exec({}, function(err, products) {
        if (err) res.send(err);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename=' + filename);
        res.csv(products, true);
    });
});

// router.post("/", function(req, res){
//  var veiculo = getVeiculo(req.body);
//  console.log(veiculo);
//  tanqferenciaVeiculo.gravarDados(veiculo, function(err){
//      if(err){
//          console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
//          console.log(err)
//      }
//      else
//          console.log("dados gravados com sucesso!!");
//  });

//  res.redirect("/inicio");
// })

router.get("/novo", function(req, res) {
    var userData = req.session.usuario;
    res.render("site_form", { DataU: userData, title: 'EagleI' })
});

router.get("/novoregisto", function(req, res) {
    var userData = req.session.usuario;
    
    var regiaovar = userData.regiao;
    var regiao = regiaovar.charAt(0).toUpperCase() + regiaovar.slice(1);


    siteinfo.find({}, function(err, dataSiteInfo) {
        if (err){
            console.log("falha ao tentar registar");
        }
        else{
            usuarios.find({nivel_acesso:{$ne:"admin"}, }, function(err, dataUsuarios){
                if (err){
                 console.log("falha ao tentar registar");
                }else{
                    // console.log(dataSiteInfo)
                    res.render("site_form", {Usuarios:dataUsuarios,  SiteInfo:dataSiteInfo, SiteInfoDetalhes: JSON.stringify(dataSiteInfo), DataU: userData, title: 'EagleI' });
                }
            });
            
        }
    }).sort({siteinfo_sitenum:1})
    
});

router.get("/seguranca", function(req, res) {
    var userData = req.session.usuario;
    // var busca = req.params.id;

    sitee.find({ tobedoneby: userData.nome }, function(err, dataSiteInsp){
        if (err){
            console.log("falha ao tentar registar seguranca")
        }
        else{
            console.log(dataSiteInsp)
            res.render("seguro_form", { DataU: userData, referencia: dataSiteInsp[0],title: 'EagleI' })
        }
    }).sort({_id:-1});
});

router.get("/seguranca/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar seguranca")
        }
        else{
            if (data != null){
                res.render("seguro_form", { DataU: userData, referencia: data,title: 'EAGLEIEAGLEI' })
            }
        }
    })
});

router.get("/opcoes/:id3", function(req, res) {
    var userData = req.session.usuario;
    let siteNumber = req.params.id3;
    sitee.findOne({siteNumber: siteNumber}, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
            res.render("site_options", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});
router.get("/continuacao/:id2/:id3", function(req, res) {
    var userData = req.session.usuario;
    // let operator= req.params.id1;
    let ticketNumber = req.params.id2;
    let siteNumber = req.params.id3;
    sitee.findOne({ ticketNumber: ticketNumber, siteNumber: siteNumber }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("seguro_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});

router.get("/edboard/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("edBoardOb_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});

router.get("/contentor/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("container_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});


router.get("/rooftop/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("roofTop_form", { DataU: userData, referencia: data, title:'EAGLEIEAGLEI'})
    })
});

router.get("/mast/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("mast_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});

router.get("/arcond/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("airCond_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});

router.get("/sitegeneral/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("site_general_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});

router.get("/alarm/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("alarm_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});

router.get("/generator/:id", function(req, res) {
    var userData = req.session.usuario;
    let busca = req.params.id;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("falha ao tentar registar seguranca")
        else
        if (data != null)
            res.render("generator_form", { DataU: userData, referencia: data, title: 'EAGLEIEAGLEI' })
    })
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++posts forms start ++++++++++++++++++++++++++++++++++++++++++++

router.post("/seguranca/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    
    console.log(req.files);
    //console.log(req.body);
    var safety = req.body;
    safety.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);
    safety.veiculo_safe_image = [];
    safety.People_safe_image = []
    safety.red_hat_image = []
    safety.fall_Arrest_devices_image = []

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';
    
    if (req.files) {

        let comprimento = req.files.length;

        for (let i = 0; i < comprimento; i++) {

            if (req.files[i].fieldname == "veiculo_safe_image") {
                safety.veiculo_safe_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "People_safe_image") {

                safety.People_safe_image.push((directorio+ req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "red_hat_image") {
                safety.red_hat_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "fall_Arrest_devices_image") {
                safety.fall_Arrest_devices_image.push((directorio + req.files[i].filename));
                continue
            }

        }
    }
    
    var busca = req.params.id;

    
   /*Guardar os dados de seguranca_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:safety.siteinsp_audittrailObject},$set: { safetyOb: safety, dateChecked: dataActual, espera: true} }, function(err, data) {
        if (err) {
            console.log("falha ao tentar registar seguranca")
        }
        else{

            console.log("Safety update");
        }

    });
    /*FIM: Guardar os dados de seguranca_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});

router.post("/edboard/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var edboardB = req.body;
    edboardB.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);

    edboardB.Connection_image = [];
    edboardB.energy_meter_image = []
    edboardB.switching_mec_image = []
    edboardB.d_board_sleeves_image = []
    edboardB.light_switch_image = []
    edboardB.paintwork_sitelight_image = []
    edboardB.ac_supplier_defects_image = []

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "Connection_image") {
                edboardB.Connection_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "energy_meter_image") {
                edboardB.energy_meter_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "switching_mec_image") {
                edboardB.switching_mec_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "d_board_sleeves_image") {
                edboardB.d_board_sleeves_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "light_switch_image") {
                edboardB.light_switch_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "paintwork_sitelight_image") {
                edboardB.paintwork_sitelight_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "ac_supplier_defects_image") {
                edboardB.ac_supplier_defects_image.push((directorio + req.files[i].filename));
                continue
            }

        }
    }

    var busca = req.params.id;
    /*Guardar os dados de EDBoardOb_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, {$push:{siteinsp_audittrail:edboardB.siteinsp_audittrailObject} ,$set: { EDBoardOb: edboardB, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar EDBOARD")
            
        }   
        else{
            console.log("EDBOARD update");
            /*
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.container.container_light != null && data.rooftop.mounting_poles != null && data.mast.aw_light != null && data.airCond.fan_blade != null && data.site_general.rubish != null && data.alarms.intruder != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }
                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }*/
            
        }
    });
     /*FIM: Guardar os dados de EDBoardOb_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});

router.post("/contentor/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var contnner = req.body;
    contnner.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);

    contnner.container_light_image = [];
    contnner.circuit_breaker_image = [];
    contnner.earth_connections_image = [];
    contnner.conditions_image = [];
    contnner.paintwork_image = [];
    contnner.roof_water_image = [];
    contnner.joints_cables_holes_image = [];
    contnner.transmission_radio_image = [];

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "container_light_image") {
                contnner.container_light_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "circuit_breaker_image") {
                contnner.circuit_breaker_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "earth_connections_image") {
                contnner.earth_connections_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "conditions_image") {
                contnner.conditions_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "paintwork_image") {
                contnner.paintwork_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "roof_water_image") {
                contnner.roof_water_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "joints_cables_holes_image") {
                contnner.joints_cables_holes_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "transmission_radio_image") {
                contnner.transmission_radio_image.push((directorio + req.files[i].filename));
                continue
            }

        }
    }

    var busca = req.params.id;
     /*Guardar os dados de container_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:contnner.siteinsp_audittrailObject} ,$set: { container: contnner, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar CONTAINER")
        }   
        else{
            console.log("Container update");
            /*
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.EDBoardOb.connections != null && data.roofTop.mounting_poles != null && data.mast.aw_light != null && data.airCond.fan_blade != null && data.site_general.rubish != null && data.alarms.intruder != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }

                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }*/
            
        }
    });
    /*FIM: Guardar os dados de container_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});

router.post("/rooftop/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var rofftop = req.body;
    rofftop.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);
    rofftop.mounting_poles_image = [];
    rofftop.poles_corrosions_image = [];
    rofftop.poles_earthed_image = [];
    rofftop.cabinet_damage_image = [];
    rofftop.transmission_radio_image = [];

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "mounting_poles_image") {
                rofftop.mounting_poles_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "poles_corrosions_image") {
                rofftop.poles_corrosions_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "poles_earthed_image") {
                rofftop.poles_earthed_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "cabinet_damage_image") {
                rofftop.cabinet_damage_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "transmission_radio_image") {
                rofftop.transmission_radio_image.push((directorio + req.files[i].filename));
                continue
            }

        }
    }
    var busca = req.params.id;
    /*Guardar os dados de rofftop_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:rofftop.siteinsp_audittrailObject} ,$set: { roofTop: rofftop, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar ROOFTOP")
        }
        else{
            console.log("rooftop update");

            /*
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.EDBoardOb.connections != null && data.container.container_light != null && data.mast.aw_light != null && data.airCond.fan_blade != null && data.site_general.rubish != null && data.alarms.intruder != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }
                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }*/
        }
    });
    /*FIM: Guardar os dados de rofftop_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});


router.post("/mast/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var maast = req.body;
    maast.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);
    maast.aw_light_image = [];
    maast.aw_light_db_fitting_image = [];
    maast.tower_inspection_image = [];
    maast.paint_tower_image = [];
    maast.visual_inpection_trans_radio_image = [];
    maast.tower_specification_image = [];

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';


    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "aw_light_image") {
                maast.aw_light_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "aw_light_db_fitting_image") {
                maast.aw_light_db_fitting_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "tower_inspection_image") {
                maast.tower_inspection_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "paint_tower_image") {
                maast.paint_tower_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "visual_inpection_trans_radio_image") {
                maast.visual_inpection_trans_radio_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "tower_specification_image") {
                maast.tower_specification_image.push((directorio + req.files[i].filename));
                continue
            }



        }
    }


    var busca = req.params.id;
    /*Guardar os dados de mast_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:maast.siteinsp_audittrailObject} ,$set: { mast: maast, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar MAST")
        }
        else{
            console.log("mast update");
            /*
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.EDBoardOb.connections != null && data.container.container_light != null && data.roofTop.mounting_poles != null && data.airCond.fan_blade != null && data.site_general.rubish != null && data.alarms.intruder != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }
                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }
            */
            
        }
    });
    /*FIM: Guardar os dados de mast_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});

router.post("/arcond/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var aarcond = req.body;
    aarcond.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);

    aarcond.fan_blade_image = [];
    aarcond.noise_vibration_image = [];
    aarcond.refrigerant_line_image = [];
    aarcond.casing_sealed_image = [];
    aarcond.rust_image = [];

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "fan_blade_image") {
                aarcond.fan_blade_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "noise_vibration_image") {
                aarcond.noise_vibration_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "refrigerant_line_image") {
                aarcond.refrigerant_line_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "casing_sealed_image") {
                aarcond.casing_sealed_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "rust_image") {
                aarcond.rust_image.push((directorio + req.files[i].filename));
                continue
            }





        }
    }



    var busca = req.params.id;
    /*Guardar os dados de airCond_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:aarcond.siteinsp_audittrailObject} ,$set: { airCond: aarcond, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar MAST")
        }
        else{
            console.log("airCond update");
            /*
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.EDBoardOb.connections != null && data.container.container_light != null && data.roofTop.mounting_poles != null && data.mast.aw_light != null && data.site_general.rubish != null && data.alarms.intruder != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }

                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }
            */
        }   

    });
    /*FIM: Guardar os dados de airCond_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});


router.post("/sitegeneral/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var sittegeneral = req.body;
    sittegeneral.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);
    sittegeneral.fence_gate_locks_hinges_image = [];
    sittegeneral.signage_image = [];
    sittegeneral.water_damage_image = [];
    sittegeneral.crushed_stone_image = [];
    sittegeneral.roof_water_image = [];
    sittegeneral.site_clean_image = [];
    sittegeneral.weeds_grass_image = [];
    sittegeneral.rubish_image = [];
    sittegeneral.defect_access_road_image = [];

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "fence_gate_locks_hinges_image") {
                sittegeneral.fence_gate_locks_hinges_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "signage_image") {
                sittegeneral.signage_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "water_damage_image") {
                sittegeneral.water_damage_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "crushed_stone_image") {
                sittegeneral.crushed_stone_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "roof_water_image") {
                sittegeneral.roof_water_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "site_clean_image") {
                sittegeneral.site_clean_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "weeds_grass_image") {
                sittegeneral.weeds_grass_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "rubish_image") {
                sittegeneral.rubish_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "defect_access_road_image") {
                sittegeneral.defect_access_road_image.push((directorio + req.files[i].filename));
                continue
            }


        }
    }




    var busca = req.params.id;
    /*Guardar os dados de sitegeneral_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:sittegeneral.siteinsp_audittrailObject} ,$set: { site_general: sittegeneral, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar CONTAINER")
        }
        else{
            console.log("sitegeneral update");

            /*
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.EDBoardOb.connections != null && data.container.container_light != null && data.roofTop.mounting_poles != null && data.mast.aw_light != null && data.airCond.fan_blade != null && data.alarms.intruder != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }

                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }
            */
        }
    });
    /*FIM: Guardar os dados de sitegeneral_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});


router.post("/alarm/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var allarm = req.body;
    allarm.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);
    allarm.intruder_image = [];
    allarm.movement_image = []
    allarm.high_temp_image = []
    allarm.rectifier_system_image = []
    allarm.rectifier_module_image = []
    allarm.aircon1_image = []
    allarm.aircon2_image = []
    allarm.generator_fuel_image = [];
    allarm.generator_abnormal_image = []
    allarm.aircraft_warning_image = [];
    allarm.smoke_image = []
    allarm.ac_mains_failure_image = []
    allarm.battery_low_image = []
    allarm.generator_running_image = []

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {
            if (req.files[i].fieldname == "intruder_image") {
                allarm.intruder_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "movement_image") {
                allarm.movement_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "high_temp_image") {
                allarm.high_temp_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "rectifier_system_image") {
                allarm.rectifier_system_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "rectifier_module_image") {
                allarm.rectifier_module_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "aircon1_image") {
                allarm.aircon1_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "aircon2_image") {
                allarm.aircon2_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "generator_fuel_image") {
                allarm.generator_fuel_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "generator_abnormal_image") {
                allarm.generator_abnormal_image.push((directorio + req.files[i].filename));
                continue
            }




            if (req.files[i].fieldname == "aircraft_warning_image") {
                allarm.aircraft_warning_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "smoke_image") {
                allarm.smoke_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "ac_mains_failure_image") {
                allarm.ac_mains_failure_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "battery_low_image") {
                allarm.battery_low_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "generator_running_image") {
                allarm.generator_running_image.push((directorio + req.files[i].filename));
                continue
            }

        }
    }

    var busca = req.params.id;
    /*Guardar os dados de alarms_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:allarm.siteinsp_audittrailObject} ,$set: { alarms: allarm, dateChecked: dataActual, espera: true } }, function(err, data) {
        if (err){
            console.log("falha ao tentar registar CONTAINER")
        }
        else{
            console.log("alarms update");
            /*
           var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                if(data.safetyOb.veiculo_safe != null && data.EDBoardOb.connections != null && data.container.container_light != null && data.roofTop.mounting_poles != null && data.mast.aw_light != null && data.airCond.fan_blade != null && data.site_general.rubish != null && data.generator.v_belt != null){
                    if(ano > data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(ano < data1[2]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes > data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(mes < data1[1]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia > data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else if(dia < data1[0]){
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                    else{
                        sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual, espera: false} }, function(err, data) {
                            if (err) {
                                    console.log("falha ao tentar registar seguranca")
                            }
                            else{
                                console.log("Sucesso");
                            }

                        });
                    }
                }
                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {espera: true} }, function(err, data) {
                        if (err) {
                            console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }
                    });
                }
            */
        }   
    });
    /*FIM: Guardar os dados de alarms_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});


router.post("/generator/:id/:id1", upload.any(), function(req, res) {
    var userData = req.session.usuario;
    console.log(req.files);
    console.log(req.body);
    var ggenerator = req.body;
    ggenerator.siteinsp_audittrailObject = JSON.parse(req.body.siteinsp_audittrailObject);
    ggenerator.engine_oil_image = []
    ggenerator.oil_leak_image = []
    ggenerator.radiator_hoses_image = []
    ggenerator.air_filter_image = []
    ggenerator.coolant_leaks_image = []
    ggenerator.v_belt_image = []
    ggenerator.fuel_leaks_image = [];
    ggenerator.electrolyte_connection_cond_image = [];
    ggenerator.switcher_breaker_image = [];
    ggenerator.control_panel_record_level_image = [];
    ggenerator.abnormal_vibrations_image = [];
    ggenerator.rust_image = [];
    ggenerator.overal_cond_image = [];
    ggenerator.moutings_brackets_image = [];

    var directorio = "/Inspecção_Site/" + new Date().getFullYear() + '/' + meses[new Date().getMonth()] + '/' + req.params.id1 + '/';

    if (req.files) {
        let comprimento = req.files.length;
        for (let i = 0; i < comprimento; i++) {

            if (req.files[i].fieldname == "engine_oil_image") {
                ggenerator.engine_oil_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "oil_leak_image") {
                ggenerator.oil_leak_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "radiator_hoses_image") {
                ggenerator.radiator_hoses_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "air_filter_image") {
                ggenerator.air_filter_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "coolant_leaks_image") {
                ggenerator.coolant_leaks_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "v_belt_image") {
                ggenerator.v_belt_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "fuel_leaks_image") {
                ggenerator.fuel_leaks_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "electrolyte_connection_cond_image") {
                ggenerator.electrolyte_connection_cond_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "switcher_breaker_image") {
                ggenerator.switcher_breaker_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "control_panel_record_level_image") {
                ggenerator.control_panel_record_level_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "abnormal_vibrations_image") {
                ggenerator.abnormal_vibrations_image.push((directorio + req.files[i].filename));
                continue;
            }

            if (req.files[i].fieldname == "rust_image") {
                ggenerator.rust_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "overal_cond_image") {
                ggenerator.overal_cond_image.push((directorio + req.files[i].filename));
                continue
            }

            if (req.files[i].fieldname == "moutings_brackets_image") {
                ggenerator.moutings_brackets_image.push((directorio + req.files[i].filename));
                continue
            }



        }
    }

    var busca = req.params.id;
    /*Guardar os dados de generator_form, e compara a data actual com a data planeada para alterar o status*/
    sitee.findOneAndUpdate({ _id: busca }, { $push:{siteinsp_audittrail:ggenerator.siteinsp_audittrailObject} ,$set: { generator: ggenerator, dateChecked: dataActual} }, function(err, data) {
        if (err) {
            console.log("falha ao tentar registar GENERATOR")
        }
        else{
            var datarasc = data.dateplanned;
            var data1 = datarasc.split("/");
                
                if(ano > data1[2]){
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                else if(ano < data1[2]){
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                else if(mes > data1[1]){
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde,} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                else if(mes < data1[1]){
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                else if(dia > data1[0]){
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadotarde} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                else if(dia < data1[0]){
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadocedo} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                else{
                    sitee.findOneAndUpdate({ _id: busca }, { $set: {status: estadoactual} }, function(err, data) {
                        if (err) {
                                console.log("falha ao tentar registar seguranca")
                        }
                        else{
                            console.log("Sucesso");
                        }

                    });
                }
                
            
        }   

    });
    /*FIM: Guardar os dados de generator_form, e compara a data actual com a data planeada para alterar o status*/
    res.redirect("/gerador")
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++post form end+++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/more/:id", function(req, res) {
    var busca = req.params.id;
    var userData = req.session.usuario;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("ocorreum erro ao tentar ver detalhes")
        else
        if (data != null) {
            console.log(data)
            res.render("site_options", { DataU: userData, referencia: data, title: 'EagleI' })
        }
    })
})


router.get("/detalhes/:id", function(req, res) {
    var busca = req.params.id;
    var userData = req.session.usuario;
    sitee.findOne({ _id: busca }, function(err, data) {
        if (err)
            console.log("ocorreum erro ao tentar ver detalhes")
        else
        if (data != null) {
            console.log(data)
            res.render("site_details", { DataU: userData, referencia: data, title: 'EagleI' })
        }
    })
})

router.post("/novo", function(req, res) {
    // var generator = getGGerador(req.body);
    // console.log("dentro do roteador");
    // console.log(req.files);
    //  var endereco = "/uploads/"+req.file.filename;
    var generator = req.body;
    console.log(generator);
    sitee.gravarSite(generator, function(err) {
        if (err) {
            console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
            console.log(err)
        } else
            console.log("dados gravados com sucesso!!");
    });

    res.redirect("/gerador");
});

router.post("/novoregisto",upload.any(), function(req, res) {
    var userData= req.session.usuario;
    var siteinsp = req.body;
    siteinsp.siteinsp_audittrail = JSON.parse(req.body.siteinsp_audittrail);

    sitee.gravarSite(siteinsp, function(err, data){
        if(err){
            console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
            console.log(err)
        }
        else {

            console.log("Create Site Inspection")
        }
    });
});

router.post("/editarcheckedby", function(req, res) {
    var identific = req.body.identific;
    var tobedoneby = req.body.tobedoneby;
    //console.log(ticket);
    //console.log(busca);
    sitee.findOneAndUpdate({_id:identific}, {$set:{tobedoneby:tobedoneby}}, function(err){
        if(err){
            console.log("Ocorreu um erro ao tentar gravar os dados!\n contacte o administrador do sistema");
            console.log(err);
        }
        else {
            console.log("tõbebodeby update");
        }
    });

    //res.redirect("/gerador");
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++details start+++++++++++++++++++++++++++++++++++++

router.get("/info/details/:id", function(req, res) {
    var userData = req.session.usuario;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('ovveral_details', { DataU: userData, Site: data, identific: req.params.id, funcionario: "logged!!", title: 'EagleI' });

    })

})

router.get("/seguranca/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('seguro_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })

})

router.get("/eddboardss/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('edBoardOb_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })

})

router.get("/contentor/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('container_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })
})

router.get("/arcond/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('airCond_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })
})

router.get("/mast/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('mast_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })
})

router.get("/alarm/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('alarm_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })
})

router.get("/generator/details/:id", function(req, res) {
    var userData = req.session.usuario;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('generator_form', { DataU: userData, Site: data, funcionario: "logged!!", title: 'EagleI' });

    })
})

router.get("/rooftop/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('roofTop_form', { DataU: userData, Site: data, op:op,funcionario: "logged!!", title: 'EagleI' });

    })
})

router.get("/general_site/details/:id", function(req, res) {
    var userData = req.session.usuario;
    var op = req.params.id;
    sitee.find({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("ocorreu um erro ao tentar aceder os dados")
        }
        res.render('site_general_form', { DataU: userData, Site: data, op:op, funcionario: "logged!!", title: 'EagleI' });

    })
})

// eddboardss+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++details end++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/remove/:id", function(req, res) {
    gerador.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            console.log("ocorreu um erro ao tentar apagar os dados!");
        else {
            console.log("inspeção Removido com sucesso!!");
            res.redirect("/gerador")
        }
    })
})

function getGGerador(body) {
    var geradorr = {};
    geradorr.siteName = body.siteName;
    geradorr.checkedBy = body.checkedBy;
    geradorr.province = body.province;
    geradorr.ticketNumber = body.ticketNumber;
    geradorr.siteNumber = body.siteNumber;
    geradorr.dateChecked = body.dateChecked;
    geradorr.operator = body.operator;
    geradorr.company = body.company;
    geradorr.siteType = body.siteType;
    geradorr.town = body.town;
    geradorr.safety = body.safety;
    geradorr.safetyComment = body.safetyComment;
    geradorr.safetyPic = body.safetyPic;
    geradorr.externalDistrBorder = body.externalDistrBorder;
    geradorr.externalDistrBorder_comment = body.externalDistrBorder_comment;
    geradorr.externalDistrBorder_image = body.externalDistrBorder_image;
    geradorr.container = body.container;
    geradorr.container_comment = body.container_comment;
    geradorr.container_image = body.container_image;
    geradorr.roof_top = body.roof_top;
    geradorr.roof_top_comment = body.roof_top_comment;
    geradorr.roof_top_image = body.roof_top_image;
    geradorr.mast = body.mast;
    geradorr.mast_comment = body.mast_comment;
    geradorr.mast_image = body.mast_image;
    geradorr.air_cond = body.air_cond;
    geradorr.air_cond_comment = body.air_cond_comment;
    geradorr.air_cond_image = body.air_cond_image;
    geradorr.site_general = body.site_general;
    geradorr.site_general_comment = body.site_general_comment;
    geradorr.site_general_image = body.site_general_image;
    geradorr.alarms = body.alarms;
    geradorr.alarms_comment = body.alarms_comment;
    geradorr.alarm_image = body.alarm_image;
    geradorr.generator = body.generator;
    geradorr.generator_comment = body.generator_comment;
    geradorr.generator_image = body.generator_image;
    geradorr.generator_current_hour = body.generator_current_hour;
    geradorr.generatorCH_image = body.generatorCH_image;
    geradorr.generatorFuelLevel = body.generatorFuelLevel;
    geradorr.generatorFuelLevel_image = body.generatorFuelLevel_image;
    geradorr.comment = body.comment;
    return geradorr;
}


// function getGerador(body){
//  var geradorr= {};
//  geradorr.estado_geral_=body.estado_geral_;
//  geradorr.freio_manual=body.freio_manual;
//  geradorr.pneus=body.pneus;
//  geradorr.tampa_combustivel=body.tampa_combustivel;
//  geradorr.chapa_matricula=body.chapa_matricula;
//  geradorr.cabo_polia_peca=body.cabo_polia_peca;
//  geradorr.gerador_abordo=body.gerador_abordo;
//  geradorr.luzes=body.luzes;
//  geradorr.acoplamento=body.acoplamento;
//  geradorr.parafusos_hook=body.parafusos_hook;
//  geradorr.motorista=body.motorista;
//  geradorr.interruptores_eletrico=body.interruptores_eletrico;
//  geradorr.manometro=body.manometro;
//  geradorr.licenca_veiculo=body.licenca_veiculo;
//  geradorr.roda_sobressalente=body.roda_sobressalente;
//  geradorr.roda_reboque=body.roda_reboque;
//  geradorr.bateria=body.bateria;
//  geradorr.ficha_electrica=body.ficha_electrica;
//  geradorr.observacao=body.observacao;
//  return geradorr;

// }



module.exports = router;