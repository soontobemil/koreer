// Variables name should be equal with sequelize define name.
const { formatDate } = require('@common/utils');

module.exports = (sequelize, DataTypes) => {
    const CompanyInfo = sequelize.define('CompanyInfo', {
        company_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '회사명'
        },
        company_img_url: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '회사로고 url'
        },
        rating: {
            type: DataTypes.NUMERIC(2, 1),
            allowNull: true,
            comment: '평점'
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '위치(도시)'
        },
        area: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '지역(코드)'
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '국가코드'
        },
        industry: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '산업군'
        },
        industry_detail: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '산업군 상세'
        },
        employees: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '사원수'
        },
        salary_range: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '연봉범위({min:,max:})'
        },
        corporate_culture: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '기업문화({"Work-Life Balance":85,"Career Growth":80})'
        },
        benefit: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '복리후생({["Health Benefits","Pension Plan"]})'
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
        }

    }, {
        tableName: 'company_information', // naming the table name
        timestamps: true, // automatically set up `createdAt` and `updatedAt` fields as timestamp
        updatedAt: 'updated_at', // set up the `updatedAt` field as 'updated_at'
        createdAt: 'created_at', // set up the `createdAt` field as 'updated_at'
        paranoid: true, // Soft Delete 활성화
        deletedAt: 'deleted_at', // 삭제 시간 필드 이름
    });
  
    return CompanyInfo;
  };
  