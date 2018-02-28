const names = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const isNumber = (number) => typeof number === `number` && isFinite(number);

module.exports.getRandomUniqArray = (source, length) => {
  let randomUniqArray = [];

  for (let i = 0; i < length; i++) {
    const randomElement = source[getRandomNumber(0, source.length - 1)];

    if (!randomUniqArray.includes(randomElement)) {
      randomUniqArray.push(randomElement);
    }
  }

  return randomUniqArray;
};

const getRandomName = () => names[getRandomNumber(0, names.length - 1)];

module.exports.getRandomNumber = getRandomNumber;
module.exports.isNumber = isNumber;
module.exports.getRandomName = getRandomName;
