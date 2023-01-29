#!/usr/bin/env node

import { bot } from "./classes/botInfo.js";

const BOT = new bot();
await BOT.setup();
