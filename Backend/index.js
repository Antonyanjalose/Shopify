const express = require("express");
require('dotenv').config()
const cors= require('cors')
const dbConnect = require("./config/dbConnect");
const app = express();
const AuthRoutes = require('./routes/Auth')
const ShopifyRoutes = require('./routes/Shopify')
const PORT = process.env.PORT || 5002;



app.use(cors());


app.use(express.json())

// ---------DB Connection-----------
dbConnect()


// ==============- Routes ============

app.use('/api/auth',AuthRoutes)
app.use('/api/shopify',ShopifyRoutes)

 

app.listen(PORT,()=>{console.log(`server is running at PORT ${PORT}`)})

