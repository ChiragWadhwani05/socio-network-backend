import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.models.js";
import { ApiError } from "../../utils/apiError.js";
import { OTP } from "../../models/otp.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, otp } = req.body;

  // ====> Check if user already exists <====

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists.");
  }

  // ====> Check if OTP is valid <====

  const existedOTP = await OTP.findOne({ email });

  if (!existedOTP) {
    throw new ApiError(404, "OTP not found.");
  }

  if (existedOTP.otp !== otp) {
    throw new ApiError(400, "Invalid OTP.");
  }

  await OTP.deleteOne({ email });

  // ====> Create User <====

  const user = new User({
    email,
    username,
    password,
  });

  await user.save();

  // ====> Send Response <====

  const responseData = {
    _id: user._id,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, responseData, "User registered successfully."));
});

export { registerUser };
