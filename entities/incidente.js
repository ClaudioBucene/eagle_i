var mongoose=require("mongoose")
var incidenteSchema= new mongoose.Schema({
    data:{type:Date, 'default':Date.now},
    registado_por:String,
    comentario:String, 
    regiao:String

})


incidenteSchema.statics.gravar_incidente= function(incidente, callback){
    this.create(incidente, callback);
}


module.exports=mongoose.model("Incidentes",incidenteSchema, "Incidentes");