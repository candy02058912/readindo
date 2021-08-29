import React, { useState } from "react";
import { Text, Box, Flex, Image, HStack, Stack } from "@chakra-ui/react";
import { Slide } from "@lib/types";

const Carousel = ({
  slides,
  onClickSlide,
}: {
  slides: Slide[];
  onClickSlide: (summary: string) => () => {};
}) => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide: number) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex w="full" pos="relative" overflow="hidden">
      <Flex h={{ base: "200px", md: "400px" }} w="full" {...carouselStyle}>
        {slides.map((slide: Slide, sid: number) => (
          <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
            <Box
              boxSize="full"
              backgroundSize="cover"
              alt=""
              backgroundColor="pink.500"
              transition="all .5s"
              backgroundImage={`url(${slide.media})`}
              onClick={onClickSlide ? onClickSlide(slide.summary!) : undefined}
              cursor="pointer"
            >
              <Stack
                p="8px 12px"
                pos="absolute"
                bottom={{ base: "12px", md: "24px" }}
                textAlign="center"
                w="full"
                mb="8"
                color="white"
                backgroundColor="blackAlpha.800"
              >
                <Text fontSize={{ base: "lg", md: "2xl" }}>{slide.title}</Text>
              </Stack>
            </Box>
          </Box>
        ))}
      </Flex>
      {/* @ts-ignore */}
      <Text {...arrowStyles} left="0" onClick={prevSlide}>
        &#10094;
      </Text>
      {/* @ts-ignore */}
      <Text {...arrowStyles} right="0" onClick={nextSlide}>
        &#10095;
      </Text>
      <HStack justify="center" pos="absolute" bottom="8px" w="full">
        {Array.from({ length: slidesCount }).map((_, slide) => (
          <Box
            key={`dots-${slide}`}
            cursor="pointer"
            boxSize={["7px", "7px", "15px"]}
            m="0 2px"
            bg={currentSlide === slide ? "whiteAlpha.800" : "whiteAlpha.500"}
            rounded="50%"
            display="inline-block"
            transition="background-color 0.6s ease"
            _hover={{ bg: "whiteAlpha.800" }}
            onClick={() => setSlide(slide)}
          ></Box>
        ))}
      </HStack>
    </Flex>
  );
};
export default Carousel;
