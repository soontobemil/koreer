const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

module.exports = {
    register,
    createAccessToken,
    createRefreshToken,
    login,
    refreshAccessToken
};
