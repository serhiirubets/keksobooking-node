const packageInfo = require(`../package.json`);

module.exports = {
  name: `Empty`,
  description: `Shows description if no any arguments`,
  execute() {
    console.log(`Привет ${packageInfo.author}! Эта программа будет запускать сервер «${packageInfo.name}».`);
  }
};
