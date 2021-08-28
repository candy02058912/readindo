export interface Word {
  text: string;
  translation: string;
  _id: string;
}

export interface YouTubeTranscript {
  text: string;
  offset: number;
  duration: number;
}
