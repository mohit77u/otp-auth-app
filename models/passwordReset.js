const mongoose = require("mongoose");
const PasswordResetSchema = mongoose.Schema({
    email: {
        type: String,
        // required: [true, "The email field is required"],
    },
    token: {
        type: String,
        // required: [true, "The password field is required"]
    },
}, { timestamps: true });


const PasswordReset = mongoose.model('password_resets', PasswordResetSchema)
module.exports = PasswordReset