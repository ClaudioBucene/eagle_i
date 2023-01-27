
var mongoose=require("mongoose");
var bowserinspectionSchema= new mongoose.Schema({
	dieselbowser:{type:String, 'required':true},
	pneus: String,
	jantes:{type:String},
    data_inspencao1:String,
	porcas:String,
	travoes:String,
	luzes:String,
	bomba_abastecimento:String,
	contador:String,
	data_inspecao:{type:Date, 'default':Date.now},
	pistola:String,
	mangueira:String,
	sistema_engate:String,
	roda_descanso:String,
	roda_suplente:String,
	molas_suspensao:String,
	folgas_cubo:String,
	matricula:String,
	inspencao_id:String,
	matriculaViatura:String,
	responsavel:String,
	razaoPneus:[String],
	razaoJantes:[String],
	razaoPorcas:[String],
	razaoTravoes:[String],
	razaoLuzes:[String],
	razaobomba_abastecimento:[String],
	razaoContador:[String],
	razaoPistola:[String],
	razaomangueira:[String],
	razaoSistema_engate:[String],
	razaoRoda_descanso:[String],
	razaoRoda_suplente:[String],
	razaoMolas_suspensao:[String],
	razaoFolgas_cubo:[String],
});

bowserinspectionSchema.statics.gravarDados=function(veiculos, callback){
	this.create(veiculos, callback);
}

bowserinspectionSchema.statics.visualizacao=function(veicul, callback){
	this.find(veicul)
}

module.exports= mongoose.model("Bowser_inspection", bowserinspectionSchema, "Bowser_inspection");