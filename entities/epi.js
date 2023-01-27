var mongoose=require("mongoose");
var EpiSchema=new mongoose.Schema({
	estado_geral:String,
	image:String,
	componentes:String,
	nome:String,
	observacao:String,
	utilizador:String,
	data:{type:Date, 'default':Date.now}
})

EpiSchema.statics.gravarDadosEpi=function(epi, callback){
	this.create(epi, callback);
}

module.exports=mongoose.model("Epi",EpiSchema, "Epi");