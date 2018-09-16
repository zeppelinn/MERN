const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/hiring';
mongoose.connect(DB_URL);
module.exports = mongoose;