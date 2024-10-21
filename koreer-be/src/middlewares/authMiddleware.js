const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get Authorization from Request Header
    const authHeader = req.headers.authorization;

    // Reject if Authorization Header not exists
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Bearer Token format check
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        // Verify Access Token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // 토큰이 유효한 경우, req.user에 토큰에서 해석된 정보 할당
        req.user = decoded;

        // 다음 미들웨어 또는 라우터로 이동
        next();
    } catch (err) {
        // 토큰이 유효하지 않은 경우, 오류 응답 반환
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
