const fs = require(`fs`);
const readline = require(`readline`);
const {generateEntity} = require(`./generateEntity`);

const MAX_ELEMENTS_LENGTH = 100;
const MIN_ELEMENTS_LENGTH = 1;
const MIN_FILE_NAME_LENGTH = 3;
const MAX_FILE_NAME_LENGTH = 15;

const isYesAnswer = (answer) => answer === `yes` || answer === `y`;
const isNoAnswer = (answer) => answer === `no` || answer === `n`;
const greeting = () => {
  const greetingMessage = `
  Хотите ли вы сгенерировать данные ? \n
  Please, answer yes/no \n
`;
  console.log(greetingMessage);
};

let progress = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `OHAI>`
});

rl.prompt();

const generateData = (length) => {
  const data = [];

  for (let i = 0; i < length; i++) {
    data.push(generateEntity(i));
  }

  return data;
};

const writeFile = () => {
  progress.isRewriteMode = false;
  fs.writeFile(progress.filename, JSON.stringify(progress.data), (err) => {
    if (err) {
      throw new Error(err);
    }

    progress = {};
    console.log(`File was succesfully saved \n`);
    process.exit(0);
  });
};

const createFile = (filename) => {
  progress.filename = filename;
  fs.open(filename, `r`, (err) => {
    if (err) {
      if (err.code === `ENOENT`) {
        writeFile(filename);
      }

      return;
    }

    console.log(
        `File with ${filename} has already extist. Would you like to rewrite it ? \n`
    );
  });
};

const isProgressStartMode = (line) => {
  return isYesAnswer(line) && !progress.isRewriteMode;
};

const isRewriteMode = (line) => {
  return isYesAnswer(line) && progress.isRewriteMode;
};

const isFileCreatedMode = (line) => {
  return (
    Number(line) >= MIN_ELEMENTS_LENGTH && Number(line) < MAX_ELEMENTS_LENGTH
  );
};

const isFileNameAllowed = (name) => {
  return (
    name.length >= MIN_FILE_NAME_LENGTH &&
    name.length <= MAX_FILE_NAME_LENGTH &&
    progress.isFileCreatedModeAllowed
  );
};

const progressStart = () => {
  progress.start = true;
  console.log(`Пожалуйста, укажите кол-во объектов \n`);
  return;
};

const generateDataForFile = (length) => {
  progress.data = generateData(length);
  progress.isFileCreatedModeAllowed = true;
  console.log(`Укажите пожалуйста название нового файла \n`);
};

const runCreateFileProgress = (name) => {
  createFile(name);
  progress.isRewriteMode = true;
  progress.isFileCreatedModeAllowed = false;
};

rl
    .on(`line`, (line) => {
      line = line.toLocaleLowerCase().trim();

      if (isProgressStartMode(line)) {
        progressStart();
        return;
      }

      if (isRewriteMode(line)) {
        writeFile(line);
        return;
      }

      if (isNoAnswer(line)) {
        rl.close();
        return;
      }

      if (isFileCreatedMode(line)) {
        generateDataForFile(Number(line));
        return;
      }

      if (isFileNameAllowed(line)) {
        runCreateFileProgress(line);
        return;
      }

      console.log(`Something go wrong`);
      progress.exit(1);
    })
    .on(`close`, () => {
      console.log(`Have a great day!`);
      process.exit(0);
    });

module.exports = greeting;
