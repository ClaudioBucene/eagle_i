var mongoose=require("mongoose");
var clienteSchema=new mongoose.Schema({
	clienteeditadopor:String,
	dataedicaocliente:String,
	clienteregistadopor:String,
	dataregistocliente:String,
	cliente_cod:String,
	cliente_nome:String,
	cliente_filial:String,
	cliente_nuit:String,
	cliente_telefone:String,
	cliente_web:String,
	cliente_outros:String,
	cliente_endfisico:String,
	cliente_bairrofisico:String,
	cliente_cidadefisico:String,
	cliente_provinciafisico:String,
	cliente_codpostalfisico:String,
	cliente_paisfisico:String,
	cliente_endpostal:String,
	cliente_bairropostal:String,
	cliente_cidadepostal:String,
	cliente_provinciapostal:String,
	cliente_codpostalpostal:String,
	cliente_paispostal:String,
	contactosArrayCliente: [{contacto_nome:String, contacto_cargo:String, contacto_email:String,  contacto_telefone:String}]
})

clienteSchema.statics.gravarDados=function(cliente, callback){
	this.create(cliente, callback);
}

clienteSchema.statics.visualizacao=function(cliente, callback){
	this.find(cliente);
	}

module.exports=mongoose.model("Cliente",clienteSchema, "Cliente");