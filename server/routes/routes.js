
const express = require("express");
// const routes = require("express").Router();
const routes = express.Router();
const controller = require("../controller/Controller");


routes.route("/api/categories")
.post(controller.createCategories)
.get(controller.getCategories)


routes.route("/api/transaction")
.post(controller.createTransaction)
.get(controller.getTransaction)
.delete(controller.deleteTransaction)
// .get((req,res)=>res.json("Get Request from Categories"))


routes.route("/api/labels")
.get(controller.getLabels)





module.exports = routes 