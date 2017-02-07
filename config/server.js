
const PORT = 3001;

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`express server listening at http://${host}:${port}`);
});
