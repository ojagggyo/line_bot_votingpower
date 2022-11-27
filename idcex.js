const line =require("@line/bot-sdk");
const express = require("express");
require('dotenv').config();

const CONFIG = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_KEY,
};
const PORT = 3001;
const clieny = new line.Client(CONFIG);
express()
    .post("/webhook", line.middleware(CINFUG), (req,res) => handleBot(req,res))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

function hndleBot(req,res){
    res.status(200),end();
    req.body.events.map((event) => {
        client.replyMessage(event.replyMessage,{
            type: 'text',
            text: 'こんにちは！'
        });
    })
}