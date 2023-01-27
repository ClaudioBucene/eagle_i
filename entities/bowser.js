
var mongoose=require("mongoose");
var bowserSchema= new mongoose.Schema({
	dieselbowser:{type:String, 'required':true},
	matricula:String,
	criado_por:String,
	data_registo:{type:Date, 'default':Date.now},
	data_registo1:String,
});

bowserSchema.statics.gravarDados=function(veiculos, callback){
	this.create(veiculos, callback);
}

bowserSchema.statics.visualizacao=function(veicul, callback){
	this.find(veicul)
}

module.exports= mongoose.model("Diesel_bowser", bowserSchema, "Diesel_bowser");