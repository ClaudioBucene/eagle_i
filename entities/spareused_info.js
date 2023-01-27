var mongoose=require("mongoose");
var spareused_infoSchema=new mongoose.Schema({
	spareusedinfo_client:String,
	spareusedinfo_site:String,
	spareusedinfo_siteid:String,
	spareusedinfo_item:[{description_item:String, referenciaitemid:String, serialized:String, num_serie:[String], data_receivedmaint:[String], spareusedphoto:[String]}],
	spareusedinfo_itemreturned:[{description_item:String, referenciaitemid:String, serialized:String, num_serie:[String], data_receivedmaint:[String], spareusedphoto:[String]}],
	data:{type:Date, 'default':Date.now}


})

spareused_infoSchema.statics.gravarDados=function(spareused_info, callback){
	this.create(spareused_info, callback);
}

spareused_infoSchema.statics.visualizacao=function(spareused_info, callback){
	this.find(spareused_info);
	}

module.exports=mongoose.model("SpareUsed_Info",spareused_infoSchema, "SpareUsed_Info");