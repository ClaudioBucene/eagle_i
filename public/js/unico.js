function gravarDados(){
	var motorista=$("#motorista").val();
	var matricula=$("#matricula").val();
	var parabrisas=$("#parabrisas").val();
	var porcas=$("#porcas").val();
	var pneus=$("#pneus").val();
	var parafusos=$("#parafusos").val();
	var sinalizacao=$("#sinalizacao").val();
	var buzina=$("#buzina").val();
	var liquido=$("#liquido").val();
	var kit_maos=$("#kit_maos").val();
	var camera=$("#camera").val();
	$.post( "/inspdiario/", {motorista:motorista, matricula:matricula, parabrisas:parabrisas, porcas:porcas, pneus:pneus, parafusos:parafusos, sinalizacao:sinalizacao, buzina:buzina, liquido:liquido,kit_maos:kit_maos, camera:camera}, function( data ) {
			alert(JSON.stringify(data));
		$("#motorista").val('');
		$("#matricula").val('');
		$("#parabrisas").val('');
		$("#porcas").val('');
		$("#pneus").val('');
		$("#parafusos").val('');
		$("#sinalizacao").val('');
		$("#buzina").val('');
		$("#liquido").val('');
		$("#kit_maos").val('');
		$("#camera").val('');
		console.log("cheguei!!!!!")
	});


}

function actualizar(){

$.getJSON('/movimento/consultar', function(result){
$('#table_list .table_body').html('');
console.log(result[0]);
for (var i = 0; i < result.length; i++) {
$('#table_list .table_body').append('<tr><td>'+result[i].nome+'</td><td>'+result[i].matricula+'</td><td>'+result[i].vaga+'</td></tr>');
};
});


}

function removerCarro(){

var matricul = $("#matricul").val();
$.post( "/movimento/remover", 
{ matricul:matricul}, function( data ) {
//alert(JSON.stringify(data));
$("#matricul").val('');
actualizar();
});
}
$(document).ready(function(){
	var currentTab = 0; // Current tab is set to be the first tab (0)
	showTab(currentTab); // Display the current tab
});

function showTab(n) {
// This function will display the specified tab of the form..
var x = document.getElementsByClassName("tab");
if(x.length && x[n])
	x[n].style.display = "block";
//... and fix the Previous/Next buttons:
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
if(prevBtn){
	if (n == 0) {
		prevBtn.style.display = "none";
	} else {
		prevBtn.style.display = "inline";
	}
}
if(nextBtn){
	if (n == (x.length - 1)) {
		nextBtn.innerHTML = "Submit";
	} else {
		nextBtn.innerHTML = "Next";
	}
}
//... and run a function that will display the correct step indicator:
fixStepIndicator(n)
}

function nextPrev(n) {
// This function will figure out which tab to display
var x = document.getElementsByClassName("tab");
// Exit the function if any field in the current tab is invalid:
if (n == 1 && !validateForm()) return false;
// Hide the current tab:
x[currentTab].style.display = "none";
// Increase or decrease the current tab by 1:
currentTab = currentTab + n;
// if you have reached the end of the form...
if (currentTab >= x.length) {
// ... the form gets submitted:
document.getElementById("regForm").submit();
return false;
}
// Otherwise, display the correct tab:
showTab(currentTab);
}

function validateForm() {
// This function deals with validation of the form fields
var x, y, i, valid = true;
x = document.getElementsByClassName("tab");
y = x[currentTab].getElementsByTagName("input");
// A loop that checks every input field in the current tab:
for (i = 0; i < y.length; i++) {
// If a field is empty...
if (y[i].value == "") {
// add an "invalid" class to the field:
y[i].className += " invalid";
// and set the current valid status to false
valid = false;
}
}
// If the valid status is true, mark the step as finished and valid:
if (valid) {
document.getElementsByClassName("step")[currentTab].className += " finish";
}
return valid; 
}

function fixStepIndicator(n) {
var i, x = document.getElementsByClassName("step");
for (i = 0; i < x.length; i++) {
	x[i].className = x[i].className.replace(" active", "");
}
		x[n].className += " active";
}