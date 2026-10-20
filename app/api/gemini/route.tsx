import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiStream } from '@/lib/gemini'; 

export async function POST(req: NextRequest) {
  try { 
    const { prompt } = await req.json();

    if (!prompt) {
      console.error('Prompt tidak boleh kosong.');
      return NextResponse.json({ error: 'Prompt tidak boleh kosong.' }, { status: 400 });
    }

    console.log('Menerima prompt:', prompt);

    const response = await generateGeminiStream(prompt);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gagal mendapatkan respons dari Gemini:', errorText);
      let errorMsg = 'Gagal mendapatkan respons dari Gemini API.';
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.error?.message) {
          errorMsg = parsed.error.message;
        }
      } catch {
        errorMsg = errorText || errorMsg;
      }
      return NextResponse.json({ error: errorMsg }, { status: response.status || 500 });
    }
    
    // Return the response stream directly to the client
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error di /api/gemini:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan di server.' }, 
      { status: 500 }
    );
  }
}
