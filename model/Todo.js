const { Schema, model, Types } = require("mongoose");

const todoSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    text: {type: String},
    completed: {type: Boolean, default: false},
    important: {type: Boolean, default: false}
})

module.exports = model('Todo', todoSchema);