// services/post.service.js
const AdminSubscriberRepository = require('../../repositories/admin/AdminSubscriberRepository');
const AdminNewsLetterRepository = require('../../repositories/admin/AdminNewsLetterRepository');
const AdminNewsContentsRepository = require('../../repositories/admin/AdminNewsContentsRepository');
const PostRepository = require('../../repositories/PostRepository');
const { AdminSubscriberDTO } = require('../../dtos/admin/AdminSubscriberDTO');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { replaceUrl } = require('@common/utils');

const NewsletterService = require('../../src/application/NewsletterService');

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
             * 2. 메일 내용 게시글 남기기
             * 3. 구독자 목록 돌면서 전송
             */
            const today = new Date();
            // 한국 시간(KST) 기준으로 자정 시간을 설정
            today.setHours(0, 0, 0, 0);  // 자정으로 시간을 맞춰줍니다.

            // 한국 시간(KST)으로 날짜만 추출 (ISO 8601 형식)
            const localDate = today.toLocaleDateString('en-CA');  // 'en-CA' 형식은 YYYY-MM-DD 형식
            
            const reqData = {cols:'code',tbl:'common_code',where:{group_code:'NEWSLETTER_CATEGORY'}};
            const newsletters = await AdminNewsLetterRepository.findToday(localDate,reqData);
            if (newsletters.length === 0) {
                console.log("📭 오늘 보낼 뉴스레터 없음.");
                return;
            }

            console.log(`${localDate} 일자 전송 준비`);
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

            // 각 뉴스레터의 카테고리별 구독자에게 이메일 전송
            for (let newsletter of newsletters) {
                const category = newsletter.category;
                // 📧 모든 구독자 이메일 가져오기
                const subscribers = await AdminSubscriberRepository.getAllSubscribers(category);
                if (subscribers.length === 0) {
                    console.log("📭 구독자가 없음.");
                    continue;
                }
                console.log(newsletter.content_id);
                // 📧 인터뷰 내용 가져오기
                const newscontent = await AdminNewsContentsRepository.findById(newsletter.content_id);
                if (!newscontent) {
                    console.log("📭 인터뷰가 없음.");
                    continue;
                }

                console.log(`${newscontent.interview_question}\n\n${newscontent.interview_answer}`);

                const newsletterService = new NewsletterService();
                //{interview_question:interview_question,hotissue_question:hotissue_post}
                const postNewsletter = await newsletterService.createNewsletter({interview_question:`${newscontent.interview_question}\n\n${newscontent.interview_answer}`,hotissue_question:newscontent.hotissue_question});

                // 전송할 인터뷰 게시글에 저장
                const post = await PostRepository.create({
                    user_email:'admin',
                    title:newsletter.title,
                    content:postNewsletter.formattedContent,
                    category:'INTERVIEW_POSTS',
                });
                console.log(`뉴스레터 ${newsletter.category} 게시글 저장 완료`);

                // 전송할 핫이슈 게시글에 저장
                const hotissue_post = await PostRepository.create({
                    user_email:'admin',
                    title:`Today's hot issue!`,
                    content:newscontent.hotissue_question,
                    category:'COMMUNITY_POSTS',
                });
                console.log(`핫이슈 ${newsletter.category} 게시글 저장 완료`);
                // 내용에 게시글 링크 추가
                newsletter.content = replaceUrl(newsletter.content,'POST_LINK',`/community/post/${post.id}`);
                newsletter.content = replaceUrl(newsletter.content,'HOTISSUE_LINK',`/community/post/${hotissue_post.id}`);
                // 구독자들에게 이메일을 병렬로 발송
                const emailPromises = subscribers.map(subscriber => {
                    // 구독해지 링크 추가
                    newsletter.content = replaceUrl(newsletter.content,'SUBSCRIPTION_CANCEL',`/subscriber/${subscriber.id}/delete`);
                    const mailOptions = {
                        //from: process.env.EMAIL_USER,
                        from: `"KOREER" <${process.env.EMAIL_USER}>`,
                        to: subscriber.user_email,
                        subject: newsletter.title,
                        html: newsletter.content
                    };

                    return new Promise((resolve, reject) => {
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error(`❌ ${subscriber.user_email} 전송 실패:`, error);
                                reject(error);
                            } else {
                                console.log(`✅ ${subscriber.user_email} 에게 뉴스레터 발송 완료!`);
                                resolve(info);
                            }
                        });
                    });
                });

                // 모든 이메일 전송을 기다리고 처리합니다.
                await Promise.all(emailPromises);

            }
        
        } catch (error) {
            console.error('이메일 전송 오류2:', error);
            throw new Error(error);
        }
    }
   
}

module.exports = new AdminSubscriberService();
