// Handles request errors
// Link to GET / POST routes
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const dotenv = require('dotenv');

// 현재 환경을 가져옴 (기본값: development)
const ENV = process.env.NODE_ENV || 'development';

// 환경에 맞는 .env 파일 로드
dotenv.config({ path: `.env.${ENV}` });

console.log(`Loaded environment: ${ENV}`);
console.log(`DB Host: ${process.env.DB_HOST}`);
console.log(`API URL: ${process.env.API_URL}`);
// Module Aliasing
require('module-alias/register');
var apiUrlToRequest = require('./src/middlewares/apiUrlMiddleware');

// Generate JWT Secret key
require('./src/auth/generateSecret');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var jobInfoRouter = require('./routes/jobinfos');
var careerTips = require('./routes/careertips');
var communityRouter = require('./routes/community');
var adminRouter = require('./routes/admin/admin');
var commCodeRouter = require('./routes/commcode');
var userInfoRouter = require('./routes/userinfo');
var inquiryRouter = require('./routes/inquiry');
var chatbotRouter = require('./routes/chatbot');
var subscriberRouter = require('./routes/subscriber');
var answerQuestionRouter = require('./routes/answerquestion');


var userService = require('./services/userService');

var app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cookie',
        'X-Requested-With',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials'
    ]
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.options('*', cors({}));

// production/development api url 분리
app.use(apiUrlToRequest);
app.use('/', indexRouter);
app.use('/auth', authRouter);
//subscriberRouter
app.use('/subscriber', subscriberRouter);
app.use('/users', usersRouter);
app.use('/jobinfos', jobInfoRouter);
app.use('/community', communityRouter);
app.use('/user-info', userInfoRouter);
app.use('/inquiry', inquiryRouter);
app.use('/chatbot', chatbotRouter);
app.use('/answer-question', answerQuestionRouter);

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH2_CID_SOCIAL_LOGIN,  // Google에서 받은 Client ID
    clientSecret: process.env.OAUTH2_CSECRET_SOCIAL_LOGIN,  // Google에서 받은 Client Secret
    callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {

        // Google에서 받은 사용자 프로필 정보 처리
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
        };
        // 기존 사용자인지 체크
        const result = await userService.userDuplCheck(user.email);
        let rsltData = {loginInfo:user.email,accessToken:accessToken,refreshToken:refreshToken};
        if (!result) {
            return done(null,rsltData);
        }
        // 기존 사용자이면 바로 리턴 ,new 이면 db에 사용자정보 insert 하고 끝
        const user2 = await userService.createUser({username:user.displayName,user_email:user.email,password:user.id});
        return done(null,rsltData);

        //const result = await authService.googleLogin();

    } catch (error) {
        console.log(error);
        return done(error);
    }
}));

app.use('/codes', commCodeRouter);

app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err.message);
});

module.exports = app;
