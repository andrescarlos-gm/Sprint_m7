import {sequelize} from './bd.js';
import {DataTypes, Model} from 'sequelize';

import { Book } from './Book.js';
import { Author } from './Author.js';

export class Coauth extends Model {}

Coauth.init({
    mng_id:{
        type: DataTypes.INTEGER  ,
        primaryKey: true, 
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
},
{
    sequelize,
    createdAt: false,
    updatedAt:false,
    modelName: 'auth_mng'
});

Author.hasMany(Coauth, {foreignKey: 'author_id'},
    {foreignKey:'author_id'}
);
Coauth.belongsTo(Author,
    {foreignKey:'author_id'}
);

Book.hasMany(Coauth,
    {foreignKey:'isbn'}
);
Coauth.belongsTo(Book,
    {foreignKey:'isbn'}
);