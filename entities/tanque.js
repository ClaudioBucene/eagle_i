var mongoose=require("mongoose");
var tanqueSchema= new mongoose.Schema({
	estado_geral_:String,
	freio_manual:String,
	pneus:String,
	tampa_combustivel:String,
	chapa_matricula:String,
	cabo_polia_peca:String,
	trailer_licenciado:String,
	tanque_abordo:String,
	luzes:String,
	acoplamento:String,
	parafusos_hook:String,
	rodas:String,
	motorista:String,
	data:{type:Date, 'default':Date.now},
	observacao:String
})

tanqueSchema.statics.gravarDadosTanque=function(tanque, callback){
	this.create(tanque, callback);
}

module.exports=mongoose.model("Tanque", tanqueSchema, "Tanque")