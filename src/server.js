const express = require(`express`);
require(`dotenv`).config();
const routes = require(`./routes`);
const logger = require(`./common/logger`);

const port = process.argv[3] || process.env.SERVER_PORT;
const app = express();

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-WIth, Content-Type, Accept`);
  next();
});

app.use(express.static(`static`));
app.use(`/api/offers`, routes);

module.exports = {
  name: `server`,
  description: `Start local server`,
  execute() {
    app.listen(port, process.env.SERVER_HOST, (err) => {
      if (err) {
        return logger.error(err);
      }
      return logger.info(`Server was started on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
  },
  getServer() {
    return app;
  }
};
