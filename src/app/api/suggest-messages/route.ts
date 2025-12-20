import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform.";

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    // AI / Gemini error
    if (error instanceof Error) {
      console.error('Gemini / AI SDK error:', error.message);

      return new Response(
        JSON.stringify({
          error: error.message, // Gemini message only
        }),
        { status: 500 }
      );
    }

    // Fallback (very rare)
    console.error('Unknown error:', error);

    return new Response(
      JSON.stringify({ error: 'Unknown server error' }),
      { status: 500 }
    );
  }
}
