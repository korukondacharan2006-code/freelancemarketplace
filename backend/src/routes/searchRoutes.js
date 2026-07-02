const { Router } = require('express')
const searchController = require('../controllers/searchController')

const router = Router()

router.get('/projects', searchController.searchProjects)

module.exports = router