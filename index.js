const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const express = require('express');
const app =express();

const client = new Client({
    authStrategy: new LocalAuth()
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header( "Access-Control-Allow-Methods", "POST, GET" )
    next();
}); 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

// 9:30 AM every day
cron.schedule("30 9 * * *", sendMessageTask);

// 2:30 PM every day
cron.schedule("30 14 * * *", sendMessageTask);

// 11:11 PM every day
cron.schedule("11 23 * * *", sendMessageTask11);

// every sundaytask at 9:00 AM 
cron.schedule("0 09 * * 0", sundayTask);
cron.schedule("0 17 * * 0", sundayTask);


client.on('ready', () => {
    console.log('Client is ready!');
    app.listen(4000, ()=> {
    console.log(`Node Monitoring API app is running on port ${4000}`)
    });
});

function sendMessageTask(){
    sendMessage("Dawai le le *Vitamin B* ki agar le li to thik hai, nahi to lele.");
}

function sendMessageTask11(){
    sendMessage("I love you dipti, agar aap mujse naraz ho to bhi ily and khush ho to bhi ily and kuch nahi ho to bhi ily more.");
}

function sundayTask() {
  sendMessage("Dawai le le *Vitamin D* ki agar le li to thik hai, nahi to lele.");
}

function sendMessage(msg){
    let number = "919657034963@c.us";
    try {
     client.sendMessage(number,msg);   
    } catch (error) {
        console.log("Error in sending message: ", error.message);
    }
}

