// Setup Koneksi MongoDB

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/First_App';

mongoose.connect(
  mongoDB, {useNewUrlParser : true}
).then(() => console.log('mongodb terhubung'));

mongoose.Promise = global.Promise;

module.exports = mongoose;