"use strict";
// import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
// import { User } from "./user";
// import { Post } from "./post";
// export class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
//     declare id: number;
//     declare userId: number;
//     declare postId: number
// }
// export function ProfileFactory(sequelize: Sequelize) {
//     Profile.init({
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//             allowNull: false
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         postId: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     }, {
//         freezeTableName: true,
//         tableName: 'profiles',
//         sequelize
//     });
//     User.belongsToMany(Post, { through: Profile, foreignKey: 'userId'});
//     Post.belongsToMany(User, { through: Profile, foreignKey: 'postId'});
// }
