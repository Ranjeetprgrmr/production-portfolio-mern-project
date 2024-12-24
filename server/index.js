import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "./models/Users.js"
import path from "path"
const PORT = process.env.PORT || 5000

//dotenv configuration
dotenv.config();

//rest object
const app = express();


const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});


//middlewares
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ContactForm")


app.post('/createUser', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const user = await UserModel.create({ name, email, message });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
    })



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})