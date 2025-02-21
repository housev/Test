const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const commands = require('./commands');
const { BOT_NUMBER, OWNER_NUMBER } = require('./config');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// عند ظهور كود QR
client.on('qr', (qr) => {
    console.log('🔹 امسح كود QR لتسجيل الدخول');
    qrcode.generate(qr, { small: true });
});

// عند جاهزية البوت
client.on('ready', () => {
    console.log(`✅ البوت جاهز على الرقم: ${BOT_NUMBER}`);
});

// عند استقبال رسالة
client.on('message', async (message) => {
    if (!message.body.startsWith('.') || message.body.length < 2) return;
    
    const args = message.body.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (commands[command]) {
        try {
            await commands[command](client, message, args);
        } catch (error) {
            console.error(`❌ خطأ في تنفيذ الأمر ${command}:`, error);
            message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    }
});

// تشغيل البوت
client.initialize();
