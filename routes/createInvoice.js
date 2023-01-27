const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path, partNumber) {
  let doc = new PDFDocument({ size: "A4", margin: 50,
   permissions:{ printing:"highResolution", modifying:false, copying:false, contentAccessibility:false, fillingForms:false, annotating:false, documentAssembly:false}});

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice, partNumber);
  generateFooter(doc, invoice);

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

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(8)
    .text(("Purchase Order Number: "+invoice.po_number), 50, 160);
  generateHr(doc, 170);

  const customerInformationTop = 185;

  doc
    .fontSize(8)
    .text("Supplier", 50, customerInformationTop)
    .font("Helvetica")
    .text((": "+invoice.supplier), 120, customerInformationTop)
    .font("Helvetica")
    .text("Supplier Tel", 50, customerInformationTop + 15)
    .text((": "+invoice.supplier_contact), 120, customerInformationTop + 15)
    .text("Name", 50, customerInformationTop + 30)
    .text((": "+invoice.requested_by), 120, customerInformationTop + 30)
    .text("Destination", 50, customerInformationTop + 45)
    .text((": "+invoice.for_store), 120, customerInformationTop + 45)
    

    .font("Helvetica")
    .text("Order Date", 400, customerInformationTop)
    .font("Helvetica")
    .text((": "+formatDate(invoice.data_po)), 500, customerInformationTop)
    .font("Helvetica")
    .text("Expected delivery date", 400, customerInformationTop + 15)
    .font("Helvetica")
    .text((": "+formatDate(invoice.data_po)), 500, customerInformationTop +15)
    .font("Helvetica")
    .text("Quotation Number", 400, customerInformationTop + 30)
    .font("Helvetica")
    .text((": "+invoice.quotation_number), 500, customerInformationTop +30)
    
    
    .moveDown();

  generateHr(doc, 240);
}

function generateInvoiceTable(doc, invoice, partNumber) {
  let i;
  const invoiceTableTop = 280;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Description",
    "Part Number",
    "Qty",
    "Unit Price",
    "Total",
    "IVA",
    "Total Liquido"
  );
  generateHr(doc, invoiceTableTop + 10);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 15;
    generateTableRow(
      doc,
      position,
      item.nome_item,
      partNumber[i],
      item.quantity,
      item.price,
      item.total,
      item.iva,      
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 10);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 15;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "",
    "Subtotal",
    invoice.subtotal,
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 10;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "",
    "IVA 17%",
   invoice.iva,
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 10;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "",
    "Total",
   invoice.total_to_pay,
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc, invoice) {
  doc
    .fontSize(6)
    .text(
      ("Processed by "+invoice.requested_by+" on "+formatDate(invoice.data_po)),
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
