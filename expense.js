const mongoose =require('mongoose');
const expenseSchema=new mongoose.Schema({
    title:String,
    amount:Number,
    desc:String,
});

const Expense=mongoose.model('Ex',expenseSchema)
module.exports=Expense;