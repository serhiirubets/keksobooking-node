const assert = require(`assert`);
const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const {Status} = require(`../src/common/config`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

const name = `Pavel`;
const title = `Маленькая квартирка рядом с парком Маленькая квартирка рядом с парком Маленькая чистая квратира на краю парка.`;
const description = `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`;
const price = 30000;
const type = `flat`;
const rooms = 1;
const capacity = 5;
const timein = `12:00`;
const timeout = `12:00`;
const features = [`elevator`, `conditioner`];
const address = `500, 600`;
const expectedLocationX = 500;
const expectedLocationY = 600;

describe(`GET /api/offers`, function () {
  const expectedDataLength = 4;

  it(`Should respond default json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(Status.OK)
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
        .expect(Status.OK)
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
        .expect(Status.OK)
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
        .expect(Status.OK)
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
        .expect(Status.OK)
        .expect(`Content-Type`, /json/);
  });

  it(`Should return offer\`s avatar by date`, () => {
    return request(app)
        .get(`/api/offers/1519472613744/avatar`)
        .expect(Status.OK);
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/offersfes`)
        .set(`Accept`, `application/json`)
        .expect(Status.NOT_FOUND)
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
          capacity,
          timein,
          timeout,
          features,
        }).
        expect(Status.OK).
        expect(({body}) => {
          assert.ok(body.author.name, name);
          assert.ok(body.offer.title, title);
          assert.ok(body.offer.address, address);
          assert.ok(body.offer.description, description);
          assert.ok(body.offer.price, price);
          assert.ok(body.offer.type, type);
          assert.ok(body.offer.rooms, rooms);
          assert.ok(body.offer.guests, capacity);
          assert.ok(body.offer.checkin, timein);
          assert.ok(body.offer.checkout, timeout);
          assert.ok(body.offer.features, features);
          assert.ok(body.location.x, expectedLocationX);
          assert.ok(body.location.y, expectedLocationY);
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`).
        field(`type`, type).
        field(`description`, description).
        field(`title`, title).
        field(`address`, address).
        field(`price`, price).
        field(`timein`, timein).
        field(`timeout`, timeout).
        field(`rooms`, rooms).
        field(`name`, name).
        field(`capacity`, capacity).
        field(`features`, features).
        expect(Status.OK).
        expect(({body}) => {
          assert.ok(body.author.name, name);
          assert.ok(body.offer.title, title);
          assert.ok(body.offer.description, description);
          assert.ok(body.offer.price, price);
          assert.ok(body.offer.type, type);
          assert.ok(body.offer.rooms, rooms);
          assert.ok(body.offer.guests, capacity);
          assert.ok(body.offer.checkin, timein);
          assert.ok(body.offer.checkout, timeout);
          assert.ok(body.offer.features, features);
          assert.ok(body.location.x, expectedLocationX);
          assert.ok(body.location.y, expectedLocationY);
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`).
        field(`type`, type).
        field(`description`, description).
        field(`title`, title).
        field(`address`, address).
        field(`price`, price).
        field(`timein`, timein).
        field(`timeout`, timeout).
        field(`rooms`, rooms).
        field(`name`, name).
        field(`capacity`, capacity).
        field(`features`, features).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(Status.OK).
        expect(({body}) => {
          assert.ok(body.author.name, name);
          assert.ok(body.offer.title, title);
          assert.ok(body.offer.description, description);
          assert.ok(body.offer.price, price);
          assert.ok(body.offer.type, type);
          assert.ok(body.offer.rooms, rooms);
          assert.ok(body.offer.guests, capacity);
          assert.ok(body.offer.checkin, timein);
          assert.ok(body.offer.checkout, timeout);
          assert.ok(body.offer.features, features);
          assert.ok(body.location.x, expectedLocationX);
          assert.ok(body.location.y, expectedLocationY);
          assert.ok(typeof body.avatar.path, `string`);
          assert.ok(typeof body.avatar.mimetype, `string`);
        });
  });
});
