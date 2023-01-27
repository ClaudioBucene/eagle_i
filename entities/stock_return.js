var mongoose=require("mongoose");

var stock_request_Schema= new mongoose.Schema({
	returned_by:String,
	returned_by_ref:String,
	stocK_request_number:String,
	date_request:{type:Date, 'default':Date.now},
	company:String,
	return_to:String,
	return_to_ref:String,
	department:String,
	Date_required:String,
	quote_BS_number:String,
	reason:String,
	book_out_to_store:String,
	intervenientes:[String],
	estagio:[Number],
	items:[{description:String, quanty:String, status:String, cliente_name:String, referencia:String, received:String, booked_out:String, data_recepcao:Date, data_book_out:Date,grupo:String, serialized:String, num_serie:[String], status:String , grupo:String, precos:[String]}],
	stock_approvers:[String],
	date_actions:[Date],
	real_date_required:Date,
	decline_reasons:String,
	actual_situation:String,
	returned:Boolean,
	returned_reason:String,
	responsaveis_arrmazem:[String],
	chefe_departamento:String,
	departamento:String,
	part_number:String,
	num_serie:[String],
	numero_:String

	


})

stock_request_Schema.statics.gravar_stock_return = function(stock_request, callback){
	this.create(stock_request, callback);

}


module.exports=mongoose.model("Stock_return", stock_request_Schema, "Stock_return");


