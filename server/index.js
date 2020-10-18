if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const { app, server } = require('./app');
const bodyParser= require('body-parser')
const userRouter = require('./routers/user')
//require mongodb connection
require('./mongodb/connect')

const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  //const { host, port } = nuxt.options.server;
  const PORT = process.env.PORT || 3000;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(userRouter)
  app.use(nuxt.render);

  server.listen(PORT, () => {
    consola.ready({
      message: `Server listening on http://`,
      badge: true,
    });
  });
}
start();
