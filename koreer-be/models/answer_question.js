const { formatDate } = require('@common/utils');

// Variables name should be equal with sequelize define name.
module.exports = (sequelize, DataTypes) => {
    const AnswerQuestion = sequelize.define('AnswerQuestion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        user_email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        answer_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('created_at');
                return rawValue ? formatDate(new Date(rawValue), 'yyyy-MM-dd HH:mm:ss') : null;
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('updated_at');
                return rawValue ? formatDate(new Date(rawValue), 'yyyy-MM-dd HH:mm:ss') : null;
            }
        },
        deleted_at: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('deleted_at');
                return rawValue ? formatDate(new Date(rawValue), 'yyyy-MM-dd HH:mm:ss') : null;
            }
        },
    }, {
        tableName: 'answer_questions', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at', // set up the `createdAt` field as 'created_at'
    });

    AnswerQuestion.associate = (models) => {
        // Associate with User
        AnswerQuestion.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });

        // Associate with Post (for the questions)
        AnswerQuestion.belongsTo(models.Post, {
            foreignKey: 'post_id',
            as: 'question'
        });
    };

    return AnswerQuestion;
};