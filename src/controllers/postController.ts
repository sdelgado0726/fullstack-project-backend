import { RequestHandler } from "express";
import { Post } from "../models/post";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllPost: RequestHandler = async (req, res, next) => {
    let posts = await Post.findAll({
        include: [{
            model: User,
            required: true
        }],
        order: [
            ['updatedAt', 'DESC']
        ]
    });
    res.status(200).json(posts);   
}

export const createPost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newPosts: Post = req.body;
    newPosts.userId = user.userId;

    if (newPosts.post) {
        let created = await Post.create(newPosts);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    } 
}

export const getPost: RequestHandler = async (req, res, next) => {
    let postId = req.params.postId;
    let posts = await Post.findByPk(postId);
    if (posts) {
        res.status(200).json(posts);
    }
    else {
        res.status(404).json({});
    }   
}

export const updatePost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.postId;
    let newPosts: Post = req.body;
    newPosts.userId = user.userId;
    
    let postFound = await Post.findByPk(postId);
    
    if (postFound && postFound.postId == newPosts.postId
        && newPosts.post) {
            await Post.update(newPosts, {
                where: { postId: postId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }  
}

export const deletePost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let deletedPost: Post = req.body;
    deletedPost.userId = user.userId;

    let postId = req.params.postId;
    let found = await Post.findByPk(postId);
    
    if (found) {
        await Post.destroy({
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}
