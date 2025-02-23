const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 현재 환경을 가져옴 (기본값: development)
const ENV = process.env.NODE_ENV || 'development';

// Define .env file path
const envFilePath = path.resolve('./', `.env.${ENV}`);

// Update .env Key / Value
function updateEnvKey(key, value) {
    // Read .env file data
    const envVars = fs.readFileSync(envFilePath, 'utf-8');

    // Convert each lines to array
    const lines = envVars.split('\n');

    // Check if key exists
    let keyExists = false;
    const updatedLines = lines.map((line) => {
        const [currentKey, currentValue] = line.split('=');

        if (currentKey === key) {
            keyExists = true;
            return `${key}=${value}`; // Update if key exists
        }

        return line;
    });

    // If key doesn't exists, add key and value
    if (!keyExists) {
        updatedLines.push(`${key}=${value}`);
    }

    // Write updated file data
    fs.writeFileSync(envFilePath, updatedLines.join('\n'));

    console.log(`${key} updated in .env.${ENV} file`);
}

function generateSecret() {
    try {
        // Generate random JWT Access and Refresh Secret key
        const secret1 = crypto.randomBytes(64).toString('hex');
        const secret2 = crypto.randomBytes(64).toString('hex');

        updateEnvKey('JWT_ACCESS_SECRET', secret1);
        updateEnvKey('JWT_REFRESH_SECRET', secret2);
        updateEnvKey('ACCESS_TOKEN_EXPIRES_IN', '1h');
        updateEnvKey('REFRESH_TOKEN_EXPIRES_IN', '7d');

        console.log(`Complete to Add JWT_SECRET in .env.${ENV} !`);

    } catch (error) {
        console.error('Error Generating Secret Key:', error);
    }
}
// generateSecret(); ㅂㅣㅎㅗㅏㄹㅅㅓㅇㅎㅗㅏ
