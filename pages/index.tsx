import { useUser } from "@auth0/nextjs-auth0";
import { LockIcon, RepeatClockIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import RippleBackground from "@elements/RippleBackground/RippleBackground";
import { MainLayout } from "@layouts/MainLayout";
import { Page } from "@layouts/Page";
import { META } from "@lib/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Stack = ({ src }: { src: string }) => {
  return (
    <WrapItem>
      <Center w="150px" h="50px">
        <Image src={src} alt="" />
      </Center>
    </WrapItem>
  );
};

type Props = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const Feature = ({ title, description, icon }: Props) => {
  return (
    <Box w="sm" pt={6}>
      <Container>
        {icon}
        <Heading pt={2} size="md">
          {title}
        </Heading>
        <Text pt={1}>{description}</Text>
      </Container>
    </Box>
  );
};

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { user, error, isLoading } = useUser();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Oops...{error.message}</h1>;
  if (user) {
    router.push("/app");
  }
  return (
    <Page meta={META}>
      <MainLayout>
        <RippleBackground />
        <Center height="100vh">
          <VStack justify="center" textAlign="center" spacing="6">
            <Container maxWidth="container.lg">
              <Heading
                size="4xl"
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
              >
                ReadIndo
              </Heading>
            </Container>
            <Container maxWidth="container.md">
              <Heading size="lg">Learn Indonesian!</Heading>
            </Container>
          </VStack>
        </Center>
        <Box py={20}>
          <Center>
            <Heading size="2xl">Features</Heading>
          </Center>
          <Flex
            pt={20}
            px={8}
            justifyContent={{ md: "space-around" }}
            alignItems={{ base: "center" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Feature
              icon={<RepeatClockIcon w={8} h={8} />}
              title="Export to Anki"
              description="Export word list to csv and import to Anki to get better results!"
            />
            <Feature
              icon={<ViewIcon w={8} h={8} />}
              title="Minimal"
              description="Just read and learn with the minimal interface so you won't get distracted!"
            />
            <Feature
              icon={<LockIcon w={8} h={8} />}
              title="Privacy"
              description="Unlike Chrome extensions, we don't have access when you're browsing other websites!"
            />
          </Flex>
        </Box>
        <Box py={20} background="pink">
          <Center>
            <Heading color="black" size="2xl">
              Built With
            </Heading>
          </Center>
          <Container maxW="container.md">
            <Wrap mt={20} spacing={["30px", "60px"]} justify="center">
              <Stack src="https://res.cloudinary.com/candy-tsai/image/upload/v1624780492/icons/414px-Nextjs-logo.svg.png" />
              <Stack src="https://res.cloudinary.com/candy-tsai/image/upload/v1624782122/icons/vercel-inc-logo-vector.svg" />
              <Stack src="https://res.cloudinary.com/candy-tsai/image/upload/v1624780212/icons/logo-colored.svg" />
              <Stack src="https://res.cloudinary.com/candy-tsai/image/upload/v1624781071/icons/logo-dark.png" />
              <Stack src="https://res.cloudinary.com/candy-tsai/image/upload/v1627741703/icons/mongo-logo.png" />
            </Wrap>
          </Container>
        </Box>
        <Center py={10}>
          <Text>
            Made with lots of ♥️ from&nbsp;
            <Link href="https://candys.page">candys.page</Link>.
          </Text>
        </Center>
      </MainLayout>
    </Page>
  );
};
export default Index;
