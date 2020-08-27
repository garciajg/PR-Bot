require('dotenv').config();
const { GITHUB_TOKEN } = process.env;
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

octokit.repos
  .listForOrg({
    org: "garciajg",
    type: "public",
  })
  .then(({ data }) => {
    // handle data
    console.log(data)
  });