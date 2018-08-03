#!/usr/bin/env ts-node
import fs = require('fs');

fs.createReadStream("/dev/urandom", { end: 9999 })
  .on("data", data => {
    console.log(JSON.stringify(data));
  });
