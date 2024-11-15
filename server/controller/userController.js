import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

import User from '../models/userModel.js';

const createUser = async(req, res)=>{
    try {
        const {name, email, password, accountType} = req.body;

        if(!name || !email || !password || !accountType){
            res.status(400);
            throw new Error("Please provide all required fields");
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                message: 'Email already exists'});
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            accountType
        });

        const token = generateToken(res, user._id);
        res.status(201).json({
            message: 'User created successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            err:error,
            mssg:error.message
        });
    }
};

const getAllUsers = async(req, res)=>{
    const users = await User.find({});

    if(users){
        return res.json({users: users});
    } else{
        return res.status(404).json({message: 'No users found'});
    }
};

const loginUser = async(req, res)=> {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser){
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if(passwordMatch){
        const token = generateToken(res, existingUser._id);

        res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        });
        return
    } else{
        return res.status(401).json({message: 'Invalid credentials'});
    }
}

export {
    createUser,
    getAllUsers
}
