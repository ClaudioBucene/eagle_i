var mongoose=require("mongoose");
var respostasinqueritoSchema=new mongoose.Schema({
	pergunta1:String,
	anexo:{companyname:String, companyresgistnum: String, surname:String, fornames:String, residentialadd:String, businessadd:String, postaladd:String, nationality:String, datebirth:String, passportnum:String, occupation:String},
	pergunta2:String,
	pergunta3:String,
	pergunta3details:String,
	pergunta4:String,
	pergunta5:String,
	pergunta5details:String,
	pergunta6:String,
	pergunta6details:String,
	pergunta7:String,
	pergunta7details:String,
	pergunta8:String,
	pergunta8details:String,
	pergunta9:String,
	pergunta9details:String,
	data:String,
	signature:String,
	company:String

	
});

respostasinqueritoSchema.statics.gravarDados=function(respostasinquerito, callback){
	this.create(respostasinquerito, callback);
}

respostasinqueritoSchema.statics.visualizacao=function(respostasinquerito, callback){
	this.find(respostasinquerito);
	}

module.exports=mongoose.model("Respostas",respostasinqueritoSchema, "Respostas");