const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

// تعيين رقم البوت ورقم المالك
const BOT_NUMBER = "+212703772263"; // رقم البوت
const OWNER_NUMBER = "+212771296432"; // رقم المالك

module.exports = {
    // 📜 أمر جلب قائمة الأوامر مع إرسال صورة وملف صوتي
    'اوامر': async (client, message) => {
        try {
            const imagePath = './media/IMG_4841.jpeg';
            const audioPath = './media/Bobiz.mp4';

            let caption = `✨ *قائمة الأوامر* ✨\n\n`;
            caption += `✅ *اوامر* - عرض هذه القائمة\n`;
            caption += `🔥 *بوم* - تشغيل المؤقت الصوتي\n`;
            caption += `🚪 *طرد <رقم>* - طرد شخص من المجموعة\n`;
            caption += `🔒 *قفل_الكروب* - قفل المجموعة\n`;
            caption += `🔓 *فتح_الكروب* - فتح المجموعة\n`;

            // إرسال الصورة مع القائمة
            if (fs.existsSync(imagePath)) {
                const image = MessageMedia.fromFilePath(imagePath);
                await client.sendMessage(message.from, image, { caption });
            } else {
                message.reply(caption);
            }

            // إرسال الملف الصوتي Bobiz.mp4
            if (fs.existsSync(audioPath)) {
                const audio = MessageMedia.fromFilePath(audioPath);
                await client.sendMessage(message.from, audio, { sendAudioAsVoice: true });
            } else {
                message.reply('⚠️ ملف الصوت غير موجود في مجلد media.');
            }
        } catch (error) {
            console.error('❌ حدث خطأ أثناء تنفيذ الأمر:', error);
            message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    },

    // 🔥 أمر "بوم" لإرسال ملف الصوت boom.mp4 (خاص بالمالك فقط)
    'بوم': async (client, message) => {
        if (message.from !== OWNER_NUMBER + "@c.us") {
            return message.reply("❌ هذا الأمر متاح فقط للمالك.");
        }

        try {
            const audioPath = './media/boom.mp4';

            if (fs.existsSync(audioPath)) {
                const audio = MessageMedia.fromFilePath(audioPath);
                await client.sendMessage(message.from, audio, { sendAudioAsVoice: true });
            } else {
                message.reply('⚠️ ملف الصوت غير موجود في مجلد media.');
            }
        } catch (error) {
            console.error('❌ حدث خطأ أثناء تنفيذ الأمر:', error);
            message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    },

    // 🚪 أمر طرد شخص من المجموعة
    'طرد': async (client, message, args) => {
        if (!message.isGroupMsg) return message.reply('❌ هذا الأمر يعمل فقط في المجموعات.');
        if (!args[0]) return message.reply('❌ يرجى تحديد رقم الشخص للطرد.');
        message.reply(`🚨 جاري طرد المستخدم: ${args[0]}`);
    },

    // 🔒 قفل المجموعة
    'قفل_الكروب': async (client, message) => {
        message.reply('🔒 تم قفل المجموعة!');
    },

    // 🔓 فتح المجموعة
    'فتح_الكروب': async (client, message) => {
        message.reply('🔓 تم فتح المجموعة!');
    }
};
