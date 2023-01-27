
var config 	= require('../config');
var http 	= require('http'); 
var qs = require('querystring');
var smsServerConfig = {
	host: '127.0.0.1',
	port: '4000',

};
module.exports = exports = {

	sendText: function(textOptions, callback){
		var textSendingEnabled = config.sendText;
		if(!textSendingEnabled){
			return callback(null, 'Envio de Mensagens desabilitado');
		}
		var options = {
			username: 'admin',
			password: '123456',
			to: textOptions.telefone_1,
			'message-type': 'sms.automatic',
			message: textOptions.msg
		};

		http.get({
			hostname: smsServerConfig.host,
			port: smsServerConfig.port,
			path: '/http/send-message?'+qs.stringify(options),
			agent: false  // create a new agent just for this one request
		}, (res) => {
				console.log(res.statusCode);
				callback();
		});
	}
}
