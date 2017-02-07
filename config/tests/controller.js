
import proxyquire from 'proxyquire';
import chai from 'chai';
import sinon from 'sinon';
const assert = chai.assert;

const fsp = { rename: () => {} };
const util = {
  upscaleImage: () => {},
  displayImageAsRes: () => {},
  downloadFileFromTo: () => {},
  downloadFileFromTo: () => {},
}

const controller = proxyquire('../controller', {
  'fs-promise': fsp,
  './util': util,
})

const fspRenameSpy = sinon.spy(fsp, "rename");
const utilDownloadFileFromTo = sinon.spy(util, 'downloadFileFromTo');
const utilUpscaleImageSpy = sinon.spy(util, "upscaleImage");
const utilDisplayImageAsRes = sinon.spy(util, "displayImageAsRes");

const resetSpies = function(){
  [fspRenameSpy,
  utilDownloadFileFromTo,
  utilUpscaleImageSpy,
  utilDisplayImageAsRes,].forEach((function(f){
    f.reset();
  }))
}

const restoreSpies = function(){
  [fspRenameSpy,
  utilDownloadFileFromTo,
  utilUpscaleImageSpy,
  utilDisplayImageAsRes,].forEach((function(f){
    f.restore();
  }))
}

// describe('controller.upload', function(){

//   beforeEach(resetSpies)
//   afterEach(resetSpies)

//   it('should', async function(){
//     const reqStub = {
//       files: {
//         file : {
//           path: 'hello'
//         }
//       }
//     }

//     await controller.upload(reqStub, {});

//     assert(fspRenameSpy.calledOnce, 'should have been called once')
//     assert(utilUpscaleImageSpy.calledOnce, 'should have been called once')
//     assert(utilDisplayImageAsRes.calledOnce, 'should have been called once')

//   })
// })

describe('controller.upscale', function(){

  beforeEach(resetSpies)
  afterEach(resetSpies)
  after(restoreSpies)

  it('should', async function(){

    const reqStub = {
      originalUrl: 'htpp://some_url'
    }

    await controller.upscale(reqStub, {});

    assert(utilDownloadFileFromTo.calledOnce, 'should have been called once')
    assert(utilUpscaleImageSpy.calledOnce, 'should have been called once')
    assert(utilDisplayImageAsRes.calledOnce, 'should have been called once')

  });
});

