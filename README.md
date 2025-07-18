# Голосовой Telegram-бот

Этот проект представляет собой простой Telegram-бот на TypeScript, который помогает генерировать задачи в Jira по текстовым и голосовым сообщениям. Голосовые сообщения распознаются через Deepgram и затем отправляются в OpenRouter для получения ответа от GPT.

## Требования

- Node.js версии 18 и выше
- Установленный `ffmpeg` в переменной `PATH`

## Переменные окружения

Создайте файл `.env` в корне проекта (или экспортируйте переменные в терминале) со следующими ключами:

- `TELEGRAM_BOT_TOKEN` – токен вашего Telegram-бота
- `DEEPGRAM_API_KEY` – API-ключ Deepgram для распознавания речи
- `OPENROUTER_API_KEY` – API-ключ OpenRouter для запросов к GPT

## Запуск

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Соберите проект:
   ```bash
   npm run build
   ```
3. Запустите бота в режиме разработки:
   ```bash
   npm run dev
   ```
   Или запустите скомпилированный код:
   ```bash
   node dist/index.js
   ```

Бот начнёт получать обновления из Telegram и отвечать на текстовые и расшифрованные голосовые сообщения.
