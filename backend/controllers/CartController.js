import userModel from "../models/UserModel.js"

const addtoCart = async (req, res) => {
    try {
      const { userid, itemId, size, shape,desc } = req.body;
  
      const userData = await userModel.findById(userid);

      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
      else{
      const cartData = userData.cartData || {}; // fallback in case it's null
  
      // Ensure itemId exists
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
  
      // Ensure size exists
      if (!cartData[itemId][size]) {
        cartData[itemId][size] = {};

      }
  
      // Finally, update shape quantity
      if (cartData[itemId][size][shape]) {
        cartData[itemId][size][shape] += 1;
      } else {
        cartData[itemId][size][shape] = 1;
      }
  
      // Save updated cartData
      await userModel.findByIdAndUpdate(userid, { cartData });
  

      res.json({ success: true, message: "Added to Cart" });
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }

  };
  

const updateCart =async (req,res)=>{
    try {
        const {userID, itemId, size, shape,quantity,desc} =req.body

        const userData = await userModel.findById(userID)
        const cartData = await userData.cartData
        await userModel.findByIdAndUpdate(userID, {cartData}) //updating cart Data

        res.json({success:true ,message: "Cart Updated"})
   }
 catch (error) {
    console.log(error)
    res.json({success:false ,message: error.message})
}
}

const removefromCart = async (req, res) => {
  try {
    const { userid, itemId, size, shape, quantity } = req.body;
    // Check if all required fields are present
    // console.log("Incoming remove request:", req.body);

    if (!userid || !itemId || !size || !shape) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const userData = await userModel.findById({_id:userid});

    // Check if user exists
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData ;

    // Check if item exists in cart
    if (
      cartData[itemId] &&
      cartData[itemId][size] &&
      cartData[itemId][size][shape] !== undefined
    ) {
      if (quantity > 1) {
        cartData[itemId][size][shape] -= 1;
      } else if (quantity === 1) {
        delete cartData[itemId][size][shape];

        // Remove empty size object
        if (Object.keys(cartData[itemId][size]).length === 0) {
          delete cartData[itemId][size];
        }

        // Remove empty item object
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      await userModel.findByIdAndUpdate(userid, { cartData });

      res.json({ success: true, message: "Product removed from cart" });
    } else {
      res.status(404).json({ success: false, message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart =async (req,res)=>{
    try {
        const {userid} = req.body
        // console.log("USer Cart :",userid)

        const userData = await userModel.findById(userid)
        const cartData = await userData.cartData        
        
        if(cartData)
      {  res.json({success:true ,cartData})
      }

        else{
            res.json({success:false ,message: "Cart is Empty"})
        }

    } catch (error) {
         console.log(error)
         res.json({success:false ,message: error.message})

    }
}

export {addtoCart, updateCart, getUserCart,removefromCart}