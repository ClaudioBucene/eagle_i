var mongoose=require("mongoose");

var historicoSchema=new mongoose.Schema({
	nome_pessoa:String,
	acao:[{nome_item:String, quantidade:Number, data:String, tipo_acao:String}]

})


historicoSchema.statics.gravar_stock_pessoal=function(stocc, callback){
	this.create(stocc, callback)
}

module.exports=mongoose.model("Historico_stock_pessoal", historicoSchema, "Historico_stock_pessoal");
