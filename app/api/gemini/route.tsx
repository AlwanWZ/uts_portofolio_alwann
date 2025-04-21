import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiResponse } from '@/lib/gemini'; 

export async function POST(req: NextRequest) {
  try { 
    const { prompt } = await req.json();

    if (!prompt) {
      console.error('Prompt tidak boleh kosong.');
      return NextResponse.json({ error: 'Prompt tidak boleh kosong.' }, { status: 400 });
    }

    console.log('Menerima prompt:', prompt);

    const response = await generateGeminiResponse(prompt);

    if (response) {
      console.log('Respons dari Gemini:', response);
      return NextResponse.json({ response });
    } else {
      console.error('Gagal mendapatkan respons dari Gemini.');
      return NextResponse.json({ error: 'Gagal mendapatkan respons dari Gemini.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error di /api/gemini:', error.message || error);
    return NextResponse.json({ error: 'Terjadi kesalahan di server.' }, { status: 500 });
  }
}
