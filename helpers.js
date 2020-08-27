require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { SLACK_BOT_TOKEN } = process.env;

const channelId = 'C017MSY66CA';
const webClient = new WebClient(SLACK_BOT_TOKEN);

/**
 * 
 * @param { String } action webhhok PR Action
 * @param { String } username PR author's username
 * @param { String } prLink PR Link
 * @param { String } prRepoLink PR's Repo Link
 * @param { String } prRepoName PR's Repo Name
 * @param { String } prTitle PR title
 * @param { String } prBody PR Body
 */

function handlePRActionMessage(action, username, prLink, prRepoLink, prRepoName, prTitle, prBody) {
    if (action === 'opened') {
        return `*New PR Opened*\n>${username} <${prLink}|opened a PR> in <${prRepoLink}|${prRepoName}>\n*Title: ${prTitle}*\n>_${prBody}_`
    } else if (action === 'reopened') {
        return `*PR Reopened*\n>${username} <${prLink}|reopened a PR> in <${prRepoLink}|${prRepoName}>\n*Title: ${prTitle}*\n>_${prBody}_`
    } else if (action === 'closed') {
        return `*PR Closed*\n>${username} <${prLink}|closed a PR> in <${prRepoLink}|${prRepoName}>\n*Title: ${prTitle}*\n>_${prBody}_`
    }
}


async function handlePRHook(id, name, payload) {
    try {
        const prAction = payload.action;
        const username = payload.pull_request.user.login;
        const prTitle = payload.pull_request.title;
        const prLink = payload.pull_request.html_url;
        const prBody = payload.pull_request.body;
        const prRepoName = payload.pull_request.head.repo.name;
        const prRepoLink = payload.pull_request.head.repo.html_url;
        const prBaseRepoBranch = payload.pull_request.base.ref;
        const prBaseRepoLink = payload.pull_request.base.repo.html_url;
        
        const message = handlePRActionMessage(prAction, username, prLink, prRepoLink, prRepoName, prTitle, prBody)
        await webClient.chat.postMessage({channel: channelId, text: message})
        // if (prAction === 'opened') {
        //     console.log('New PR Opened')
        //     await webClient.chat.postMessage({ channel: channelId, text: })
        // } else if (prAction === "reopened") {
        //     console.log('PR Reopened')
        //     const res = await webClient.chat.postMessage({ channel: channelId, text: })
        //     console.log(res)
        // } else if (prAction === 'closed') {
        //     console.log('PR Closed')
        //     const res = await webClient.chat.postMessage({ channel: channelId, text: })
        //     console.log(res)
        // }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { handlePRHook };