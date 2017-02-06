
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');

const app = express();
// const PORT = 8080;
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(formidable());


const packageJson = require('../../package.json');
app.use('/version', (req, res) => {
  res.status(200).json({
    name: packageJson.name,
    version: packageJson.version
  });
});

require('./routes')(app);



const request = require('request');
const fs = require('fs')
const path = require('path');

app.use('/', express.static(path.join(__dirname, '../../web')))

app.get('/image', (req, res) => {

  console.log('dir', __dirname, '../../doodle.png')

  res.writeHead(200, {
    "Content-Type": "image/png",
    // "Content-Disposition" : "attachment; filename=" + 'doodle.png'
  });
  fs.createReadStream(path.join(__dirname, '../../doodle.png')).pipe(res);

  // request('https://cdn-images-1.medium.com/fit/c/60/60/0*OvRE_N5lfY11mbqq.png').pipe(res);

  // request.get('https://cdn-images-1.medium.com/fit/c/60/60/0*OvRE_N5lfY11mbqq.png')
  //   .on('end', function(){
  //     // console.log('end')
  //     exec('mv doodle.png doodle2.png')
  //     exec('rm doodle2.png')
  //     exit(1)

  //     request(req.url).pipe(res);

  //   })
  //   .pipe(fs.createWriteStream('doodle.png'))

})

// app.use(bodyParser({uploadDir:'./'}));

// file upload
app.post('/upload', function (req, res) {
  // console.log(req.files)
    var tempPath = req.files.file.path;
    // console.log('tempPath', tempPath)
    var targetPath = path.resolve('./images/image.png');
    // if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");

          res.writeHead(200, {
              "Content-Type": "image/png",
              // "Content-Disposition" : "attachment; filename=" + 'doodle.png'
            });
          fs.createReadStream(path.resolve('./images/image.png')).pipe(res);

        });
    // } else {
    //     fs.unlink(tempPath, function () {
    //         if (err) throw err;
    //         console.error("Only .png files are allowed!");
    //     });
    // }
    // ...
});

require('shelljs/global');
// app.get('/upscale/:url', function(req, res) {
app.get('/upscale/*', function(req, res) {
  // const url = req.params.url;
  console.log(req.url)
  const url = req.url.substring(9)
  console.log('url', url);

  const tempPath = path.join(__dirname, '../../images/tmp/temp.png')
  const outputPath = path.join(__dirname, '../../images/output/output.png')
  // console.log('tempPath', tempPath)
  // console.log('__dirname', __dirname)
  request.get(url)
    .on('end', function(){
      // fs.createReadStream(path.resolve('./images/tmp/temp.png')).pipe(res);

      exec(`th /home/vagrant/lara88/coder_bunker/torch_repos/torch-sr/forward.lua --inputPath ${tempPath} --outputPath ${outputPath}`)

      // fs.createReadStream(tempPath).pipe(res);

      // fs.unlink(path.resolve('./images/tmp/temp.png'));
      fs.createReadStream(outputPath).pipe(res);
      fs.unlink(outputPath);
    })
    // .pipe(fs.createWriteStream('./images/tmp/temp.png'))
    .pipe(fs.createWriteStream(tempPath))

})



const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`express server listening at http://${host}:${port}`);
});

