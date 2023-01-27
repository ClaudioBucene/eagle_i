var mongoose= require("mongoose")

var poSchema= new mongoose.Schema({
	requested_by:String,
	data_po:{type:Date, 'default':Date.now},
	supplier:String,
	deliver_shipping:String,
	supplier_contact:String,
	address:String,
	supplier_code:String,
	cliente_reff:String,
	payment_method:String,
	terms:String,
	department:String,
	department_ref:String,
	subdepartment:String,
	proposito:String,
	quotation_number:String,
	for_store:String,
	po_approver:String,
	po_approvers:[String],
	currency:String,
	actual_situation:String,
	comment:String,
	attach_document:String,
	total_order_value:String,
	discount_value:String,
	vat_amount:String,
	additional_cost:String,
	date_actions:[Date],
	status:{data:String, situation:String},
	observacao:String,
	primeiro_ficheiro:String,
	segundo_ficheiro:String,
	terceiro_ficheiro:String,
	decline_reasons:String,
	items:[{nome_item:String, price:String, quantity:String, total:String, received:String, referencia:String, serialized:String,grupo:String, cliente_ref:String, cliente_name:String, precos:[String]}],
	subtotal:String,
	iva:String,
	po_number:String,
	total_to_pay:String,
	valor_em_metical:String,
	valor_em_dolar:String,
	valor_em_euro:String,
	valor_em_rand:String,
	estagio:[Number],
	accao:[String],
	intervenientes:[String], 
	comprovativo:String, 
	returned:{type:Boolean},
	returned_reason:String,
	for_store_ref:String,
	invoice_number:String,
	clientte_name:String,
	quotation_number_project:String, 
	unprocessed:String





})


poSchema.statics.gravar_po=function(poo, callback){
	this.create(poo, callback);
}

module.exports=mongoose.model("Po", poSchema, "Po")