

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientDetailsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    age: Number,
    gender: String,
    contact: String,
    address: String,
    medicalHistory: [String]
}, { timestamps: true });

module.exports = mongoose.model('PatientDetails', patientDetailsSchema);
