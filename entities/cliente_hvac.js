var mongoose=require("mongoose");

var cliente_schema=new mongoose.Schema({
	nome_cliente:String,
	numero_primavera:String,
	provincia:String, 
	provincia_ref:String,
	regiao:String,
	regiao_ref:String,
	numero_cliente:String,
	rua:String,
	bairro:String,

	nuit:String,
	criado_por:String,
	data_criacao:{
		type:Date,
		"default":Date.now
	},
	contacto:{telemovel:String, email:String, caixa_postal:String, telefone:String},
	// filial:[{nome:String, rua:String, regiao:String, regiao_ref:String, provincia_ref:String, provincia:String, numero:String, bairro:String, criado_por:String, data_criacao:String, lat:String, long:String, contacto:String, email:String}],
	filial:[{nome:String, rua:String, regiao:String, regiao_ref:String, provincia_ref:String, provincia:String, numero:String, bairro:String, criado_por:String, data_criacao:String, lat:String, long:String, contacto:String, email:String, cliente_id:String}],
	pessoa_contactoArray:[{filial_id:String, filial_nome:String, pessoacontacto_nome:String, pessoacontacto_telefone:String, pessoacontacto_email:String}]

})

cliente_schema.statics.gravar_cliente=function(transferencia, callback){
	this.create(transferencia, callback);
}

module.exports=mongoose.model("Clientes_hvacs", cliente_schema, "Clientes_hvacs");
