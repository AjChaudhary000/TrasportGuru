const mongo = require('mongoose');
mongo.connect(process.env.MONGODB).then(() => console.log("connected")).catch((e) => {
    console.log(e)
})

