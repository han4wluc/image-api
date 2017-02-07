
import path from 'path';
import chai from 'chai';
import fsp from 'fs-promise';
const assert = chai.assert;
const request = require('supertest');

const clearImageFolder = async function(){
  await fsp.emptyDir(path.resolve('./images/input'));
  await fsp.emptyDir(path.resolve('./images/output'));
}

import app from '../app';
app.listen(3001, () => {
  console.log('start test server')
});

describe('GET /upscale/*', function(){

  beforeEach(clearImageFolder);
  afterEach(clearImageFolder);

  it('should return 200', async function(){
    await request(app)
      .get('/upscale/http://example.com')
      // .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('POST /upload', function(){

  beforeEach(clearImageFolder);
  afterEach(clearImageFolder);

  it('should return 200', async function(){
    await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, './fixture/image.jpg'))
      .expect(200) //TODO fixthis, Error: EXDEV: cross-device link not permitted
  })
})


