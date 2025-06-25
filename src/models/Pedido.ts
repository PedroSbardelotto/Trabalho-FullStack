// export interface Pedido {
//   id: string;
//   clienteId: string;
//   eventoId: string;
//   quantidade: number;
// }

import { Model, DataTypes, Sequelize } from 'sequelize';

export class Pedido extends Model {
  public id!: string;
  public clienteId!: string;
  public eventoId!: string;
  public quantidade!: number;

  static initModel(sequelize: Sequelize): void {
    Pedido.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'pedidos',
    });
  }

  // Definindo os relacionamentos Many-to-One
  static associate(models: any): void {
    this.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
    this.belongsTo(models.Evento, { foreignKey: 'eventoId', as: 'evento' });
  }
}