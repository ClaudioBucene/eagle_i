var mongoose=require("mongoose");

var historicoSchema=new mongoose.Schema({
	nome_armazem:String,
	nome_item:String,
	quantidade:Number,
	data:String,
	tipo_acao:String,
	confirmado_por:String,
	beneficiario:String

})


historicoSchema.statics.gravar_stock_armazem = function(stocc, callback){
	this.create(stocc, callback)
}


module.exports = mongoose.model("Historico_stock_armazem", historicoSchema, "Historico_stock_armazem");
 