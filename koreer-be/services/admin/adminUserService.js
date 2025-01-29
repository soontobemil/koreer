// services/post.service.js
const AdminUserRepository = require('../../repositories/admin/AdminUserRepository');
const { AdminUserDTO,AdminUserInfoDTO } = require('../../dtos/admin/AdminUserDTO');
const Redis = require('ioredis');

class AdminUserService {
    async getUsers(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;

            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: users, count: total } = await AdminUserRepository.getUsers(offset, limit, req);

            // PostResponseDTO로 매핑
            const usersDTO = users.map(user => {
                const userObject = user.toJSON ? user.toJSON() : user; // Sequelize 객체를 일반 객체로 변환

                // AdminUserDTO에 userInfoDTO 추가
                return new AdminUserDTO({
                    ...userObject, // users 테이블의 모든 데이터
                });
            });

            // 페이지네이션 메타데이터 포함 응답
            return {
                data: usersDTO,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }
    async getUserByCondition(req) {
        try {
            const user = await AdminUserRepository.getUserByCondition(req);

            const userObject = user.toJSON ? user.toJSON() : user; // Sequelize 객체를 일반 객체로 변환

            // user_info를 userObject에 병합
            const userInfoObject = userObject.userInfo || {}; // user_info가 없으면 빈 객체로 처리
            const userInfoDTO = new AdminUserInfoDTO(userInfoObject); // userInfoDTO 생성

            // AdminUserDTO에 userInfoDTO 추가
            const userDTO = new AdminUserDTO({
                ...userObject, // users 테이블 데이터
                user_info: userInfoDTO // userInfo를 DTO로 추가
            });

            return {
                data: userDTO
            };
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    }

    async updateUser(id, updateData) {
        const numericUserId = Number(id);
        const [updatedCnt1] = await AdminUserRepository.updateUser(numericUserId, updateData);
        if (updatedCnt1 === 0) {
            throw new Error('User not found or update failed');
        }
        if (!updateData.userInfo) {
            throw new Error('UserInfo data is missing');
        }
        const numericUserInfoId = updateData.userInfo ? Number(updateData.userInfo.id) : null;

        const [updatedCnt2] = await AdminUserRepository.updateUserInfo(numericUserInfoId, updateData.userInfo);
        if (updatedCnt2 === 0) {
            throw new Error('UserInfo not found or update failed');
        }
        const updatedUser = await AdminUserRepository.findById(id);
        const userObject = updatedUser.toJSON ? updatedUser.toJSON() : updatedUser; // Sequelize 객체를 일반 객체로 변환

        // user_info를 userObject에 병합
        const userInfoObject = userObject.userInfo || {}; // user_info가 없으면 빈 객체로 처리
        const userInfoDTO = new AdminUserInfoDTO(userInfoObject); // userInfoDTO 생성

        // AdminUserDTO에 userInfoDTO 추가
        const userDTO = new AdminUserDTO({
            ...userObject, // users 테이블 데이터
            user_info: userInfoDTO // userInfo를 DTO로 추가
        });

        return {
            data: userDTO
        };
    }
}



module.exports = new AdminUserService();
