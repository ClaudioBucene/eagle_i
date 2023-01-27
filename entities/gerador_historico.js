var mongoose=require("mongoose");

var gerador_historico= new mongoose.Schema({
	gerador_siteinfoid:String, //id do gerador no siteinfo
	gerador_gentype:String, //tipo do gerador
	gerador_jobcardrefid:String, //referencia do jobcard
	gerador_jobcardref:String, //referencia comserv
	gerador_jobcardtype:String, //Preventative ou Callout
	gerador_workstatus:String, //Preventative ou Callout
	gerador_jobcardttnumber:String,
	gerador_jobcardmaintenanceofficer:String, //nome do tecnico
	gerador_jobcardmaintenanceofficerid:String, //id do tecnico
	gerador_jobcardregion:String,
	gerador_jobcarddepartment:String,
	gerador_siteinforefid:String, //id do siteinfo
	gerador_siteinforef:String, //ref comserv siteinfo
	gerador_sitenumber:String,
	gerador_dataregisto:String,
	gerador_dataregistodia:Number,
	gerador_dataregistomes:Number,
	gerador_dataregistoano:Number,
	data_registo:{type:Date, 'default':Date.now},
	gerador_previoushours:String,
	gerador_actualhours:String,
	gerador_totalrunhour:String, //= gerador_actualhours - gerador_previoushours
	gerador_previousrefuelhours:String,
	gerador_refuellitres:String,
	gerador_refuelreason:String,
	gerador_priceperlitre:String


})

gerador_historico.statics.gravar_historico=function(hist, callback){
	this.create(hist, callback);
}

module.exports=mongoose.model("Generator_History", gerador_historico, "Generator_History");