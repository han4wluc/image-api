
import express from 'express';
import path from 'path';
import * as util from './util';
import fsp from 'fs-promise';


export default function(app){


  app.use('/', express.static(path.join(__dirname, '../web')))

  // display local image
  // app.get('/image', (req, res) => {
  //   console.log('dir', __dirname, '../../doodle.png')
  //   const filePath = path.join(__dirname, '../../doodle.png')
  //   util.displayImageAsRes(filePath, res)
  // })

  // upload file to web
  app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path;
    var inputPath = path.resolve('./images/input/aaa');
    var targetPath = path.resolve('./images/output/bbb');

    await fsp.rename(tempPath, inputPath)
    await util.upscaleImage(inputPath, outputPath);
    util.displayImageAsRes(filePath, res)

  });


  app.get('/upscale/*', function(req, res) {
    const url = req.url.substring('/upscale/'.length)

    const inputPath = path.join(__dirname, '../../images/input/aaa')
    const outputPath = path.join(__dirname, '../../images/output/bbb')

    await util.downloadFileFromTo(url, inputPath)
    await upscaleImage(inputPath, outputPath)
    util.displayImageAsRes(outputPath, res)

  })


}
