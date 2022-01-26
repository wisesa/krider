const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    name: {
        type: String
    },
    year: {
        type: String
    },
    pic: {
        type: String
    }
});

module.exports = Collection = mongoose.model('collection', CollectionSchema);