"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getAllPost = void 0;
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllPost = async (req, res, next) => {
    let posts = await post_1.Post.findAll({
        include: [{
                model: user_1.User,
                required: true
            }],
        order: [
            ['updatedAt', 'DESC']
        ]
    });
    res.status(200).json(posts);
};
exports.getAllPost = getAllPost;
const createPost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newPosts = req.body;
    newPosts.userId = user.userId;
    if (newPosts.post) {
        let created = await post_1.Post.create(newPosts);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createPost = createPost;
const getPost = async (req, res, next) => {
    let postId = req.params.postId;
    let posts = await post_1.Post.findByPk(postId);
    if (posts) {
        res.status(200).json(posts);
    }
    else {
        res.status(404).json({});
    }
};
exports.getPost = getPost;
const updatePost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.postId;
    let newPosts = req.body;
    newPosts.userId = user.userId;
    let postFound = await post_1.Post.findByPk(postId);
    if (postFound && postFound.postId == newPosts.postId
        && newPosts.post) {
        await post_1.Post.update(newPosts, {
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let deletedPost = req.body;
    deletedPost.userId = user.userId;
    let postId = req.params.postId;
    let found = await post_1.Post.findByPk(postId);
    if (found) {
        await post_1.Post.destroy({
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deletePost = deletePost;
