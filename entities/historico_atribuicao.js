var mongoose=require("mongoose");
var OficinaSchema=new mongoose.Schema({

		usado_por:String,
		matricula:String,
		kilometragem:String,
		marca:String,
		// modelo:String,
		// ano_aquisicao:String,
		data_atribuicao:{type:Date, 'default':Date.now},
		// provincia:String,
		// regiao:String,
		origem:String,
		beneficiario:String
	
	
})

OficinaSchema.statics.gravarDadosHistorico=function(ferramenta, callback){
	this.create(ferramenta, callback);
}

module.exports=mongoose.model("Historico", OficinaSchema, "Historico");