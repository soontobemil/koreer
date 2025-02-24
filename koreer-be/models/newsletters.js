const { formatDate } = require('@common/utils');

// Variables name should be equal with sequelize define name.
module.exports = (sequelize, DataTypes) => {
    const NewsLetter = sequelize.define('NewsLetter', {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        research_prompt: {
            type: DataTypes.TEXT,
        },
        format_prompt: {
            type: DataTypes.TEXT,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category:{
            type:DataTypes.STRING(255),
            allowNull: false
        },
        post_category:{
            type:DataTypes.STRING(255),
        },
        send_date: {
            type: DataTypes.DATEONLY, // YYYY-MM-DD 형식으로 저장됨
        },
        created_by: {
            type: DataTypes.INTEGER, // 양수만 허용
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
        tableName: 'newsletters', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at', // set up the `createdAt` field as 'updated_at'
        paranoid: true, // Soft Delete 활성화
        deletedAt: 'deleted_at', // 삭제 시간 필드 이름
    });

    return NewsLetter;
};
  