const config = require('./config/config');
const db = require('./config/database');
const app = require('./app');

console.info(`Server listening on port ${config.port}`);

  async function main() {
    try {
      await db.connect();
      app.listen(config.port, () => {
        // eslint-disable-next-line no-undef
        console.info(`Worker running PID ${process.pid}`);
      });
    } catch (e) {
      console.error(e);
      // eslint-disable-next-line no-undef
      process.exit(1);
    }
  }

  main();