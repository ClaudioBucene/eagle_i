
var mongoose=require("mongoose");
var veiculoSchema= new mongoose.Schema({
	motorista:{type:String, 'required':true},
	matricula: String,
	datta:{type:String},
	vidros:String,
	nivel:String,
	extintor:String,
	socorros:String,
	cintoSeg:String,
	data_inspecao:{type:Date, 'default':Date.now},
	kilometragem:String,
	carrocaria:String,
	razaoCarrocari:[String],
	razaoCamera:[String],
	razaoPneus:[String],
	razaoPressao:[String],
	razaoPorcas:[String],
	razaoVidros:[String],
	razaoLuzes:[String],
	razaoNivel:[String],
	razaoTravoes:[String],
	razaoextintor:[String],
	razaosocorros:[String],
	razaocintoSeg:[String],
	razaobolareboque:[String],
	parabrisas:String,
	porcas:String,
	pneus:String,
	luzes:String,
	sinalizacao:String,
	pressao:String,
	oleo:String,
	refrigeracao:String,
	travoes:String,
	Waning_engine:String,
	observacao:String,
	bolareboque:String,
	camera:String,
	handsfree:String,
	limpa_parabrisas:String,
	regiao:String,
	provincia:String,
	data_acao:String,
	razao_acao:String,
	estado_acao:String,
	fleet_man:String,
	tipo_acao:String,
	estado_carro:String,
	dieselbowser:String,
    dbowser_inspencao_id:String,
	feito:Boolean,
	lembrete:String,
	data_resolucao:String,
	problemas:[String],
	autorizado_por:String,
	Data_autorizacao:Date,
	permitido_circular:String
	// controle:{type:Date, 'default': Date.now}
});

veiculoSchema.statics.gravarDados=function(veiculos, callback){
	this.create(veiculos, callback);
}

veiculoSchema.statics.visualizacao=function(veicul, callback){
	this.find(veicul)
}

module.exports= mongoose.model("Veiculos", veiculoSchema, "Veiculos");