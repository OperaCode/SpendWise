const model = require("../models/model");

//  post: http://localhost:8080/api/categories
async function createCategories(req, res){
  const Create = new model.Categories({
      type: "Investment",
      color: "#FCBE44"
  })

  await Create.save(function(err){
      if (!err) return res.json(Create);
      return res.status(400).json({ message : `Error while creating categories ${err}`});
  });
}

//  get: http://localhost:8080/api/categories
async function  getCategories(req, res){
   let data = await model.Categories.find({})

   let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color}));
   return res.json(filter);
}

//  post: http://localhost:8080/api/transaction
const createTransaction = async(req, res)=>{
   try {
    // if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
   const  { name, type, amount } = req.body;

   if (!name || !type || !amount){
    return res.status(500).json({message: "All fields are required"})
   }

   const create = await new model.Transaction(
       {
           name,
           type,
           amount,
           date: new Date()
       }
   );

   create.save();
   return res.json(create);
   } catch (error) {
    console.log(err)
    return res.status(400).json({ message : `Error while creating transaction ${err}`});
   }

}

//  get: http://localhost:8080/api/transaction
async function getTransaction(req, res){
   let data = await model.Transaction.find({});
   return res.json(data);
}

//  delete: http://localhost:8080/api/transaction
async function deleteTransaction(req, res){
   if (!req.body) res.status(400).json({ message: "Request body not Found"});
   await model.Transaction.deleteOne(req.body, function(err){
       if(!err) res.json("Record Deleted...!");
   }).clone().catch(function(err){ res.json("Error while deleting Transaction Record")});
}

//  get: http://localhost:8080/api/labels
async function getLabels(req, res){

   model.Transaction.aggregate([
       {
           $lookup : {
               from: "categories",
               localField: 'type',
               foreignField: "type",
               as: "categories_info"
           }
       },
       {
           $unwind: "$categories_info"
       }
   ]).then(result => {
       let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
       res.json(data);
   }).catch(error => {
       res.status(400).json("Looup Collection Error");
   })

}

module.exports = {
   createCategories,
   getCategories,
   createTransaction,
   getTransaction,
   deleteTransaction,
   getLabels
}