var mongoose=require("mongoose");
var fornecedorSchema=new mongoose.Schema({
	clienteeditadopor:String,
	dataedicaocliente:String,
	clienteregistadopor:String,
	dataregistocliente:String,
	fornecedor_cod:String,
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
	cliente_termos:String,
	carta_apresentacao_empresa:String,
	alvara:String,
	certidao_entidades_legais:String,
	nuit:String,
	nuel:String,
	carta_confirmacao_banco:String,
	contactosArrayCliente: [{contacto_nome:String, contacto_cargo:String, contacto_email:String,  contacto_telefone:String}]
})

fornecedorSchema.statics.gravarDados=function(fornecedor, callback){
	this.create(fornecedor, callback);
}

fornecedorSchema.statics.visualizacao=function(fornecedor, callback){
	this.find(fornecedor);
	}

module.exports=mongoose.model("Fornecedor",fornecedorSchema, "Fornecedor");