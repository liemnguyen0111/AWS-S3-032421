// Dependency
const multer = require("multer");
const AWS = require("aws-sdk");
const { prototype } = require("aws-sdk/clients/fis");

// Variables
// Access to AWS S3
const s3 = (query) =>
  new AWS.S3({
    credentials: {
      accessKeyId: query.id,
      secretAccessKey: query.key,
    },
  });

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

//--- S3 View function ---//
const s3View = async (query) => {
  try {
    return await s3(query)
      .listObjectsV2({
        Bucket: query.bucket,
      })
      .promise();
  } catch (err) {
    return err;
  }
};

//--- S3 Upload function ---//
const s3Upload = async (file, query) => {
  try {
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
    Bucket: query.bucket,
    Key: `${data.fileName}-${Date.now()}.${data.fileType}`,
    ContentEncoding: data.contentEncoding,
    ContentDisposition: data.contentDisposition,
    ContentType: data.contentType,
    Body: data.buffer,
  };

    return await s3(query).upload(params).promise();
  } catch (err) {
    return err;
  }
};

//--- S3 Delete function ---//
const s3Delete = async (query) => {

  try{
    const files = JSON.parse(query.files);
    const deleteFile = async (key) => {
      const params = {
        Bucket : query.bucket,
        Key : key
      }
      try {
        return await s3(query).deleteObject(params).promise();
      } catch (e) { return err }
    };
  
    return Promise.all(files? files.map( file => deleteFile(file)) : [])
  } catch ( err ) { return "No Key(s) Passed."}

};

// Upload utils
const utils = {
  // How file(s) are stored with multer
  multerUpload: multer({ storage }).any("file"),
  // Upload file(s) onto s3 bucket and return a promises
  uploadS3Files: (files, query) =>
    Promise.all(files ? files.map((file) => s3Upload(file, query)) : []),
  // Delete file(s) on s3 bucket
  deleteS3Files: s3Delete,
  // View bucket
  viewS3Files: s3View,
};

// Export utils
module.exports = utils;
