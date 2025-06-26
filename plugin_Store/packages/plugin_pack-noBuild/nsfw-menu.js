import fs from 'fs';

const filePath = './database/personalize.json';

let handler = async (m, { conn }) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));

        // Cargar datos globales y predeterminados
        const globalConfig = data.global;
        const defaultConfig = data.default;

        const botName = globalConfig.botName || defaultConfig.botName;
        const currency = globalConfig.currency || defaultConfig.currency;
        const videos = globalConfig.videos.length > 0 ? globalConfig.videos : defaultConfig.videos;

        const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)];

        const menuMessage = `
╭──〕${botName} 〕
├̟̇❀ 𝑫𝒆𝒔𝒂𝒓𝒓𝒐𝒍𝒍𝒂𝒅𝒐 𝑷𝒐𝒓 : 
├̟̇❀ ${dev}
├̟̇❀ 𝑽𝒆𝒓𝒔𝒊𝒐́𝒏 : ${vs}
╰──────────╼

💬¡Hola !  Pajin Soy ${botName}, aquí tienes la lista de comandos +18 usalos con discrecion ✨
💰 Moneda actual: ¥ ${currency}

╭── ⋆⋅🎀⋅⋆ ──╮
│ 🔞 NSFW 🔥
│ ✧ .sixnine .69 🔥
│ ✧ .grabboobs .agarrartetas .agarrar 🔥
│ ✧ .anal .culiar .detonar🔥
│ ✧ .suckboobs .chupartetas 🔥
│ ✧ .cum .cumear 🔥
│ ✧ .boobjob .rusa 🔥
│ ✧ .sex .sexo 🔥
│ ✧ .violar .fuck 🔥
╰── ⋆⋅🚀⋅⋆ ──╯


> ${copy} Hecho con mucho amor por ${dev}
`;

        await conn.sendMessage(
            m.chat,
            {
                video: { url: randomVideoUrl },
                gifPlayback: true,
                caption: menuMessage,
                mentions: [m.sender]
            }
        );
    } catch (error) {
        conn.reply(m.chat, `❌ Error al cargar el menú: ${error.message}`, m);
    }
};

handler.help = ['menu-nsfw'];
handler.tags = ['nsfw'];
handler.command = ['menunsfw', 'menu18'];

export default handler;

/* estilos de menu

┎───•✧•───⌬
┃
┖───•✧•  


╭──〕ᴀʟɪsᴀ ʙᴏᴛ - ᴍᴅ 〕
├̟̇❀ 𝑫𝒆𝒔𝒂𝒓𝒓𝒐𝒍𝒍𝒂𝒅𝒐 𝑷𝒐𝒓 : 
├̟̇❀ 𝑬𝒎𝒎𝒂 𝓥𝓲𝓸𝓵𝓮𝓽'𝓼 𝓥𝓮𝓻𝓼𝓲𝒐́𝓷
├̟̇❀ 𝑽𝒆𝒓𝒔𝒊𝒐́𝒏 : 
╰──────────╼*/
