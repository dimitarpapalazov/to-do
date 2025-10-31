import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'todo_app',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'admin',
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3306),
        dialect: 'mysql',
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        define: {
            underscored: false,
            freezeTableName: true,
            timestamps: true,
        },
    }
);

export { sequelize };


