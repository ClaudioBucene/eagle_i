var mongoose = require('mongoose');
var infraestruturaSchema = new mongoose.Schema({
	nome: {type: String},
	quantidade: {type: Number},
	marca: {type: [String]},
	referencia: {type: [String]},
	matricula: {type: [String]},
	chassi: {type: [String]},
	data_chegada: {type: [Date]},
	estado: {type: [String]},
	televisores: {type: [Number]},
	mesas: {type: [Number]},
	assentos: {type: [Number]},
	qualidade_assentos: {type: [String]},
	capacidade: {type: [Number]},
	camas: {type: [Number]},
	defecar: {type: [String]},
	banho: {type: [String]},
	estado_banheiro: {type: [String]},
	data_registo: {type: [Date], 'default': Date.now},
	usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
	funcionario: {type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario'},
	posto: {type: mongoose.Schema.Types.ObjectId, ref: 'Posto'}
});


infraestruturaSchema.statics.registarInfraestrutura = function(infraestrutura, callback){
	this.create(infraestrutura, callback);
}

infraestruturaSchema.statics.todosInfraestruturas = function(posto, callback){
	this.find({posto: posto}).populate('usuario funcionario posto', '_id nome').exec(callback);
}

infraestruturaSchema.statics.buscarInfraestrutura = function(id, callback){
	this.findById(id).populate('usuario funcionario posto', '_id nome').exec(callback);
};

infraestruturaSchema.statics.actualizarInfraestrutura = function(id, infraestrutura, callback){
	this.findByIdAndUpdate(id, {$set: infraestrutura}, callback);
}

infraestruturaSchema.statics.removerInfraestrutura = function(id, callback){
	this.findByIdAndRemove(id, callback);
}

module.exports = mongoose.model('Infraestrutura', infraestruturaSchema, 'infraestruturas');