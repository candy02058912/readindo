import { Button, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import VideoPlayer from "@elements/VideoPlayer/VideoPlayer";
import { AppLayout } from "@layouts/AppLayout";
import { Page } from "@layouts/Page";
import { META } from "@lib/constants";
import { ChangeEvent, useState } from "react";

export default function WordList() {
  const [videoURL, setVideoURL] = useState("");
  const [videoQuery, setVideoQuery] = useState(
    "https://www.youtube.com/watch?v=xJUo0zIy4Es"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setVideoQuery(e.target.value);
  const handleLoadVideo = () => setVideoURL(videoQuery);
  return (
    <Page meta={META}>
      <AppLayout>
        <VStack align="start">
          <Heading>Watch Video</Heading>
          <HStack width={{ base: "100%", md: "50%", lg: "30%" }}>
            <Input value={videoQuery} onChange={handleChange} />
            <Button onClick={handleLoadVideo}>Load</Button>
          </HStack>
          <Heading size="md">
            Interactive transcripts will autoscroll, please pause the video to
            stop the autoscroll.
          </Heading>
          {videoURL ? (
            <VideoPlayer videoURL={videoURL} />
          ) : (
            <Text>Instructions: Please load a YouTube video first</Text>
          )}
        </VStack>
      </AppLayout>
    </Page>
  );
}
