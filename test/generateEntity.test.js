const assert = require(`assert`);
const {
  room,
  coord,
  price,
  types,
  times,
  photoUrls
} = require(`../src/constants`);
const {generateEntity, generateLocation} = require(`../src/generateEntity`);

const anyIndex = 0;
let generatedData;

describe(`Generate entity`, () => {
  beforeEach(() => {
    generatedData = generateEntity(anyIndex);
  });

  it(`Should generate array of objects`, () => {
    assert.ok(generatedData.toString() === `[object Object]`);
  });

  describe(`Tests for property`, () => {
    it(`Should generate avatar`, () => {
      assert.ok(typeof generatedData.author.avatar === `string`);
    });

    it(`Should generate title`, () => {
      const expectedTitles = [
        `Большая уютная квартира`,
        `Маленькая неуютная квартира`,
        `Огромный прекрасный дворец`,
        `Маленький ужасный дворец`,
        `Красивый гостевой домик`,
        `Некрасивый негостеприимный домик`,
        `Уютное бунгало далеко от моря`,
        `Неуютное бунгало по колено в воде`
      ];

      const {title} = generatedData.offer;
      assert.ok(expectedTitles.includes(title));
    });

    it(`Should generate address`, () => {
      const x = generatedData.location.x;
      const y = generatedData.location.y;
      const expectedAddress = `${x}, ${y}`;

      assert.ok(generatedData.offer.address === expectedAddress);
    });

    it(`Should generate price`, () => {
      assert.ok(
          generatedData.offer.price >= price.MIN &&
          generatedData.offer.price <= price.MAX
      );
    });

    it(`Should generate type`, () => {
      assert.ok(types.includes(generatedData.offer.type));
    });

    it(`Should generate count of rooms`, () => {
      assert.ok(
          generatedData.offer.rooms >= room.MIN_ROOM_COUNT &&
          generatedData.offer.rooms <= room.MAX_ROOM_COUNT
      );
    });

    it(`Should generate count of guests`, () => {
      assert.ok(typeof generatedData.offer.guests === `number`);
    });

    it(`Should generate time`, () => {
      assert.ok(times.includes(generatedData.offer.checkin));
      assert.ok(generatedData.offer.checkout === generatedData.offer.checkin);
    });

    it(`Should generate feature`, () => {
      const generatedFeatures = generatedData.offer.features;
      assert.ok(generatedFeatures instanceof Array);
      assert.ok(new Set(generatedFeatures).size === generatedFeatures.length);
    });

    it(`Should generate empty description`, () => {
      assert.ok(generatedData.offer.description.length === 0);
    });

    it(`Should generate photos urls`, () => {
      assert.ok(generatedData.offer.photos.length === photoUrls.length);
    });

    it(`Should generate location`, () => {
      const locationX = generatedData.location.x;
      const locationY = generatedData.location.y;

      assert.ok(locationX > coord.X_MIN && locationX < coord.X_MAX);
      assert.ok(locationY > coord.Y_MIN && locationY < coord.Y_MAX);
    });
  });
});

describe(`Generate location`, () => {
  it(`Should generate location with write coords`, () => {
    const muchIteratorCount = 500;
    for (let i = 0; i < muchIteratorCount; i++) {
      const coords = generateLocation();

      assert(
          coords.x >= coord.X_MIN && coords.x <= coord.X_MAX,
          `Not passed on ${i} test`
      );
    }
  });
});
