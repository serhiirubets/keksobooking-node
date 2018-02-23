require(`colors`);

const execute = require(`./src/execute`);
const [arg] = process.argv.slice(2);

function start() {
  if (!arg) {
    execute.empty();
    return;
  }

  if (execute[arg]) {
    execute[arg]();
    return;
  }

  execute.unknownCommand(arg);
  process.exit(1);
}

start();
