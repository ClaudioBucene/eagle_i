const fs = require("fs");
const PDFDocument = require("pdfkit");

async function createInvoice(invoice, path, nome, endereco) {
  let doc = new PDFDocument({ size: "A4", margin: 50,
   permissions:{ printing:"highResolution", modifying:false, copying:false, contentAccessibility:false, fillingForms:false, annotating:false, documentAssembly:false}});

  await generateHeader(doc);
  await generateCustomerInformation(doc, invoice, endereco);
  await generateInvoiceTable(doc, invoice);
  await generateFooter(doc, nome);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
  // doc.pipe("http://127.0.0.1")
}

function generateHeader(doc) {
  const texto= "Av: Crisanto Cristiano Mitema,\nNumero: 186 \nMaputo, Mozambique \nTel : +258 21 316661 \nFax: +258 21 31 6662 \ne-mail: comserv@comserv.co.mz \nNUIT: 400118027"
  doc
    .image("logo.png", 50, 45, { width: 150 })
    .fillColor("#444444")
    // .fontSize(20)
    // .text("", 110, 57)
    .fontSize(8)
    // .text("Comserv.", 200, 75, { align: "center"})
    // .text("Av: Vladimir Lenine", 200, 90, { align: "center" })
    // .text("Maputo, 10025", 200, 105, { align: "center" })
    .text(texto,420, 75)
    .moveDown();
}

function generateCustomerInformation(doc, invoice, endereco) {
  doc
    .fillColor("#444444")
    .fontSize(8)
    .text(("Numero de referencia : "+invoice.jobcard_cod), 50, 160);
  generateHr(doc, 170);

  const customerInformationTop = 185;

  doc
    .fontSize(8)
    .text("Cliente", 50, customerInformationTop)
    .font("Helvetica")
    .text((": "+invoice.cliente), 120, customerInformationTop)
    .font("Helvetica")
    .text("Filial", 50, customerInformationTop + 15)
    .text((": "+invoice.filial), 120, customerInformationTop + 15)
    .text("Telefone", 50, customerInformationTop + 30)
    .text((": "+(endereco.contacto? endereco.contacto : "Sem Contacto")), 120, customerInformationTop + 30)
    .text("Endereço", 50, customerInformationTop + 45)
    .text((": "+(endereco.rua+", "+endereco.bairro+", "+(endereco.numero? endereco.numero :""))), 120, customerInformationTop + 45)
    

    .font("Helvetica")
    .text("Data da requisicao", 380, customerInformationTop)
    .font("Helvetica")
    .text((": "+formatDate(invoice.data_criacao)), 460, customerInformationTop)
    .font("Helvetica")
    .text("Data de Visita", 380, customerInformationTop + 15)
    .font("Helvetica")
    .text((": "+formatDate(invoice.audit_trail[1].data)), 460, customerInformationTop +15)
    .font("Helvetica")
    .text("Tecnico", 380, customerInformationTop + 30)
    .font("Helvetica")
    .text((": "+invoice.tecnico), 460, customerInformationTop +30)
    
    
    .moveDown();

  generateHr(doc, 240);
}

async function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 275;

  var base64Data =  await invoice.assinatura.replace(/^data:image\/png;base64,/, "");

  await require("fs").writeFile(".\\out.png", base64Data, 'base64', function(err) {
   console.log(err);

});
await sleep(2000);

  doc
  .fontSize(10)
  .font("Helvetica-Bold");
  generateTableRow(
    doc,
    270,
    "Material usado",
    "",
    "",
    "Quantidade",
    "",
    "",
    ""
    );
    generateHr(doc, 280);


  doc
  .fontSize(8)
  .font("Helvetica");
  var position;
  if(invoice.spares_usados.length>0)
  for (i = 0; i < invoice.spares_usados.length; i++) {
    const item = invoice.spares_usados[i];
    position = invoiceTableTop + (i + 1) * 15;
    generateTableRow(
      doc,
      position,
      item.descricao,
      "",
      "",
      item.quantidade,
      "",
      "",      
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 10);

   
  }
  else
  {
    position = invoiceTableTop + 15;
    generateTableRow(
      doc,
      position,
      "Nenhum Material foi usado para esta actividade.",
      "",
      "",
      "",
      "",
      "",      
      ""
    );

  }
  position = position + 45;

  doc
  .fontSize(10)
  .font("Helvetica-Bold");
  generateTableRow(
    doc,
    position,
    "Assistentes",
    "",
    "",
    "",
    "",
    "",
    ""
    );
    generateHr(doc, (position+10));


  doc
  .fontSize(8)
  .font("Helvetica");
  
  if(invoice.assistentes.length>0)
  for (i = 0; i < invoice.assistentes.length; i++) {
    const item = invoice.assistentes[i];
    position = position + 15;
    generateTableRow(
      doc,
      position,
      item.nome,
      "",
      "",
      "",
      "",
      "",      
      ""
    );

    generateHr(doc, position + 10);

    // console.log(process.cwd());

    // doc
    // .image(".\\out.png", 200, 545, { width: 150 });
  }
  else
  {
    position = position + 15;
    generateTableRow(
      doc,
      position,
      "Trabalho feito Sem Assistente.",
      "",
      "",
      "",
      "",
      "",      
      ""
    );

    

    generateHr(doc, position + 10);

  }

// *************************************************************************************************************************************************************************
position=position+30;
doc
  .fontSize(10)
  .font("Helvetica-Bold");
  generateTableRow(
    doc,
    (position),
    "Motivos da Realizacao do Trabalho.",
    "",
    "",
    "",
    "",
    "",
    ""
    );
    generateHr(doc, (position+10));
     doc
  .fontSize(8)
  .font("Helvetica");
  if(invoice.remedialaction && invoice.remedialaction.length>0)
 generateTableRow(
      doc,
      (position+15),
      invoice.razao,
      "",
      "",
      "",
      "",
      "",      
      ""
    );
else
  generateTableRow(
      doc,
      (position+15),
      "Visita Periodica.",
      "",
      "",
      "",
      "",
      "",      
      ""
    );


// ***********************************************************************************************************************ultima seccao*************************************
position=position+50;
doc
  .fontSize(10)
  .font("Helvetica-Bold");
  generateTableRow(
    doc,
    (position),
    "Accao Correctiva",
    "",
    "",
    "",
    "",
    "",
    ""
    );
    generateHr(doc, (position+10));
     doc
  .fontSize(8)
  .font("Helvetica");
  if(invoice.remedialaction && invoice.remedialaction.length>0)
 generateTableRow(
      doc,
      (position+15),
      invoice.remedialaction,
      "",
      "",
      "",
      "",
      "",      
      ""
    );
else
  generateTableRow(
      doc,
      (position+15),
      "Sem Comentario relacionado com trabalho!",
      "",
      "",
      "",
      "",
      "",      
      ""
    );

//************************************************************************************************************************************************************************** 
position=position+50;
 doc
  .fontSize(10)
  .font("Helvetica-Bold");
  generateTableRow(
    doc,
    (position+30),
    "Assinatura do cliente",
    "",
    "",
    "",
    "",
    "",
    ""
    );
    generateHr(doc, (position+40));
  doc
  .image("./out.png", 200, (position+50), { width: 150 });



  doc.font("Helvetica");
}


const sleep = ms =>{
	return new Promise(resolve => setTimeout(resolve, ms))
}

function generateFooter(doc, nome) {
  doc
    .fontSize(6)
    .text(
      ("Processado por "+nome+" aos "+formatDate(new Date())),
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  description,
  partnumber,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(7)
    .text(description, 50, y)
    .text(partnumber,340, y, { width: 50, align: "left" })
    .text(unitCost, 390, y, { width: 50, align: "left" })
    .text(quantity, 420, y, { width: 70, align: "left" })
    .text(lineTotal, 480, y, {width: 100, align: "left" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return  + (cents / 100).toFixed(2)+" Mt";
}

function formatDate(date) {
  const day = date.getDate()<10? ("0"+date.getDate()):date.getDate();
  const month = (date.getMonth() + 1)<10? ("0"+(date.getMonth() + 1)): (date.getMonth() + 1);
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = {
  createInvoice
};
