const version = require(`./version`);
const description = require(`./description`);
const author = require(`./author`);
const license = require(`./license`);

module.exports = {
  name: `help`,
  description: `Shows help instructions`,
  execute() {
    console.log(`Доступные команды: 
       --${this.name.cyan} - ${this.description.green}
       --${license.name.cyan} - ${license.description.green}
       --${version.name.cyan} - ${version.description.green}
       --${description.name.cyan} - ${description.description.green}
       --${author.name.cyan} - ${author.description.green}
    `);
  }
};
