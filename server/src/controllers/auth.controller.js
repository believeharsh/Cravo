import User from "../models/user.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js"
import { generateUsername } from "../services/generateUserName.js";
import { apiError } from "../services/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("register user controller")
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        throw new apiError(409, "User already exists with this email");
    }

    const generatedUsername = generateUsername(email);
    if (!generatedUsername) {
        throw new apiError(409, "Error occurred while generating the username for the user");
    }

    let avatarUrl;
    // if (req.file) {
    //     const avatar = await uploadOnCloudinary(req.file.buffer);  // avatar is stored in memory by multer middleware
    //     if (avatar) avatarUrl = avatar.secure_url;
    // }


    const newUser = await User.create({
        username: generatedUsername,
        name,
        email,
        password,
        // profileImageURL: avatarUrl,
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while creating new user");
    }

    // Generating tokens immediately after sucussful registration to make user logged in as well
    const { accessToken, refreshToken } = await User.matchPassAndGenTokens(email, password);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/"
    };

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                201,
                { user: createdUser, accessToken, refreshToken },
                "User registered successfully and logged in"
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email && !password) {
        throw new apiError(400, "email or password is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new apiError(400, "user does not exist")
    }

    const { accessToken, refreshToken } = await User.matchPassAndGenTokens(email, password);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/"
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: accessToken, refreshToken,
                    role: user.role,
                },
                "user logged in succussfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    // console.log(req);
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
    };

    res.status(200)
        .cookie("accessToken", "", { ...options, expires: new Date(0) })
        .cookie("refreshToken", "", { ...options, expires: new Date(0) })
        .json(
            new apiResponse(200, {}, "User is logged out now")
        )
})

const changePassword = () => {

}

export {
    loginUser,
    registerUser,
    logoutUser,
    changePassword
}