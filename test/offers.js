const assert = require(`assert`);
const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const {status} = require(`../src/common/config`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

const name = `Pavel`;
const title = `Маленькая квартирка рядом с парком Маленькая квартирка рядом с парком Маленькая чистая квратира на краю парка.`;
const address = `Маленькая квартирка рядом с парком`;
const description = `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`;
const price = 30000;
const type = `flat`;
const rooms = 1;
const guests = 5;
const checkin = `12:00`;
const checkout = `12:00`;
const features = [`elevator`, `conditioner`];

describe(`GET /api/offers`, function () {
  const expectedDataLength = 4;

  it(`Should respond default json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(status.OK)
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
        .expect(status.OK)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 20);
          assert.equal(respnseData.data.length, 10);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond with custom skip query`, () => {
    return request(app)
        .get(`/api/offers?skip=15`)
        .set(`Accept`, `application/json`)
        .expect(status.OK)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 20);
          assert.equal(respnseData.data.length, 5);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond with custom skip and limit query`, () => {
    return request(app)
        .get(`/api/offers?skip=5&limit=8`)
        .set(`Accept`, `application/json`)
        .expect(status.OK)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const respnseData = response.body;
          assert.equal(respnseData.total, 20);
          assert.equal(respnseData.data.length, 8);
          assert.equal(Object.keys(respnseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should return offer by date`, () => {
    return request(app)
        .get(`/api/offers/121`)
        .expect(status.OK)
        .expect(`Content-Type`, /json/);
  });

  it(`Should return offer\`s avatar by date`, () => {
    return request(app)
        .get(`/api/offers/1519472613744/avatar`)
        .expect(status.OK);
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/offersfes`)
        .set(`Accept`, `application/json`)
        .expect(status.NOT_FOUND)
        .expect(`Content-Type`, /html/);
  });
});

describe(`POST /api/offers`, function () {
  it(`should save offer`, () => {
    return request(app).post(`/api/offers`).
        send({
          name,
          title,
          address,
          description,
          price,
          type,
          rooms,
          guests,
          checkin,
          checkout,
          features
        }).
        expect(status.OK).
        expect(({body}) => {
          assert.ok(body.name, name);
          assert.ok(body.title, title);
          assert.ok(body.address, address);
          assert.ok(body.description, description);
          assert.ok(body.price, price);
          assert.ok(body.type, type);
          assert.ok(body.rooms, rooms);
          assert.ok(body.guests, guests);
          assert.ok(body.checkin, checkin);
          assert.ok(body.checkout, checkout);
          assert.ok(body.features, features);
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`).
        field(`type`, type).
        field(`description`, description).
        field(`title`, title).
        field(`address`, address).
        field(`price`, price).
        field(`checkin`, checkin).
        field(`checkout`, checkout).
        field(`rooms`, rooms).
        field(`name`, name).
        field(`guests`, guests).
        field(`features`, features).
        expect(status.OK).
        expect(({body}) => {
          assert.ok(body.name, name);
          assert.ok(body.title, title);
          assert.ok(body.address, address);
          assert.ok(body.description, description);
          assert.ok(body.price, price);
          assert.ok(body.type, type);
          assert.ok(body.rooms, rooms);
          assert.ok(body.guests, guests);
          assert.ok(body.checkin, checkin);
          assert.ok(body.checkout, checkout);
          assert.ok(body.features, features);
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`).
        field(`type`, type).
        field(`description`, description).
        field(`title`, title).
        field(`address`, address).
        field(`price`, price).
        field(`checkin`, checkin).
        field(`checkout`, checkout).
        field(`rooms`, rooms).
        field(`name`, name).
        field(`guests`, guests).
        field(`features`, features).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(status.OK).
        expect(({body}) => {
          assert.ok(body.name, name);
          assert.ok(body.title, title);
          assert.ok(body.address, address);
          assert.ok(body.description, description);
          assert.ok(body.price, price);
          assert.ok(body.type, type);
          assert.ok(body.rooms, rooms);
          assert.ok(body.guests, guests);
          assert.ok(body.checkin, checkin);
          assert.ok(body.checkout, checkout);
          assert.ok(body.features, features);
          assert.ok(typeof body.avatar.path, `string`);
          assert.ok(typeof body.avatar.mimetype, `string`);
        });
  });
});
