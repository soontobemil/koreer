const db = require("../models");
const {PaginatedResponseDTO} = require("../dto/PaginatedResponseDTO");
const {CareerTipsResponseDTO} = require("../dto/CareerTipsDTO");
const {response} = require("../dto/response");

async function getCareerTips() {
    // 데이터 조회
    const result = await db.CareerTips.findAll({});

    // 전체 아이템 수 계산
    const totalItems = await db.CareerTips.count();

    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // CareerTipsResponseDTO로 매핑
    const careerTipsData = result.map(item => new CareerTipsResponseDTO(
        item.id,
        item.title,
        item.content,
        item.view_count,
        item.user_id,
        item.category,
        item.created_at,
        item.updated_at
    ));

    // 페이징 처리된 응답 생성
    const paginatedResponse = new PaginatedResponseDTO(
        careerTipsData,
        totalItems,
        1, // 기본값으로 첫 번째 페이지를 사용
        totalPages,
        itemsPerPage
    );

    return response(200, '팁 조회 성공', paginatedResponse)
}

module.exports = {
    getCareerTips
};
