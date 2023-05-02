const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

async function deleteFiles(files) {
    const locations = [];
    const promises = files.map(async (file) => {
      const params = {
        Bucket: "laxmi-signs",
        Key: `${file}`,
      };
  
      const result = await s3.deleteObject(params).promise();
      //console.log(`Files deleted ${result.Location}`);
      locations.push(result.Location);
    });
  
    await Promise.all(promises);
    //console.log('All files deleted successfully');
    return locations;
};

module.exports = deleteFiles;