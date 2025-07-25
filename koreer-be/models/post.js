const { formatDate } = require('@common/utils');

//todo enum
// Variables name should be equal with sequelize define name.
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
    
        user_id: {
            type: DataTypes.INTEGER, // 양수만 허용
            allowNull: true,
        },
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
            type:DataTypes.STRING(255),
            allowNull: false
        },
        view_count: {
            type: DataTypes.INTEGER, // 양수만 허용
            allowNull: true,
            defaultValue: 0, // 기본값 0
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

    Post.associate = (models) => {
        Post.hasMany(models.Comment, {
            foreignKey: 'post_id',
            as: 'comments'
        });
    };

    return Post;
};
  