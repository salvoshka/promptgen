import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PromptFormState } from '../types';
import { VEO_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Kunci API Gemini tidak ditemukan. Fitur AI akan dinonaktifkan. Harap setel process.env.API_KEY.");
}

export const enhancePromptWithGemini = async (formData: PromptFormState): Promise<string> => {
  if (!ai) {
    throw new Error("Klien API Gemini belum diinisialisasi. Kunci API mungkin hilang.");
  }

  const {
    subjek, aksi, ekspresi, tempat, waktu, gerakanKamera,
    pencahayaan, gayaVideo, suasanaVideo, suaraMusik,
    kalimatDiucapkan, detailTambahan
  } = formData;

  const userInputs = [
    subjek && `Subjek: ${subjek}`,
    aksi && `Aksi: ${aksi}`,
    ekspresi && `Ekspresi: ${ekspresi}`,
    tempat && `Tempat: ${tempat}`,
    waktu && `Waktu: ${waktu}`,
    gerakanKamera && `Gerakan Kamera: ${gerakanKamera.replace(/_/g, ' ')}`, // Prettify camera movement value
    pencahayaan && `Pencahayaan: ${pencahayaan}`,
    gayaVideo && `Gaya Video: ${gayaVideo}`,
    suasanaVideo && `Suasana Video: ${suasanaVideo}`,
    suaraMusik && `Suara atau Musik: ${suaraMusik}`,
    kalimatDiucapkan && `Kalimat yang diucapkan: "${kalimatDiucapkan}"`,
    detailTambahan && `Detail Tambahan: ${detailTambahan}`,
  ].filter(Boolean).join('\n- ');

  const systemInstruction = `Anda adalah seorang ahli pembuat prompt video yang sangat kreatif dan deskriptif untuk model AI Veo 3.
Pengguna telah memberikan elemen-elemen berikut untuk sebuah ide video:
- ${userInputs}

Tugas Anda adalah mengembangkan masukan ini menjadi sebuah prompt video dalam Bahasa Indonesia yang kaya, naratif, sangat detail, dan sinematik.
Prompt harus berupa satu paragraf yang mengalir secara alami.
Gabungkan semua elemen yang diberikan secara kreatif. Jika ada elemen yang kurang detail, gunakan imajinasi Anda untuk memperkayanya.
Fokus pada penggambaran visual yang hidup, pergerakan kamera yang dinamis, pencahayaan yang membangun suasana, dan detail sensorik lainnya.
Pastikan prompt yang dihasilkan siap pakai untuk Veo 3 dan mampu menghasilkan video yang menakjubkan.
Output hanya berupa string prompt dalam Bahasa Indonesia. Jangan menyertakan komentar, pembuka, penutup, atau markdown seperti \`\`\`json atau \`\`\`.
Contoh bagaimana Anda harus berpikir (bukan format output): "Seorang ksatria futuristik (subjek) dengan zirah neon biru (detail subjek dari imajinasi) sedang berlari cepat (aksi) melewati lorong-lorong kota cyberpunk yang basah oleh hujan (tempat + detail), ekspresinya tegang dan penuh determinasi (ekspresi). Kamera melakukan tracking shot rendah (gerakan kamera), mengikuti dari belakang saat ia melompati genangan air yang memantulkan lampu-lampu kota. Waktunya malam hari (waktu), dengan pencahayaan neon yang dramatis dan bayangan panjang (pencahayaan). Gaya videonya adalah cinematic dark sci-fi (gaya video), dengan suasana menegangkan dan penuh antisipasi (suasana video). Terdengar musik synthwave yang menghentak (suara/musik). Tidak ada kalimat yang diucapkan. Detail tambahan: Partikel-partikel debu melayang di udara, menambah kesan gritty." Lalu ubah ini menjadi paragraf naratif.
Prompt yang dihasilkan harus seperti ini (contoh):
"Seorang ksatria futuristik berjubah neon biru berlari kencang melewati lorong-lorong kota cyberpunk yang diguyur hujan, wajahnya menunjukkan ekspresi tegang penuh determinasi. Kamera melakukan tracking shot rendah dari belakang, menangkap setiap lompatan gesitnya di atas genangan air yang memantulkan gemerlap lampu kota di malam hari. Pencahayaan neon yang dramatis menciptakan bayangan panjang, memperkuat gaya visual dark sci-fi sinematik dengan suasana yang menegangkan dan penuh antisipasi. Musik synthwave yang menghentak mengiringi adegannya, sementara partikel debu melayang di udara, menambah kesan gritty pada keseluruhan visual."
Hasilkan HANYA prompt naratif tersebut.`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: VEO_MODEL_NAME,
      contents: systemInstruction,
      config: {
        temperature: 0.8, // Slightly higher for more creativity
        topP: 0.95,
        topK: 50,
      }
    });
    
    let text = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = text.match(fenceRegex);
    if (match && match[2]) {
      text = match[2].trim();
    }
    return text;

  } catch (error) {
    console.error("Error calling Gemini API for prompt enhancement:", error);
    if (error instanceof Error) {
        throw new Error(`Gagal menyempurnakan prompt dengan AI: ${error.message}`);
    }
    throw new Error("Gagal menyempurnakan prompt dengan AI karena kesalahan yang tidak diketahui.");
  }
};

export const translatePromptToEnglish = async (indonesianPrompt: string, spokenLines: string): Promise<string> => {
  if (!ai) {
    throw new Error("Klien API Gemini belum diinisialisasi. Kunci API mungkin hilang.");
  }

  // Using a placeholder for spoken lines to ensure they are not translated.
  const placeholder = "[[[SPOKEN_LINES_PLACEHOLDER]]]";
  let promptToTranslate = indonesianPrompt;
  if (spokenLines && indonesianPrompt.includes(spokenLines)) {
      promptToTranslate = indonesianPrompt.replace(spokenLines, placeholder);
  } else if (spokenLines) {
      // If spokenLines is not directly in the prompt (e.g., AI rephrased it),
      // we might need a more robust way, or just append it if translation is difficult to control.
      // For now, we'll assume if it's not found, it might have been integrated differently by the first AI pass,
      // or the user wants to append it. The primary goal is to not translate user's original spoken lines.
  }


  const systemInstruction = `You are an expert translator. Translate the following Indonesian video prompt into natural, fluent, and descriptive English.
IMPORTANT: If you see the placeholder "${placeholder}", please preserve it exactly as is in the translated text. Do not translate the placeholder.
The final output should be only the translated English prompt. Do not include any conversational fluff or markdown.

Indonesian Prompt:
${promptToTranslate}`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: VEO_MODEL_NAME, 
      contents: systemInstruction,
      config: {
        temperature: 0.3, // Lower temperature for more faithful translation
      }
    });

    let translatedText = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = translatedText.match(fenceRegex);
    if (match && match[2]) {
      translatedText = match[2].trim();
    }

    // Restore spoken lines
    if (spokenLines) {
        translatedText = translatedText.replace(placeholder, spokenLines);
    }
    
    return translatedText;

  } catch (error) {
    console.error("Error calling Gemini API for translation:", error);
    if (error instanceof Error) {
        throw new Error(`Gagal menerjemahkan prompt: ${error.message}`);
    }
    throw new Error("Gagal menerjemahkan prompt karena kesalahan yang tidak diketahui.");
  }
};


export const isGeminiAvailable = (): boolean => !!API_KEY && !!ai;
