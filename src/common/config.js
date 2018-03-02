module.exports = {
  status: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  },
  server: {
    port: 3000,
    hostname: `127.0.0.1`
  },
  contentType: {
    html: `text/html; charset=UTF-8`,
    css: `text/css`,
    js: `application/javascript`,
    ico: `image/x-icon`,
    jpg: `image/jpeg`,
    jpeg: `image/jpeg`,
    png: `image/png`,
    git: `image/gif`
  },
  validateRules: {
    title: {
      min: 30,
      max: 140
    },
    price: {
      min: 1,
      max: 100000
    },
    address: {
      min: 0,
      max: 100
    },
    rooms: {
      min: 0,
      max: 1000
    },
    types: [`flat`, `house`, `bungalo`, `palace`],
    HHMMFormat: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  }
};
