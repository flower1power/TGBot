import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import { fetch } from 'undici';
import * as fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import { createClient } from '@deepgram/sdk';
import { DEEPGRAM_API_KEY } from './config';
import { Readable } from 'node:stream';
import {
  DEFAULT_TRANSCRIPTION,
  TEXT_ERROR_MSG,
  NAME_MP3,
  NAME_OGG,
  EVENT_TEXT,
} from './constants/constants';
import { language, toFormat } from './types/telegram';

const deepgram = createClient(DEEPGRAM_API_KEY);

export async function transcribeVoice(bot: TelegramBot, fileId: string): Promise<string> {
  const oggPath = path.resolve(NAME_OGG);
  const mp3Path = path.resolve(NAME_MP3);

  try {
    const fileLink = await bot.getFileLink(fileId);
    console.log(EVENT_TEXT.DOWNLOAD_FILE_TEXT, fileLink);

    const response = await fetch(fileLink);
    const fileStream = fs.createWriteStream(oggPath);

    await new Promise<void>((resolve, reject) => {
      const stream = Readable.fromWeb(response.body as any);
      stream.pipe(fileStream);
      stream.on('error', reject);
      fileStream.on('finish', resolve);
    });

    await new Promise<void>((resolve, reject) => {
      ffmpeg(oggPath)
        .toFormat(toFormat.mp3)
        .on('end', () => {
          console.log(EVENT_TEXT.CONVERT_CLOSE_TEXT);
          resolve();
        })
        .on('error', reject)
        .save(mp3Path);
    });

    const audioStream = fs.createReadStream(mp3Path);
    const resultDeepgram = await deepgram.listen.prerecorded.transcribeFile(audioStream, {
      language: language.ru,
      smart_format: true,
    });

    const transcript =
      resultDeepgram.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim() ||
      DEFAULT_TRANSCRIPTION;

    console.log(EVENT_TEXT.TRANSCRIPT, transcript);

    return transcript;
  } catch (error) {
    console.error(TEXT_ERROR_MSG.ERROR_TRANSCRIPT_VOICE, error);
    return TEXT_ERROR_MSG.DEFAULT_MSG_TRANSCRIPT_VOICE;
  } finally {
    if (fs.existsSync(oggPath)) fs.unlinkSync(oggPath);
    if (fs.existsSync(mp3Path)) fs.unlinkSync(mp3Path);
  }
}
