const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../business/models/user');
const DoctorDetails = require('../business/models/doctorDetails')


const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        if (!name, !email, !password) return res.status(400).json({ success: false, message: 'either of must have properties name/email/password missing' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

const registerDoctor = async (req, res) => {
    try {
        const { userId, specialization, licenseNumber } = req.body;

        if (!userId || !specialization || !licenseNumber) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const existing = await User.findOne({ email: userId });
        if (!existing) return res.status(400).json({ success: false, message: 'user details not found' });

        const doctor = new DoctorDetails({
            userId: existing._id,
            specialization,
            licenseNumber
        });

        await doctor.save();

        res.status(201).json({ success: true, message: "Doctor registered", doctor });
    } catch (error) {
        console.error("❌ Doctor Register Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


module.exports = { registerUser, loginUser, registerDoctor }