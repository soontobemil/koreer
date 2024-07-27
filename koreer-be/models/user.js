// variable name should be equal with sequelize define name.
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    
        user_email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.STRING(1),
            allowNull: true,
            defaultValue: 'Y'
        },
        is_email_verified: {
            type: DataTypes.STRING(1),
            allowNull: true,
            defaultValue: 'N'
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'user'
        }
    }, {
        tableName: 'users', // 테이블 이름을 명시적으로 지정
        timestamps: true, // `createdAt` 및 `updatedAt` 필드를 자동으로 관리
        updatedAt: 'updated_at', // 필드 이름을 'updated_at'으로 설정
        createdAt: 'created_at' // 필드 이름을 'created_at'으로 설정
    });
  
    return User;
  };
  