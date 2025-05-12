import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/css_folder/app.css"
import {Routes, Route,BrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import About from './pages/About';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navtab from './components/Navtab';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import { ToastContainer } from'react-toastify';
import Signup from './pages/Signup';
import CategoryProducts from './components/CategoryProducts';
import UserProfile from './pages/UserProfile';
// import ChatPage from './pages/ChatPage';
// import ChatIcon from './components/Chaticon';
import WorkshopsF from './pages/WorkshopsF';
import Otpverify from './components/Otpverify';
import TrackOrder from './components/TrackOrder';
import ScrollToTop from './components/ScrollToTop';

 
const App = () => {

  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>
      <Navtab />
      {/* <ChatIcon/> */}

      <ToastContainer  position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
theme="light"
/>
     
      <Routes>
         <Route path='/' element={<Home /> }/>
          <Route path='/about' element={<About/> }/>
          <Route path='/collection' element={<Collection/> }/>
          <Route path='/cart' element={<Cart/> }/>
          <Route path='/contact' element={<Contact/> }/>
          <Route path='/login' element={<Login/> }/>
          <Route path='/signup' element={<Signup/> }/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/product/:productID' element={<Product/> }/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/place-order' element={<PlaceOrder /> }/>
          <Route path='/categoryproducts' element={<CategoryProducts /> }/>
          <Route path='/profile' element={<UserProfile/> }/>
          {/* <Route path ='/chat' element={<ChatPage/>}/> */}
          <Route path ='/workshops' element={<WorkshopsF/>}/>
          <Route path="/otp" element={<Otpverify/>} />
          <Route path='/trackorder/:orderID' element={<TrackOrder/> }/>


      </Routes>

      <Footer/>

      </BrowserRouter>  

    </>
  )
}

export default App;
