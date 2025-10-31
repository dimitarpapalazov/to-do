import { sequelize } from '../config/database.js';
import { List, initListModel } from './List.js';
import { Task, initTaskModel } from './Task.js';

// Initialize models
initListModel(sequelize);
initTaskModel(sequelize);

// Associations
List.hasMany(Task, { foreignKey: { name: 'listId', allowNull: false }, as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(List, { foreignKey: { name: 'listId', allowNull: false }, as: 'list' });

export {
    sequelize,
    List,
    Task,
};


