var mongoose=require("mongoose");
var SchemaCar_service=new mongoose.Schema({
	matricula:String,
	ano_aquisicao:String,
	marca:String,
	modelo:String,
	quilometragem:String,
	intervenientes:[String],
	data_requisicao:{type:Date, 'default':Date.now},
	regiao:String,
	data_acao:[Date],
	estagio:[Number],
	actores:[String],
	problemas:[String],
	type_service:String,
	supplier_service:String,
	supplier_reff:String,
	ficheiro_cotacao:String
})

SchemaCar_service.statics.gravarDados=function(transferencia, callback){
	this.create(transferencia, callback);
}

module.exports= mongoose.model("Car_service", SchemaCar_service,"Car_service");