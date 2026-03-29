import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
// used to read csv file with fs module

function readCSVFile(filePath: string): any[] {
    // read csv file as string
    const csvDataStr = fs.readFileSync(filePath, { encoding: 'utf-8' });
    // parse csv data into array of objects
    const csvDataArray = parse(csvDataStr, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
    return csvDataArray;
}

export default { readCSVFile };