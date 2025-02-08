// Initialize the server
// Link to application
const app = require('./app');
const http = require('http');

const cronJobs = require('./cron/cronJobs');  // running cron jobs
const { redisClient, subscriber } = require('./config/redisClient');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

// ✅ 종료 이벤트 핸들러 설정
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// ✅ Redis 클라이언트 안전 종료 함수
async function closeRedisClients() {
  try {
      if (redisClient && redisClient.status === 'ready') {
          console.log('🔄 Closing Redis Client...');
          await redisClient.quit();
          console.log('✅ Redis Client closed.');
      }

      if (subscriber && subscriber.status === 'ready') {
          console.log('🔄 Closing Redis Subscriber...');
          await subscriber.quit();
          console.log('✅ Redis Subscriber closed.');
      }
  } catch (error) {
      console.error('❌ Error while closing Redis:', error);
  }
}
// ✅ 중복 실행 방지를 위한 플래그 추가
let isShuttingDown = false;
// ✅ 서버 종료 핸들러 (서버가 실행 중일 때만 종료)
async function shutdown(signal) {
  if (isShuttingDown) {
      console.log(`⚠️ ${signal} received again, but shutdown is already in progress...`);
      return;
  }

  isShuttingDown = true; // ✅ 중복 실행 방지
  console.log(`🛑 ${signal} received. Shutting down server...`);

  if (server.listening) {
      server.close(async (err) => {
          if (err) {
              console.error('❌ Error while shutting down server:', err);
              process.exit(1);
          }
          await closeRedisClients();
          console.log('✅ Server shut down gracefully.');
          process.exit(0);
      });
  } else {
      console.log('⚠️ Server is not running. Closing Redis connections only.');
      await closeRedisClients();
      process.exit(0);
  }
}

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}