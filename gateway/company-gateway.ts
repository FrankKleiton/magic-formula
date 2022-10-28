import fs from "fs";
import { parse } from "csv-parse";
import { Company } from "../domain/entities/company";
import { Gateway } from "../domain/interfaces/gateway";

class CompanyGateway implements Gateway {
  list() {
    const companies: Company[] = [];

    return new Promise((resolve: (value: Company[]) => any, reject) => {
      fs.createReadStream("./data.csv")
        .pipe(parse({ delimiter: ";", from_line: 2 }))
        .on("data", function (row) {
          companies.push(
            new Company(
              row[0],
              parseFloat(row[3].replace(",", ".")),
              parseFloat(row[19].replace(",", "."))
            )
          );
        })
        .on("end", function () {
          resolve(companies);
        })
        .on("error", function (error) {
          reject();
        });
    });
  }
}

export { CompanyGateway };
