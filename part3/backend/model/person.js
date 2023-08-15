const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to ', url);

mongoose.connect(url).then(result => {
    console.log('Connected to DB');
}).catch(error => {
    console.log(error.message);
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (num) => {
                return /^\d{2,3}-\d+$/.test(num)
            },
            message: 'Error, phone number must be in format of XX-XXXXXXX or XXX-XXXXXXXX',
            required: true
        }
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);
