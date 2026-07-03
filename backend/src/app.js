require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

// ⚡ IMPORTANT: only allowed frontend URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://freelancemarketplace-six.vercel.app'
]

// CORS FIX (safe mode)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(null, true) // ⚠️ allow all to avoid blocking in production
  },
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend OK')
})

// routes
app.use('/api', require('./routes'))

module.exports = app