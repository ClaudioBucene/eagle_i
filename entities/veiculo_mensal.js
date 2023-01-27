var mongoose=require("mongoose");
var veiculoSchema= new mongoose.Schema({
	estado_pintura:String,
	lubrificacao_tubos:String,
	kit_maos_camera:String,
	condicionado_electrico:String,
	porcas_parafusos:String,
	sinalizacao:String,
	documentos:String,
	parabrisas:String,
	sist_direcao:String,
	trinco_seguranca:String,
	espelhos:String,
	travoes:String,
	buzina:String,
	socorro_extintor:String,
	macaco_roda:String,
	vidros_manometro:String,
	liquido:String,
	tapetes:String,
	bateria:String,
	etiquetas:String,
	sinais_perigo:String,
	quilometragem:Number,
	data:{type: Date, 'default':Date.now},
	inspector:String,
	matricula:String,
	motorista:String,
	marca_modelo:String,
	numero_registo:Number,
	mes:String,
	observacao:String

});

veiculoSchema.statics.visualizacao=function(veicul, callback){
	this.find(veicul)
}
veiculoSchema.statics.gravarDadoMensal=function(veiculos, callback){
	this.create(veiculos, callback);
}


module.exports= mongoose.model("Veiculos_mensal", veiculoSchema, "Veiculos_mensal");