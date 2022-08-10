const { sheetToData } = require("@newswire/sheet-to-data");
const { writeFileSync } = require("fs");
const { google } = require("googleapis");
const path = require("path");

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  process.env.GCLOUD_PROJECT = "music-share";
  process.env.GOOGLE_APPLICATION_CREDENTIALS =
    process.cwd() + "/" + "google.json";

  // const credentialsPath = path.join(os.homedir(), filePath);
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  // // pass in the valid authentication and ID of the sheet you want to process
  const sheetData = await sheetToData({
    spreadsheetId: "1QpMOCRpBHvtTAd0kZgnA4pG0HH13dV8725X373kSBXQ",
    auth,
  });

  var results = sheetData.Sheet1;

  // results.forEach((proj) => {
  //   proj.image =
  //     proj.link.split("/").slice(0, -1).join("/") + "/img/share-card.png";
  // });

  writeFileSync("./src/awards.json", JSON.stringify(results, null, 2));
}

main().catch(console.error);
