var mongoose=require("mongoose");
var keywords_schema=new mongoose.Schema({
    
    po:[{nivel:String, nome:String}],
    departamento:[{nome:String, chefe:String, budget_mensal:Number, budget_limite:Number}],
    regiao:[{nome:String, regional_manager:String}],



})

keywords_schema.statics.gravar_keywords=function(keyword, callback){
    this.create(keyword, callback)
}

module.exports=mongoose.model("Keywords", keywords_schema, "Keywords")