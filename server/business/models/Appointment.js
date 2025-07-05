const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    symptoms: {
        type: String,
    },
    age: Number,
    gender: String,
    contact: String,
    address: String,
    medicalHistory: [String],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
