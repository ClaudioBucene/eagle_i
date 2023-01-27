var mongoose=require("mongoose")
var veiculoSchema=new mongoose.Schema({
	marca:String,
	modelo:String,
	matricula:String,
	ano_aquisicao:String,
	kilometragem:String,
	responsavel:String,
	regiao:String,
	provincia:String,
	utilizado_por:String,
	existencia:{type:Boolean, 'default':true},
	registado_por:String
})

veiculoSchema.statics.gravarVeiculo=function(objecto, callback){
	this.create(objecto, callback)
}

module.exports= mongoose.model("ViaturasControle", veiculoSchema, "ViaturasControle");