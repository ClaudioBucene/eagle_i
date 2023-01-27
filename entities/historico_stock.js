var mongoose=require("mongoose");

var schema_historia = new mongoose.Schema({
data:{type:Date, 'default':Date.now},
items_recebidos:[{description:String, received:Number}],
nome_beneficiario:String
})

schema_historia.statics.gravarhistorico = function(historico, callback){

this.create(historico, callback);

}

module.exports=mongoose.model("Stock_Historico", schema_historia, "Stock_Historico")