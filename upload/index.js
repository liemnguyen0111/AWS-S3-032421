// Dependency
const multer = require("multer");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Variables
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

// Upload
const utils = {
  // How file(s) are stored with multer
  upload: multer({ storage }).any("file"),
  // Upload file(s) onto s3 bucket and return a promises
  s3: (files) => Promise.all(files ? files.map((file) => s3Upload(file)) : []),
};

// S3 Upload function
const s3Upload = (file) => {
  // Split the file name. Expample : "my-file.png" => ["my-file", "png"]
  const myFile = file.originalname.split(".");
  // File attributes
  const data = {
    fileName: myFile[0],
    fileType: myFile[myFile.length - 1],
    contentType: file.mimetype,
    contentEncoding: file.encoding,
    contentDisposition: `inline`,
    buffer: file.buffer,
  };

  // Actual file that will be store on s3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}.${data.fileType}`,
    ContentEncoding: data.contentEncoding,
    ContentDisposition: data.contentDisposition,
    ContentType: data.contentType,
    Body: data.buffer,
  };
  return s3.upload(params).promise();
};

// Export utils
module.exports = utils;
