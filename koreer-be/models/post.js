const { formatDate } = require('@common/utils');
const {ENUM} = require("sequelize");

// Variables name should be equal with sequelize define name.
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {

        user_email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category:{
            type:ENUM('DAILY','TECH','STUDY'),
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
        tableName: 'posts', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at', // set up the `createdAt` field as 'updated_at'
        paranoid: true, // Soft Delete 활성화
        deletedAt: 'deleted_at', // 삭제 시간 필드 이름
    });

    return Post;
};
  