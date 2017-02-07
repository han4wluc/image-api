
import path from 'path';
import chai from 'chai';
import fsp from 'fs-promise';
const assert = chai.assert;
const request = require('supertest');

const clearImageFolder = async function(){
  await fsp.emptyDir(path.resolve('./images/input'));
  await fsp.emptyDir(path.resolve('./images/output'));
};

import app from '../app';
app.listen(3001, () => {
  console.log('start test server');
});


describe('POST /upload', function(){

  beforeEach(clearImageFolder);
  afterEach(clearImageFolder);

  it('should return 200', async function(){
    await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, './fixture/image.jpg'))
      .expect(200);
  });
});

describe('GET /upscale/*', function(){

  beforeEach(clearImageFolder);
  afterEach(clearImageFolder);

  it('should return 200', async function(){
    this.timeout(10000);
    await request(app)
      .get('/upscale/https://avatars3.githubusercontent.com/u/8134740?v=3&s=460')
      // .get('/upscale/http://res.cloudinary.com/hrscywv4p/image/upload/c_limit,h_9000,w_1200,f_auto/v1/775700/coderbunker-door-only-transparent_gueiif.png')
      // .expect('Content-Type', /json/)
      .expect(200);
  });
});



