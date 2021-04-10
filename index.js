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

app.get('/', (req,res) => {
    res.json({
        message: "Welcome to IDStack Moexpress"
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})