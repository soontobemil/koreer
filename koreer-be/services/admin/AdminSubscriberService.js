// services/post.service.js
const AdminSubscriberRepository = require('../../repositories/admin/AdminSubscriberRepository');
const AdminNewsLetterRepository = require('../../repositories/admin/AdminNewsLetterRepository');
const { AdminSubscriberDTO } = require('../../dtos/admin/AdminSubscriberDTO');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

class AdminSubscriberService {
    async getSubscriberById(id) {
        const sub = await AdminSubscriberRepository.findById(id);
        if (!sub) {
            throw new Error('Subscriber not found');
        }

        return new AdminSubscriberDTO(sub);
    }

    async getSubscribers(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;
            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: subs, count: total } = await AdminSubscriberRepository.getSubscribers(offset, limit, req);

            if (!subs.length) {
                return {
                    data: [],
                    meta: {
                        total,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    },
                };
            }
            
            const subsDTO = subs.map((sub) => {
                const subObject = sub.toJSON ? sub.toJSON() : sub; // Sequelize 객체 변환
                return new AdminSubscriberDTO(subObject);
            });

            // 페이지네이션 메타데이터 포함 응답
            return {
                data: subsDTO,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            throw new Error('Error fetching subscribers');
        }
    }

    async deleteSubscriber(id) {
        const deleted = await AdminSubscriberRepository.delete(id);
        if (!deleted) {
            throw new Error('Subscriber not found or delete failed');
        }

        return { message: 'Subscriber deleted successfully' };
    }

    async sendNewsLetter() {
        try {
            /**
             * 1. 등록된 메일 내용 가져오기
             * 2. 구독자 목록 돌면서 전송
             * 3. 전송 후 메일 전송 로그 남기기
             */
            const today = new Date().toISOString().split("T")[0];
            const newsletter = await AdminNewsLetterRepository.findToday(today);
            if (!newsletter) {
                console.log("📭 오늘 보낼 뉴스레터 없음.");
                return;
            }

            // 📧 모든 구독자 이메일 가져오기
            const subscribers = await AdminSubscriberRepository.getAllSubscribers();
            if (subscribers.length === 0) {
                console.log("📭 구독자가 없음.");
                return;
            }

            // OAuth2 클라이언트 설정
            const oauth2Client = new OAuth2(
                process.env.OAUTH2_CLIENT_ID, // 발급받은 클라이언트 ID
                process.env.OAUTH2_CLIENT_SECRET, // 발급받은 클라이언트 시크릿
                'https://developers.google.com/oauthplayground' // 리다이렉트 URI (OAuth Playground 사용 시)
            );
        
            // 리프레시 토큰 설정
            oauth2Client.setCredentials({
                refresh_token: process.env.OAUTH2_REFRESH_TOKEN, // 발급받은 리프레시 토큰
            });
        
            // 액세스 토큰 생성
            const accessToken = oauth2Client.getAccessToken();
        
            // Nodemailer 설정
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    type: 'OAuth2',
                    user: process.env.EMAIL_USER,
                    clientId: process.env.OAUTH2_CLIENT_ID,
                    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });

            // 모든 구독자에게 이메일 발송
            for (let subscriber of subscribers) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: subscriber.user_email,
                    subject: newsletter.title,
                    html: newsletter.content
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(`❌ ${subscriber.user_email} 전송 실패:`, error);
                    } else {
                        console.log(`✅ ${subscriber.user_email} 에게 뉴스레터 발송 완료!`);
                    }
                });
            }
        
        } catch (error) {
            console.error('이메일 전송 오류2:', error);
            throw new Error(error);
        }
    }

}

module.exports = new AdminSubscriberService();
