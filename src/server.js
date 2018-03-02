const express = require(`express`);
const config = require(`./common/config`);
const routes = require(`./routes`);

const port = process.argv[3] || config.server.port;
const app = express();

app.use(express.static(`static`));
app.use(`/api/offers`, routes);

module.exports = {
  name: `server`,
  description: `Start local server`,
  execute() {
    app.listen(port, config.server.hostname, (err) => {
      if (err) {
        return console.error(err);
      }
      return console.log(`Server was started on http://${config.server.hostname}:${port}`);
    });
  },
  getServer() {
    return app;
  }
};
