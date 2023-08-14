import mongoose from "mongoose";
import OrdStatus from "../utils/orderStatus.js"

const orderSchema = new mongoose.Schema(
    {
        product: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    count: Number,
                    price: Number
                }
            ],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: Object.values(OrdStatus),
            default: "Ordered"
        }
    },
    { timestamps: true}
)


export default mongoose.model("Order", orderSchema)