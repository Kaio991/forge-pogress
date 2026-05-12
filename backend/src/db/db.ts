import {Sequelize} from "sequelize"

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true
        }
    }
});




export const iniciarBancoDeDados = async ()=> {
    try {

        const { ModelUser } = await import("../models/modelUser.js");
        const { modelTreinner } = await import("../models/modelTreino.js")

        await sequelize.authenticate()
        

        ModelUser.hasMany(modelTreinner, { foreignKey: 'userId', as: 'treinos' });
        modelTreinner.belongsTo(ModelUser, { foreignKey: 'userId', as: 'usuario' });

        await sequelize.sync()

        console.log("Conexao feita com o banco de dados e associacoes perfeitas");
    } catch (error) {
        console.log("Erro ao efetuar conexao com o banco de dados"+ error);
    }
}