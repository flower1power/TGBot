import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from './config';
import { askOpenRouter } from './gpt';
import { transcribeVoice } from './voice';
import { HELLO_MSG, TEXT_ERROR_MSG, EVENT_TEXT } from './constants/constants';
import { VoiceWithTranscription } from './types/telegram';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  try {
    await bot.sendMessage(msg.chat.id, HELLO_MSG);
  } catch (error) {
    console.error(TEXT_ERROR_MSG.ERROR_PUSH_MSG, error);
  }
});

bot.on('message', (msg) => {
  console.log(`[${msg.from?.username}]: ${msg.text || '[voice]'}`);
});

bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text || text.startsWith('/')) return;

  await bot.sendMessage(chatId, EVENT_TEXT.THINKING_MSG);

  try {
    const gptAnswer = await askOpenRouter(text);
    await bot.sendMessage(chatId, `📌 Ответ:\n\n${gptAnswer}`);
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, TEXT_ERROR_MSG.GPT_ERROR_MSG);
  }
});

bot.on('voice', async (msg) => {
  const chatId = msg.chat.id;
  const voice = msg.voice! as VoiceWithTranscription;

  try {
    await bot.sendMessage(chatId, EVENT_TEXT.RECOGNIZING_MSG);
    const transcript = await transcribeVoice(bot, voice.file_id);
    await bot.sendMessage(chatId, EVENT_TEXT.TRANSCRIPT + ` ${transcript}`);
    await bot.sendMessage(chatId, EVENT_TEXT.THINKING_MSG);

    const gptAnswer = await askOpenRouter(transcript);
    await bot.sendMessage(chatId, `📌 Ответ:\n\n${gptAnswer}`);
  } catch (err) {
    console.error(TEXT_ERROR_MSG.GLOBAL_ERROR_MSG, err);
    await bot.sendMessage(chatId, TEXT_ERROR_MSG.VOICE_ERROR_MSG);
  }
});
