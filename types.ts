export interface PromptFormState {
  subjek: string;
  aksi: string;
  ekspresi: string;
  tempat: string;
  waktu: string;
  gerakanKamera: string;
  pencahayaan: string;
  gayaVideo: string;
  suasanaVideo: string;
  suaraMusik: string;
  kalimatDiucapkan: string;
  detailTambahan: string;
}

export type PromptFormKeys = keyof PromptFormState;

export interface SelectOption {
  value: string;
  label: string;
}

// Existing type, retained for compatibility if needed elsewhere, but new options will be more specific.
export interface OldSelectOption {
  value: string;
  label: string;
}
