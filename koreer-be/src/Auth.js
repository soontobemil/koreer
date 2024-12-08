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
    generateRefreshToken
}