import {Sequelize} from 'sequelize';
export const sequelize = new Sequelize(
    'biblioteca','root','123456789',{
        host:'localhost',
        dialect:'postgres',
        logging: false
});

export async function testConnection(){
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

