// services/userInfoService.js
const userInfoRepository = require('../repositories/userInfoRepository');
const userRepository = require('../repositories/userRepository');

class UserInfoService {
    async createUserInfo(userInfoData) {
        try {
            // 데이터 검증
            this.validateUserInfoData(userInfoData);

            const formattedData = {
                // employment_status는 이미 'employed' | 'student' 이므로 변환 불필요
                employment_status: userInfoData.employment_status,
                // 직장인인 경우의 추가 정보
                ...((userInfoData.employment_status === 'employed') && {
                    years_of_experience: userInfoData.years_of_experience,
                    salary_range: userInfoData.salary_range,
                    work_style: userInfoData.work_style
                }),
                // 필수 정보
                birth_date: userInfoData.birth_date,
                location: userInfoData.location,
                desired_country: userInfoData.desired_country,
                // 배열은 JSON 문자열로 변환
                skills: JSON.stringify(userInfoData.skills || []),
                interests: JSON.stringify(userInfoData.interests || []),
                // 필수 정보
                introduction: userInfoData.introduction,
                // 선택적 URL 정보
                github_url: userInfoData.github_url || null,
                portfolio_url: userInfoData.portfolio_url || null,
                // 외래키
                user_id: userInfoData.user_id
            };

            // 기존 레코드 확인
            const existingUser = await userInfoRepository.findByUserId(formattedData.user_id);

            const updateResult = await userRepository.update(
                { role: 'auth_user' },
                {
                    where: { id: formattedData.user_id }
                }
            );
            console.log('User role 업데이트 결과:', updateResult);

            if (existingUser) {
                return await userInfoRepository.update(formattedData.user_id, formattedData);
            }

            // UserInfo 생성
            await userInfoRepository.create(formattedData);
            return { message: "추가 정보를 성공적으로 작성 완료했습니다." };
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUserInfo(userId) {
        try {
            const userInfo = await userInfoRepository.findByUserId(userId);

            if (!userInfo) {
                throw new Error('유저 정보를 찾을 수 없습니다.');
            }

            return  {
                id: userInfo.id,
                employment_status: userInfo.employment_status,
                years_of_experience: userInfo.years_of_experience,
                salary_range: userInfo.salary_range,
                work_style: userInfo.work_style,
                birth_date: userInfo.birth_date,
                location: userInfo.location,
                desired_country: userInfo.desired_country,
                skills: JSON.parse(userInfo.skills || '[]'),
                interests: JSON.parse(userInfo.interests || '[]'),
                introduction: userInfo.introduction,
                github_url: userInfo.github_url,
                portfolio_url: userInfo.portfolio_url,
                user_id: userInfo.user_id,
                created_at: userInfo.created_at,
                updated_at: userInfo.updated_at
            };
            // return {
            //     ...userInfo,
            //     skills: userInfo.skills ? JSON.parse(userInfo.skills) : [],
            //     interests: userInfo.interests ? JSON.parse(userInfo.interests) : []
            // };
        } catch (error) {
            throw error;
        }
    }

    async updateUserInfo(userInfoData) {
        try {
            this.validateUserInfoData(userInfoData);

            const formattedData = {
                employment_status: userInfoData.employment_status,
                ...(userInfoData.employment_status === 'employed' && {
                    years_of_experience: userInfoData.years_of_experience,
                    salary_range: userInfoData.salary_range,
                    work_style: userInfoData.work_style
                }),
                birth_date: userInfoData.birth_date,
                location: userInfoData.location,
                desired_country: userInfoData.desired_country,
                skills: JSON.stringify(userInfoData.skills || []),
                interests: JSON.stringify(userInfoData.interests || []),
                introduction: userInfoData.introduction,
                github_url: userInfoData.github_url || null,
                portfolio_url: userInfoData.portfolio_url || null
            };

            return await userInfoRepository.update(userInfoData.user_id, formattedData);
        } catch (error) {
            throw error;
        }
    }

    validateUserInfoData(data) {
        const commonRequiredFields = [
            'birth_date',
            'employment_status',
            'location',
            'desired_country',
            'introduction'
        ];

        const employedRequiredFields = [
            'yearsOfExperience',
            'salaryRange',
            'workStyle'
        ];

        // 공통 필드 검증
        for (const field of commonRequiredFields) {
            if (!data[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // 고용상태 검증
        if (!['employed', 'student'].includes(data.employment_status)) {
            throw new Error('Invalid employment status');
        }

        // 직장인인 경우 추가 필드 검증
        if (data.employmentStatus === 'employed') {
            for (const field of employedRequiredFields) {
                for (const field of employedRequiredFields) {
                    if (!data[field]) {
                        throw new Error(`${field} is required for employed status`);
                    }
                }
            }
        }

        return true;
    }
}

module.exports = new UserInfoService();