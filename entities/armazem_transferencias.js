var mongoose=require("mongoose");

var armazemSchema=new mongoose.Schema({
	feito_por:String,
	origem:String,
	origem_ref:String,
	destino:String,
	destino_ref:String,

	items:[{description_item:String, disponivel:Number,  referencia:String, serialized:String, cliente_name:String, part_number:String,  grupo:String}],

	data_criacao:{type:Date, 'default':Date.now},


})

armazemSchema.statics.gravar_armazem=function(armaz, callback){
	this.create(armaz, callback)
}

module.exports=mongoose.model("Transferencia_armazem", armazemSchema, "Transferencia_armazem");