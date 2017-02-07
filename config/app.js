
import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'express-formidable';
import routes from './routes';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(formidable());

routes(app);

export default app;
