const request = require(`supertest`);
const assert = require(`assert`);
const mockOffersRouter = require(`./mock-offers-router`);
const {Status} = require(`../src/common/config`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

const title = `Маленькая квартирка рядом с парком Маленькая квартирка рядом с парком Маленькая чистая квратира на краю парка.`;
const timein = `12:00`;
const timeout = `12:00`;
const rooms = `5`;
const features = [`dishwasher`, `elevator`];
const name = `Keksik`;
const address = `500, 600`;

describe(`Validation`, () => {
  describe(`Title field`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: `bungalo`,
            title: ``,
            price: `2`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `title`, errorMessage: `Поле title - обязательное текстовое поле`}]);
    });

    it(`Should validate title`, () => {
      return request(app).post(`/api/offers`).
          send({
            title: `New Title`,
            type: `bungalo`,
            price: `2`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `title`, errorMessage: `Заголовок должен быть в переделах 30 ... 140 символов`}]);
    });
  });

  describe(`Type field`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: ``,
            title,
            price: `2`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `type`, errorMessage: `Поле type - обязательное текстовое поле`}]);
    });

    it(`Should be one of the list`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: `bungalo`,
            title,
            price: `2`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.OK);
    });

    it(`Should show error if type is not from the list`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: `baaungalo`,
            title,
            price: `2`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `type`, errorMessage: `Поле type - должно быть значением одно из flat,house,bungalo,palace`}]);
    });
  });

  describe(`Price field`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: ``,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `price`, errorMessage: `Поле price - обязательное числовое поле`}]);
    });

    it(`Should be from 1 to 100000`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: `bungalo`,
            title,
            price: `3`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.OK);
    });

    it(`Should show error if price is less than 1`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: `bungalo`,
            title,
            price: `-5`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `price`, errorMessage: `Поле price - число в интервале от 1 до 100000`}]);
    });

    it(`Should show error if price is more than 100000`, () => {
      return request(app).post(`/api/offers`).
          send({
            type: `bungalo`,
            title,
            price: `300000`,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `price`, errorMessage: `Поле price - число в интервале от 1 до 100000`}]);
    });
  });

  describe(`Address`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address: ``,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `address`, errorMessage: `Поле address - обязательное текстовое поле`}]);
    });

    it(`Should be lesser than 100`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address: title.repeat(4),
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `address`, errorMessage: `Поле address должно быть размером до 100 символов`}]);
    });
  });

  describe(`Timein`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein: ``,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `checkin`, errorMessage: `Поле checkin - обязательное текстовое поле`}]);
    });

    it(`Should check format`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.OK);
    });

    it(`Should show error if format is not correct`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein: `24:00`,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `checkin`, errorMessage: `Поле checkin должно быть в формате HH:mm`}]);
    });
  });

  describe(`Timeout`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout: ``,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `checkout`, errorMessage: `Поле checkout - обязательное текстовое поле`}]);
    });

    it(`Should check format`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.OK);
    });

    it(`Should show error if format is not correct`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timeout: `24:00`,
            timein,
            rooms,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `checkout`, errorMessage: `Поле checkout должно быть в формате HH:mm`}]);
    });
  });

  describe(`Rooms`, () => {
    it(`Should be required`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms: ``,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `rooms`, errorMessage: `Поле rooms - числовое поле`}]);
    });

    it(`Should show error if rooms less than 0`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms: `-5`,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `rooms`, errorMessage: `Поле rooms должно находиться в интервале от 0 до 1000`}]);
    });

    it(`Should show error if rooms more than 100`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms: `1005`,
            features,
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `rooms`, errorMessage: `Поле rooms должно находиться в интервале от 0 до 1000`}]);
    });
  });

  describe(`Features`, () => {
    it(`Should not contain duplicate value`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms,
            features,
            name
          }).
          expect(Status.OK);
    });

    it(`Should show error if it is duplicate`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms,
            features: [`washer`, `washer`, `dishwasher`],
            name
          }).
          expect(Status.BAD_REQUEST, [{error: `Validation Error`, fieldName: `features`, errorMessage: `Поле features должно состоять из неповторяющиеся значений`}]);
    });
  });

  describe(`Name`, () => {
    it(`Should return name if it was not sent`, () => {
      return request(app).post(`/api/offers`).
          send({
            price: `100`,
            type: `bungalo`,
            title,
            address,
            timein,
            timeout,
            rooms,
            features: [`washer`, `dishwasher`],
          }).
          expect(Status.OK)
          .then((response) => assert(response.body.author.name.length > 0, true)); // eslint-disable-line
    });
  });
});
