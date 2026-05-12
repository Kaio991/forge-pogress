import { Model,DataTypes } from "sequelize";
import { ModelUser } from "./modelUser.js";
import { sequelize } from "../db/db.js";

export class modelTreinner extends Model{
    declare id: number;
    declare exercicio: string;
    declare carga: number;
    declare repeticoes: number;
    declare userId : number;
}

modelTreinner.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            field: 'Id'
        },
        exercicio:{
            type:DataTypes.STRING,
            allowNull:false
        },
        carga:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        repeticoes:{
            type:DataTypes.INTEGER
        },
        userId:{
            type:DataTypes.INTEGER,
            references:{
                model: ModelUser,key:"id"
            }   
        }       
    },
    {sequelize, modelName:"Treino"}
   
);
