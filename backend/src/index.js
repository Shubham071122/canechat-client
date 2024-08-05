import http from 'http';
import {Server as socketIo} from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js';
import { configureSocket } from './config/socket.js';

dotenv.config({
    path: './.env'
})

const server = http.createServer(app);
const io = new socketIo(server, {
    cors :{
        origin: process.env.CORS_ORIGIN,
        methods: ["POST", "GET", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookies", "Cookie"],
        credentials: true,
    },
});

configureSocket(io);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`✅ server is running at port : ${process.env.PORT} `)
    })
})
.catch((error) => {
    console.log("Mongodb Connection Failed !!!",error);
})