import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";


( async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("Database connected successfully!")
        
        app.on('error', (err) => {
            console.log("Error: ",err)
            throw err
        })

        const onListening = () => {
            console.log(`Listening on port ${config.PORT}`)

        }

        app.listen(config.PORT, onListening)

    } catch (err) {
        console.log("Error: ",err)
        throw err
    }
})()