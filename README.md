# AWS-S3-032421

## Getting Started

### Installation
- add a .env file and include your AWS credentials and a bucket name
- npm i
- nodemon / npm index.js to run the script

### Use Routes
- Pass bucket, id and key in queries to be able to access to bucket and pass files name in query for a file you want to delete

#### Examples
- Get/Post : /api/files/?bucket=name&id=id&key=key
- Delete : /api/files/?bucket=name&id=id&key=key&files=["file1","file2"]

### Dependencies used

- aws-sdk: ^2.871.0
- dotenv: ^8.2.0
- express: ^4.17.1
- multer": ^1.4.2
