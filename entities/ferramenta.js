
var mongoose=require("mongoose");
var ferramentaSchema=new mongoose.Schema({
	estado_geral:String,
	cabos_mangueira:String,
	interruptores:String,
	ruido:String,
	image:String,
	funcionamento:String,
	manometro:String,
	macarico:String,
	nivel_oleo:String,
	nome:String,
	observacao:String,
	utilizador:String,
	data:{type:Date, 'default':Date.now},
	data_utilizador:{type:Date, 'default':Date.now}
})

ferramentaSchema.statics.gravarDadosFerramenta=function(ferramenta, callback){
	this.create(ferramenta, callback);
}

module.exports=mongoose.model("Ferramentas",ferramentaSchema, "Ferramentas");