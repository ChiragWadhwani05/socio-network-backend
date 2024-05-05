import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { OTP } from "../models/otp.models.js";
import { sendMail } from "../utils/mail.js";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

const registerOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const otp = generateOtp();

  sendMail({ email, subject: "OTP", content: `OTP: ${otp}` });

  await OTP.create({ email, otp });

  return res
    .status(201)
    .json(new ApiResponse(201, null, "OTP send successfully."));
});

export { registerOTP };
