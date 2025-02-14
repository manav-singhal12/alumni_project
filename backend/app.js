import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()



// app.use(cors(
//     {origin: process.env.CORS_ORIGIN,
//     credentials:true
// }
// ))
// app.use(cors({
//     origin: "*",  // Allow all origins (only for testing)
//     methods: ["GET", "POST"]
// }));

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow sending cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({limit:"500kb"}))
app.use(express.urlencoded({extended:true ,limit:"500kb"}))
app.use(express.static("public")) 

app.use(cookieParser())




//routes import

import userRouter from './routes/user.routes.js'

//routes declaration 
app.use("/api/v1/users" ,userRouter)

import jobsRouter from './routes/job.routes.js'
app.use("/api/v1/jobs",jobsRouter)
import messageRoutes from './routes/message.routes.js';
app.use("/api/messages", messageRoutes);


import eventRouter from './routes/events.routes.js'
app.use("/api/v1/events" ,eventRouter)

import projectRouter from './routes/projects.routes.js'
app.use("/api/v1/projects",projectRouter)

app.options('*', cors());



app.options('*', cors());

export {app}