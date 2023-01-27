var mongoose = require('mongoose');
var usuarioSchema = new mongoose.Schema({
	user_code: {type: String},
	nome: {type: String, unique:true},
	nome_proprio:{type:String},
	carta_conducao: {type: String},
	supervisor: {type: String},
	data_nascimento: String,
	provincia_trabalho: {type: String},
	cidade_sede:{type:String},
	Validade_carta: {type: String},
	modelo: {type: String},
	naturalidade_provincia: {type: String},
	naturalidade: {type: String},
	telefone_1: {type: String},
	telefone_supervisor: {type: String},
	nome_supervisor: {type: String},
	email: {type: String},
	username: {type: String},
	nivel_acesso: {type: String},
	senha: {type: String},
	matricula:String,
	ano_aquisicao:String,
	departamento:String,
	kilometragem:Number,
	funcao:String,
	verificador_funcao:String,
	regiao:String,
	marca:String,
	status: {type: String, 'default':'activo'},
	data_registo: {type: Date, 'default': Date.now},
	registado_por:String,
	loged:String,
	profile_pic:String,
	idioma:String,
	data:String,
	cargo:String,

	
	departamento_id:String,
	funcao_id:String,
	provincia_id:String,
	regiao_id:String,
	modulos:[{adcionado_por:String, referencia:String, data:String}]
});
usuarioSchema.statics.gravarDados=function(usuario, callback){
	this.create(usuario, callback);
}

usuarioSchema.statics.login = function(usuario, callback){
	var telRegex = new RegExp(usuario.username+'$', 'i');
	var textRegex = new RegExp("^"+usuario.username+'$', 'i');

	this.findOne({status: 'activo', senha: usuario.senha, $or: [{telefone1: telRegex}, {telefone2: telRegex}, {nome: textRegex}, {username: textRegex}]}).populate('usuario', '_id nome')
		.exec(callback)
}

module.exports = mongoose.model('Usuario1', usuarioSchema, 'Usuario1');