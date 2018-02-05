import Sequelize from 'sequelize';
import { SequelizeModel } from './SequelizeModel';
export class Todo extends SequelizeModel {
    constructor(sequelize) {
        super(sequelize);
        this.init();
    }

    init() {
        this.todo = this.sequelize.define('todo', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4

            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                validate: { isUUID: 4 }
            },
            description: {
                type: Sequelize.TEXT,
                notEmpty: true
            },
            last_date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            status: {
                type: Sequelize.ENUM('complete', 'incomplete', 'pending'),
                defaultValue: 'complete'
            },

        }, {
                timestamps: true,
                underscored: true
            });
    }
}