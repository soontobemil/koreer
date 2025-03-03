require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = [{ id: 1, username: 'testuser', password: 'testpassword' }];

// JWT 토큰 생성 함수
function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
}

// 유저 정보 호출 함수
function getUserEmail(req) {
    try {

        const accessToken = req.cookies?.accessToken;

        if (accessToken) {
            console.log("AccessToken from cookies:", accessToken);
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            console.log("Decoded token:", decoded);
            return decoded.user_email; // 쿠키에서 성공적으로 가져왔을 경우
        }

        // 헤더에서 Authorization 가져오기
        const authHeader = req.headers.authorization;

        if (authHeader) {
            console.log("Authorization header:", authHeader);
            const token = authHeader.split(" ")[1]; // Bearer 토큰 형태
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                console.log("Decoded token:", decoded);
                return decoded.user_email; // 헤더에서 성공적으로 가져왔을 경우
            }
        }

        // 쿠키와 헤더 모두 없으면 로그인되지 않은 상태
        console.log("No access token found");
        return ""; // 혹은 null 반환

    } catch (error) {
        console.error("Error verifying token:", error.message);
        return ""; // 토큰 검증 실패시 빈 문자열 반환
    }
}

// 유저 정보 호출 함수
function getUserInfoInToken(req) {
    try {

        const accessToken = req.cookies?.accessToken;

        if (accessToken) {
             return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        }

        // 헤더에서 Authorization 가져오기
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(" ")[1]; // Bearer 토큰 형태
            if (token) {
                return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            }
        }

        // 쿠키와 헤더 모두 없으면 로그인되지 않은 상태
        console.log("No access token found");
        return ""; // 혹은 null 반환

    } catch (error) {
        console.error("Error verifying token:", error.message);
        return ""; // 토큰 검증 실패시 빈 문자열 반환
    }
}

// 액세스토큰 만료 시 재활성화
function generateTokenByRefreshToken(req) {
    try {

        const token = req.cookies?.refreshToken;

        if (token) {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        }

        // 헤더에서 Authorization 가져오기
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(" ")[1]; // Bearer 토큰 형태
            if (token) {
                return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            }
        }

        // 쿠키와 헤더 모두 없으면 로그인되지 않은 상태
        console.log("No access token found");
        return "1111"; // 혹은 null 반환

    } catch (error) {
        console.error("Error verifying token:", error.message);
        return "222"; // 토큰 검증 실패시 빈 문자열 반환
    }
}

// 로그인 라우트
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 사용자를 데이터베이스에서 찾기
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userPayload = { id: user.id, username: user.username, user_email: user.user_email };

    // Access Token 및 Refresh Token 생성
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    // Refresh Token을 쿠키에 저장 (HttpOnly, Secure 옵션을 설정하는 것이 보안에 좋습니다)
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    // Access Token을 클라이언트에 반환
    res.json({ accessToken });
});

// Access Token 갱신 라우트
app.post('/token', (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    // Refresh Token 검증
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        // 새로운 Access Token 생성
        const accessToken = generateAccessToken({ id: user.id, username: user.username, user_email: user.user_email });
        res.json({ accessToken });
    });
});

// 보호된 라우트
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Access Token 검증 미들웨어
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// 로그아웃 라우트
app.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
});

module .exports = {
    generateAccessToken,
    generateRefreshToken, generateTokenByRefreshToken,
    getUserEmail, getUserInfoInToken
}