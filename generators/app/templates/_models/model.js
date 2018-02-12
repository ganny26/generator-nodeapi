const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: 'String', required: true },
    address: { type: 'String', required: true, unique: true },
    age: { type: 'String', required: true, unique: true },
    created_date: { type: 'Date', default: Date.now, required: true },
    user_agent: { type: 'Object', required: true }
});

module.exports = mongoose.model('UserModel', UserSchema);
