const createOffersRouter = require(`../src/routes/offers`);
const {generateEntity} = require(`../src/generator/generateEntity`);

const offers = [];

for (let i = 0; i < 20; i++) {
  offers.push(generateEntity());
}

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class OffersStore {
  constructor() {
  }

  async getOffer(date) {
    return offers.find((it) => it.name.toLowerCase() === date);
  }

  async getAllOffers() {
    return new Cursor(offers);
  }

  async save() {
  }

}

class OffersImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }
}

module.exports = createOffersRouter(new OffersStore(), new OffersImageStore());
