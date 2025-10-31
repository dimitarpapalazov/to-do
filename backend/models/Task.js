import { DataTypes, Model } from 'sequelize';

class Task extends Model { }

function initTaskModel(sequelize) {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Task',
            tableName: 'tasks',
        }
    );

    return Task;
}

export { Task, initTaskModel };


