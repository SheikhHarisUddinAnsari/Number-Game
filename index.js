#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let i = 1;
let attempt = 4;
let point = 0;
var number = Math.floor(Math.random() * 10);
async function store_And_Check_Num() {
    console.log(chalk.redBright(`You have ${attempt} attempts left`));
    await inquirer
        .prompt([
        {
            type: "number",
            name: "guessed_Number_1",
            message: chalk.blueBright(`Guess a number between 1 to 9 and enter it`),
        },
    ])
        .then(async (answer) => {
        if (answer.guessed_Number_1 == number) {
            console.log(chalk.greenBright(`Congratulations! you won the game in your ${i} attempt`));
            switch (i) {
                case 1:
                    point = 500;
                    break;
                case 2:
                    point = 350;
                    break;
                case 3:
                    point = 200;
                    break;
                case 4:
                    point = 100;
                    break;
            }
            console.log(chalk.greenBright(`you achieved ${point} points`));
        }
        else {
            if (attempt > 1) {
                attempt = attempt - 1;
                i = i + 1;
                await store_And_Check_Num();
            }
            else {
                console.log(chalk.redBright(`You Lost the game`));
            }
        }
    });
} //this function stores and check that stored number is equal to computer or not and prints its result and points
async function restart() {
    do {
        await store_And_Check_Num();
        var again = await inquirer.prompt({
            type: "input",
            name: `restart`,
            message: chalk.red.bold(`press y or yes to restart game`),
        });
        attempt = 4;
        i = 1;
        point = 0;
        number = 0;
        number = Math.floor(Math.random() * 10);
    } while (again.restart == "y" || again.restart == "yes");
} //this function restarts the entire game
restart();
