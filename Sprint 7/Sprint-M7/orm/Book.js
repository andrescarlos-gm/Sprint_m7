import {sequelize} from './bd.js';
import {DataTypes, Model} from 'sequelize';
import  {Author} from './Author.js';

export class Book extends Model {}

Book.init({
    isbn:{
        type: DataTypes.STRING(15)  ,
        primaryKey: true,
        unique: true
    },
    title:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

},
{
    sequelize,
    createdAt: false,
    updatedAt:false,
    modelName: 'book'
});

Author.hasMany(Book, {foreignKey: 'author_id'},
    {foreignKey:'author_id'}
);
Book.belongsTo(Author,
    {foreignKey:'author_id'}
);

