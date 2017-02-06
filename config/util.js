
import fs from 'fs';
import request from 'request';

const displayImageAsRes = function(filePath, res){
  res.writeHead(200, {
    "Content-Type": "image/png",
  });
  fs.createReadStream(filePath).pipe(res);
}

const upscaleImage = function(inputPath, outputPath){
  // do stuff
}

const downloadFileFromTo = function(url, outputPath){
  return new Promise((resolve, reject) => {
    request.get(url)
      .on('end', resolve)
      .on('error', reject)
      .pipe(fs.createWriteStream(outputPath))  
  })
}

export {
  displayImageAsRes,
  upscaleImage,
  downloadFileFromTo,
}
