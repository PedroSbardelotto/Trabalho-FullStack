
// export interface Evento {
//     id: string;
//     nome: string;
//     local: string;
//     horario: string;
//     valor: number;
//     quantidadeDisponivel: number;
//     imagem: string;
// }


import { Model, DataTypes, Sequelize } from 'sequelize';

export class Evento extends Model {
  public id!: string;
  public nome!: string;
  public local!: string;
  public horario!: Date;
  public valor!: number;
  public quantidadeDisponivel!: number;
  public imagem?: string; // Opcional

  static initModel(sequelize: Sequelize): void {
    Evento.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      local: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      horario: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantidadeDisponivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imagem: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'eventos',
    });
  }
}