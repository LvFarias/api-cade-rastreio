import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
    host: process.env.DB_HOST,
    password: process.env.DB_PW,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql',
    synchronize: true,
    autoLoadModels: true,
    define: { paranoid: true },
    logging: false,
};

export default sequelizeConfig;