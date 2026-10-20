const API_KEY = process.env.GEMINI_API_KEY;

export async function generateGeminiStream(prompt: string): Promise<Response> {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY) {
    console.error('GEMINI_API_KEY tidak ditemukan di environment variables.');
    throw new Error('GEMINI_API_KEY belum dikonfigurasi di Environment Variables Vercel.');
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      }),
    }
  );

  return response;
}