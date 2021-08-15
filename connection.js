const mongoose = require('mongoose')

const DBConnect = async () => {
    await mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

module.exports = DBConnect;
