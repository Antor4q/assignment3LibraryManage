import {Server} from "http"
import app from "./app"
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;
const port = 5000

async function main(){
    try{
        await mongoose.connect('mongodb+srv://assignment3:XVis6k8XBb9ez8uS@cluster0.i8hseoh.mongodb.net/booksStol?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Connected to the mongoose")
        server = app.listen(port, ()=> {
            console.log(`app is listening on port ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

main()

// assignment3 - db user, XVis6k8XBb9ez8uS - bd pass

//  mongodb url -- mongodb+srv://<db_username>:<db_password>@cluster0.i8hseoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0