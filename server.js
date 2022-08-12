const express = require("express");

const server = express();

const wordel = "relax";

server.get("/batata/:gant", (req, res) => {
  const usergant = req.params.gant;
  let result = [];

  for (let i = 0; i < usergant.length; i++) {
    let ch = usergant[i];
    if (wordel[i] == ch) {
      result.push("green");
    } else if (wordel.includes(ch)) {
      result.push("yellow");
    } else {
      result.push("gray");
    }
  }
  res.json(result);
});

server.use(express.static("public"));

server.listen(3000, () => {
  console.log("serveris coky");
});
