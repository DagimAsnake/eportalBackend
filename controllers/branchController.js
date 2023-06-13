const User = require('../models/User')
const Branch = require('../models/branch')
const SECRET = "thisissecret"
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


module.exports.CreateBranch = async function (req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    const { location } = req.body;

    if (!location) {
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

    const branch = new Branch({
        userId: decoded._id,
        location: location,
    });

    const savedBranch = await branch.save();

    return res.json({
        msg: "Location Added Successfully"
    }).status(200)
}

module.exports.viewBranch = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const branches = await Branch.find({ userId: decoded._id }).sort({ createdAt: -1 });
        res.json(branches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};