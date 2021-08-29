import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";
import { YouTubeTranscript } from "@lib/types";
import { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import React from "react";
import { isVisible } from "@lib/utils";
import TranscriptElement from "@elements/Transcript/TranscriptElement";

type TranscriptProps = {
  playerRef: MutableRefObject<any>;
  playedSeconds: number;
  scrollToRef: MutableRefObject<any>;
  videoURL: string;
};

const Transcript = (
  { playerRef, playedSeconds, scrollToRef, videoURL }: TranscriptProps,
  ref: any
) => {
  const [transcript, setTranscript] = useState<YouTubeTranscript[]>([]);
  const handleSeek = (start: number) => () => {
    playerRef.current.seekTo(start);
  };

  const renderTranscript = () => {
    const output = [];
    for (let i = 0; i < transcript.length; i++) {
      let start = transcript[i].offset / 1000;
      let text = transcript[i].text;
      let isPlaying = false;
      if (i === transcript.length - 1 && playedSeconds >= start) {
        isPlaying = true;
      }
      if (
        i < transcript.length - 1 &&
        playedSeconds >= start &&
        playedSeconds < transcript[i + 1].offset / 1000
      ) {
        isPlaying = true;
      }
      output.push(
        <TranscriptElement
          key={`t${i}`}
          isPlaying={isPlaying}
          scrollToRef={scrollToRef}
          handleSeek={handleSeek}
          start={start}
          text={text}
        />
      );
    }

    return output;
  };

  useEffect(() => {
    async function fetchSubtitle() {
      try {
        const { data } = await axios.get(`/api/subtitle`, {
          params: { w: videoURL },
        });
        setTranscript(data);
      } catch (err) {
        const { data } = err.response;
        alert(data.description);
      }
    }
    if (videoURL) {
      setTranscript([]);
      fetchSubtitle();
    }
  }, [videoURL]);

  return (
    <Box
      ref={ref}
      overflow="auto"
      maxHeight="360px"
      height={{ base: "200px", lg: "100%" }}
      px={4}
      border="pink solid"
    >
      {renderTranscript()}
    </Box>
  );
};

const TranscriptForwardRef = React.forwardRef(Transcript);

const VideoPlayer = ({ videoURL }: { videoURL: string }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playerRef = useRef(null);
  const scrollToRef = useRef<HTMLElement | null>(null);
  const transcriptRef = useRef<HTMLElement | null>(null);
  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setPlayedSeconds(playedSeconds);
    if (scrollToRef.current != null && transcriptRef.current != null) {
      if (!isVisible(scrollToRef.current, transcriptRef.current)) {
        scrollToRef.current.scrollIntoView();
      }
    }
  };
  return (
    <Stack direction={{ base: "column", lg: "row" }} width="100%">
      <Box
        mr={4}
        height={{ base: "300px", lg: "360px" }}
        width="100%"
        maxWidth="640px"
      >
        <ReactPlayer
          ref={playerRef}
          url={videoURL}
          controls
          playing
          onProgress={handleProgress}
          progressInterval={200}
          height="100%"
          width="100%"
        />
      </Box>
      <TranscriptForwardRef
        ref={transcriptRef}
        playerRef={playerRef}
        playedSeconds={playedSeconds}
        scrollToRef={scrollToRef}
        videoURL={videoURL}
      />
    </Stack>
  );
};

export default VideoPlayer;
