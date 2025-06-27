export const GPT_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const PROMPT = 'Ты помогаешь формулировать задачи для Jira на основе голосовых сообщений.';
export const HELLO_MSG =
  '👋 Привет! Отправь мне текст или голосовое сообщение, и я помогу сформулировать задачу для Jira.';
export const DEFAULT_TRANSCRIPTION = '[Пустая расшифровка]';

export const NAME_OGG = 'voice.ogg';
export const NAME_MP3 = 'voice.mp3';

export enum EVENT_TEXT {
  DOWNLOAD_FILE_TEXT = '🎧 Скачиваю файл по ссылке:',
  CONVERT_CLOSE_TEXT = '✅ Конвертация в MP3 завершена',
  TRANSCRIPT = '📝 Расшифровка:',
  THINKING_MSG = '🧠 Думаю...',
  RECOGNIZING_MSG = '🔊 Распознаю голос...',
}

export enum TEXT_ERROR_MSG {
  ERROR_PUSH_MSG = 'Ошибка при отправке сообщения:',
  DEFAULT_MSG_TRANSCRIPT_VOICE = '[Ошибка при распознавании речи]',
  ERROR_TRANSCRIPT_VOICE = '❌ Ошибка при распознавании речи:',
  VOICE_ERROR_MSG = '❌ Ошибка при обработке голосового сообщения. Проверь логи.',
  GLOBAL_ERROR_MSG = '❌ Глобальная ошибка при обработке голосового сообщения:',
  GPT_ERROR_MSG = '❌ Ошибка при обработке запроса GPT',
}
