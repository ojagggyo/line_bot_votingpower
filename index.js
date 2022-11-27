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
    .get('/', (req, res) => {res.send('hello world')})
    .post("/webhook", line.middleware(CONFIG), (req,res) => handleBot(req,res))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

function handleBot(req,res){
    res.status(200).end();
    req.body.events.map((event) => {
        client.replyMessage(event.replyMessage,{
            type: 'text',
            text: 'こんにちは！'
        });
    })
}