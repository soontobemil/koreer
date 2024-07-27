// when you modify the scheme, you need to check out the origin table scheme and delete it in pgadmin.
module.exports = (sequelize, DataTypes) => {
    const userHistory = sequelize.define('userHistory', {
        
        last_login: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        
        user_os: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        access_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'user_history', // 테이블 이름을 명시적으로 지정
        timestamps: false // `createdAt` 및 `updatedAt` 필드를 자동으로 관리
    });
  
    return userHistory;
  };
  