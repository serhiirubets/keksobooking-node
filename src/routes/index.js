const offersStore = require(`../services/offers`);
const imageStore = require(`../services/images`);
const offersRoute = require(`./offers`)(offersStore, imageStore);

module.exports = offersRoute;
