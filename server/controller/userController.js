import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    try{
        const {name, email, password, accountType} = req.body;

        const checkUser = await User.findOne({email});

        if(checkUser){
            res.status(400).send('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            accountType
        })

        return res.status(201).send(user);
    } catch{
        throw new Error('something went wrong');
    }
};


const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send("Invalid email or password");
        }

        const token = jwt.sign(
            {id:user._id, accountType:user.accountType},
            '62736d03bf2391f514d6df61dfa85b60538bad023324e5eb81926fbf803bdc62',
            {expiresIn:'1d'}
        );

        res.status(200).send({token, message:"Login successful"});
    } catch{
        res.status(500).send("Something went wrong");
    }
}

const logout = (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
}

export {registerUser, login, logout};
