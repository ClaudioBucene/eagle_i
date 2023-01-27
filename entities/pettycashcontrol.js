var mongoose=require("mongoose");

var pettycashcontrolSchema=new mongoose.Schema({

	pettycash_nome:String,
	pettycash_region:String,
	pettycash_creationdate:String,
	pettycash_financialyear:Number,
	pettycash_date:String,
	pettycash_datemes:Number,
	pettycash_description:String,
	pettycash_value:String,
	pettycash_supplier:String,
	pettycash_docno:String,
	pettycash_comments:String,
	pettycash_imagem:[String]

})


pettycashcontrolSchema.statics.gravarDados=function(pettycashcontrol, callback){
	this.create(pettycashcontrol, callback);
}

pettycashcontrolSchema.statics.visualizacao=function(pettycashcontrol, callback){
	this.find(pettycashcontrol);
	}

module.exports=mongoose.model("Pettycashcontrol",pettycashcontrolSchema, "Pettycashcontrol");