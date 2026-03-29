import{test} from "@playwright/test";
import chalk from 'chalk';

type Level = "Log" | "Info" | "Warn" | "Error";

export async function log(level:Level,message:string){
    const plainLine =`[${level.toUpperCase()}]: ${message}`; // for allure

    let coloredLine = plainLine;

    // pick colour based on log level
    switch (level){
        case "Log":
            coloredLine = chalk.grey(plainLine);
            break;
        case "Info":
            coloredLine = chalk.blue(plainLine);
            break;
        case "Warn":
            coloredLine = chalk.yellow(plainLine);
            break;
        case "Error":
            coloredLine = chalk.red(plainLine);
            break;
    }
// print colored text in terminal
    console.log(coloredLine);

    // attach plain text to allure report
   await test.step(plainLine, async () => {
        // empty step, just to attach the log message
    }   );
}