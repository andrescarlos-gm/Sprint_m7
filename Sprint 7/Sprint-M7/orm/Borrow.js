import {sequelize} from './bd.js';
import {DataTypes, Model} from 'sequelize';
import {Book} from './Book.js';
export class Borrow extends Model {}

Borrow.init({
    borrow_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    member_rut: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    borrow_date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }


},
{
    sequelize,
    createdAt: false,
    updatedAt:false,
    modelName: 'borrow'
});

Book.hasMany(Borrow, {foreignKey: 'isbn'});
Borrow.belongsTo(Book, {foreignKey: 'isbn'});