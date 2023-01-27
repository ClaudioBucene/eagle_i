var mongoose = require('mongoose');
var funcionarioSchema = new mongoose.Schema({
	nome: {type: String},
	identificador: {type: String},
	sexo: {type: String},
	estado_civil: {type: String},
	conjuge: {type: String},
	nome_pai: {type: String},
	nome_mae: {type: String},
	data_nascimento: {type: Date},
	pais_nascimento: {type: String},
	provincia_nascimento: {type: String},
	distrito_nascimento: {type: String},
	bairro_nascimento: {type: String},
	nome_pais_nascimeno: {type: String},
	nome_cidade_nascimeno: {type: String},
	numero_documento_identificacao: {type: String},
	data_entrada: {type: Date, 'default': Date.now},
	nivel_academico: {type: String},
	cargo: {type: String},
	area_formacao: {type: String},
	provincia_residencia: {type: String},
	distrito_residencia: {type: String},
	localidade_residencia: {type: String},
	bairro_residencia: {type: String},
	flat_residencia: {type: String},
	andar_residencia: {type: String},
	rua_avenida_residencia: {type: String},
	quarteirao_residencia: {type: String},
	numero_casa_residencia: {type: String},
	telefone_1: {type: String},
	telefone_2: {type: String},
	telefone_3: {type: String},
	email: {type: String},
	fax: {type: String},
	crime_cometido: {type: String},
	observacao_crime: {type: String},
	num_anos_pena: {type: String},
	num_meses_pena: {type: String},
	num_dias_pena: {type: String},
	data_entrada: {type: Date, 'default': Date.now},
	nivel_academico: {type: String},
	cargo: {type: String},
	area_formacao: {type: String},
	username: {type: String},
	senha: {type: String},
	usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
	funcionario: {type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario'},
	posto: {type: mongoose.Schema.Types.ObjectId, ref: 'Posto'}
});


funcionarioSchema.statics.registarFuncionario = function(funcionario, callback){
	this.create(funcionario, callback);
}

funcionarioSchema.statics.todosFuncionarios = function(posto, callback){
	this.find({posto: posto}).populate('usuario funcionario posto', '_id nome').exec(callback);
}

funcionarioSchema.statics.buscarFuncionario = function(id, callback){
	this.findById(id).populate('usuario funcionario posto', '_id nome').exec(callback);
};

funcionarioSchema.statics.actualizarFuncionario = function(id, funcionario, callback){
	this.findByIdAndUpdate(id, {$set: funcionario}, callback);
}

funcionarioSchema.statics.removerFuncionario = function(id, callback){
	this.findByIdAndRemove(id, callback);
}

funcionarioSchema.statics.login = function(usuario, callback){
	var telRegex = new RegExp(usuario.username+'$', 'i');
	var textRegex = new RegExp("^"+usuario.username+'$', 'i');

	this.findOne({senha: usuario.senha, $or: [{telefone1: telRegex}, {telefone2: telRegex}, {telefone3: telRegex}, {nome: textRegex}, {username: textRegex}]}).populate('usuario funcionario', '_id nome')
		.exec(callback)
}

module.exports = mongoose.model('Funcionario', funcionarioSchema, 'funcionarios');