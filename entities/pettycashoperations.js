var mongoose = require('mongoose');
var pettycashoperationsSchema = new mongoose.Schema({
	pettycashuser_code: {type: String},
	pettycashuser_nome: {type: String},
	pettycashuser_region: {type: String},
	pettycash_anoFiscal:Number,
	pettycash_ano:Number,
	pettycash_mes:Number,
	pettycash_data:String,
	pettycash_credito:String,
	pettycash_debito:String,
	pettycash_saldo:String,
	pettycash_notas:String,
	pettycash_verify:[Number],
	pettycash_verifyReason:[String],
	pettycash_purchase:[{purchase_date:String, purchase_description:String, purchase_value:String, purchase_supplier:String, purchase_docno:String, purchase_comments:String, purchase_imagem:[String]}],
	data_registo: {type: Date, 'default': Date.now},
	pettycash_audittrail:[{audittrail_username:String, auditrail_action:String, auditrail_date:String}]
});


pettycashoperationsSchema.statics.gravarDados=function(pettycashoperations, callback){ 
	this.create(pettycashoperations, callback);
}

pettycashoperationsSchema.statics.visualizacao=function(pettycashoperations, callback){
	this.find(pettycashoperations);
	}

module.exports=mongoose.model("Pettycashoperations",pettycashoperationsSchema, "Pettycashoperations");