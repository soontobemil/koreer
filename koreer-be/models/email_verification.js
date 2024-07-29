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
        tableName: 'email_verification', 
        timestamps: true, 
        updatedAt: 'updated_at', 
        createdAt: 'created_at' 
    });
  
    return email_verification;
  };
  