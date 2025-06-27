import { fetch } from 'undici';
import { OPENROUTER_API_KEY } from './config';
import { GPT_URL, PROMPT } from './constants/constants';

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function askOpenRouter(prompt: string): Promise<string> {
  const res = await fetch(GPT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen/qwen3-30b-a3b:free',
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const json = (await res.json()) as OpenRouterResponse;
  return json.choices?.[0]?.message?.content || '[Нет ответа от OpenRouter]';
}
