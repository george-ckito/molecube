#!/usr/bin/env node
const args = process.argv.slice(2);
import { bot } from "./classes/botInfo.js";
import { setup } from "./classes/setup.js";

switch (args[0]) {
  case "new": {
    const BOT = new bot();
    const start = new setup(BOT);
    await start.setup();
    break;
  }
  case "gen": {
    console.log("working on it");
    break;
  }
  default: {
    console.log("no args specified");
  }
}
