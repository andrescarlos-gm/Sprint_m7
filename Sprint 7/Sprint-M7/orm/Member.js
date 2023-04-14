import {sequelize} from './bd.js';
import {DataTypes, Model} from 'sequelize';

export class Member extends Model {}

Member.init({
    member_rut:{
        type: DataTypes.STRING(10),
        primaryKey: true,
        unique: true,
    },
    member_name:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    member_lastname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
},
{
    sequelize,
    createdAt: false,
    updatedAt:false,
    modelName: 'member'
});
