const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const passport = require('passport');
const userService = require('../services/userService');
const {generateAccessToken, generateRefreshToken} = require("../src/Auth");
const db = require("../models");


async function register(data) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const req = {
            user_email: data.user_email,
            username: data.username,
            password: hashedPassword,
            nation:data.nation
        };
        const result = await userService.userDuplCheck(req.user_email);
        let rsltData = {};

        if (result) {
            rsltData = await userService.createUser(req);
        } else {
            rsltData = userService.getUserByEmail(data.user_email)
        }
        return rsltData;

    } catch (error) {
        console.log(error);
        throw new Error('Error Occured while registering User');
    }
}

async function oauthRegister(data) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const req = {
            user_email: data.user_email,
            username: data.username,
            password: hashedPassword,
            is_email_verified: 'Y'
        };
        const result = await userService.userDuplCheck(req.user_email);
        let rsltData = {};

        // 최초 가입 케이스
        if (result) {
            const user = await userService.createUser(req);
            rsltData.data = user;

            // 소셜로그인 가입된 경우
        } else {
            rsltData.data = await userService.getUserByEmail(data.user_email)
        }

        const userPayload = { id: rsltData.data.id, user_email: rsltData.data.user_email };

        // Create Access Token / Refresh Token
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        return {loginInfo:userPayload,accessToken:accessToken,refreshToken:refreshToken};

    } catch (error) {
        console.log(error);
        throw new Error('Error Occured while registering User');
    }
}

// Create token only when login
async function login(userinfo){
    try {
        const user = await userService.getUserByEmail(userinfo.user_email);
        if (!user) {
            throw new Error('존재하지 않는 계정입니다. 이메일을 확인해주세요.');
        }

        // check email is verified
        if ( user.is_email_verified == 'N') {
            throw new Error('이메일 인증 후 다시 시도해주세요.');
        }

        const isPwdValid = await bcrypt.compare(userinfo.password, user.password);
        if (!isPwdValid) {
            throw new Error('비밀번호를 확인해주세요.');
        }

        const userPayload = { id: user.id, username: user.name, user_email: user.user_email };

        // Create Access Token / Refresh Token
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        // accessToken은 그냥 리턴, refresh token 은 쿠키에 저장, accessToken 만료시 refreshToken으로 갱신
        return {loginInfo:userPayload,accessToken:accessToken,refreshToken:refreshToken};
    } catch (error) {
        console.log(error);
        throw error
    }

}

async function refreshAccessToken(user) {
    // Refresh Token Verify
    jwt.verify(user.refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            throw new Error('Invalid refreshToken');
        }

        // New Access Token Create
        return generateRefreshToken({ id: user.id, username:user.username ,user_email: user.user_email });
    });
}

// JWT Access/Refresh Token Create
function createAccessToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

function createRefreshToken(user) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
}

// email verify token
function createEmailVerifyToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

async function emailVefify(token) {
    try {
        // JWT 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const email = decoded.email;

        // user db select (비동기 작업이므로 await 사용)
        const user = await userService.getUserByEmail(email);

        // 사용자가 존재하지 않거나 이미 인증된 경우
        if (!user) {
            return { code: 400, message: '존재하지 않는 사용자입니다.' };
        }

        if (user.is_email_verified === 'Y') {
            return { code: 400, message: '이미 인증된 이메일입니다.' };
        }

        // 이메일 인증 상태 db 업데이트 (비동기 작업이므로 await 사용)
        const result = await userService.updateEmailVerifyStatus(email);

        // 유저 인포 생성
        db.UserInfo.create({
            user_id: user.id,
            employment_status: 'student',    // 기본값 student로 설정
            birth_date: '-',                 // 생년월일 기본값
            location: '-',                   // 거주지
            desired_country: '-',            // 희망 취업 국가
            introduction: '-',               // 자기소개
            skills: [],                      // 빈 기술 스택 배열
            interests: [],                   // 빈 관심 분야 배열
            github_url: null,                // null로 초기화
            portfolio_url: null              // null로 초기화
        });

        return { code: 200, message: '이메일 인증이 완료되었습니다!' };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { code: 400, message: '토큰이 만료되었습니다.' };
        }
        return { code: 400, message: '유효하지 않은 토큰입니다.' };
    }
}

async function sendEmail(email) {
    try {
        //email = 'koreerkorea@gmail.com';
        const userPayload = {user_email:email}
        const token = createEmailVerifyToken(userPayload);
        const link = `${process.env.API_URL}/auth/verify-email/${token}`;

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

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '이메일 인증',
            html: `<p>다음 링크를 클릭하여 이메일 인증을 완료하세요:</p><a href="${link}">이메일 인증</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('이메일 전송 오류1:', error);
            } else {
                console.log('이메일 전송 완료:', info.response);

            }
        });
    } catch (error) {
        console.error('이메일 전송 오류2:', error);
    }

}

async function googleLogin(data) {
    try {
        /*
        // Google에서 받은 사용자 프로필 정보 처리
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
        };
        console.log(profile);

        // 기존 사용자인지 체크
        const result = await userService.userDuplCheck(data.email);
        let rsltData = {loginInfo:data.email,accessToken:data.accessToken,refreshToken:data.refreshToken};
        if (!result) {
            return rsltData;
        }
        // 기존 사용자이면 바로 리턴 ,new 이면 db에 사용자정보 insert 하고 끝
        const user2 = await userService.createUser(data.email);
        return rsltData;
        */
        // 사용자가 구글 로그인 버튼을 눌렀을 때
        passport.authenticate('google', { scope: ['profile', 'email'] });


    } catch (error) {
        console.error('구글로그인화면이동:', error);
    }

}

async function googleCallBack() {
    passport.authenticate('google', { failureRedirect: '/' , successRedirect:'http://localhost:3001/some-page'});
}

module.exports = {
    register,
    oauthRegister,
    login,
    refreshAccessToken,
    sendEmail,
    createEmailVerifyToken,
    emailVefify,
    googleCallBack,
    googleLogin
};
