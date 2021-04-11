const express = require('express')
const cors = require('cors')

const app = express()

let corsOptions = {
    origin: "http://localhost:8001"
}
app.use(cors(corsOptions))

// parse request of content-type - application/json
app.use(express.json())
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// Connect Database
const db = require('./app/models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected!')
    }).catch((err) => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    });

app.get('/', (req,res) => {
    res.json({
        message: "Welcome to IDStack Moexpress"
    })
})

require('./app/routes/post.routes')(app)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})