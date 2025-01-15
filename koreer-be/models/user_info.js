module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define('UserInfo', {
        employment_status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'student',
            validate: {
                isIn: [['employed', 'student']]
            },
            comment: '재직상태 (직장인/학생)'
        },
        years_of_experience: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '경력 연차'
        },
        salary_range: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '연봉 범위'
        },
        work_style: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '근무 형태'
        },
        birth_date: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '생년월일'
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '현재 거주지'
        },
        desired_country: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '희망 취업 국가'
        },
        skills: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '기술 스택'
        },
        interests: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '관심 분야'
        },
        introduction: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '자기소개'
        },
        github_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'GitHub URL'
        },
        portfolio_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '포트폴리오 URL'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            comment: '사용자 ID (외래키)'
        }
    }, {
        tableName: 'user_info',
        timestamps: true,
        underscored: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    UserInfo.associate = (models) => {
        UserInfo.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return UserInfo;
};