const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log("server listening at port:-", PORT)
})



