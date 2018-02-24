const {generateEntity} = require(`../generateEntity`);
const DEFAULT_DATA_LIMIT = 20;
const DEFAULT_SKIP_NUMBER = 0;

// const absoluteAvatarsPath = path.join(__dirname, `..`, `static`, `img`, `avatars`);
const generateEntities = (length) => {
  const data = [];

  for (let i = 0; i < length; i++) {
    data.push(generateEntity(i));
  }

  return data;
};

const entities = generateEntities(20);

module.exports.all = (req, res) => {
  const limit = req.query.limit || DEFAULT_DATA_LIMIT;
  const skipNumber = req.query.skip || DEFAULT_SKIP_NUMBER;
  const entitiesForResponse = entities.slice(skipNumber, limit);
  const response = {
    data: entitiesForResponse,
    skip: skipNumber,
    total: entitiesForResponse.length,
    limit
  };

  res.json(response);
};

module.exports.date = (req, res) => {
  const date = Number(req.params[`date`].toLowerCase());

  res.json(entities.find((it) => it.date === date));
};

module.exports.avatar = (req, res) => {
  const date = Number(req.params[`date`].toLowerCase());
  const entity = entities.find((it) => it.date === date);

  if (!entity) {
    res.send(`Offer with this date is not exist`);
    return;
  }
  const avatar = entity.author ? entity.author.avatar : null;

  if (avatar) {
    res.send(avatar);
  } else {
    res.send(`Offer with this date is not exist`);
  }
};

module.exports.save = (req, res) => {
  const {
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
    features} = req.body;

  res.json({
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
  });
};
