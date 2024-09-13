const authService = require('../services/authService');

/**
 * These are login and sign up for user infos
 * 1. sign up
 * 2. login
 *  -> token create and return
 */
async function register(req,res) {
    try {
        const data = req.body;
        const rsltData = await authService.register({user_email:data.user_email,username:data.username,password:data.password});
        if(rsltData.result) {
            // send email for verifying
            const sendEmail = await authService.sendEmail(rsltData.data.user_email);
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
        res.status(500).json({message:'로그인에 실패하였습니다.'+error.message});
    }
    
}

async function refreshAccessToken(req,res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.sendStatus(401).send('No exists refreshToken');
    }

    try {
        const accessToken = authService.createAccessToken({id:req.id,user_email:req.user_email});
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
    return res.status(result.code).json({ message: result.message });
}

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    emailVefify
}