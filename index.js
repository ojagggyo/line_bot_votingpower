const line =require("@line/bot-sdk");
const express = require("express");
require('dotenv').config();
const CONFIG = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_KEY,
};
const PORT = 3001;
const client = new line.Client(CONFIG);
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
    req.body.events.map((event) => {
        client.replyMessage(event.replyToken,{
            type: 'text',
            //text: `${event.message.text}`
            text: isVotingPowerEnough(event.message.text)
        });
    })
}

isVotingPowerEnough = async (account_name) => { 
    const dsteem = require('dsteem');
    const client = new dsteem.Client('https://api.steememory.com');    
    return new Promise((resolve) => {

        client.database
        .call('get_accounts', [[account_name]])
            .then(result => {
          	    const vp = result[0].voting_power + (10000 * ((new Date() - new Date(result[0].last_vote_time + "Z")) / 1000) / 432000);
                resolve(vp);
            })
            .catch(err =>{
                console.log(err);
                resolve(-1)
            })
    })
};


