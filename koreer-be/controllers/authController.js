const authService = require('../services/authService');
const {post, get} = require("axios");
const {UserInfoResponseDTO} = require("../dto/UserInfoResponseDTO");
const jwt = require("jsonwebtoken");
const {generateRefreshToken, generateAccessToken} = require("../src/Auth");

/**
 * These are login and sign up for user infos
 * 1. sign up
 * 2. login
 *  -> token create and return
 */
async function register(req,res) {
    try {
        const data = req.body;
        const rsltData = await authService.register({
            user_email:data.user_email,
            username:data.username,
            password:data.password,
            nation:data.nation,
            is_email_verified:'N'
        });
        if(rsltData.dataValues) {
            // send email for verifying
            const sendEmail = await authService.sendEmail(rsltData.dataValues.user_email);
            res.status(201).json({data:rsltData.data,message:'성공적으로 등록되었습니다! 이메일을 확인해주세요.'});
        } else {
            res.status(201).json({message:'중복된 이메일입니다! 다른 이메일을 사용해주세요.'});
        }

    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({message:'사용자 등록 중 오류가 발생하였습니다.'});
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const user = {user_email:data.user_email,password:data.password};
        const result = await authService.login(user);
        // Refresh Token을 쿠키에 저장
        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: true });

        // Access Token은 return
        res.json({ accessToken:result.accessToken,message:'로그인 되었습니다.'});
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({message:'로그인에 실패하였습니다.\n'+error.message});
    }

}

async function refreshAccessToken(req,res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.sendStatus(401).send('No exists refreshToken');
    }

    try {
        const accessToken = generateAccessToken({id:req.id,username:req.username, user_email:req.user_email});
        res.json({ accessToken });

    } catch (error) {
        console.log(error.message);
        res.status(401).send(error.message);
    }

}

async function logout(req,res) {
    res.clearCookie('refreshToken');
    res.json({ message: '로그아웃 되었습니다.' });
}

async function emailVefify(req,res) {
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({ message: '토큰이 존재하지 않습니다.' });
    }
    const result = await authService.emailVefify(token);
    // return res.status(result.code).json({ message: result.message });
    // return res.redirect(`http://localhost:3001/success?accessToken=${token}`);
    res.send(`
        <html>
        <head>
            <script>
                alert('가입이 완료되었습니다.');
                window.location.href = '${process.env.CLIENT_URL}/success?accessToken=${token}';
            </script>
        </head>
        <body>
        </body>
        </html>
    `);
}

async function googleLogin(req,res) {
    const result = await authService.googleLogin();
}

async function googleCallBack(req,res) {
    console.log('success')

    // 파라미터 추출
    const code = req.query.code;
    const requestUri = 'https://oauth2.googleapis.com/token'
    const redirectUri = `${process.env.API_URL}/auth/google/callback`
    console.log('redirectUri : ',redirectUri)

    const userInfoRequestUri = 'https://www.googleapis.com/userinfo/v2/me';

    try {

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.OAUTH2_CID_SOCIAL_LOGIN);
        params.append('client_secret', process.env.OAUTH2_CSECRET_SOCIAL_LOGIN);
        params.append('redirect_uri', redirectUri);
        params.append('grant_type', 'authorization_code');


        const response = await post(requestUri, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            }
        });
        const accessToken = response.data.access_token
        const bearerToken = response.data.id_token

        // 응답 처리

        const userInfoResponse = await get(userInfoRequestUri, {
            params: { access_token: accessToken},
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userInfoDTO = new UserInfoResponseDTO(userInfoResponse.data);


        const result = await authService.register({
            user_email:userInfoDTO.email,
            username:userInfoDTO.name,
            password:'1234qwer!@',
            is_email_verified:'Y'
        })


        const userPayload = { id: result.id, username: result.username, user_email: result.user_email, role: result.role };
        generateAccessToken(userPayload);
        generateRefreshToken(userPayload);

        return res.redirect(`${process.env.CLIENT_URL}/success?accessToken=${generateAccessToken(userPayload)}&refreshToken=${generateRefreshToken(userPayload)}`);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to retrieve token');
    }

}

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    emailVefify,
    googleLogin,
    googleCallBack
}