"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.getUserProfile = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const post_1 = require("../models/post");
const auth_1 = require("../services/auth");
const createUser = async (req, res, next) => {
    let newUser = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = await user_1.User.create(newUser);
        res.status(200).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({
        where: { username: req.body.username }
    });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
exports.loginUser = loginUser;
const updateUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let userId = req.params.userId;
    let newUsers = req.body;
    newUsers.userId = user.userId;
    let userFound = await user_1.User.findByPk(userId);
    if (userFound && userFound.userId == newUsers.userId
        && newUsers.username && newUsers.password && newUsers.firstName && newUsers.lastName && newUsers.state) {
        await user_1.User.update(newUsers, {
            where: { userId: userId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateUser = updateUser;
const getUserProfile = async (req, res, next) => {
    let userId = req.params.userId;
    const result = await user_1.User.findByPk(userId, {
        include: [{
                model: post_1.Post,
                required: true,
            }]
    });
    if (result) {
        res.status(200).json(result);
    }
    else {
        res.status(404).send();
    }
};
exports.getUserProfile = getUserProfile;
const getAllUser = async (req, res, next) => {
    let user = await user_1.User.findAll({
        include: [{
                model: post_1.Post,
                required: true
            }],
        order: [
            ['updatedAt', 'DESC']
        ]
    });
    // let user = await User.findAll();
    res.status(200).json(user);
};
exports.getAllUser = getAllUser;
