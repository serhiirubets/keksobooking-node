const packageInfo = require(`../../package.json`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  execute() {
    console.log(`v${packageInfo.license}`);
    process.exit(0);
  }
};
