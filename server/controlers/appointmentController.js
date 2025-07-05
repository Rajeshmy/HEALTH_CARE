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
        const filter = req.user.role === 'admin'
            ? {}
            : { patientId: req.user.id };
        const appointments = await Appointment.find(filter).populate('doctorId', 'name');
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getAppointments, createAppointment }