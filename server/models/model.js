const { default: mongoose } = require('mongoose')

const Schemea = require('mongoose').Schema
const Schema =mongoose.Schema;

// categories => field =>['type', 'color']
const categories = new Schema({
    type: {type:String, default:"Investment"},
    color:{type:String, default:"#FCBE44"}
})



// transactions => field =>['name','type','amount','date']
const transaction = new Schema({
    name:{type:String, default: 'Anonymous'},
    type:{type:String, default: 'Investment'},
    amount:{type:Number},
    date:{type:Date, default:Date.now},

})

const Categories = mongoose.model("categories", categories);
const Transaction = mongoose.model("transaction", transaction);

exports.default= Transaction;
module.exports = {
    Categories,
    Transaction
}