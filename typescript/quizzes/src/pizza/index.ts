#!/usr/bin/env node

// Run this app with `yarn ts-node src/pizza/index.ts`.
import chalk from "chalk";  // https://www.npmjs.com/package/chalk (using v4)
import clear from "clear";  // https://www.npmjs.com/package/clear
import figlet from "figlet";  // https://www.npmjs.com/package/figlet
import { program } from "commander";  // https://www.npmjs.com/package/commander

// Print the title page.
clear();
console.log(chalk.red(figlet.textSync("pizza-cli", { horizontalLayout: "full" })));

// Program handles execution arguments.
program
  .version("0.0.1")
  .description("An example CLI for ordering pizzas")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineappe", "Add pineapple")
  .option("-b, --bbq", "Add BBQ sauce")
  .option("-c, --cheese <type>", "Add the specified type of cheese [mozzarella]")
  .option("-C, --no-cheese", "You do not want any cheese")
  .parse(process.argv);

// If there were no options or arguments display help.
if (process.argv.slice(2).length === 0) {
  program.outputHelp();
  process.exit(0);
}

const options = program.opts();

// Print your order.
console.log("you ordered a pizza with:");
if (options.peppers) console.log("  - peppers");
if (options.pineapple) console.log("  - pineapple");
if (options.bbq) console.log("  - bbq");
const cheese: string = true === options.cheese ? "mozzarella" : options.cheese || "no";
console.log("  - %s cheese", cheese);
