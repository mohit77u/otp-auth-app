const mongoose = require('mongoose');

// connect mongoo DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected");
})
.catch(err => {
    console.log({ database_error: err });
});

// create connection
const db = mongoose.connection;

module.exports = db;