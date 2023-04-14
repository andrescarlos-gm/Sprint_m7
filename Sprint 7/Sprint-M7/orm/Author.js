import {sequelize} from './bd.js';
import {DataTypes, Model} from 'sequelize';

export class Author extends Model {}

Author.init({
    author_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_name:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    author_lastname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    born_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    died_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
},
{
    sequelize,
    createdAt: false,
    updatedAt:false,
    modelName: 'author'
});