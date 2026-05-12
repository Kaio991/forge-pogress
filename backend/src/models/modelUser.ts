import { Model,DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export class ModelUser extends Model {
 declare id:number;
 declare nome:string;
 declare idade:number;
 declare email:string;
 declare senha:string;
 declare peso: number;
 declare altura: number;
}

ModelUser.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull:false
    },
    peso:{
        type: DataTypes.FLOAT,
        allowNull: false
      
    },
    altura:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize,
    modelName:"User",
    tableName: "users"
});

