import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'
export const signup = async(req,res)=>{
   try{
       const {fullName , username , password , confirmPassword , gender} = req.body;
       if(password!==confirmPassword){
        return res.status(400).json({error:"Passwords don't match"});
      }

      const user = await User.findOne({username})
      if(user){
        return res.status(400).json({error:"User Already Exists"});
      }

   // Hashing of password
   const salt = await bcryptjs.genSalt(10);
   const hashedPassword = await bcryptjs.hash(password , salt);

//    https://avatar.iran.liara.run/public/boy?username=scott
     
const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
const girlProfilePic = `https://avatar.iran.liara.run/public/girld?username=${username}`

const newUser = new User({
    fullName , username , password:hashedPassword , gender , 
    profilePic: gender === 'male' ? boyProfilePic:girlProfilePic ,



})

if(newUser){
    // Generate Jwt token
     generateTokenAndSetCookie(newUser._id , res);

    await newUser.save();
    res.status(201).json({
    _if: newUser._id ,
    fullName: newUser.fullName ,
    username: newUser.username,
    profilePic: newUser.profilePic
})
}  else{
    res.status(400).json({error:"Invalid user data"});
}


   } catch(error){
       console.log("Error in signup controller ",error.message);
       res.status(500).json({error:"Internal Server Error"})    
   }
}
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });

        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in Login", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req,res)=>{
    res.send("logout");
}
