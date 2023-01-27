var mongoose=require("mongoose");
var OficinaSchema=new mongoose.Schema({
	marca:String,
	modelo:String,
	matricula:{type:String, unique:true},
	ano_aquisicao:String,
	kilometragem:String,
	responsavel:{type:String},
	regiao:String,
	provincia:String,
	utilizado_por:String,
	existencia:{type:Boolean, 'default':true},
	parqueado:{type:Boolean, 'default':false},
	registado_por:String,
	// historico:[{nome:String, data_inspecao:String, problemas:[String], acao:String, fleet_manager:String}],


		// condutor:String,
		// matricula:String,
		// kilometragem:String,
		// marca:String,
		// modelo:String,
		// ano_aquisicao:{type:String, 'default':'2019'},
	data:{type:Date, 'default':Date.now},
		// provincia:String,
		// regiao:String,
		// local:String
	
	
})

OficinaSchema.statics.gravarDadosOficinas=function(ferramenta, callback){
	this.create(ferramenta, callback);
}

module.exports=mongoose.model("Oficina", OficinaSchema, "Oficina");