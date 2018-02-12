const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);
const unknownCommand = require(`./unknown-command`);
const empty = require(`./empty`);
const help = require(`./help`);

module.exports = {
  '--author': () => author.execute(),
  '--description': () => description.execute(),
  '--license': () => license.execute(),
  '--version': () => version.execute(),
  '--help': () => help.execute(),
  unknownCommand: (arg) => {
    unknownCommand.execute(arg);
  },
  empty: () => empty.execute(),
};
