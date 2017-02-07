
import fs from 'fs';
import fsp from 'fs-promise';
import request from 'request';
import path from 'path';

const displayImageAsRes = function(filePath, res){
  res.writeHead(200, {
    // TODO correct content type
    "Content-Type": "image/png",
  });
  fs.createReadStream(filePath).pipe(res);
}

// TODO
const upscaleImage = async function(inputPath, outputPath){
  await fsp.copy(inputPath, outputPath);
}

const downloadFileFromTo = function(url, outputPath){
  return new Promise((resolve, reject) => {
    const res = request.get(url)
      .on('response', function(response) {
        const statusCode = response.statusCode;

        // TODO check image type
        if(statusCode !== 200){
          return reject('bad file');
        }

        const fstream = fs.createWriteStream(outputPath)

        fstream.on('error', reject)
        fstream.on('finish', resolve)
        res.pipe(fstream);
      })
      .on('error', reject)
      .on('end', resolve)
  })
}

export {
  displayImageAsRes,
  upscaleImage,
  downloadFileFromTo,
}
