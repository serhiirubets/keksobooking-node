const version = require(`./version`);
const description = require(`./description`);
const author = require(`./author`);
const license = require(`./license`);
const server = require(`../server`);

module.exports = {
  name: `help`,
  description: `Shows help instructions`,
  execute() {
    console.log(`Доступные команды: 
       --${this.name.grey} - ${this.description.green}
       --${license.name.grey} - ${license.description.green}
       --${version.name.grey} - ${version.description.green}
       --${description.name.grey} - ${description.description.green}
       --${author.name.grey} - ${author.description.green}
       --${server.name.grey} - ${server.description.green}
    `);
    process.exit(0);
  }
};
