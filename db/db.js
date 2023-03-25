const mongoose = require("mongoose");

const createConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database connected successfully !!!");
    } catch (error) {
        console.log( "Database Error:" + error);
    }
}

module.exports = createConnection;