const {
  coord,
  price,
  types,
  room,
  guests,
  times,
  features,
  photoUrls
} = require(`./constants`);
const {getRandomNumber, getRandomUniqArray} = require(`./helpers`);

const titles = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];

const generateLocation = () => {
  return {
    x: getRandomNumber(coord.X_MIN, coord.X_MAX),
    y: getRandomNumber(coord.Y_MIN, coord.Y_MAX)
  };
};

module.exports.generateLocation = generateLocation;

module.exports.generateEntity = (i) => {
  const coords = generateLocation();
  const time = times[getRandomNumber(0, times.length - 1)];

  return {
    author: {
      avatar: `https://robohash.org/${i}`
    },
    offer: {
      title: titles[i],
      address: `${coords.x}, ${coords.y}`,
      price: getRandomNumber(price.MIN, price.MAX),
      type: types[getRandomNumber(0, types.length - 1)],
      rooms: getRandomNumber(room.MIN_ROOM_COUNT, room.MAX_ROOM_COUNT),
      guests: getRandomNumber(guests.MIN, guests.MAX),
      checkin: time,
      checkout: time,
      features: getRandomUniqArray(
          features,
          getRandomNumber(0, features.length - 1)
      ),
      description: ``,
      photos: [...photoUrls.sort(() => getRandomNumber(-1, 1))]
    },
    location: coords,
    date: Date.now()
  };
};
