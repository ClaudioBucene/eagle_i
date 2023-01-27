var mongoose=require("mongoose");
var geradorSchema= new mongoose.Schema({
	interruptores_eletrico:String,
	manometro:String,
	licenca_veiculo:String,
	estado_geral_:String,
	freio_manual:String,
	pneus:String,
	tampa_combustivel:String,
	chapa_matricula:String,
	cabo_polia_peca:String,
	luzes:String,
	acoplamento:String,
	parafusos_hook:String,
	roda_sobressalente:String,
	roda_reboque:String,
	bateria:String,
	ficha_electrica:String,
	gerador_abordo:String,
	motorista:String,
	data:{type:Date, 'default':Date.now},
	observacao:String
})

geradorSchema.statics.gravarDadosGerador=function(gerador, callback){
	this.create(gerador, callback);
}

module.exports=mongoose.model("Gerador", geradorSchema, "Gerador")