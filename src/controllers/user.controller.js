import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createUser = asyncHandler ( async (req, res) => {

    const {name, socialMediaHandle} = req.body

    if (name.trim()===""){
        throw new ApiError(400, "Name is required.")
    }

    if (socialMediaHandle.trim()===""){
        throw new ApiError(400, "Social Media Handle is required.")
    }

    const imageFiles = req.files

    if (!imageFiles || imageFiles.length === 0){
        throw new ApiError(400, "At least one image is required.")
    }

    const uploadImages = await Promise.all(
        imageFiles.map(async (file) => {
            const uploadedFile = await uploadOnCloudinary(file.path)
            return uploadedFile.url
        })
    )

    const user = await User.create({
        name,
        socialMediaHandle,
        images: uploadImages
    })

    const userCreated = await User.findById(user._id)

    if (!userCreated){
        throw new ApiError(500, "Something went wrong at our end.")
    }

    return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "Data sent successfully."))
})

const getData = asyncHandler( async (req, res) => {
    try {
        const users = await User.find({})

        return res
        .status(200)
        .json(
            new ApiResponse(200, users, "Fetched data successfully.")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong at server.")
    }
})

export { createUser, getData };