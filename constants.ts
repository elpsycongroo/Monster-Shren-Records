import { Album } from './types';

// Using standard reliable test audio files (MP3) for better compatibility
const SAMPLE_AUDIO_1 = "https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/scwz2.0.mp3"; 
const SAMPLE_AUDIO_2 = "https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/sx.mp3";
const SAMPLE_AUDIO_3 = "https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/tqzg.mp3";

export const ALBUMS: Album[] = [
  {
    id: 'a1',
    title: '酥脆王座',
    artist: '璀璨的毛毛',
    coverUrl: 'https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/20251217200254546.png',
    releaseDate: '2025.12.14',
    category: 'EP',
    description: 'Burning Brighter Than Anyone Alive',
    songs: [
      { id: 's1', title: '酥脆王座', duration: '3:45', artist: '璀璨的毛毛', audioUrl: SAMPLE_AUDIO_1 }
    ]
  },
  {
    id: 'a2',
    title: '酥绪',
    artist: '毛々ちゃん',
    coverUrl: 'https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/20251217200410862.png',
    releaseDate: '2025.12.14',
    category: 'SINGLE',
    description: '轻哼熟悉的小调，伸手连接未来的大鸡腿',
    songs: [
      { id: 's3', title: '酥绪', duration: '2:58', artist: '毛々ちゃん', audioUrl: SAMPLE_AUDIO_2 }
    ]
  },
  {
    id: 'a3',
    title: '天气之歌',
    artist: '雲',
    coverUrl: 'https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/20251217200513494.png',
    releaseDate: '2025.12.14',
    category: 'EP',
    description: '今天是周一，冷了一周今天出太阳了呀，我也跟着太阳出现在聊天框里一下，看某人会不会记起我',
    songs: [
      { id: 's6', title: '天气之歌', duration: '3:20', artist: '雲', audioUrl: SAMPLE_AUDIO_3 }
    ]
  }
];

export const NAV_LINKS = [
  { id: 'HOME', label: '首页' },
  { id: 'ALBUMS', label: '音乐' },
  { id: 'ABOUT', label: '关于' },
];