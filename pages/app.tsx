import {
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  Link,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { AppLayout } from "@layouts/AppLayout";
import { Page } from "@layouts/Page";
import Word from "@elements/Word/Word";
import { useRef, useState } from "react";
import { ExternalLinkIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { META } from "@lib/constants";
import NewsCarousel from "@elements/NewsCarousel/NewsCarousel";

export default function App() {
  const textAreaRef = useRef<any>(null);
  const [data, setData] = useState("");
  const [step, setStep] = useState(0);
  const handleClick = () => {
    setData(textAreaRef.current.value);
    setStep(1);
  };

  const handleCarouselClick = (summary: string) => () => {
    window.scroll(0, document.body.scrollHeight);
    setData(summary);
    setStep(1);
  };

  return (
    <Page meta={META}>
      <AppLayout>
        <Heading>Dashboard</Heading>
        <VStack mt={4} spacing={4} alignItems="start">
          <Heading size="md">
            Read an article summary by choosing an article below!
          </Heading>
          <NewsCarousel onClick={handleCarouselClick} />
          <Heading size="md">Or copy and paste an article below!</Heading>
          <HStack>
            <Link href="https://www.kompas.com" isExternal>
              Kompas <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href="https://www.bolasport.com/" isExternal>
              BolaSport <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href="https://www.cnnindonesia.com/" isExternal>
              CNN Indonesia <ExternalLinkIcon mx="2px" />
            </Link>
          </HStack>
          <Heading size="md">Paste text here!</Heading>
          <Textarea p={4} ref={textAreaRef} />
          <Button onClick={handleClick}>Load</Button>
        </VStack>
        <Collapse in={step > 0} animateOpacity>
          <VStack align="start" mb={4}>
            <Heading size="md" mt={4}>
              Select the words you want to look up and click on{" "}
              <PlusSquareIcon /> to save to Word List!
            </Heading>
            <Box p={4} mt={4} border="1px solid" rounded="md" width="full">
              {data.split(/\s+/).map((text, ix) => (
                <Word key={`${ix}-${text}`} text={text} />
              ))}
            </Box>
          </VStack>
        </Collapse>
      </AppLayout>
    </Page>
  );
}
