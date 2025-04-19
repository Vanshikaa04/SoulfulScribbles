import { v2 as cloudinary } from "cloudinary";
import workshopModel from './../models/WorkshopModel.js';

const addWorkshop =async(req,res)=>{
    if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }
    
      try {
        const {title,description,date,mode,starttime,endtime, fees,location} = req.body;
        const image = req.file;

        const uploadResponse = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        const imageUrl = uploadResponse.secure_url;
    
        const workshopData ={
          title,
          description,
          fees :Number(fees),
          image:imageUrl,
          date:new Date(date), // Convert date string to Date object
          starttime,
          endtime,
        mode,
          location
        };
    
        const workshop =new workshopModel(workshopData)
        await workshop.save()
    
        return res.json({ success: true, message: "Workshop added" });
    
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

const updateWorkshop= async (req,res) => {
    try {
        const {_id, title, description,date,mode,starttime,endtime, fees,location} = req.body;
        if (!_id) {
          return res.json({ success: false, message: "WorkshopID is required" });
        }
    
        const updatedWorkshop = await workshopModel.findByIdAndUpdate(
          _id,
        { title, description,date,mode,starttime,endtime, fees,location},
        { new: true } // Return the updated workshop
      );
      if (!updatedWorkshop) {
        return res.status(404).json({ success: false, message: "Workshop not found" });
      }
    
      res.json({ success: true, message: "Workshop updated successfully", workshop: updatedWorkshop });
    
    
      } catch (error) {
        console.log(error); 
            return res.json({ success: false, message: error.message });
      }
}

const listWorkshop = async (req,res) => {
     try {
            const workshops =await workshopModel.find({});
            res.json({success:true, workshops})
        } catch (error) {
            console.log(error);
        return res.json({ success: false, message: error.message });
        }
}

const deleteWorkshop = async (req, res) => {
      try {
            await workshopModel.findByIdAndDelete(req.body.id)
        return res.json({ success: true, message: "Workshop removed" });
            
            
        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: error.message });
        }
}

export  {addWorkshop,updateWorkshop,listWorkshop,deleteWorkshop}