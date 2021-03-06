const mongoose = require("mongoose");

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(` Monogdb connection Error ${err.message}`);
});
