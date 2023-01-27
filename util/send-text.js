var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function enviarSms(destinatario, msg) {
	// console.log(destinatario.charAt(0))
	var data = JSON.stringify({
	  "from": "COMSERV",
	  "to": destinatario,
	  "text": msg
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    console.log(this.responseText);
	  }
	});
//Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
//Basic ZnJlbGltbzpzRzVHUE1hTA==
	xhr.open("POST", "https://api.infobip.com/sms/2/text/single");
	xhr.setRequestHeader("Authorization", "Basic ZnJlbGltbzpzRzVHUE1hTA==");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Accept", "application/json");

	xhr.send(data);
}

function sendText(usr, msg){
	
		enviarSms(usr.telefone_1, msg);
	
}

module.exports = sendText