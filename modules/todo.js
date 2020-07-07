const { Schema, model } = require('mongoose')

const todo = new Schema({
    title: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    },
})

module.exports = model('todo', todo)