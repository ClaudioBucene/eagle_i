var db_Mov=require('../entities/veiculos');
exports.consulta_veiculos = function(req, res){
	db_Mov.Veiculos.find({}, function(Erro, veiculos){
		res.json(veiculos);	
	});
};