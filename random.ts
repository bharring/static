#!/usr/bin/env ts-node
import * as fs from "fs";

process.stdin.on("data", (data: Buffer) => {
  fs.createReadStream("/dev/urandom", { end: 9999 }).on("data", data => {
    console.log(JSON.stringify(data));
  });
});
