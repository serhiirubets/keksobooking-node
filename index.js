const [arg] = process.argv.slice(2);

if (arg === `--version`) {
  console.log(`v0.0.1`);
  process.exit(0);
}

if (arg === `--help`) {
  console.log(`--help — печатает этот текст`);
  console.log(`--version — печатает версию приложения)`);
  process.exit(0);
}

if (!arg) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер Keksobooking.`);
  console.log(`Автор: Кекс.`);
  process.exit(0);
}

console.error(`Неизвестная команда ${arg}. Чтобы прочитать правила использования приложения, наберите "--help"`);
process.exit(1);
