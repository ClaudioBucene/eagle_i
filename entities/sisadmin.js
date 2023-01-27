var mongoose=require("mongoose");

var schemaAdmin=new mongoose.Schema({
	regiao:[{nome:String,  data_registo:{type:Date, 'default':Date.now}, registado_por:String, editado_por:String,status:String, data_edicao:String, regional_manager:String}],
	provincia:[{nome:String, nome_supervisor:String, regiao:String ,  data_registo:{type:Date, 'default':Date.now},status:String, registado_por:String, editado_por:String, data_edicao:String}],
	departamento:[{nome:String, chefe_depart:String, limite_mensal:{type:Number, 'default':0}, chefe_depart_id:String,  limite_po:{type:Number, 'default':0}, registado_por:String, status:String, data_registo:{type:Date, 'default':Date.now}, editado_por:String, data_edicao:String }],
	funcao:[{nome:String, registado_por:String, data_registo:{type:Date, 'default':Date.now}, status:String, editado_por:String, data_edicao:String}],
	nivel_acesso:[{nome:String, registado_por:String, data_registo:{type:Date, 'default':Date.now}, status:String, editado_por:String, data_edicao:String}],
	viatura:[{marca:String, modelo:String, registado_por:String, data_registo:{type:Date, 'default':Date.now}, editado_por:String, data_edicao:String, status:String}]


})


schemaAdmin.statics.gravar_admin=function(admin, callback){
	this.create(admin, callback);


}


module.exports=mongoose.model("adminitracao", schemaAdmin, "adminitracao");