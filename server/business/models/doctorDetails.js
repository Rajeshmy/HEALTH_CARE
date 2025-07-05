const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorDetailsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    availability: [String], // e.g., ['Monday 10-12', 'Wednesday 3-5']
}, { timestamps: true });

module.exports = mongoose.model('DoctorDetails', doctorDetailsSchema);
