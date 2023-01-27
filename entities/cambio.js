var mongoose=require("mongoose");

var cambioSchema=new mongoose.Schema({

	metical_dolar:Number,
	metical_rand:Number,
	metical_euro:Number,
	data:{type:Date, 'default':Date.now},
	data_string:{type:String, unique:true},
	criado_por:String,

})


cambioSchema.statics.gravar_cambio=function(camb, callback){
	this.create(camb, callback);
}


module.exports=mongoose.model("Cambio", cambioSchema, "Cambio");