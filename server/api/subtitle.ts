import YoutubeTranscript from "youtube-transcript";

export const getYTSubtitles = (urlOrVideoID: string) =>
  YoutubeTranscript.fetchTranscript(urlOrVideoID);
