

var express = require('express');
require('./entities/db');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var pettycash= require("./routes/financas");
var viatura= require("./routes/viatura");
var inquerito= require("./routes/inquerito");
var cliente= require("./routes/cliente");
var manutencao= require("./routes/manutencao");
//var equipamento= require("./routes/equipamento");
var utilizador= require("./routes/utilizador");
var estatistica= require("./routes/site_estatistica");
var tanque =require("./routes/tanque");
var transferencia=require("./routes/transferencia");
var viatura_mensal=require("./routes/viatura_mensal");
var mensagem=require("./routes/mensagens");
var geradore=require("./routes/gerador");
var feramentas=require("./routes/ferramentass");
var epi=require("./routes/epi");
var hvac=require("./routes/climatizacao")
var stock_item= require("./routes/stock_item");
var veiculo_control=require("./routes/viatura_controleRt")
var purchase_order= require("./routes/po");
var stock_request= require("./routes/stock_request")
var stock_return= require("./routes/stock_return")
var armazem= require("./routes/armazem")
var keywords = require("./routes/keywords")
var carservice=require("./routes/car_service");
var incidente=require("./routes/incidente");
var dashboard=require("./routes/dashboard");
var sisadmin=require("./routes/sisadmin")
var mestre=require("./routes/mestre");
var dc_insp=require("./routes/dc_checklist");

var app = express();
var helmet=require("helmet");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(helmet());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/img/favicon.png'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'sssh'+Date.now()+Date.now()+Date.now(),
  resave:true, saveUninitialized:true
}));

app.use("/mestre", mestre);
app.use('/', indexRouter);
app.use(function(req, res, next){
  if( req.session.usuario){
    next();
  } else {
    res.redirect('/');
  }
});
app.use('/dc_insp', dc_insp);
app.use("/pettycash", pettycash);
app.use("/cliente", cliente );
app.use("/manutencao", manutencao );
app.use("/utilizador", utilizador );
app.use("/inspdiaria", viatura);
app.use("/inspmensal", viatura_mensal);
app.use("/gerador", geradore);
app.use("/inquerito", inquerito);
app.use("/transferencia", transferencia);
app.use("/epi", epi);
app.use("/climatizacao", hvac);
app.use("/site_estatistica", estatistica);
app.use("/tanque", tanque);
app.use("/mensagem", mensagem)
app.use("/ferramenta", feramentas)
app.use("/veiculo_Control", veiculo_control)
app.use("/stock_item", stock_item)
app.use("/purchase_order", purchase_order)
app.use("/stock_request", stock_request)
app.use("/stock_return", stock_return)
app.use("/armazem", armazem)
app.use("/keywords", keywords)
app.use("/carservice", carservice)
app.use("/incidente", incidente)
app.use("/dashboard", dashboard)
app.use("/sisadmin", sisadmin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.redirect("/")
    res.render('error_page', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.redirect("/")
  res.render('error_page', {
    message: err.message,
    error: {}
  });
});


app.listen(2700, function(){
  console.log("servidor correndo na porta 2900")
})



module.exports = app;
