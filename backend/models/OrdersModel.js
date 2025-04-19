import mongoose from "mongoose"

const orderSchema =new mongoose.Schema(
    {
       userid: {type: String, required:true},
        items: {type: Array, required:true},
        amount: {type: Number, required:true},
        address: {type: Object, required:true},
        status:{type: String, required:true, default :"Order Placed"},
        paymentMethod :{type: String, required:true},
        payment :{type:Boolean , default:"false"},
        date: {type: Number, required:true}
    }
)

const OrdersModel = mongoose.model.order || mongoose.model("orders",orderSchema);
export default OrdersModel