const execute = require(`./src/execute`);
const [arg] = process.argv.slice(2);

if (!arg) {
  execute.empty();
  process.exit(0);
}

if (execute[arg]) {
  execute[arg]();
  process.exit(0);
}

execute.unknownCommand(arg);
process.exit(1);
