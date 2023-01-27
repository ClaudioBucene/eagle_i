var mongoose=require("mongoose");

var armazemSchema=new mongoose.Schema({
	nome:String,
	responsavel:[String],
	items:[{description_item:String, disponivel:Number, defeituosa:Number, referencia:String, serialized:String, cliente_name:String, part_number:String, serial_number:[String], data_received:[String], pod:[String], grupo:String, category:String,  precos:[String]}],
	pessoas_permitidas:[String],
	endereco:String,
	criado_por:String,
	data_criacao:{type:Date, 'default':Date.now},
	provincia:String,
	regiao:String, 
	item_returned:[{description_item:String, disponivel:Number, defeituosa:Number, referencia:String, serialized:String, cliente_name:String, part_number:String, serial_number:[String], data_received:[String], pod:[String], category:String, grupo:String, precos:[String]}]
	

})

armazemSchema.statics.gravar_armazem=function(armaz, callback){
	this.create(armaz, callback)
}

module.exports=mongoose.model("Armazem", armazemSchema, "Armazem");