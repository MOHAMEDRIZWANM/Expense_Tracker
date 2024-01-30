const mongoose =require('mongoose');
const express = require('express')
const app = express()
const port = process.env.PORT ||7002
const Expense=require('./models/expense')
mongoose.connect('mongodb+srv://Rizwan:Rizwan27.@cluster0.sngc24u.mongodb.net/newDB')
.then(()=>{console.log("db")});

app.use(express.json());


app.get('/', async (req, res) => {
    
        // const id=req.params.id; 
        const expense=await Expense.find({});
       
            res.send(expense)
  

    // try{
    //     const id=req.params.id;
    //     const expense=await Expense.findById(id);
    //     if(expense){
    //         res.send(expense)
    //     }
    //     else{
    //         res.send("NO Expense with that Id");
    //     }
    // }catch(err){
    //     res.send(err)
    // }
    // const expense= await Expense.find({});
})

app.post('/post', async(req, res) => {
    console.log(req.body)
    const newExpense=req.body;
    await Expense.create(newExpense)
    res.send('<h1>posted</h1>')
  })

  app.delete('/delete/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const result = await Expense.findByIdAndDelete(id);

        if(result)
            res.send(result);
        else
            res.send ("No such Expenses were found according to ur id");
    }
    catch(err){
        res.send(err);
    }
})  
  
app.put('/update/:id',async(req,res)=>{
    const id=req.params.id;
    const updateObject=req.body
    const updatedObject=await Expense.findByIdAndUpdate(id,{$set:updateObject},
        {new:true});
        res.send(updatedObject);
})  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
