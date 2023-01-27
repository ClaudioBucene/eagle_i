var mongoose = require("mongoose");
// var dbURI    = "mongodb://nobre:ilustre@127.0.0.1/COMSERVGood";
var dbURI="mongodb://127.0.0.1/COMSERVGood"
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function(){
	console.log("Conectado a Base de Dados");
});

mongoose.connection.on("disconnected", function(){
	console.log("Desconectado da Base de Dados");
});

mongoose.connection.on("error", function(err){
	console.log("Ocorreu um erro ao tentar conectar-se a Base de Dados\nPara mais informacoes sobre o erro: "+err);
	process.exit(0);
});


process.on("SIGINT", function(){
	console.log("Aplicacao esta sendo encerrada\nFechando a conexao com a Base de Dados");
	mongoose.connection.close(function(){
		console.log("Fechada a conexao com a Base de Dados");
		process.exit(0);
	});
});
