var mongoose=require("mongoose");
var rastreioschema=new mongoose.Schema({
	serial_number:{type:String, require:true},
	part_number:String,
	quanty:String,
	description:String,
	referencia:String,
	owner:String,
	local_actual:[String],
	datas_local_actual:[Date],
	status:String,
	ficheiro:String,
	ref_local_actual:[String],
	pod:String,
	data_registo:{type:Date, 'default':Date.now},
	meio_atribuicao:[String],
	atribuidores:[String]
})

rastreioschema.statics.gravar_rastreio=function(rastreio, callback){
	this.create(rastreio, callback);
}

module.exports=mongoose.model("Rastreio_stock", rastreioschema, "Rastreio_stock")