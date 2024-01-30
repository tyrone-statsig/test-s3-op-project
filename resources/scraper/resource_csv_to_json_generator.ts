import * as csvParser from "csv-parser";
import * as fs from "fs";

// Define the type for each row in the CSV
interface CsvRow {
  Name: string;
  "Resource type": string;
  "Project Id": string;
  "Display name": string;
  Status: string;
  Folders: string;
  Organization: string;
  "Parent asset type": string;
  "Parent full resource name": string;
  "KMS keys": string;
  "Direct tags": string;
  Description: string;
  Location: string;
  Labels: string;
  "Network tags": string;
  "Additional attributes": string;
}

// Array to store extracted information
const extractedData: { type: string; name: string; id: string }[] = [];

// Read the CSV file and extract information
fs.createReadStream("cloud_resources.csv")
  .pipe(csvParser())
  .on("data", (row: CsvRow) => {
    // Extract the required information (Display name and Project Id)

    const name_struct = {
      type: "gcp:storage/bucket:Bucket",
      name: `${row["Project Id"]}/${row["Display name"]}`,
      id: `${row["Display name"]}`,
    };

    // Add the extracted information to the array
    extractedData.push(name_struct);
  })
  .on("end", () => {
    // Print or use the extracted data
    let json_formated_data = {
      resources: extractedData,
    };
    fs.writeFile(
      "bucket_import.json",
      JSON.stringify(json_formated_data),
      (error) => {
        if (error) throw error;
      }
    );
  });
