#!/usr/bin/env node
const args = process.argv.slice(2);
import { bot } from "./classes/botInfo.js";
import { generate } from "./classes/generate.js";
import { setup } from "./classes/setup.js";

switch (args[0]) {
  case "new": {
    const BOT = new bot();
    const start = new setup(BOT);
    await start.setup();
    break;
  }
  case "gen": {
    const gen = new generate();
    await gen.prompt();
    break;
  }
  default: {
    console.log(
      "No arguments were provided, please read the docs: https://github.com/raining-codes/molecube"
    );
  }
}
