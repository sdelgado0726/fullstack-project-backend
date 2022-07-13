import { RequestHandler } from "express";
import { User } from "../models/user";
import { Post } from "../models/post";

import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(200).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    });
    
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }  
}

export const updateUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let userId = req.params.userId;
    let newUsers: User = req.body;
    newUsers.userId = user.userId;
    
    let userFound = await User.findByPk(userId);
    
    if (userFound && userFound.userId == newUsers.userId
        && newUsers.username && newUsers.password && newUsers.firstName && newUsers.lastName && newUsers.state) {
            await User.update(newUsers, {
                where: { userId: userId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }  
}

export const getUserProfile: RequestHandler = async (req, res, next) => {

    let userId = req.params.userId;

    const result = await User.findByPk(userId, {
        include: [{
            model: Post,
            required: true,
        }]
    });

    if (result) {
        res.status(200).json(result);
    } 
    else {
        res.status(404).send();
    }
}


    

export const getAllUser: RequestHandler = async (req, res, next) => {
    let user = await User.findAll({
        include: [{
            model: Post,
            required: true
            
        }],
        order: [
            ['updatedAt', 'DESC']
        ]
    });

    // let user = await User.findAll();
    res.status(200).json(user);   
}

