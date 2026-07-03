function errorHandler(err, req, res, next) {
  console.log("ERROR:", err)

  res.status(500).json({
    success: false,
    message: err.message || "Server error"
  })
}

function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found"
  })
}

module.exports = { errorHandler, notFound }