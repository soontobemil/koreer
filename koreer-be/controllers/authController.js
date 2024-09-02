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
            res.status(201).json({data:rsltData.data,msg:'User registered successfully!'});
        } else {
            res.status(201).json({msg:'Error! Duplicate User!'});
        }
        
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send('An error occurred while registering User.');
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
        res.json({ accessToken:result.accessToken,loginInfo:result.loginInfo});
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send(error.message);
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
    res.json({ message: 'Logged out' });
}

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout
}