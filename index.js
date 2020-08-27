require('dotenv').config();
const { GITHUB_TOKEN } = process.env;
const { Octokit } = require("@octokit/rest");
const fs = require('fs');

const octokit = new Octokit({
    auth: GITHUB_TOKEN
});

async function main() {
    try {
        // const { data } = await octokit.repos.listForUser({
        //     username: 'garciajg',
        //     sort: 'updated',
        //     direction: 'desc'
        //   });
        // const { data } = await octokit.pulls.list({
        //     owner: 'vokal',
        //     repo: 'slackbot-harvest'
        // })
        // const { data } = await octokit.orgs.pingWebhook({
        //     org: 'garciajg',
        // })
        const { data } = await octokit.repos.listWebhooks({
            owner: 'garciajg',
            repo: 
        })
        console.log(data);
        fs.writeFileSync('repos.json', JSON.stringify(data))
        return data;
    } catch(erro) {
        console.log(error);
        throw error;
    }

}

main().then(console.log).catch(console.log)