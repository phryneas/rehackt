#!/usr/bin/env bash
set -x

node -e 'console.log(require("./index.js").version)'

node -e 'import("./index.js").then(rehackt => console.log(rehackt.version))'
node -e 'import("./index.js").then(rehackt => console.log(rehackt.default.version))'

bun build check/bun.js | bun run -
