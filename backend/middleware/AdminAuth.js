import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const adminAuth = (req,res,next)=>{
    try {
    const {token} = req.headers;
    if (!token) {
        return res.json(
            { success:"false",
                message: "Unauthorized! No token found." 
            }
        );
    }
    const decoded = jwt.verify(token, process.env.Jwt_secret);

    if(decoded!==process.env.Admin_email + process.env.Admin_password)
    {
        return res.json(
            { success:"false",
                message: "Unauthorized! No token found." 
            }
        );
    } 
              next()
    } catch (err) {
        return res.json({ message: err.message });
    }
}

export default adminAuth