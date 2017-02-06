
const request = require('request');
const fs = require('fs');
require('shelljs/global');

request.get('https://cdn-images-1.medium.com/fit/c/60/60/0*OvRE_N5lfY11mbqq.png')
  .on('end', function(){
    // console.log('end')
    // exec('mv doodle.png doodle2.png')
    // exec('rm doodle2.png')
    // exit(1)

    // request(req.url).pipe(res);

  })
  .pipe(fs.createWriteStream('doodle.png'))


