import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`SERVER IS RUNNING AT PORT: ${process.env.PORT}.\n`);
    })
})
.catch( (err) => {
    console.log("MONGODB CONNECTION FAILED! - ", err);
})