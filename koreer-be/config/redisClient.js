const Redis = require('ioredis');

// Redis 클라이언트 생성 (한 번만 실행)
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy(times) { // 재시도 전략 (기본 설정)
        return Math.min(times * 50, 2000);
    },
    reconnectOnError(err) {
        console.error('❌ Redis Reconnect Error:', err);
        return true; // 자동 재연결
    }
});

redisClient.on('connect', () => console.log('Redis Connected!'));
redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('end', () => console.warn('⚠️ Redis Connection Closed! Retrying...'));

// Redis 구독 클라이언트
const subscriber = redisClient.duplicate();
subscriber.subscribe('CACHE_INVALIDATION', (err, count) => {
    if (err) console.error('Pub/Sub Error:', err);
    else console.log(`Subscribed to ${count} channels.`);
});

// 메시지를 받으면 캐시 삭제
subscriber.on('message', async (channel, message) => {
    if (channel === 'CACHE_INVALIDATION') {
        console.log(`♻️ 캐시 무효화 요청: ${message}`);
        await redisClient.del(`common_code:${message}`);
    }
});

module.exports = { redisClient, subscriber };
