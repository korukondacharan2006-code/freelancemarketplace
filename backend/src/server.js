require('dotenv').config()

const app = require('./app')
const prisma = require('./utils/prisma')

const PORT = process.env.PORT || 10000

async function startServer() {
  try {
    await prisma.$connect()
    console.log('Database connected')

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on ${PORT}`)
    })

  } catch (err) {
    console.error('Server error:', err)
    process.exit(1)
  }
}

startServer()