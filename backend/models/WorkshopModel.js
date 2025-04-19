import mongoose  from "mongoose";

const workshopSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image:{type: String, required:true},

        mode:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true
            },
        starttime:{
            type: String,
            required: true
            },
            endtime:{
                type: String,
                required: true
                },
        location:{
                type: String,
            },
        fees:{
            type: Number,
            required:true
        }

    }
);

const workshopModel = mongoose.model.workshop || mongoose.model("Workshop",workshopSchema)
export default workshopModel
