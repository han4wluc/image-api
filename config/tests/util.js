
import path from 'path';
import fs from 'fs';
import fsp from 'fs-promise';
import chai from 'chai';
import nock from 'nock';

import * as util from '../util';

const assert = chai.assert;

const clearImageFolder = function(){
  fsp.emptyDir(path.join(__dirname, './images'));
};

describe('util.downloadFileFromTo', function(){

  beforeEach(clearImageFolder);
  afterEach(clearImageFolder);

  it('should download file with correct content and resolve', async function(){

    const url = 'http://mock.com';
    const actualContent = 'this is a mock';
    const outputPath = path.join(__dirname, './images/output1');

    nock(url)
      .get('/')
      .reply(200, actualContent);

    await util.downloadFileFromTo(url, outputPath);
    const expectedContent = await fsp.readFile(outputPath, 'utf8');

    assert(actualContent === expectedContent, 'content does not match');

  });

  it('should fail to download if url not found', async function(done){
    const url = 'http://mock.com';
    const outputPath = path.join(__dirname, './images/output2');

    nock(url)
      .get('/')
      .reply(404);

    try {
      await util.downloadFileFromTo(url, outputPath);
      assert(false);
    } catch (error){
      const fileExists = fs.existsSync(outputPath);
      assert.isNotOk(fileExists);
      assert.isOk(error);
      done();
    }
  });

  it('should fail to download if destination path is invalid', async function(done){

    const url = 'http://mock.com';
    const actualContent = 'this is a mock';
    const outputPath = path.join(__dirname, './unexistingpath/output');

    nock(url)
      .get('/')
      .reply(200, actualContent);

    try {
      await util.downloadFileFromTo(url, outputPath);
    } catch (error){
      assert.isOk(error);
      done();
    }

  });

});


describe('util.upscaleImage', function(){

  beforeEach(clearImageFolder);
  afterEach(clearImageFolder);

  it('should', async function(){

    const inputPath = path.join(__dirname, './fixture/image.jpg');
    const outputPath = path.join(__dirname, './images/output3.jpg');
    await util.upscaleImage(inputPath, outputPath);

    const fileExists = await fsp.exists(outputPath);

    assert.isOk(fileExists);

  });
});
