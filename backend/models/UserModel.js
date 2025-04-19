import mongoose  from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    phone:{
      type:String,
      required: true,
      match: /^[0-9]{10}$/,
    },
  
    cartData : {
      type: Object,
      default:{}
    }
  },
  { 
    timestamps: true, 
    minimize:false //jb b user hoga create ek cartData b hoga empty
  }
);



const userModel =mongoose.model.user || mongoose.model("User", userSchema);
export default userModel