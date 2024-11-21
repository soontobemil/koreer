// Add Business logics here
const db = require('../models');

async function createPost(postData) {
  try {
    const post = await db.Post.create(postData);
    return post;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating post');
  }
}

async function getPostById(id) {
  try {
    // select post
    const post = await db.Post.findOne({ 
            where: { 
                id: id
            } });
    return post;
  } catch (error) {
    throw new Error('Error fetching post');
  }
}


// 삭제된 항목 포함 조회 시: Post.findAll({ paranoid: false }).
/**
 * 성능 최적화
  Index 사용:

  페이징 성능을 높이기 위해 정렬 기준 컬럼에 인덱스를 설정하는 것이 중요합니다.
  예: createdAt이나 id에 인덱스를 추가.
  CREATE INDEX idx_posts_createdAt ON posts (createdAt);

 * @returns 
 */
async function getPosts1() {
  const lastId = req.query.lastId || null; // 마지막으로 조회된 ID
  const pageSize = 10;

  const posts = await db.Post.findAll({
    where: lastId ? { id: { [Op.lt]: lastId } } : { deleted: false },
    limit: pageSize,
    order: [['id', 'DESC']], // ID 기준으로 내림차순
  });

  // 반환 시 마지막 ID 포함
  return {
    items: posts,
    lastId: posts.length > 0 ? posts[posts.length - 1].id : null,
  };
}

/**
 * 페이징
 * GET /posts?page=2&limit=5
 * 
 * const result = await getPagedPosts(2, 5); // 2페이지, 페이지당 5개
  // 응답 예시
  {
    posts: [...],       // 가져온 게시글 목록
    total: 50,          // 전체 데이터 개수
    currentPage: 2,     // 현재 페이지
    totalPages: 10      // 총 페이지 수
  }
 */
async function getPosts2(page = 1, limit = 10) {
  const offset = (page - 1) * limit; // 스킵할 레코드 수 계산

  const { rows: posts, count: total } = await db.Post.findAndCountAll({
    limit,
    offset,
    order: [['created_at', 'DESC']], // 정렬 기준
  });

  return {
    posts,
    total, // 전체 데이터 개수
    currentPage: page,
    totalPages: Math.ceil(total / limit), // 전체 페이지 수 계산
  };
}


async function updatePost(postData) {
  try {
    const result = await db.Post.update(
      { content: postData.content, title: postData.title },
      { where: { id: postData.id } } // 복수 조건
    );
  } catch (error) {
    throw new Error('Error while Updating Post');
  }
}

async function deletePost(id) {
  try {
    const result = await db.Post.destroy(
      { where: { id: id} } // 복수 조건
    );
  } catch (error) {
    throw new Error('Error while deleting Post');
  }
}

module.exports = {
  createPost,
  getPostById,
  updatePost,
  deletePost
};
