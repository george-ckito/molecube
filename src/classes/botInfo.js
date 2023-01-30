import path from "path";
import fs from "fs";
import chalk from "chalk";
import packageJSON from "../../package.json" assert { type: "json" };
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import cp from "child_process";
import files from "../files/index.js";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export class bot {
  constructor() {
    // console.log({
    //   projectName: this.projectName,
    //   language: this.lanbroguage,
    //   packageManager: this.packageManager,
    //   token: this.token,
    //   mongodb: this.mongodb,
    // });
    // this.prompt();
    // this.createDirectories();
    // this.createFiles();
  }
  async prompt() {
    const title = chalk.blueBright(`Molecule v${packageJSON.version}`);
    console.log(title);
    const projectName = await inquirer.prompt({
      name: "projectName",
      type: "input",
      message: "What's the bot's name?",
    });

    // const language = await inquirer.prompt({
    //   name: "language",
    //   type: "list",
    //   message: "Select your bot's language",
    //   choices: ["JavaScript", "Typescript ( Not working yet! )"],
    // });

    const packageManager = await inquirer.prompt({
      name: "packageManager",
      type: "list",
      message: "Select your package manager",
      choices: ["Yarn", "Npm"],
    });

    const description = await inquirer.prompt({
      name: "description",
      type: "input",
      message: "Enter bot's description",
    });

    const token = await inquirer.prompt({
      name: "token",
      type: "input",
      message: "What's the bot's token?",
    });

    const mongodb = await inquirer.prompt({
      name: "mongodb",
      type: "input",
      message:
        "Enter your MongoDB URI (if you don't have one, just leave this default)",
    });

    this.projectName = projectName.projectName;
    // this.language = language.language;
    this.packageManager = packageManager.packageManager;
    this.description = description.description;
    this.token = token.token;
    this.mongodb = mongodb.mongodb;
    return {
      name: this.projectName,
      version: "1.0.0",
      description: this.description,
      main: "src/index.js",
      author: process.env.USER,
      license: "MIT",
      private: false,
    };

    console.log(this);
  }
}
