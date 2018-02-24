const express = require(`express`);
const config = require(`./config`);
const routes = require(`./routes`);
const bodyParser = require(`body-parser`);

const hostname = `127.0.0.1`;
const port = process.argv[3] || config.server.port;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(`static`));
app.use(`/`, routes);

module.exports = {
  name: `server`,
  description: `Start local server`,
  execute() {
    app.listen(port, hostname, (err) => {
      if (err) {
        return console.error(err);
      }
      return console.log(`Server was started on http://${hostname}:${port}`);
    });
  },
  getServer() {
    return app;
  }
};
