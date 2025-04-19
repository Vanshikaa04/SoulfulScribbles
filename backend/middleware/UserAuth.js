import jwt from "jsonwebtoken"


const userAuth = (req,res,next)=>{
   
    const {token} = req.headers;
    if (!token) {
        return res.json(
            { success:"false",
                message: "Unauthorized! No token found." 
            }
        );
    }
    try {
    const decoded = jwt.verify(token, process.env.Jwt_secret);
    req.body.userId = decoded.id
    next()        
    } catch (error) {
        console.log(error);
        res.json(
            { success:"false",
                message: "Unauthorized! No token found." 
            }
        );
    }

}

export default userAuth