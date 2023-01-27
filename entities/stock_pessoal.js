var mongoose=require("mongoose");

var armazemSchema=new mongoose.Schema({
	nome:String,
	nome_ref:String,
	disponibilidade:[{description_item:String, disponivel:Number, referencia:String, defeituosa:Number, serialized:String, num_serie:[String], cliente_name:String, part_number:String,  data_received:[String],grupo:String, pod:[String], category:String, precos:[String] }],
	data:{type:Date, 'default':Date.now},
	disponibilidade_returned:[{description_item:String, disponivel:Number, referencia:String, defeituosa:Number, serialized:String, num_serie:[String], cliente_name:String, part_number:String,grupo:String,  data_received:[String], pod:[String], category:String, jobcard_itemreplacephoto:[String], precos:[String]}]
	
})



armazemSchema.statics.gravar_stock_pessoal=function(armaz, callback){
	this.create(armaz, callback)
}

module.exports=mongoose.model("Stock_pessoal", armazemSchema, "Stock_pessoal");