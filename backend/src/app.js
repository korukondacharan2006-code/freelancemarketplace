require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')
const { errorHandler, notFound } = require('./middleware/errorHandler')

const app = express()

// Allowed Frontend Origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// health check route (VERY IMPORTANT)
app.get('/', (req, res) => {
  res.send('Backend running successfully 🚀')
})

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// API Routes
app.use('/api', routes)

// 404 Handler
app.use(notFound)

// Global Error Handler
app.use(errorHandler)

module.exports = app