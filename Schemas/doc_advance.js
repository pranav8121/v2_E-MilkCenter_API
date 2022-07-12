const mongoose = require('mongoose')

exports.doc_advance  = mongoose.model('AdvSupply', {
    type: { type: String },
    addAmount: { type: Number },
    cutAmount: { type: Number },
    date: { type: Date },
    No: { type: String },
    rate: { type: Number },
    bag: { type: Number },
    Name: { type: String },
    supType:{type: String},
    UId: { type: String }
});