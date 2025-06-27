import TelegramBot from 'node-telegram-bot-api';

export interface VoiceWithTranscription extends TelegramBot.Voice {
  transcription?: string;
}

export enum toFormat {
  mp3 = 'mp3',
}

export enum language {
  ru = 'ru',
}
