import Collection from "../models/collection.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomErrors from "../utils/customErrors.js"

export const createCollection = asyncHandler( async(req,res) => {
    const {name} = req.body

    if(!name){
        throw new CustomErrors("Collection name is required",400)
    }

    const collection = await Collection.create({
        name
    })

    res.status(200).json({
        success: true,
        message: "Collection was created successfully",
        collection
    })

})

export const updateCollection = asyncHandler( async(req,res) => {
    const {name} = req.body
    const {id: collectionId} = req.params

    if(!name){
        throw new CustomErrors("Collection name is required",400)
    }

    const updatedCollection = await Collection.findByIdAndUpdate( collectionId , {
        name : name
    }, {
        new:true,
        runValidators: true
    })

    if(!updatedCollection){
        throw new CustomErrors("Collection not found",400)
    }

    res.status(200).json({
        success: true,
        message: "Collection was updated successfully",
        updatedCollection
    })

})

export const deleteCollection = asyncHandler( async(req,res) => {
    const {id: collectionId} = req.params

    const collectiontoDelete = await Collection.findById(collectionId)

    if(!deletedCollection){
        throw new CustomErrors("Collection not found",400)
    }

    collectiontoDelete.remove()

    res.status(200).json({
        success: true,
        message: "Collection was deleted successfully",
        deletedCollection
    })

})

export const getAllCollection = asyncHandler( async(req,res) => {
    
    const getCollection = await Collection.find()

    if(!getCollection){
        throw new CustomErrors("No Collection found",400)
    }

    res.status(200).json({
        success: true,  
        getCollection
    })

})