class PaginatedResponseDTO{
    // 디폴트값 할당
    constructor(data, totalItems, currentPage = 1, totalPages, itemsPerPage = 10) {
        this.data = data; // 이 DTO를 사용하는 실제 데이터
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.itemsPerPage = itemsPerPage;
    }
}


module.exports = { PaginatedResponseDTO };
