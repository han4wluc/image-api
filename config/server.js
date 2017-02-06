
import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'express-formidable';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(formidable());

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`express server listening at http://${host}:${port}`);
});