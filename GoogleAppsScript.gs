
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const timestamp = new Date();
  const ticketNumber = "T-" + Math.floor(1000 + Math.random() * 9000); // auto ticket number

  sheet.appendRow([
    ticketNumber,
    e.parameter["Client Name"],
    e.parameter["Issue"],
    e.parameter["Status"],
    e.parameter["Assigned To"],
    e.parameter["Follow-Up"],
    timestamp
  ]);

  return ContentService.createTextOutput("Success");
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet("Sheet1");
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();

  const result = data.map(row => {
    let obj = {};
    headers.forEach((key, i) => obj[key] = row[i]);
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(result))
                       .setMimeType(ContentService.MimeType.JSON);
}
