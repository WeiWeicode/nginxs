const express = require('express');
const cors = require('cors');

const app = express()



// Middleware 中間件

app.use(cors({
    origin: '*'
  }));

app.use(express.json())

app.use(express.urlencoded({extended: true}))


// Routes

const router = require('./routes/productRouter.js')

app.use('/api/products', router)


// static Image Folder 使用圖片資料夾

app.use('/Images', express.static('./Images'))



// API test

app.get('/', (req, res) => {
    res.json({message: "Hello api"})
})

// port

const PORT = process.env.PORT || 8082


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})