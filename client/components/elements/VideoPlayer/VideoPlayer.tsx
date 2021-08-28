import { Box, Flex, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import Word from "@elements/Word/Word";
import { YouTubeTranscript } from "@lib/types";
import axios from "axios";
import { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { isVisible } from "@lib/utils";

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

  const setScrollToRef = (isPlaying: boolean) => (elem: HTMLDivElement) => {
    if (isPlaying) {
      scrollToRef.current = elem;
    }
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
        <Flex
          ref={setScrollToRef(isPlaying)}
          id={`t${i}`}
          key={`t${i}`}
          alignItems="center"
          mt={4}
        >
          <Icon
            width={6}
            height={6}
            as={MdPlayCircleFilled}
            onClick={handleSeek(start)}
            mr={2}
            aria-label="Play this line"
            cursor="pointer"
          />
          <Box backgroundColor={`${isPlaying ? "gray.200" : ""}`}>
            {text.split(/\s+/).map((word, ix) => (
              <Word key={`${ix}-${word}`} text={word} />
            ))}
          </Box>
        </Flex>
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
      maxHeight="360px"
      width={{ base: "100%", md: "500px" }}
      overflow="auto"
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
    <Stack direction={{ base: "column", md: "row" }}>
      <Box mr={4}>
        <ReactPlayer
          ref={playerRef}
          url={videoURL}
          controls
          playing
          onProgress={handleProgress}
          progressInterval={200}
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
