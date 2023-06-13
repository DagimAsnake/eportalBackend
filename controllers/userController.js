const User = require('../models/User')
const SECRET = "thisissecret"
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SALT = 12

module.exports.viewProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findById(decoded._id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
module.exports.EditUserProfile = async function (req, res) {
    const data = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);

    if (!(data.username && data.email)) {
        return res.status(400).json({
            error: 'Username and email are required',
        });
    }

    const updatedFields = {
        username: data.username,
        email: data.email,
        tin: data.tin,
        vrn: data.vrn,
        taxCenter: data.taxCenter,
        tname: data.tname,
        phone: data.phone,
    };

    const user = await User.findByIdAndUpdate(decoded._id, updatedFields, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }

    const { _id } = user;
    const responseData = {
        _id,
        username: user.username,
        email: user.email,
        tin: user.tin,
        vrn: user.vrn,
        taxCenter: user.taxCenter,
        tname: user.tname,
        phone: user.phone,
    };

    return res.status(200).json({
        message: 'User profile updated successfully',
        data: responseData,
    });
};


module.exports.ChangePassword = async function (req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    const { oldPassword, confirmNewPassword, newPassword } = req.body;

    if (!(oldPassword && confirmNewPassword && newPassword)) {
        return res.json({
            msg: "All input is required",
        });
    }

    if (newPassword != confirmNewPassword) {
        return res.json({
            msg: "Password Must Match"
        }).status(200)
    }
    const user = await User.findById(decoded._id);
    if (!user) {
        return res.json({
            msg: "No such user "
        }).status(401)
    }
    const correctold = await bcrypt.compare(oldPassword, user.password)
    if (!correctold) {
        return res.json({
            msg: "Incorrect old password"
        }).status(200)
    }
    const new_pass = await bcrypt.hash(newPassword, SALT);
    await User.findByIdAndUpdate(decoded._id, { password: new_pass });
    return res.json({
        msg: "Password Changed Successfully"
    }).status(200)
}


module.exports.AddSector = async function (req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    const { sector } = req.body;

    if (!(sector)) {
        return res.json({
            msg: "All input is required",
        });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
        return res.json({
            msg: "No such user "
        }).status(401)
    }

    user.sector = sector;
    const savedUser = await user.save();

    return res.json({
        msg: "sector added Successfully"
    }).status(200)
}

module.exports.viewSector = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findById(decoded._id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};