const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 300, // TTL: document expires after 5 minutes (in seconds)
	},
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully:", mailResponse?.response || "No response");
	} catch (error) {
		console.error("Error occurred while sending email:", error);
		throw error;
	}
}

// Pre-save middleware to send email when a new document is created
OTPSchema.pre("save", async function (next) {
	console.log("New document is about to be saved to the database");

	if (this.isNew) {
		try {
			await sendVerificationEmail(this.email, this.otp);
			next();
		} catch (error) {
			next(error); // Pass error to Mongoose
		}
	} else {
		next();
	}
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
