const User = require("../models/userSchema");

const auth = async(req,res, next)=>{

    try {

        const token = req.cookies.jwtoken;
       
        // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ "tokens.token" : token});

        if(!rootUser){
            throw new Error("User not found");
        }else{
            req.rootUser = rootUser;
            req.email = rootUser.email;
            next();
        }
        
        
    } catch (error) {
        res.status(401).send("Unauthorized: No tokens found");
        // console.log(error);
    }

}

module.exports = auth;