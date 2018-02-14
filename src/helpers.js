const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

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

module.exports.getRandomNumber = getRandomNumber;
