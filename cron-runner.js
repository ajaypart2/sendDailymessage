console.log("Cron started at:", new Date().toISOString());

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

function sendMessageTask() {
  sendMessage("Dawai le le *Vitamin B* ki agar le li to thik hai, nahi to lele.");
}

function sendMessageTask11() {
  sendMessage("I love you dipti, agar aap mujse naraz ho to bhi ily and khush ho to bhi ily and kuch nahi ho to bhi ily more.");
}

function sundayTask() {
  sendMessage("Dawai le le *Vitamin D* ki agar le li to thik hai, nahi to lele.");
}

const now = new Date();
const hour = now.getUTCHours();
const minute = now.getUTCMinutes();
const day = now.getUTCDay(); // Sunday = 0

// Daily 9:30 AM & 2:30 PM IST
if ((hour === 4 && minute === 0) || (hour === 9 && minute === 0)) {
  sendMessageTask();
}

// Daily 11:11 PM IST
if (hour === 17 && minute === 41) {
  sendMessageTask11();
}

// Sunday tasks
if (
  day === 0 &&
  ((hour === 3 && minute === 30) || (hour === 11 && minute === 30))
) {
  sundayTask();
}

function sendMessage(msg){
    let number = "919657034963@c.us";
    try {
     client.sendMessage(number,msg);   
    } catch (error) {
        console.log("Error in sending message: ", error.message);
    }
}

console.log("Cron finished");