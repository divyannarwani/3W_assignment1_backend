import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        socialMediaHandle: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        images: [
            {
                type: String, //CLOUDINARY URL
                required: true
            }
        ]
    },
    {timestamps: true}
)

export const User = mongoose.model("User", userSchema);