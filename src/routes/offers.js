const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const validator = require(`../common/validation`);
const {getRandomName, asyncHelper} = require(`../common/helpers`);
const dataRenderer = require(`../common/data-renderer`);
const createStreamFromBuffer = require(`../common/buffer-to-stream`);

const DEFAULT_DATA_LIMIT = 20;
const DEFAULT_SKIP_NUMBER = 0;

const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const offersRouter = new Router();

offersRouter.use(bodyParser.urlencoded({extended: false}));
offersRouter.use(bodyParser.json());

const toPage = async (cursor, skip = 0, limit = 20) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    total: await cursor.count(),
    skip,
    limit,
  };
};

const getAllOffers = async (req, res) => {
  const limit = req.query.limit || DEFAULT_DATA_LIMIT;
  const skipNumber = req.query.skip || DEFAULT_SKIP_NUMBER;

  res.send(await toPage(await offersRouter.offersStore.getAllOffers(), skipNumber, limit));
};

const getOfferByDate = async (req, res) => {
  const date = Number(req.params[`date`].toLowerCase());
  const offersPromise = await offersRouter.offersStore.getAllOffers();
  const offers = await offersPromise.toArray();
  res.json(offers.find((it) => it.date === date));
};

const getAvatar = asyncHelper(async (req, res) => {
  const date = Number(req.params[`date`].toLowerCase());
  const offersPromise = await offersRouter.offersStore.getAllOffers();
  const offers = await offersPromise.toArray();
  const offer = offers.find((it) => it.date === date);
  if (!offer) {
    res.send(`Offer with this date is not exist`);
    return;
  }
  const avatar = offer.avatar;

  if (!avatar) {
    throw new Error(`Wizard with name "${offer.name}" didn't upload avatar`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);
  if (!info) {
    throw new Error(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
});

const saveOffer = async (req, res) => {
  const address = req.body.address.split(`,`);
  const responseData = {
    author: {name: req.body.name || getRandomName()},
    offer: {
      title: req.body.title,
      address: req.body.address,
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
      rooms: req.body.rooms,
      guests: req.body.capacity,
      checkin: req.body.timein,
      checkout: req.body.checkout,
      features: req.body.features,
    },
    location: {x: address[0], y: address[1]}
  };

  const errors = validator(responseData);

  responseData.date = Date.now();
  if (errors.length) {
    res.status(400);
    res.json(errors);
    return;

  }
  const avatar = req.file;

  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${responseData.date}/avatar`,
      mimetype: avatar.mimetype
    };

    await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    responseData.author.avatar = avatarInfo.path;
    responseData.avatar = avatarInfo;
  }

  await offersRouter.offersStore.save(responseData);
  res.send(responseData);
};

offersRouter.get(`/`, getAllOffers);
offersRouter.post(``, upload.single(`avatar`), saveOffer);
offersRouter.get(`/:date`, getOfferByDate);

offersRouter.get(`/:date/avatar`, getAvatar);

offersRouter.use((exception, req, res, next) => {
  dataRenderer.renderException(req, res, exception);
  next();
});

module.exports = (offersStore, imageStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imageStore = imageStore;
  return offersRouter;
};

