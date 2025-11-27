import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { storage } from '../config/cloudinary.js'; // Import Cloudinary storage

const foodRouter = express.Router();

// Use Cloudinary storage for multer
const upload = multer({ storage: storage });

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;