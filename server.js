require('babel-register');
require('dotenv-safe').load({ sample: './.env.dev' });
require('./app/index.js').default();
