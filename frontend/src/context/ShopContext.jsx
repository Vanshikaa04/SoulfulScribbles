import { createContext, useEffect, useState } from "react";  //allows data to be shared across multiple components
// import {products} from "../assets/asset" 
import props from "prop-types"
import axios from "axios"
import { toast } from "react-toastify";
 const ShopContext = createContext();   
 export {ShopContext}
const ShopContextProvider = (props)=>
    {
        const currency ="₹";
        const shipmentfee = 15;
        const backendurl = import.meta.env.VITE_backendurl
        
        const [token, setToken] = useState(() => sessionStorage.getItem("token") || '');
        const [user, setUser] = useState(() => {
          const storedUser = sessionStorage.getItem("user");
          return storedUser ? JSON.parse(storedUser) : null;
        });
        const [cartitems, setcartitems] = useState(() => {
          try {
            const storedCart = JSON.parse(sessionStorage.getItem('cartitems'));
            return storedCart && typeof storedCart === 'object' ? storedCart : {};
          } catch {
            return {};
          }
        })
        
        
        const [products,setproducts] =useState([]);


        const addtocart = async (itemId, size, shape,desc) => {  //async -> to fetch data that can take time
          if (!token || !user?.userid) {
            toast.error("You must be logged in to add items to cart");
            return;
          }
        
          const userid = user.userid;
        
          try {
          let cartData = structuredClone(cartitems);      //obj clone 
        
            if (!cartData[itemId]) {
                cartData[itemId] = {}; // Initialize itemId if not present
            }
        
            if (!cartData[itemId][size]) {
                cartData[itemId][size] = {}; // Initialize size if not present
            }
        
        // shape ko isliye nhi kia kyunki ab hum ismai direct 1 krh count agr krte toh ek empty array create hojata
            if (cartData[itemId][size][shape]) {
                cartData[itemId][size][shape] += 1; //already present h toh increase it
                const quantity =cartData[itemId][size][shape]
                updateQuantity(itemId, size,shape,quantity)
            } else {
                cartData[itemId][size][shape] = 1;  //create new one
            }
        
           
                    await axios.post(backendurl + "/api/cart/add", {itemId, size, shape,userid,desc} ,{headers:{token}})

                    getcartitems();
                    // console.log("Added in db")  
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        

        const getCartcount = () => {
            let count = 0;
        
            Object.keys(cartitems).forEach((item) => {  //Object.keys se humko milega itemid, size,shape
                if (cartitems[item]) { // Ensure item exists
                    Object.keys(cartitems[item]).forEach((size) => {
                        if (cartitems[item][size]) { // Ensure size exists
                            Object.keys(cartitems[item][size]).forEach((shape) => {
                                count += cartitems[item][size][shape] || 0; // Avoid undefined errors
                            });
                        }
                    });
                }
            });
        
            return count;
        };

        const updateQuantity = async (itemId, size, shape, quantity) => {
            // Clone current cart data safely
            const updatedCart = { ...cartitems };
          
            // Defensive check before updating nested values
            if (
              updatedCart[itemId] &&
              updatedCart[itemId][size] &&
              updatedCart[itemId][size][shape] !== undefined
            ) {
              updatedCart[itemId][size][shape] = quantity;
              setcartitems(updatedCart);
            } else {
              console.warn("Invalid cart item path:", { itemId, size, shape });
              return;
            }
          
            // Sync with backend if logged in
            if (token && user?.userid) {
              try {
                await axios.post(
                  `${backendurl}/api/cart/update`,
                  { itemId, size, shape, quantity, userid: user.userid },
                  { headers: { token } }
                );
              } catch (error) {
                console.error("Failed to update quantity:", error);
                toast.error("Failed to update cart. Please try again.");
              }
            }
          };
          

        const removeFromCart = async(itemId, size, shape,quantity) => {
            let cartData = structuredClone(cartitems);
            const userid= user.userid;
           
            await axios.post(backendurl + "/api/cart/remove", {itemId, size, shape,userid,quantity} ,{headers:{token}})

            if (cartData[itemId] && cartData[itemId][size] && cartData[itemId][size][shape]  ) {
            
              
                if(quantity>1)
                {
                    cartData[itemId][size][shape]=cartData[itemId][size][shape]-1
                }

                else if(quantity==1){

                delete cartData[itemId][size][shape];


                // If size has no more shapes, remove size
                if (Object.keys(cartData[itemId][size]).length === 0) {
                    delete cartData[itemId][size];
                }
        
                // If item has no more sizes, remove item
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        }
        
            setcartitems(cartData);
            getcartitems()
        };

     const totalamount =() =>{
        let total= 0;
       
        for (const itemId in cartitems) {
            for (const size in cartitems[itemId]) {
                for (const shape in cartitems[itemId][size]) {
                  const product = products.find((p) => p._id == itemId);
                    const quantity = cartitems[itemId][size][shape]
                 total +=  product.price *quantity ;
                }
            }
        }
        return total;

     }
        
     const getProductsData = async () => {
        try {
            const response = await axios.get(backendurl + "/api/product/list");
    
            if (response.data.success) {
                setproducts(response.data.products);
                // If needed, log directly from response:
                // console.log(response.data.products);
            } else {
                toast.error(response.data.message || "Failed to load products");
                console.log(response.data.message);
            }
    
        } catch (error) {
            console.error("Product fetch error:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Error fetching products");
            } else {
                toast.error(error.message || "Network error");
            }
        }
    };
    
     const getcartitems = async () => {
      if(token)
      {
        try {
          const userid = user.userid;
          const response = await axios.post(backendurl + "/api/cart/getcart",{ userid },
            {
              headers: 
                {token}
             }
          );
          
          if (response.data.success) {
            setcartitems(response.data.cartData);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Cart Error:", error);
          if (error.response) {
            toast.error(error.response.data.message || "Error fetching cart");
          } else {
            toast.error(error.message);
          }
        }}
      };
      
        useEffect(()=>{
            getProductsData()
          
        },[])

        useEffect(() => {
          if (token && user?.userid) {
            getcartitems();
            }
              else
              setcartitems({});
        }, [token, user,setcartitems]);
        
        useEffect(() => {
          sessionStorage.setItem('cartitems', JSON.stringify(cartitems));
        }, [cartitems]);
        
        
        useEffect(() => {
          if (token) {
            sessionStorage.setItem("token", token);
          } else {
            sessionStorage.removeItem("token");
          }
        }, [token]);
        useEffect(() => {
          if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
          } else {
            sessionStorage.removeItem("user");
          }
        }, [user]);
                
        
    const value= {
        products, 
        currency ,
         shipmentfee,
         cartitems,
         addtocart,
         getCartcount,
         removeFromCart,
        totalamount,
        token,
        setToken,
        backendurl,
        user, setUser,
        updateQuantity,
        getcartitems,
        setcartitems

    }  


        return (
            <ShopContext.Provider value={value}>
                 {props.children}
                 </ShopContext.Provider>
        );
      };
   
 export default ShopContextProvider;
 
 ShopContextProvider.propTypes = {
    children: props.node.isRequired,
  };

