import React from 'react';
import { SelectOption } from './types';

export const GAYA_VIDEO_OPTIONS: SelectOption[] = [
  { value: "", label: "Pilih Gaya Video" },
  { value: "Photorealistic", label: "Fotorealistik (Photorealistic)" },
  { value: "Cinematic", label: "Sinematik (Cinematic)" },
  { value: "Anime", label: "Anime" },
  { value: "Documentary", label: "Dokumenter (Documentary)" },
  { value: "Watercolor", label: "Cat Air (Watercolor)" },
  { value: "3D Render", label: "Render 3D (3D Render)" },
  { value: "Impressionistic", label: "Impresionistik (Impressionistic)" },
  { value: "Cyberpunk", label: "Cyberpunk" },
  { value: "Fantasy Art", label: "Seni Fantasi (Fantasy Art)" },
  { value: "Vintage Film", label: "Film Antik (Vintage Film)" },
  { value: "Stop Motion", label: "Stop Motion" },
  { value: "Pixel Art", label: "Seni Piksel (Pixel Art)" },
  { value: "Claymation", label: "Claymation" },
];

export const GERAKAN_KAMERA_OPTIONS: SelectOption[] = [
  { value: "", label: "Pilih Gerakan Kamera" },
  { value: "static_shot", label: "Static Shot (Bidikan Statis)" },
  { value: "pan_left", label: "Pan Left (Geser Kiri)" },
  { value: "pan_right", label: "Pan Right (Geser Kanan)" },
  { value: "tilt_up", label: "Tilt Up (Dongak ke Atas)" },
  { value: "tilt_down", label: "Tilt Down (Tunduk ke Bawah)" },
  { value: "zoom_in", label: "Zoom In (Perbesar)" },
  { value: "zoom_out", label: "Zoom Out (Perkecil)" },
  { value: "dolly_zoom", label: "Dolly Zoom (Zoom Dolly/Efek Vertigo)" },
  { value: "dolly_in", label: "Dolly In (Maju dengan Dolly)"},
  { value: "dolly_out", label: "Dolly Out (Mundur dengan Dolly)"},
  { value: "crane_shot_up", label: "Crane Shot Up (Bidikan Derek ke Atas)" },
  { value: "crane_shot_down", label: "Crane Shot Down (Bidikan Derek ke Bawah)" },
  { value: "tracking_shot", label: "Tracking Shot (Bidikan Mengikuti)" },
  { value: "follow_shot", label: "Follow Shot (Bidikan Mengikuti Subjek)" },
  { value: "handheld", label: "Handheld (Genggam Tangan)" },
  { value: "steadicam", label: "Steadicam" },
  { value: "pov", label: "POV (Point of View/Sudut Pandang Pertama)" },
  { value: "drone_shot", label: "Drone Shot (Bidikan Drone)" },
  { value: "aerial_shot", label: "Aerial Shot (Bidikan Udara)" },
  { value: "orbit_clockwise", label: "Orbit Clockwise (Mengorbit Searah Jarum Jam)" },
  { value: "orbit_counter_clockwise", label: "Orbit Counter-Clockwise (Mengorbit Berlawanan Jarum Jam)" },
  { value: "fly_through", label: "Fly-through (Terbang Menerobos)" },
  { value: "boom_up", label: "Boom Up (Boom ke Atas)" },
  { value: "boom_down", label: "Boom Down (Boom ke Bawah)" },
  { value: "pedestal_up", label: "Pedestal Up (Naik Alas)" },
  { value: "pedestal_down", label: "Pedestal Down (Turun Alas)" },
  { value: "arc_shot_left", label: "Arc Shot Left (Bidikan Melengkung ke Kiri)" },
  { value: "arc_shot_right", label: "Arc Shot Right (Bidikan Melengkung ke Kanan)" },
  { value: "whip_pan_left", label: "Whip Pan Left (Geser Cepat ke Kiri)" },
  { value: "whip_pan_right", label: "Whip Pan Right (Geser Cepat ke Kanan)" },
  { value: "slow_zoom_in", label: "Slow Zoom In (Perbesar Perlahan)" },
  { value: "slow_zoom_out", label: "Slow Zoom Out (Perkecil Perlahan)" },
  { value: "quick_zoom_in", label: "Quick Zoom In (Perbesar Cepat)" },
  { value: "quick_zoom_out", label: "Quick Zoom Out (Perkecil Cepat)" },
  { value: "roll_clockwise", label: "Roll Clockwise (Berguling Searah Jarum Jam)" },
  { value: "roll_counter_clockwise", label: "Roll Counter-Clockwise (Berguling Berlawanan Jarum Jam)" },
  { value: "truck_left", label: "Truck Left (Geser Kiri Horizontal)" },
  { value: "truck_right", label: "Truck Right (Geser Kanan Horizontal)" },
  { value: "jib_shot", label: "Jib Shot (Bidikan Jib)" },
  { value: "sequence_shot", label: "Sequence Shot / Long Take (Bidikan Rangkaian / Pengambilan Panjang)" },
  { value: "crash_zoom", label: "Crash Zoom (Zoom Tabrak)" },
  { value: "push_in", label: "Push In (Dorong Masuk)" },
  { value: "pull_out", label: "Pull Out (Tarik Keluar)" },
  { value: "spin_clockwise", label: "Spin Clockwise (Berputar Searah Jarum Jam)"},
  { value: "spin_counter_clockwise", label: "Spin Counter-Clockwise (Berputar Berlawanan Jarum Jam)"},
  { value: "shake", label: "Shake (Goyang)" },
  { value: "vibration", label: "Vibration (Getaran)" },
  { value: "rotate_x_axis", label: "Rotate X-axis (Rotasi Sumbu X)"},
  { value: "rotate_y_axis", label: "Rotate Y-axis (Rotasi Sumbu Y)"},
  { value: "rotate_z_axis", label: "Rotate Z-axis (Rotasi Sumbu Z)"},
  { value: "3d_rotation", label: "3D Rotation (Rotasi 3D)" },
  { value: "random_movement", label: "Random Movement (Gerakan Acak)"},
];

export const PENCAHAYAAN_OPTIONS: SelectOption[] = [
  { value: "", label: "Pilih Jenis Pencahayaan" },
  { value: "Natural Light", label: "Cahaya Alami (Natural Light)" },
  { value: "Studio Lighting", label: "Pencahayaan Studio (Studio Lighting)" },
  { value: "Golden Hour", label: "Jam Emas (Golden Hour)" },
  { value: "Blue Hour", label: "Jam Biru (Blue Hour)" },
  { value: "Neon Lights", label: "Lampu Neon (Neon Lights)" },
  { value: "Volumetric Lighting", label: "Pencahayaan Volumetrik (Volumetric Lighting)" },
  { value: "Rim Lighting", label: "Pencahayaan Tepi (Rim Lighting)" },
  { value: "Backlighting", label: "Pencahayaan Belakang (Backlighting)" },
  { value: "Soft Light", label: "Cahaya Lembut (Soft Light)" },
  { value: "Hard Light", label: "Cahaya Keras (Hard Light)" },
  { value: "Ambient Light", label: "Cahaya Sekitar (Ambient Light)" },
  { value: "Moonlight", label: "Cahaya Bulan (Moonlight)" },
  { value: "Candlelight", label: "Cahaya Lilin (Candlelight)"},
  { value: "Spotlight", label: "Lampu Sorot (Spotlight)"}
];

export const WAKTU_OPTIONS: SelectOption[] = [
  { value: "", label: "Pilih Waktu" },
  { value: "Pagi", label: "Pagi (Morning)" },
  { value: "Siang", label: "Siang (Daytime)" },
  { value: "Sore", label: "Sore (Afternoon/Evening)" },
  { value: "Malam", label: "Malam (Night)" },
  { value: "Fajar", label: "Fajar (Dawn)" },
  { value: "Senja", label: "Senja (Dusk)" },
  { value: "Matahari Terbit", label: "Matahari Terbit (Sunrise)" },
  { value: "Matahari Terbenam", label: "Matahari Terbenam (Sunset)" },
];

export const SUASANA_VIDEO_OPTIONS: SelectOption[] = [
  { value: "", label: "Pilih Suasana Video" },
  { value: "Menegangkan", label: "Menegangkan (Tense/Suspenseful)" },
  { value: "Gembira", label: "Gembira (Joyful/Happy)" },
  { value: "Sedih", label: "Sedih (Sad/Melancholic)" },
  { value: "Misterius", label: "Misterius (Mysterious)" },
  { value: "Romantis", label: "Romantis (Romantic)" },
  { value: "Aksi", label: "Aksi (Action-packed)" },
  { value: "Tenang", label: "Tenang (Calm/Peaceful)" },
  { value: "Seram", label: "Seram (Scary/Horror)" },
  { value: "Lucu", label: "Lucu (Funny/Comical)" },
  { value: "Epik", label: "Epik (Epic)" },
  { value: "Nostalgia", label: "Nostalgia (Nostalgic)" },
  { value: "Ajaib", label: "Ajaib (Magical/Whimsical)" },
  { value: "Futuristik", label: "Futuristik (Futuristic)" },
  { value: "Historis", label: "Historis (Historical)" },
];

// --- Existing constants to be removed or ensure they are not used if replaced ---
// export const VISUAL_STYLES (replaced by GAYA_VIDEO_OPTIONS with Indonesian labels)
// export const CAMERA_SHOTS (integrated into GERAKAN_KAMERA_OPTIONS)
// export const CAMERA_ANGLES (integrated into GERAKAN_KAMERA_OPTIONS)
// export const CAMERA_MOVEMENTS (replaced by GERAKAN_KAMERA_OPTIONS)
// export const LIGHTING_TYPES (replaced by PENCAHAYAAN_OPTIONS with Indonesian labels)
// export const COLOR_PALETTES (This was not explicitly requested to be changed but might need to be added or localized if used)
// For now, Color Palettes will be removed from the form as it's not in the new 12-point list.
// If it needs to be re-added, it should be localized.
// --- End of constants to be reviewed ---


export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
  </svg>
);

export const ClipboardIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.324.214M12 21c-1.657 0-3-1.343-3-3V6.75A2.25 2.25 0 0111.25 4.5h1.5A2.25 2.25 0 0115 6.75v11.25c0 1.657-1.343 3-3 3z" />
  </svg>
);

export const ArrowPathIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const LanguageIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.11M6.75 21H3M3 16.5h3.75m0 0L7.5 12l-1.28 2.25M15 5.621a48.473 48.473 0 00-6-.371m0 0c-1.12 0-2.233.038-3.334.11M17.25 21h3.75M21 16.5h-3.75m0 0L16.5 12l1.28 2.25" />
  </svg>
);


export const VEO_MODEL_NAME = 'gemini-2.5-flash-preview-04-17'; // Using recommended model
