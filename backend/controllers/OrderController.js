import OrdersModel from "../models/OrdersModel.js"
import userModel from "../models/UserModel.js"
import sendEmail from "../middleware/sendMail.js"
import razorpay from "razorpay"

//Global Variables
const currency ="inr"
const deliverycharge= 15

let razorpayInstance = new razorpay({
  key_id: process.env.RazorPay_ID,
  key_secret: process.env.RazorPay_Secret,
})
// COD
const  placeorder= async (req,res) => {
    try {
        
        const {userid ,items, amount, address} =req.body

        const orderData ={
            userid, items, address, amount 
            ,paymentMethod :"COD",
            payment :false,
            date: Date.now()
        }
        const neworder = await OrdersModel(orderData)
        await neworder.save()
        
        await userModel.findByIdAndUpdate(userid,{cartData :{}})


        const emailContent = `
        Hi ${address.fullName},
  
        Thank you for placing your order with Soulful Scribbles! ✨
  
        🧾 Order Summary:
        - Amount: ₹${amount}
        - Items: ${items.map(i => `${i.name} (${i.shape}, ${i.size})`).join("; ")}
  
        📍 Shipping To:
        ${address.address}, ${address.city} - ${address.pincode}
        Phone: ${address.contact}
  
        We’ll notify you as soon as your order is ready to ship!
  
        Thanks again ❤️
      `;
  
      await sendEmail(address.email, "Order Confirmation - Soulful Scribbles", emailContent);
  

        res.json ({success: true , message :"Order Placed"})

    } catch (err) {
        console.log(err)
        res.json ({success: false , message :err.message})
    }
}

// stripe
const  placeorderStripe= async (req,res) => {
    
}

// Razorpay
const  placeorderRazor= async (req,res) => {
    try {
      const {userid ,items, amount, address} =req.body

      const orderData ={
          userid, items, address, amount 
          ,paymentMethod :"Razorpay",
          payment :false,
          date: Date.now()
      }
      const neworder = await OrdersModel(orderData)
      await neworder.save()

      const options ={
        amount : amount * 100,
        currency: currency.toUpperCase(),
        receipt: neworder._id.toString(),
      }
     const razorOrder = await razorpayInstance.orders.create(options);
res.json({ success: true, order: razorOrder });

    } catch (err) {
      console.log(err)
      res.json ({success: false , message :err.message})
  }
}
// Verify Razorpay Payment
const verifyRazor =async (req,res) => {
  try {
    const {userid, razorpay_order_id}= req.body
    const orderinfo = await razorpayInstance.orders.fetch({razorpay_order_id})
    
    if(orderinfo.status==='paid')
    {
      await OrdersModel.findByIdAndUpdate(orderinfo.receipt, {payment:true});
      await userModel.findByIdAndUpdate(userid, {cartData:{}})
      res.json({success:true, message:"Payment Succesful"})
    }
    else{
      res.json({success:true, message:"Payment Failed"})

    }

  } catch (err) {
    console.log(err)
    res.json ({success: false , message :err.message})
  }
}
// cancel order
const cancelorder =async (req, res) => {
  const { orderid } = req.body;

  try {
    const order = await OrdersModel.findById(orderid);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.status !== "Order Placed")
      return res.status(400).json({ success: false, message: "Cannot cancel this order" });

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// For admin
const  allOrders= async (req,res) => {
    try {

    
        const orders = await OrdersModel.find({});
        return res.json({ success: true, orders });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

//users
const userorder = async (req, res) => {
    try {
      const { userid } = req.body;
  
      if (!userid) {
        return res.json({ success: false, message: "User ID is required" });
      }
  
      const orders = await OrdersModel.find({ userid });
    //   console.log("orders:", orders);
  
      if (orders.length === 0) {
        return res.json({ success: true, orders: [], message: "No orders found" });
      }
  
      return res.json({ success: true, orders });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  };
  

//Admin update status
// controller/orderController.js


const updateStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    const order = await OrdersModel.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.status = newStatus;

  
    // Prepare email
    let subject = `Order Update - ${newStatus}`;
    let message = "";

      // If status is Delivered, generate OTP and save
      if (newStatus === "Delivered") {
        const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    
          const otp = generateOTP();
          order.deliveryOtp = otp;
    
          const emailContent = `
          Your OTP for  Pickup Verification is 
          ${otp}.
          Verify It with Delivery Partner ✨
           Thankyou For Purchasing ❤️
        `;
        
        await sendEmail(order.address.email, "PickUp Verification - Soulful Scribbles", emailContent);
        
    // res.json ({success: true , message :"OTP Sent"})    
        }
    
        // await order.save();
    
    else if (newStatus === "Ready to Ship") {
      message = `
        Hi ${order.address.fullName},
        🚚 Delivery Guy will be Knocking Your Doors Quickly!

        Your Order:
        ${order.items.map(i => `${i.name} (${i.shape}, ${i.size})`).join("; ")} is Ready to Ship ✨

        📍 Shipping To:
        ${order.address.address}, ${order.address.city} - ${order.address.pincode}
      

        Thanks again ❤️
      `;

      await sendEmail(order.address.email, subject, message);

    } 
    
  return res.json({ success: true, message: "Status Updated & Notification Sent" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


const getStatus = async (req, res) => {
  const {orderId}= req.body
  try {
      const orders =await OrdersModel.findById(orderId);
     const status= orders.status
      res.json({success:true,status })
  
  } catch (error) {
      console.log(error);
  return res.json({ success: false, message: error.message });
  }
};


export {verifyRazor, placeorder,placeorderRazor,placeorderStripe,allOrders,userorder,updateStatus ,cancelorder ,getStatus}