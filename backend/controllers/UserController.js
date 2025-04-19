import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_secret);
};

const loginUser = async (req, res) => {
    try{

        const {email,password}= req.body;

        const user =await userModel.findOne({ email: req.body.email }).select("+password"); //ensures password lega hi
        if(!email)
            return res.json({ success: false, message: "User Does not  Exists!" });

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch)
        {
            const token = createToken(user._id);
            res.json ({success:true ,token,
              user: {
                userid: user._id,
                name: user.name,
                email: user.email,
                phone :user.phone,
                cartData: user.cartData,
              }
            })
        }
        else
        res.json("Invalid Credentials!");

    }
    catch(error)
    { console.log(error);
        res.json({ success: false, message: error.message });}
};

const addUser = async (req, res) => {
  try {
    const {  email, password ,phone,name, state,pincode, address,city } =req.body;

    //checking for user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists!" });
    }

    //Validating email format  & strong pass
    if (!validator.isEmail(email))
      return res.json({
        success: false,
        message: "Please Enter Valid Email Address!",
      });

    if (password.length < 8)
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
      if (phone.length < 10)
        return res.json({
          success: false,
          message: "Please Enter Correct Phone  Number",
        });

    // hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    
    });
     

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token,
      user: {
        userid: user._id,
        name: user.name,
        email: user.email,
        phone :user.phone,
        address: user.address,
        cartData: user.cartData,
      }
     });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateUserInfo =async (req,res) =>{
  try {
    const {_id, name,email,password,phone,address,city,state, pincode}= req.body
    if (!_id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const updatedUser = await ProductModel.findByIdAndUpdate(
      _id,
    { name,price ,category,subcategoryname,email,password,phone,address,city,state, pincode },
    { new: true } // Return the updated user info
  );
  if (!updatedUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User Info updated successfully", user: updatedUser });


  } catch (error) {
    console.log(error); 
        return res.json({ success: false, message: error.message });
  }
}

const adminLogin = async (req, res) => {
    try {
      
      const {email,password}=req.body;
      if(email===process.env.Admin_email && password===process.env.Admin_password)
      {
        const token = jwt.sign(email+password,process.env.Jwt_secret);
         res.json({ success: true, token,
         
          });
        
      }
      else{
    res.json({ success: false, message: "Invalid Credentials" });

      }
    } catch (error) {
    res.json({ success: false, message: error.message });
      
    }
};

export { addUser, loginUser, adminLogin,updateUserInfo };
