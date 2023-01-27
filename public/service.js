var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'testeVI',
  description: 'Apenas uma descrição',
  script: 'C:\\Users\\Administrator\\Documents\\from\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();