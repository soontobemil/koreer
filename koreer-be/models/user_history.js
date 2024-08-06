// When you modify the scheme, you need to check out the origin table scheme and delete it in pgadmin.
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
        tableName: 'user_history', 
        timestamps: false 
    });
  
    return userHistory;
  };
  