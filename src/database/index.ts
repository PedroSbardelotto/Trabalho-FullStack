import { Sequelize } from 'sequelize';
import { Cliente } from '../models/Cliente';
import { Evento } from '../models/Evento';
import { Pedido } from '../models/Pedido';

const models = [Cliente, Evento, Pedido];

class Database {
  public connection: Sequelize;

  constructor() {
    this.connection = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false, 
    });
    this.init();
  }

  init(): void {
    models.forEach(model => model.initModel(this.connection));
    
   
    models.forEach(model => {
      if ((model as any).associate) {
        (model as any).associate(this.connection.models);
      }
    });
  }
}

const database = new Database();
export default database;