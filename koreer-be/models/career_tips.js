const {formatDate} = require('@common/utils');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CareerTips', {
        tips_id: {
            type: DataTypes.INTEGER, // 양수만 허용
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        view_count: {
            type: DataTypes.NUMERIC,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
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

    }, {
        tableName: 'career_tips',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};
