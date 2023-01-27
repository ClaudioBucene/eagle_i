var mongoose=require("mongoose");
var messageSchema= new mongoose.Schema({
	remetente:String,
	destinatario:String,
	dataenv:{type: Date, 'default':Date.now},
	assunto:String,
	conteudo:String, 
	status:{type:String, 'default':"bold"},
	activo:{type:String, 'default':"sim"},
	tipo:String
	 })
messageSchema.statics.gravarDados=function(msg, callback){
	this.create(msg, callback);
}

module.exports= mongoose.model("Mensagem", messageSchema, "Mensagem");

