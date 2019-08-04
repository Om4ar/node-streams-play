const axios = require("axios");

axios({
  method: "get",
  url: "http://localhost:1337/stream/7",
  responseType: "stream"
}).then(res => {
  res.data.on("data", chunk => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });
});
