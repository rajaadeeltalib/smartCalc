#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';

let yourName: string;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome To My Smart Calculator!\nCreated by Adeel Talib'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO USE')} 
    1. You need to Enter your 1st Number.
    2. You need to select your Operator.
    3. You need to Enter your 2nd Number.
    4. ${chalk.bgRed('If you entered wrong input I will Throw Error')}    
  `);
}

async function yName() {
    const answers = await inquirer.prompt({
      name: 'yourName',
      type: 'input',
      message: 'What is your name? ',
      default() {
        return 'Name:';
      },
    });  

    yourName = answers.yourName.toUpperCase();
}

console.clear();
await welcome();
await yName();

let againCalculate;

do {

    const question = async () => {
        const answers = await inquirer.prompt([
            {
                name: "num1",
                type: "number",
                message: chalk.greenBright("Enter your 1st Number: ")
            },
            {
                name: "operator",
                type: "rawlist",
                message: chalk.greenBright("Select your operation, Use Arrow Keys for Up and Down."),
                choices: [
                    "+",
                    "-",
                    "*",
                    "/",
                    "%",
                ]
            },
            {
                name: "num2",
                type: "number",
                message: chalk.greenBright("Enter your 2nd Number: ")
            },
        ]);

        return manageAnswer(answers.num1, answers.operator, answers.num2);
    }

    const manageAnswer = async (num1: number, selectedOperator: string, num2: number) => {
        const spinner = createSpinner('Calculating...').start();
        await sleep();

        let result: number = 0;

        switch (selectedOperator) {
            case "+":
                result = num1 + num2;
                spinner.success({ text: `${yourName} Your Result Is: ${chalk.bold.yellowBright(num1, "+", num2, "=", result)}` });
                break;
            case "-":
                result = num1 - num2;
                spinner.success({ text: `${yourName} Your Result Is: ${chalk.bold.yellowBright(num1, "-", num2, "=", result)}` });
                break;
            case "*":
                result = num1 * num2;
                spinner.success({ text: `${yourName} Your Result Is: ${chalk.bold.yellowBright(num1, "*", num2, "=", result)}` });
                break;
            case "/":
                result = num1 / num2;
                spinner.success({ text: `${yourName} Your Result Is: ${chalk.bold.yellowBright(num1, "/", num2, "=", result)}` });
                break;
            case "%":
                result = num1 % num2;
                spinner.success({ text: `${yourName} Your Result Is: ${chalk.bold.yellowBright(num1, "%", num2, "=", result)}` });
                break;
            default:
                return;
        }
    }

    const restart = async () => {
        const again = await inquirer.prompt({
            name: 'restart',
            type: 'rawlist',
            message: chalk.magentaBright("Do you want more calculations? Enter 1 for Yes and 2 for No."),
            choices: 
            [
                "Yes",
                "No",
            ]
        });

        againCalculate = again.restart;
    }

    await question();
    await restart();
    console.clear();

} while (againCalculate === "Yes");