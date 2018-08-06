#!/usr/bin/env ts-node
import * as fs from "fs";

const bufferToNumber = (buffer: Buffer): number => {
  const data = buffer.toJSON().data;
  const str = data.map(i => String.fromCharCode(i)).join("");
  return Number(str);
};

process.stdin.on(
  "data",
  (buffer: Buffer): void => {
    const end = bufferToNumber(buffer) - 1;
    fs.createReadStream("/dev/urandom", { end }).on("data", random => {
      console.log(JSON.stringify(random));
    });
  }
);
