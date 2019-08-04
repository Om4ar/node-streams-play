var express = require("express");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var app = express();

app.listen(1337);

app.all("/stream/:chunks", async function(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Transfer-Encoding": "chunked"
  });

  // set default chunks to 10
  var chunks = req.params.chunks || 10;

  // max out chunks at 100
  if (chunks > 100) chunks = 100;

  var count = 1;

  for (count; count <= chunks; count++) {
    await sleep(1000);
    res.write(
      JSON.stringify({
        type: "stream",
        chunk: count
      }) + "\n"
    );
  }

  res.end();
  next();
});
