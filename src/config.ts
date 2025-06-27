import dotenv from 'dotenv';

dotenv.config();

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
export const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY!;
export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
