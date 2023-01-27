var mongoose=require("mongoose");
var stock_schema= new mongoose.Schema({
	name:String,
	description_item:{type:String, unique:true, required:true},
	category:String,
	unit_sale:String,
	serialized_item:String,
	cliente_stock:String,
	cliente_name:String,
	cliente_ref:String,
	product_code:String,
	group:String,
	subcategory:String,
	part_number:{type:String},
	list_date_price:String,
	handling_fee:String,
	lead_time:String,
	context:String,
	supplier:String,
	least_price:String,
	data_registo:{type:Date, 'default':Date.now},
	registado_por:String,
	grupo:String

})

stock_schema.statics.gravarStock_item=function(stock, callback){
	this.create(stock, callback);
}

module.exports=mongoose.model("Stock_Item", stock_schema, "Stock_Item")