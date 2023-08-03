const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }
        if (!password || password.length < 2 || password.length > 64) {
            return res
                .status(400)
                .send(
                    "Password is required and should be of 2 - 64 characters"
                );
        }
        let userExist = await User.findOne({ email }).exec();
        if (userExist) {
            return res.status(400).send("Email is already taken");
        }

        //registering
        const user = new User({
            ...req.body,
        });
        await user.save();
        return res.json({ ok: true });
    } catch (err) {
        return res.status(400).send("Error. Try again.");
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }
        if (!password || password.length < 2 || password.length > 64) {
            return res
                .status(400)
                .send(
                    "Password is required and should be of 2 - 64 characters"
                );
        }
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            return res
                .status(400)
                .send("No user found with this email. Please register first.");
        }
        user.comparePassword(password, (err, match) => {
            if (!match || err) {
                return res.status(400).send("You entered the wrong password.");
            }

            //generate a token

            let token = jwt.sign(
                { _id: user._id },
                toString(process.env.JWT_SECRET),
                {
                    expiresIn: "1d",
                }
            );

            res.json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                },
            });
        });
    } catch (err) {
        res.status(400).send("Sign in failed.");
    }
};
