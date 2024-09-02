const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function handleSignUp(req, res){
    try{
        const userInfo = req.body;
    
        // Check whether the user already exists
        const user = await userModel.findOne({ email: userInfo.email });
    
        if(user){
            return res.status(409).json({msg: "User already exists", success: false});
        }
    
        // If not, carry on
        // Encrypt password
        const encryptedPass = await bcrypt.hash(userInfo.password, 10);

    
        await userModel.create({
            fullName: userInfo.fullName,
            email: userInfo.email,
            password: encryptedPass
        })
        return res.status(201).json({msg: "Signup successfull!", success: true})
    }
    catch(err){
        return res.status(500).json({msg: "Internal server error!", success: false})
    }
}

async function handleLogin(req, res){
    try{
        const userInfo = req.body;
    
        // Check whether the user exists
        const user = await userModel.findOne({ email: userInfo.email });
    
        if(!user){
            return res.status(403).json({msg: "Email or password is wrong!", success: false});
        }

        // If yes, carry on
        // Verify password
        const verifyPass = await bcrypt.compare(userInfo.password, user.password);
        if(!verifyPass){
            return res.status(403).json({msg: "Email or password is wrong!", success: false});
        }

        // Generate Token
        // jwt.sign(<payload>,<secret>,<expiresIn>);
        const jwtToken = jwt.sign(
            {email: user.email, id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        return res.status(200).json({
            msg: "Login successfull!", 
            success: true,
            email: user.email,
            name: user.fullName,
            jwtToken
        })
    }
    catch(err){
        return res.status(500).json({msg: "Internal server error!", success: false})
    }
}


module.exports = {
    handleSignUp,
    handleLogin
}