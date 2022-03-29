const express = require('express');
const userRouter = require('./router/user');
const app = express()
const port = process.env.PORT
require('./database/db');
const path = require('path');
app.use(express.json())
app.use([userRouter])
app.use(express.static(path.join(__dirname, "./image")))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))