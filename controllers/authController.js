const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = "thisissecret"
const SALT = 12

module.exports.createUser = async (req, res) => {
    try {
        const {
            VatRegNo,
            TaxCenter,
            TradeName,
            TinNumber,
            Mobile,
            Email
        } = req.body;

        if (TinNumber === "" || Email === "" || Mobile === "" || TradeName === "" || VatRegNo === "" || TaxCenter === "") {
            return res.status(400).json({ message: 'Form Incomplete' });
        }

        const user = new User({
            vrn: VatRegNo,
            taxCenter: TaxCenter,
            tname: TradeName,
            tin: TinNumber,
            phone: Mobile,
            email: Email
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create user' });
    }
};

module.exports.registerUser = async (req, res) => {
    try {
        const { uuid, UserName, Password } = req.body;

        if (!uuid) {
            return res.status(400).json({ message: 'Failed to get UUID' });
        } else if (UserName === "" || Password === "") {
            return res.status(400).json({ message: 'Form incomplete' });
        }

        const user = await User.findOne({ UUID: uuid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashPassword = await bcrypt.hash(Password, SALT)


        user.password = hashPassword;
        user.username = UserName;
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to register user' });
    }
};


module.exports.handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === "" || password === "") {
            return res.status(400).json({ message: 'Form incomplete' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '2h' });

        res.json({ token, user: { _id: user._id, username: user.username } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};