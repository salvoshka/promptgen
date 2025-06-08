import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { PromptFormState, PromptFormKeys } from './types';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import Button from './components/Button';
import PromptOutput from './components/PromptOutput';
import { enhancePromptWithGemini, translatePromptToEnglish, isGeminiAvailable } from './services/geminiService';
import { 
  GAYA_VIDEO_OPTIONS, GERAKAN_KAMERA_OPTIONS, PENCAHAYAAN_OPTIONS, 
  WAKTU_OPTIONS, SUASANA_VIDEO_OPTIONS,
  SparklesIcon, TrashIcon, ArrowPathIcon, LanguageIcon
} from './constants';

const initialFormState: PromptFormState = {
  subjek: '',
  aksi: '',
  ekspresi: '',
  tempat: '',
  waktu: '',
  gerakanKamera: '',
  pencahayaan: '',
  gayaVideo: '',
  suasanaVideo: '',
  suaraMusik: '',
  kalimatDiucapkan: '',
  detailTambahan: '',
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<PromptFormState>(initialFormState);
  const [generatedIndonesianPrompt, setGeneratedIndonesianPrompt] = useState<string>('');
  const [generatedEnglishPrompt, setGeneratedEnglishPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGeminiConfigured, setIsGeminiConfigured] = useState(false);

  useEffect(() => {
    setIsGeminiConfigured(isGeminiAvailable());
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as PromptFormKeys]: value }));
  }, []);

  const constructBasicIndonesianPrompt = useCallback((currentFormData: PromptFormState): string => {
    const {
      subjek, aksi, ekspresi, tempat, waktu, gerakanKamera,
      pencahayaan, gayaVideo, suasanaVideo, suaraMusik,
      kalimatDiucapkan, detailTambahan
    } = currentFormData;

    let parts: string[] = [];
    if (subjek) parts.push(`Subjek utama adalah ${subjek}.`);
    if (aksi) parts.push(`Melakukan aksi ${aksi}.`);
    if (ekspresi) parts.push(`Dengan ekspresi ${ekspresi}.`);
    if (tempat) parts.push(`Berlokasi di ${tempat}.`);
    if (waktu) parts.push(`Waktu kejadian adalah ${waktu}.`);
    if (gerakanKamera) parts.push(`Gerakan kamera yang digunakan adalah ${gerakanKamera.replace(/_/g, ' ')}.`);
    if (pencahayaan) parts.push(`Jenis pencahayaan ${pencahayaan}.`);
    if (gayaVideo) parts.push(`Gaya video yang diinginkan adalah ${gayaVideo}.`);
    if (suasanaVideo) parts.push(`Suasana video terasa ${suasanaVideo}.`);
    if (suaraMusik) parts.push(`Diiringi suara atau musik: ${suaraMusik}.`);
    if (kalimatDiucapkan) parts.push(`Terdapat dialog atau narasi: "${kalimatDiucapkan}".`);
    if (detailTambahan) parts.push(`Detail tambahan: ${detailTambahan}.`);
    
    return parts.join(' ').trim() || "Mohon isi beberapa detail untuk membuat prompt.";
  }, []);
  
  const basicTranslateToEnglish = useCallback((indonesianPrompt: string, spokenLines: string): string => {
      // This is a very naive translation for the basic prompt.
      // For better results, AI translation is recommended.
      let translated = indonesianPrompt
          .replace(/Subjek utama adalah/g, "The main subject is")
          .replace(/Melakukan aksi/g, "Performing the action of")
          .replace(/Dengan ekspresi/g, "With an expression of")
          .replace(/Berlokasi di/g, "Located at")
          .replace(/Waktu kejadian adalah/g, "The time is")
          .replace(/Gerakan kamera yang digunakan adalah/g, "The camera movement used is")
          .replace(/Jenis pencahayaan/g, "The lighting type is")
          .replace(/Gaya video yang diinginkan adalah/g, "The desired video style is")
          .replace(/Suasana video terasa/g, "The video atmosphere feels")
          .replace(/Diiringi suara atau musik:/g, "Accompanied by sound or music:")
          .replace(/Terdapat dialog atau narasi:/g, "There is dialogue or narration:")
          .replace(/Detail tambahan:/g, "Additional details:");

      // Attempt to keep spoken lines, though this basic replacement is fragile.
      if (spokenLines) {
          const BDOPlaceholder = `"${spokenLines}"`;
          if (indonesianPrompt.includes(BDOPlaceholder)) {
              // No change needed if it's already distinct
          }
      }
      return translated || "Please fill in some details to generate a prompt.";
  }, []);


  const handleGenerateBasicPrompt = useCallback(() => {
    setError(null);
    setIsLoading(true);
    const indonesianPrompt = constructBasicIndonesianPrompt(formData);
    setGeneratedIndonesianPrompt(indonesianPrompt);
    
    // Basic translation for non-AI version
    const englishPrompt = basicTranslateToEnglish(indonesianPrompt, formData.kalimatDiucapkan);
    setGeneratedEnglishPrompt(englishPrompt);
    setIsLoading(false);
  }, [formData, constructBasicIndonesianPrompt, basicTranslateToEnglish]);

  const handleEnhancePrompt = async () => {
    if (!isGeminiConfigured) {
      setError("Kunci API Gemini tidak dikonfigurasi. Peningkatan dengan AI tidak tersedia.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedIndonesianPrompt(''); // Clear previous prompts
    setGeneratedEnglishPrompt('');
    try {
      const enhancedIndonesian = await enhancePromptWithGemini(formData);
      setGeneratedIndonesianPrompt(enhancedIndonesian);
      
      // Translate the AI-enhanced Indonesian prompt to English
      const translatedEnglish = await translatePromptToEnglish(enhancedIndonesian, formData.kalimatDiucapkan);
      setGeneratedEnglishPrompt(translatedEnglish);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui saat peningkatan dengan AI.");
      }
      setGeneratedIndonesianPrompt(''); 
      setGeneratedEnglishPrompt('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = useCallback(() => {
    setFormData(initialFormState);
    setGeneratedIndonesianPrompt('');
    setGeneratedEnglishPrompt('');
    setError(null);
  }, []);

  const handleIndonesianPromptChange = (newPrompt: string) => {
    setGeneratedIndonesianPrompt(newPrompt);
    // Optionally, could re-translate if Indonesian prompt is edited, but that might be too much.
    // For now, editing Indonesian prompt doesn't auto-update English prompt.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl"> {/* Increased max-width for potentially wider layout */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Veo 3 Prompt Generator (Indonesia)
          </h1>
          <p className="mt-2 text-lg text-gray-400">Buat dan tingkatkan prompt video Veo 3 dengan detail dan kreativitas.</p>
        </header>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          
          <InputField label="Subjek" id="subjek" name="subjek" value={formData.subjek} onChange={handleInputChange} placeholder="Contoh: Seorang astronot, kucing lucu, naga perkasa" required />
          <InputField label="Aksi" id="aksi" name="aksi" value={formData.aksi} onChange={handleInputChange} placeholder="Contoh: Menjelajahi planet baru, bermain dengan benang, terbang di atas gunung" />
          <InputField label="Ekspresi" id="ekspresi" name="ekspresi" value={formData.ekspresi} onChange={handleInputChange} placeholder="Contoh: Tertawa gembira, penasaran, marah" />
          <InputField label="Tempat / Latar" id="tempat" name="tempat" value={formData.tempat} onChange={handleInputChange} placeholder="Contoh: Hutan ajaib, kota metropolitan malam hari, pantai tropis" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Waktu" id="waktu" name="waktu" value={formData.waktu} onChange={handleInputChange} options={WAKTU_OPTIONS} />
            <SelectField label="Gerakan Kamera" id="gerakanKamera" name="gerakanKamera" value={formData.gerakanKamera} onChange={handleInputChange} options={GERAKAN_KAMERA_OPTIONS} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Pencahayaan" id="pencahayaan" name="pencahayaan" value={formData.pencahayaan} onChange={handleInputChange} options={PENCAHAYAAN_OPTIONS} />
            <SelectField label="Gaya Video" id="gayaVideo" name="gayaVideo" value={formData.gayaVideo} onChange={handleInputChange} options={GAYA_VIDEO_OPTIONS} />
          </div>

          <SelectField label="Suasana Video" id="suasanaVideo" name="suasanaVideo" value={formData.suasanaVideo} onChange={handleInputChange} options={SUASANA_VIDEO_OPTIONS} />
          <InputField label="Suara atau Musik" id="suaraMusik" name="suaraMusik" value={formData.suaraMusik} onChange={handleInputChange} placeholder="Contoh: Musik orkestra epik, suara alam, detak jantung" />
          <InputField label="Kalimat yang diucapkan (jika ada)" id="kalimatDiucapkan" name="kalimatDiucapkan" value={formData.kalimatDiucapkan} onChange={handleInputChange} placeholder="Contoh: 'Kita berhasil!', 'Apa itu?'" />
          <InputField label="Detail Tambahan" id="detailTambahan" name="detailTambahan" type="textarea" rows={3} value={formData.detailTambahan} onChange={handleInputChange} placeholder="Contoh: Warna dominan merah dan emas, ada efek partikel, fokus pada detail mata subjek" />

          {error && (
            <div className="p-3 bg-red-500/20 text-red-300 border border-red-500 rounded-md">
              <p>Error: {error}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-700">
            <Button onClick={handleGenerateBasicPrompt} variant="secondary" className="flex-1 group" disabled={isLoading}>
              <ArrowPathIcon className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
              {isLoading ? 'Memproses...' : 'Buat Prompt Dasar'}
            </Button>
            <Button onClick={handleEnhancePrompt} disabled={isLoading || !isGeminiConfigured} className="flex-1 group">
              <SparklesIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {isLoading ? 'Meningkatkan...' : 'Sempurnakan dengan AI'}
            </Button>
            <Button onClick={handleClearForm} variant="danger" className="group" disabled={isLoading}>
              <TrashIcon className="w-5 h-5 mr-2 group-hover:text-red-200" />
              Bersihkan
            </Button>
          </div>
        </form>

        {(generatedIndonesianPrompt || generatedEnglishPrompt || isLoading) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PromptOutput
              title="Prompt (Bahasa Indonesia)"
              prompt={generatedIndonesianPrompt}
              isEditable={true}
              onContentChange={handleIndonesianPromptChange}
              isLoading={isLoading && !generatedIndonesianPrompt}
            />
            <PromptOutput
              title="Final Prompt (English)"
              prompt={generatedEnglishPrompt}
              isEditable={false}
              isLoading={isLoading && !generatedEnglishPrompt}
            />
          </div>
        )}
        
        {!isGeminiConfigured && (
          <div className="mt-6 p-3 bg-yellow-500/20 text-yellow-300 border border-yellow-500 rounded-md text-center">
            <p><strong>Catatan:</strong> Kunci API Gemini tidak dikonfigurasi. Fitur "Sempurnakan dengan AI" dinonaktifkan. Harap atur variabel lingkungan <code>process.env.API_KEY</code> untuk mengaktifkan fitur AI.</p>
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Veo 3 Prompt Generator. Diberdayakan oleh AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
