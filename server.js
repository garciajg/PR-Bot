const { Webhooks } = require("@octokit/webhooks");
const { handlePRHook } = require('./helpers')
const fs = require('fs');

const webhooks = new Webhooks({
  secret: "mdJ3dFj4aKNJsVfu0q2D",
});
 
webhooks.on("*", async ({ id, name, payload }) => {
  console.log(name, "event received");
  if (name==='pring') {
      console.log('ping received');
  }
  if (name==='pull_request') {
      await handlePRHook(id, name, payload);
  }
});
 
require("http").createServer(webhooks.middleware).listen(5000);