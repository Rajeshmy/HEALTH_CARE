const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')


const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);


app.listen(PORT, () => {
    console.log("server listening at port:-", PORT);
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err, "error "));
});



