const line =require("@line/bot-sdk");
const express = require("express");
require('dotenv').config();
const CONFIG = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_KEY,
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
            const dsteem = require('dsteem');
            const client = new dsteem.Client('https://api.steememory.com');
        
             if (req.body.events[0].type === "message") {
                 
             }
        
            client.database.call('get_accounts', [[event.message.text]])
                .then(result => {
                    let vp = result[0].voting_power + (10000 * ((new Date() - new Date(result[0].last_vote_time + "Z")) / 1000) / 432000);
                    vp = vp / 100;
                    lineclient.replyMessage(event.replyToken,
                        [
                            {type: 'text', text: `こんにちは、${event.message.text}さん`},
                            {type: 'text', text: `Voting Powerは、${vp.toFixed(1)}です。`},
                            {type: 'text', text: `https://steemit.com/@${event.message.text}`},
                        ]
                   );
                })
                .catch(err =>{
                    console.log(err);
                })
        }
    )    
}
