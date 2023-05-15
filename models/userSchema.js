const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    notifications: [
        {
            notify: {
                type: String,
                required: true
            },
            date: {
                type: String
            }
        }
    ]
});

// generating auth token
userSchema.methods.generateAuthToken = async function () {

    try {
        const generateToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: generateToken });
        await this.save();
        return generateToken;
    } catch (error) {
        console.log(error)
    }
}

// adding notification
userSchema.methods.addNotification = async function (notify, date) {

    try {
        this.notifications = this.notifications.concat({ notify:notify, date:date});
        await this.save();
        return this.notifications;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model("BHANDAREUSER", userSchema);

module.exports = User;