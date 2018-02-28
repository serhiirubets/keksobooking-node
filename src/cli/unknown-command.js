module.exports = {
  name: `wrongCommand`,
  description: `Shows default text if command is wrong`,
  execute(command) {
    console.error(`Неизвестная команда ${command}. Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
};
