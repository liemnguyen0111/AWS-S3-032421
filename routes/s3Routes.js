// Import Router from express dependency
const router = require("express").Router();

// Import middlewares
const utils = require("../upload/index.js");
const { multerUpload, uploadS3Files, viewS3Files, deleteS3Files } = utils;

// Get route - (Read)
router.get("/files", async (req, res) => {
  // Get list of files from bucket
  const data = await viewS3Files(req.query).then((e) => e);

  res.status(200).send(data);
});

// Post route - (Create)
router.post("/files", multerUpload, async (req, res) => {
  // Upload file(s) into s3 bucket and return a location of file(s). If no files exist, return empty array
  const data = await uploadS3Files(req.files, req.query).then((e) => e);

  res.status(200).send(data);
});

// Update route - (Update)
router.put("/files", (req, res) => {
  res.json(200);
});

// Delete route - (Delete)
router.delete("/files", async (req, res) => {
   
  // Delete file(s) on s3 bucket
  const data = await deleteS3Files(req.query);

  res.status(200).send(data);
});

// Export routes
module.exports = router;
