const packageInfo = require(`../../package.json`);
const createFileWithEntity = require(`../generator/create-file-with-entity`);

module.exports = {
  name: `Empty`,
  description: `Shows description if no any arguments`,
  execute() {
    console.log(
        `Привет ${packageInfo.author}! Эта программа будет запускать сервер «${
          packageInfo.name
        }».`
    );

    createFileWithEntity();
  }
};
