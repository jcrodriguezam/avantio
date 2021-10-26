const config = require('./config/config');
const mongoose = require('mongoose')
const app = require('./app');

const { url, database } = config.mongo;

async function main() {
  try {
    mongoose.Promise = global.Promise
    mongoose.connect(`${url}/${database}`)
    const db = mongoose.connection
    
    db.on('error', function(err){
      console.log('connection error', err)
    })
    
    db.once('open', function(){
      console.log('Connection to DB successful')
    })
    
    app.listen(config.port, () => {
      // eslint-disable-next-line no-undef
        console.info(`Server listening on port ${config.port}`);
      });
    } catch (e) {
      console.error(e);
      // eslint-disable-next-line no-undef
      process.exit(1);
    }
  }

  main();