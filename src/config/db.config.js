import Sequelize from 'sequelize';
import { join } from 'path'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false, // Disable logging (source maps)
  dialectOptions: {
    useUTC: false, // Other dialect options if needed
  },
  storage: join(__dirname, '../../resources/test.db')
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
    return sequelize.sync(); // Sync the models with the database
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
});

export {sequelize};