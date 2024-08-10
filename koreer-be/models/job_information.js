// Variables name should be equal with sequelize define name.
const { formatDate } = require('@common/utils');

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
        posted_at: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('posted_at');
                return rawValue ? formatDate(new Date(rawValue), 'yyyy-MM-dd HH:mm:ss') : null;
            }
        },

    }, {
        tableName: 'job_information', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at' // set up the `createdAt` field as 'updated_at'
    });
  
    return JobInfo;
  };
  