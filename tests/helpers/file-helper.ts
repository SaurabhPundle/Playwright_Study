import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { log } from './logger';
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
function  readFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found with given path: ${filePath}`);
    }
    log("Info", `Reading file from path: ${filePath}`);
    let data =fs.readFileSync(filePath, { encoding: 'utf-8' });    
    return data;
}

function writeFile(filePath: string, data: string): void {
    try {
        fs.writeFileSync(filePath, data, { encoding: 'utf-8' });
        log("Info", `Successfully written data to file: ${filePath}`);
    } catch (error) {
        log("Error", `Failed to write data to file: ${filePath}, Error: ${error}`);
        throw error; // rethrow to let the caller handle it
    }
}
export default { readCSVFile, readFile, writeFile };