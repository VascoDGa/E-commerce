import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please provide a Collection name"],
        trim: true,
        maxLength: [120 , "Collection name must not exceed 120 characters"]
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Collection", collectionSchema)

