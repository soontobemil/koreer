// models/user.js
module.exports = (sequelize, DataTypes) => {
    const email_verification = sequelize.define('email_verification', {
    
        user_email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        auth_token: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'email_verification', // 테이블 이름을 명시적으로 지정
        timestamps: true, // `createdAt` 및 `updatedAt` 필드를 자동으로 관리
        updatedAt: 'updated_at', // 필드 이름을 'updated_at'으로 설정
        createdAt: 'created_at' // 필드 이름을 'created_at'으로 설정
    });
  
    return email_verification;
  };
  