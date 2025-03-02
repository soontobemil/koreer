// repositories/post.repository.js
const db = require('../../models');
const { getSubQuery } = require('@common/utils');

class AdminNewsContentsRepository {
    async create(data) {
        const transaction = await db.sequelize.transaction({ autocommit: false });
        let isCommitted = false; // ✅ 트랜잭션이 커밋되었는지 추적
    
        try {
            console.log('🚀 PostgreSQL 저장할 데이터:', data);
        
            // ✅ 트랜잭션 내에서 `statement_timeout = 0` 설정
            await db.sequelize.query('SET statement_timeout = 0', { transaction });
        
            // ✅ 인터뷰 저장
            const interview = await db.NewsContents.create(data, { transaction });
        
            // ✅ 트랜잭션 커밋 (여기서 완료됨)
            await transaction.commit();
            isCommitted = true; // ✅ 커밋 완료 상태 저장
        
            console.log('✅ 인터뷰 저장 성공!');
            return interview;
        } catch (error) {
            // ✅ 트랜잭션이 커밋되지 않았을 경우에만 롤백 실행
            if (!isCommitted) {
                await transaction.rollback();
            }
            console.error('❌ 인터뷰 저장 실패:', error);
            throw new Error(`Database Insert Error: ${error.message}`);
        } finally {
            // ✅ 트랜잭션 종료 후 `statement_timeout` 원래 값으로 복구
            await db.sequelize.query('SET statement_timeout = 15000');
        }
    }
    async getInterviews(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [db.Op.or]: [
                        {question: {[db.Op.like]: `%${searchWord}%`}},
                        {answer: {[db.Op.like]: `%${searchWord}%`}},
                    ]
                };
            }

            const {rows, count} = await db.Interview.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['updated_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching interviews with pagination:', error);
            throw new Error('Error fetching interviews with pagination');
        }
    }

    async findById(id) {
        return await db.NewsContents.findOne( {where: { id } });
    }

    async update(id, updateData) {
        return await db.NewsContents.update(updateData, {where: {id}});
    }

    async delete(id) {
        return await db.NewsContents.destroy({where: {id}});
    }

}

module.exports = new AdminNewsContentsRepository();
