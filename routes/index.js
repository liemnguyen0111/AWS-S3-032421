// Import Router from express dependency
const router = require("express").Router();

// Use route from myfiles.js start with "/api/...."
router.use("/api", require("./s3Routes.js"));

// Export routes
module.exports = router;
