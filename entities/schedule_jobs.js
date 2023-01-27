var mongoose=require("mongoose");
var cronplugin=require("mongoose-cron");
var schema=new mongoose.Schema({
	destino:String,
	cron:{
		enable:Boolean,
		startAt:Date,
		stopAt:Date,
		interval:String
	}
})

schema.plugin(cronplugin.cronPlugin, {
	handler:doc => console.log("processando", doc)
});


module.exports=mongoose.model("Tasks", schema, "Tasks");
