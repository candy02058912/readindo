import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  LinkBox,
  Heading,
} from "@chakra-ui/react";
import { useSidebar } from "client/hooks/useSidebar";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarContent = ({ onClick }: { onClick: () => void }) => {
  const router = useRouter();
  return (
    <VStack spacing={4} align="stretch">
      <LinkBox>
        <Link href="/app" passHref>
          <Button
            colorScheme={router.pathname === "/app" ? "pink" : "gray"}
            onClick={onClick}
            w="100%"
          >
            Text
          </Button>
        </Link>
      </LinkBox>
      <LinkBox>
        <Link href="/app/video" passHref>
          <Button
            colorScheme={router.pathname === "/app/video" ? "pink" : "gray"}
            onClick={onClick}
            w="100%"
          >
            Video
          </Button>
        </Link>
      </LinkBox>
      <LinkBox>
        <Link href="/app/word-list" passHref>
          <Button
            colorScheme={router.pathname === "/app/word-list" ? "pink" : "gray"}
            onClick={onClick}
            w="100%"
          >
            Word List
          </Button>
        </Link>
      </LinkBox>
    </VStack>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, variants, toggleSidebar } = useSidebar();

  return variants?.navigation === "sidebar" ? (
    <Box zIndex={1} position="fixed" pl={{ md: 20 }} w="300px">
      <SidebarContent onClick={toggleSidebar} />
    </Box>
  ) : (
    <Drawer isOpen={isSidebarOpen} placement="left" onClose={toggleSidebar}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
              ReadIndo
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={toggleSidebar} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
