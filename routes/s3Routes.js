// Import Router from express dependency
const router = require("express").Router();

// Import middlewares
const utils = require("../upload/index.js");
const { upload, s3 } = utils;

// Get route - (Read)
router.get("/files", (req, res) => {
  res.json(200);
});

// Post route - (Create)
router.post("/files", upload, async (req, res) => {
    
  // Upload file(s) into s3 bucket and return a location of file(s). If no files exist, return empty array
  const data = await s3(req.files).then((e) => e);

  console.log(data);

  res.status(200).send("okay");
});

// Update route - (Update)
router.put("/files", (req, res) => {
  res.json(200);
});

// Delete route - (Delete)
router.delete("/files", (req, res) => {
  res.json(200);
});

// Export routes
module.exports = router;
