const jwt = require('jsonwebtoken');

const adminAuthMiddleware = (req, res, next) => {
    // Get Authorization from Request Header
    const authHeader = req.headers.authorization || `Bearer ${req.cookies.accessToken}`;
    console.log('Auth Middleware - Request Details:');
    console.log('URL:', req.originalUrl);
    console.log('Method:', req.method);
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);

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
        
        if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "You don't have 'admin' role!" });
        }
        next();
    } catch (err) {

        console.log(err)
        // 토큰이 유효하지 않은 경우, 오류 응답 반환
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = adminAuthMiddleware;
