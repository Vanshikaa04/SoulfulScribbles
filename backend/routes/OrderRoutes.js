import express from 'express'
import adminAuth from '../middleware/AdminAuth.js';

import  {placeorder,placeorderRazor,placeorderStripe,allOrders,userorder,updateStatus ,verifyRazor,cancelorder,getStatus} from '../controllers/OrderController.js';
import userAuth from './../middleware/UserAuth.js';

const orderrouter = express.Router();

orderrouter.post('/orderstatus',adminAuth,updateStatus);
orderrouter.get('/list',adminAuth,allOrders);

orderrouter.post('/place',userAuth, placeorder);
orderrouter.post('/placestripe',userAuth, placeorderStripe);
orderrouter.post('/placerazor',userAuth, placeorderRazor);
orderrouter.post('/userorder',userAuth, userorder);
orderrouter.post('/ordertrack',userAuth,getStatus)

orderrouter.post('/verifyrazor',userAuth,verifyRazor);
orderrouter.post('/cancel',userAuth,cancelorder);

export default orderrouter
