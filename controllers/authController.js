const User = require('../models/User')
const Token = require('../models/Token')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = "thisissecret"
const SALT = 12
const sendEmail = require("../util/sendEmail")
const base64url = require('base64url');

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

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports.forgetPassword = async function (req, res) {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.json({ msg: "User with the given email dont exist" }).status(401)
    }
    let token = await Token.findOne({ userId: user._id })
    if (!token) {
        let data = {
            userId: user._id,
            token: jwt.sign({ id: user._id }, SECRET)
        }
        token = new Token(data)
        await token.save()
    }

    // Encode the token
    const encodedToken = base64url.encode(token.token);

    // Create the link with the encoded token
    const link = `http://localhost:3000/auth/passwordreset/${user._id}/${encodedToken}`;

    await sendEmail(
        user.email,
        "Eportal Reset",
        `Your password reset link is here:  ${link}`
    )
    return res.json({
        msg: "Reset password link is sent via Email Successfully"
    }).status(200)
}


module.exports.changeForgetPassword = async function (req, res) {
    const { token, userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
        return res.json({
            msg: "Invalid or Expired Token"
        }).status(401)
    }
    const decodedToken = base64url.decode(token);
    const check_token = await Token.findOne({ token: decodedToken })
    if (!check_token) {
        return res.json({
            msg: "Invalid or Expired Token"
        }).status(401)
    }

    const password = req.body.newPassword
    const confirm_password = req.body.confirmNewPassword

    if (password != confirm_password) {
        return res
            .json({
                msg: "Passwords Must Match",
            })
            .status(401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT)
    user.password = hashedPassword
    await user.save()
    await check_token.deleteToken();
    return res.json({
        msg: "Password Changed Successfully"
    })
}