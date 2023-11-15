const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://thiepmoi:Hai8042k2@test.zijw6qo.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connect successfully!!');
    } catch (error) {
        console.log('connect failure!!');
    }
}

module.exports = { connect };
