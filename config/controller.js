
import path from 'path';
import * as util from './util';
import fsp from 'fs-promise';

const upload = async function(req, res){
  try {
    var tempPath = req.files.file.path;
    var inputPath = path.resolve('./images/input/aaa.jpg');
    var outputPath = path.resolve('./images/output/bbb.jpg');
    await fsp.move(tempPath, inputPath);
    await util.upscaleImage(inputPath, outputPath);
    util.displayImageAsRes(outputPath, res);
  } catch (err){
    console.log('err', err);
    res.status(500).send();
  }

};

const upscale = async function(req, res){
  try {
    const url = req.originalUrl.substring('/upscale/'.length);
    const inputPath = path.resolve('./images/input/aaa.jpg');
    const outputPath = path.resolve('./images/output/bbb.jpg');
    await util.downloadFileFromTo(url, inputPath);
    await util.upscaleImage(inputPath, outputPath);
    util.displayImageAsRes(outputPath, res);
  } catch (err){
    console.log('err', err);
    res.status(500).send();
  }
};

export {
  upload,
  upscale,
};
