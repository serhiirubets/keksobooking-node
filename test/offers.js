const assert = require(`assert`);
const request = require(`supertest`);
const app = require(`../src/server`).getServer();

const title = `Маленькая квартирка рядом с парком Маленькая квартирка рядом с парком Маленькая чистая квратира на краю парка.`;
const address = `Маленькая квартирка рядом с парком`;

describe(`GET /api/offers`, function () {
  const expectedDataLength = 4;

  it(`Should respond default json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 20);
          assert.equal(respnseData.data.length, 20);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond with custom limit query`, () => {
    return request(app)
        .get(`/api/offers?limit=10`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 10);
          assert.equal(respnseData.data.length, 10);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond with custom skip query`, () => {
    return request(app)
        .get(`/api/offers?skip=15`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 5);
          assert.equal(respnseData.data.length, 5);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond with custom skip and limit query`, () => {
    return request(app)
        .get(`/api/offers?skip=5&limit=8`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 3);
          assert.equal(respnseData.data.length, 3);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should return offer by date`, () => {
    return request(app)
        .get(`/api/offers/121`)
        .expect(200)
        .expect(`Content-Type`, /json/);
  });

  it(`Should return offer\`s avatar by date`, () => {
    return request(app)
        .get(`/api/offers/1519472613744/avatar`)
        .expect(200);
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/offersfes`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});

describe(`POST /api/offers`, function () {
  it(`should save offer`, () => {
    return request(app).post(`/api/offers`).
        send({
          name: `Pavel`,
          title,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
          price: 30000,
          type: `flat`,
          rooms: 1,
          guests: 1,
          checkin: `9:00`,
          checkout: `7:00`,
          features: [`elevator`, `conditioner`]
        }).
        expect(200, {
          name: `Pavel`,
          title,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
          price: 30000,
          type: `flat`,
          rooms: 1,
          guests: 1,
          checkin: `9:00`,
          checkout: `7:00`,
          features: [`elevator`, `conditioner`]
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`).
        field(`type`, `bungalo`).
        field(`title`, title).
        field(`address`, address).
        field(`price`, `2`).
        field(`checkin`, `12:00`).
        field(`checkout`, `12:00`).
        field(`rooms`, `5`).
        field(`name`, `keksik`).
        expect(200, {
          type: `bungalo`,
          title,
          price: `2`,
          address: `Маленькая квартирка рядом с парком`,
          checkin: `12:00`,
          checkout: `12:00`,
          rooms: `5`,
          name: `keksik`
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`).
        field(`title`, title).
        field(`type`, `bungalo`).
        field(`address`, address).
        field(`price`, `2`).
        field(`checkin`, `12:00`).
        field(`checkout`, `12:00`).
        field(`rooms`, `5`).
        field(`name`, `keksik`).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(200, {
          type: `bungalo`,
          title,
          price: `2`,
          address: `Маленькая квартирка рядом с парком`,
          checkin: `12:00`,
          checkout: `12:00`,
          rooms: `5`,
          name: `keksik`
        });
  });
});
