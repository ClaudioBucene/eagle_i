var mongoose=require("mongoose");

var stock_request_Schema= new mongoose.Schema({
	requested_by:String,
	requested_by_ref:String,
	stocK_request_number:String,
	date_request:{type:Date, 'default':Date.now},
	company:String,
	request_from:String,
	request_from_ref:String,
	department:String,
	Date_required:String,
	quote_BS_number:String,
	reason:String,
	book_out_to_store:String,
	intervenientes:[String],
	estagio:[Number],
	items:[{description:String, quanty:String, referencia:String, received:String, booked_out:String, data_recepcao:Date, data_book_out:Date, serialized:String, cliente_name:String, grupo:String, num_serie:[String], precos:[String]}],
	stock_approvers:[String],
	date_actions:[Date],
	real_date_required:Date,
	decline_reasons:String,
	actual_situation:String,
	returned:Boolean,
	returned_reason:String,
	responsaveis_arrmazem:[String],
	chefe_departamento:String,
	departamento_ref:String,
	local_levantamento:String,
	previsao_entrega:String,
	regiao:String,
	vendido_a:String,
	requisitar_em:String,
	opcional_:[String]


})

stock_request_Schema.statics.gravar_stock_request = function(stock_request, callback){
	this.create(stock_request, callback);

}


module.exports=mongoose.model("Stock_request", stock_request_Schema, "Stock_request");


