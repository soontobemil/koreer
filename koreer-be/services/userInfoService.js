// services/userInfoService.js
const userInfoRepository = require('../repositories/userInfoRepository');

class UserInfoService {
    async createUserInfo(userInfoData) {
        try {
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

            return  await userInfoRepository.create(formattedData);
        } catch (error) {
            throw error;
        }
    }

    validateUserInfoData(data) {
        const commonRequiredFields = [
            'birthDate',           // camelCase로 변경
            'employmentStatus',    // camelCase로 변경
            'location',
            'desiredCountry',      // camelCase로 변경
            'introduction'
        ];

        const employedRequiredFields = [
            'yearsOfExperience',   // camelCase로 변경
            'salaryRange',         // camelCase로 변경
            'workStyle'            // camelCase로 변경
        ];

        // 공통 필드 검증
        for (const field of commonRequiredFields) {
            if (!data[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // 고용상태 검증
        if (!['employed', 'student'].includes(data.employmentStatus)) {
            throw new Error('Invalid employment status');
        }

        // 직장인인 경우 추가 필드 검증
        if (data.employmentStatus === 'employed') {
            for (const field of employedRequiredFields) {
                if (!data[field]) {
                    throw new Error(`${field} is required for employed status`);
                }
            }
        }

        return true;
    }
}

module.exports = new UserInfoService();