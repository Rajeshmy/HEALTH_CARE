const Appointment = require('../business/models/Appointment');

const createAppointment = async (req, res) => {
    try {
        const { doctorId, date, symptoms } = req.body;
        const appointment = new Appointment({
            patientId: req.user.id,
            doctorId,
            date,
            symptoms,
        });
        await appointment.save();
        res.status(201).json({ success: true, appointmentDetails: appointment });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        let populateFields = [];
        let filters = {};

        if (req.user.role === 'admin') {
            populateFields.push({ path: 'doctorId', select: 'name email' }, { path: 'patientId', select: 'name email' })
        } else if (req.user.role === 'doctor') {
            populateFields.push({ path: 'patientId', select: "name email" })
            filters = { doctorId: req.user.id };
        } else {
            populateFields.push({ path: 'doctorId', select: 'name email' });
            filters = { patientId: req.user.id };
        }

        const appointments = await Appointment.find(filters).populate(populateFields);
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getAppointments, createAppointment }