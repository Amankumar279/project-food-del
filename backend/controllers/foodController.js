import foodModel from "../models/foodModel.js";
import { cloudinary } from '../config/cloudinary.js';

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

     // The image URL from Cloudinary is in req.file.path
  const image_url = req.file.path;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_url, // Use the Cloudinary URL
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error adding food' });
  }
};

// delete food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Extract public_id from Cloudinary URL more reliably
        if (food.image && (food.image.includes('cloudinary.com'))) {
            try {
                // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
                // Extract public_id from URL
                const urlParts = food.image.split('/');
                const uploadIndex = urlParts.findIndex(part => part === 'upload');
                
                if (uploadIndex !== -1 && uploadIndex < urlParts.length - 1) {
                    // Get the part after 'upload' (could be version/public_id or just public_id)
                    const afterUpload = urlParts.slice(uploadIndex + 1).join('/');
                    // Remove file extension to get public_id
                    const public_id = afterUpload.replace(/\.[^/.]+$/, '');
                    
                    if (public_id) {
                        // Delete from Cloudinary (non-blocking, don't wait for it)
                        cloudinary.uploader.destroy(public_id).catch(err => {
                            console.error('Error deleting from Cloudinary:', err);
                            // Continue with database deletion even if Cloudinary deletion fails
                        });
                    }
                }
            } catch (cloudinaryError) {
                console.error('Error processing Cloudinary deletion:', cloudinaryError);
                // Continue with database deletion even if Cloudinary processing fails
            }
        }
        
        // Delete from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting food item" });
    }
}

export { listFood, addFood, removeFood }