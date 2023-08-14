import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is mandatory"],
            trim: true,
            maxLength: [120,"Product name cannot exceed 120 characters"]
        },
        price: {
            type: Number,
            required: [true, "Product price is mandatory"],
            maxLength: [5,"Product price cannot exceed 5 characters"]
        },
        description: {
            type:String
        },
        photos: [
            {
                secure_url: {
                    type: String,
                    required: true
                }
            }
        ],
        stock: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
}, {timestamps: true}
)

export default mongoose.model("Product", productSchema)