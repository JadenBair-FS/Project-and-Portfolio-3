const moongoose = require('mongoose');

module.exports = async () => {
    try {
        await moongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to database');
    }
    catch(err) {
        console.log('Could not connect to database');
    }
}