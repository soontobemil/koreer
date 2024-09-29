module.exports = (sequelize, DataTypes) => {
    const CareerTips = sequelize.define('CareerTips', {

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
        created_at: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('posted_at');
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

    return CareerTips;
};
