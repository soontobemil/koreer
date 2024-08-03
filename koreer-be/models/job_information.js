// Variables name should be equal with sequelize define name.
module.exports = (sequelize, DataTypes) => {
    const JobInfo = sequelize.define('JobInfo', {
    
        company_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        salary: {
            type: DataTypes.NUMERIC(15, 2),
            allowNull: true
        },
        job_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        job_title: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        api_category: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'job_information', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at' // set up the `createdAt` field as 'updated_at'
    });
  
    return JobInfo;
  };
  