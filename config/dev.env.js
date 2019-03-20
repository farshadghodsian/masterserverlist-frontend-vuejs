'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"https://127.0.0.1:54003"',
  NODE_TLS_REJECT_UNAUTHORIZED: '0'
})
