var moment_zone=require("moment-timezone");
var CronJob = require("cron").CronJob;
var fs = require('fs');

//criar a pasta anual
var pasta_anual = new CronJob('0 0 0 1 2 *', function(){

    var year = new Date().getFullYear();

	var dir = './public/Pettycash_Control/' + year;

	if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
	

}, null, true, "Africa/Maputo")

pasta_anual.start();


exports.pasta1 = pasta_anual;