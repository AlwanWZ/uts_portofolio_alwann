const API_KEY = process.env.GEMINI_API_KEY;

export async function generateGeminiResponse(prompt: string): Promise<string | null> {
  try {
    console.log('generateGeminiResponse dipanggil dengan prompt:', prompt.substring(0, 50) + '...');
    
    if (!API_KEY) {
      console.error('GEMINI_API_KEY tidak ditemukan di environment variables.');
      throw new Error('API key tidak dikonfigurasi');
    }
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
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

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error dari Gemini API:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error: any) {
    console.error('Error saat memanggil Gemini API:', error);
    throw error;
  }
}