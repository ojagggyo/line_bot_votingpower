const line =require("@line/bot-sdk");
const express = require("express");
require('dotenv').config();
const CONFIG = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.YOUR_CHANNEL_SECRET,
};
const PORT = 3001;
const lineclient = new line.Client(CONFIG);
express()
    .get('/', 
        (req, res) => {res.send('hello world')})
    .post("/webhook", 
        line.middleware(CONFIG), 
        (req,res) => handleBot(req,res))
    .listen(PORT, 
        () => console.log(`Listening on ${PORT}`));

function handleBot(req,res){
    res.status(200).end();
    req.body.events.map((event) => 
        { 
             if (req.body.events[0].type === "message") {
                 message(event);
             }else if (req.body.events[0].type === "follow") {
             }else if (req.body.events[0].type === "unfollow") {
             }       
        }
    )    
}

function message(event){
    const dsteem = require('dsteem');
    //const client = new dsteem.Client('https://api.steememory.com');
    const client = new dsteem.Client('http://172.100.0.100:8080');
    console.log(`username=${event.message.text}`);
    client.database.call('get_accounts', [[event.message.text]])
        .then(result => {
            let vp = result[0].voting_power + (10000 * ((new Date() - new Date(result[0].last_vote_time + "Z")) / 1000) / 432000);
            vp = vp / 100;
            lineclient.replyMessage(event.replyToken,
                [
                    {type: 'text', text: `こんにちは、${event.message.text}さん`},
                    {type: 'text', text: `Voting Powerは、${vp.toFixed(1)}です。`},
                    {type: 'text', text: `https://steemit.com/@${event.message.text}/posts`},
                ]
           );
        })
        .catch(err =>{console.log(err);})
}
