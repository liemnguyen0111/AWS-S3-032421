// Import Router from express dependency
const router = require("express").Router();

// Import middlewares
const utils = require("../upload/index.js");
const { upload, uploadS3, viewS3 } = utils;

// Get route - (Read)
router.get("/files", async (req, res) => {
    // console.log(viewS3())
  const data = await viewS3().then((e) => e)
 
  res.status(200).send(data);
});

// Post route - (Create)
router.post("/files", upload, async (req, res) => {

  // Upload file(s) into s3 bucket and return a location of file(s). If no files exist, return empty array
  const data = await uploadS3(req.files).then((e) => e);

  res.status(200).send(data);
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
