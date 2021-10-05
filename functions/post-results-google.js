const { GoogleSpreadsheet } = require('google-spreadsheet');
exports.handler = async function (context, event, callback) {
  //var creds = require('./client_secret.json');
  try {
    const fs = require("fs");
    const credentials = JSON.parse(
        fs.readFileSync(Runtime.getAssets()["/client_secret.json"].path, "utf8")
    );
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(context.GOOGLE_SPREADSHEET_KEY);

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var submittedOn =  year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    // adding / removing sheets
    const row = await sheet.addRow({
      "Reason": event.Reason,
      "Frequency": event.Frequency,
      "Submitted_on": submittedOn,
      'Question3': event.Question3
    });

    callback(null, 'success');
  } catch (err) {
    console.error(err);
    callback(err);
  }
};