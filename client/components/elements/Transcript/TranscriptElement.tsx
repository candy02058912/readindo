import React from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { MdPlayCircleFilled } from "react-icons/md";
import Word from "@elements/Word/Word";

const TranscriptElement = ({
  isPlaying,
  scrollToRef,
  handleSeek,
  start,
  text,
  key,
}: any) => {
  const setScrollToRef = (isPlaying: boolean) => (elem: HTMLDivElement) => {
    if (isPlaying) {
      scrollToRef.current = elem;
    }
  };
  return (
    <Flex ref={setScrollToRef(isPlaying)} id={key} alignItems="center" mt={4}>
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
        {text.split(/\s+/).map((word: string, ix: number) => (
          <Word key={`${ix}-${word}`} text={word} />
        ))}
      </Box>
    </Flex>
  );
};

export default React.memo(TranscriptElement);
