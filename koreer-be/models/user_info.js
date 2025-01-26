module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define('UserInfo', {
        school: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '학교명'
        },
        major: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '전공'
        },
        graduation_year: {
            type: DataTypes.STRING(4),
            allowNull: true,
            comment: '졸업년도'
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '현재 거주지'
        },
        desired_country: {
            type: DataTypes.STRING(50),
            allowNull: true,
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
            allowNull: true,
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