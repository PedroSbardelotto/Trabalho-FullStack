
// export interface Cliente {
//     id: string;
//     nome: string;
//     email: string;
//     cpf: string; 
//     senha: string; 
// }

import { Model, DataTypes, Sequelize } from 'sequelize';

export class Cliente extends Model {
  public id!: string;
  public nome!: string;
  public email!: string;
  public cpf!: string;
  public senha!: string;
  public tipo!: "user" | "admin";
  public token!: string | undefined;

  static initModel(sequelize: Sequelize): void {
    Cliente.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'clientes',
    });
    
  }
}