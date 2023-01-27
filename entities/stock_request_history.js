var mongoose=require("mongoose");

var schema_historico= new mongoose.Schema({
	beneficiario:String,
	beneficiario_ref:String,
	request_from:String,
	request_from_ref:String,
	data:{type:Date, 'default':Date.now},
	quantidade:String,
	nome_item:String, 
	ref_Item:String,
	numero:String,
	serialized:String,
	cliente_name:String,
	precos:[String],
	departamento:String,
	part_number:String,
	num_serie:[String]


})

schema_historico.statics.gravar_historico=function(hist, callback){
	this.create(hist, callback);
}

module.exports=mongoose.model("Stock_History", schema_historico, "Stock_History");