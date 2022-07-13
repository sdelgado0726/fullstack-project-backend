"use strict";
// import { RequestHandler } from "express";
// import { Post } from "../models/post";
// import { User } from "../models/user";
// import { verifyUser } from "../services/auth";
// export const getUserProfile: RequestHandler = async (req, res, next) => {
//     let user: User | null = await verifyUser(req);
//     if(user) {
//         const result = await User.findByPk(user.userId, {
//             include: Post
//         });
//         res.status(200).json(result);
//     }
//     else {
//         res.status(401).send();
//     }
// }
