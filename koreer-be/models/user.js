// Variables name should be equal with sequelize define name.
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
        nation: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'KOR'
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
        tableName: 'users', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at' // set up the `createdAt` field as 'updated_at'
    });
  
    return User;
  };
  