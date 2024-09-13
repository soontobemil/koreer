const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const userService = require('../services/userService');


async function register(data){
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const req = {user_email:data.user_email,username:data.username,password:hashedPassword};
        const result = await userService.userDuplCheck(req.user_email);
        let rsltData = {};
        if (result) {
            const user = await userService.createUser(req);
            rsltData.data = user;
        } 
        rsltData.result = result;
        return rsltData;
        
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
            throw new Error('User not found');
        }

        // check email is verified
        if ( user.is_email_verified == 'N') {
            throw new Error('Email Verification is needed!!');
        }

        const isPwdValid = await bcrypt.compare(userinfo.password, user.password);
        if (!isPwdValid) {
            throw new Error('Invalid password');
        }

        const userPayload = { id: user.id, user_email: user.user_email };

        // Create Access Token / Refresh Token
        const accessToken = createAccessToken(userPayload);
        const refreshToken = createRefreshToken(userPayload);

        // accessToken은 그냥 리턴, refresh token 은 쿠키에 저장, accessToken 만료시 refreshToken으로 갱신
        return {loginInfo:userPayload,accessToken:accessToken,refreshToken:refreshToken};
    } catch (error) {
        console.log(error);
        throw new Error('Login Error');
    }
    
}

async function refreshAccessToken(user) {
    // Refresh Token Verify
    jwt.verify(user.refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            throw new Error('Invalid refreshToken');
        }

        // New Access Token Create
        const accessToken = createAccessToken({ id: user.id, user_email: user.user_email });
        return accessToken;
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
function createEmailVerifyToken(email) {
    return jwt.sign({email}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.EMAIL_VERIFY_EXPIRES_IN });
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
        const token = createEmailVerifyToken(email);

        const link = `http://localhost:3000/auth/verify-email/${token}`;

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

module.exports = {
    register,
    createAccessToken,
    createRefreshToken,
    login,
    refreshAccessToken,
    sendEmail,
    createEmailVerifyToken,
    emailVefify
};
