
import express from 'express';
import path from 'path';

import * as controller from './controller';

export default function(app){

  app.use('/', express.static(path.resolve('./web')));

  app.post('/upload', controller.upload);

  app.get('/upscale/*', controller.upscale);

}
