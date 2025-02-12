module.exports = (sequelize, DataTypes) => {
    const Inquiry = sequelize.define('Inquiry', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '이름'
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '이메일'
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '연락처'
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: '제목'
        },
        content: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '문의 내용'
        },
    }, {
        tableName: 'inquiry',
        timestamps: true,
        underscored: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });

    return Inquiry;
};