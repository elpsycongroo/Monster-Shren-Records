export interface Song {
  id: string;
  title: string;
  duration: string;
  artist: string;
  audioUrl: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  category: 'OST' | 'SINGLE' | 'EP' | 'ALBUM';
  songs: Song[];
  description: string;
}

export type ViewState = 'HOME' | 'ALBUMS' | 'ABOUT';