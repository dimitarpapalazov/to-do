import { DataTypes, Model } from 'sequelize';

class List extends Model { }

function initListModel(sequelize) {
    List.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'List',
            tableName: 'lists',
        }
    );

    return List;
}

export { List, initListModel };


