// repositories/post.repository.js
const db = require('../../models');
const { getSubQuery } = require('@common/utils');

class AdminNewsLetterRepository {
    async create(data) {
        const transaction = await db.sequelize.transaction({ autocommit: false });
        let isCommitted = false; // ✅ 트랜잭션이 커밋되었는지 추적
    
        try {
            console.log('🚀 PostgreSQL 저장할 데이터:', data);
        
            // ✅ 트랜잭션 내에서 `statement_timeout = 0` 설정
            await db.sequelize.query('SET statement_timeout = 0', { transaction });
        
            // ✅ 뉴스레터 저장
            const letter = await db.NewsLetter.create(data, { transaction });
        
            // ✅ 트랜잭션 커밋 (여기서 완료됨)
            await transaction.commit();
            isCommitted = true; // ✅ 커밋 완료 상태 저장
        
            console.log('✅ 뉴스레터 저장 성공!');
            return letter;
        } catch (error) {
            // ✅ 트랜잭션이 커밋되지 않았을 경우에만 롤백 실행
            if (!isCommitted) {
                await transaction.rollback();
            }
            console.error('❌ 뉴스레터 저장 실패:', error);
            throw new Error(`Database Insert Error: ${error.message}`);
        } finally {
            // ✅ 트랜잭션 종료 후 `statement_timeout` 원래 값으로 복구
            await db.sequelize.query('SET statement_timeout = 15000');
        }
    }
    async getNewsLetters(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [db.Op.or]: [
                        {title: {[db.Op.like]: `%${searchWord}%`}},
                        {content: {[db.Op.like]: `%${searchWord}%`}},
                    ]
                };
            }

            const {rows, count} = await db.NewsLetter.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['updated_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching newsletters with pagination:', error);
            throw new Error('Error fetching newsletters with pagination');
        }
    }

    async findById(id) {
        return await db.NewsLetter.findOne( {where: { id } });
    }

    async update(id, updateData) {
        return await db.NewsLetter.update(updateData, {where: {id}});
    }

    async delete(id) {
        return await db.NewsLetter.destroy({where: {id}});
    }

    async findToday(date,data) {
        return await db.NewsLetter.findAll( {
            where: { 
                send_date: date,
                category: {
                    [db.Op.in]: db.sequelize.literal(getSubQuery(data.cols, data.tbl, data.where))  // 조건 추가
                  }
            },
            attributes: [
                'category',
                'title',  // 다른 컬럼도 포함
                'content', // 다른 컬럼도 포함
                [db.Sequelize.fn('COUNT', db.Sequelize.col('category')), 'category_count']  // 카테고리별 갯수
              ],
            group: ['category', 'title', 'content'],  // 'category'를 기준으로 그룹화
            raw: true  // raw 데이터를 반환
        });
    }
}

module.exports = new AdminNewsLetterRepository();
