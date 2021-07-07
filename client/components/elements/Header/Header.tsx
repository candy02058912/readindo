import Link from "next/link";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { ChevronRightIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, HStack, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Box, Heading } from "@chakra-ui/react";
import { useSidebar } from "client/hooks/useSidebar";
import { useUser } from "@auth0/nextjs-auth0";

const Header = ({ isMain = false }) => {
  const { user } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const { toggleSidebar, variants } = useSidebar();
  const getBackgroundColor = () => {
    if (isMain) {
      return "transparent";
    }
    return colorMode === "light" ? "white" : "gray.800";
  };
  return (
    <Box
      px={{ base: 4, md: 20 }}
      position="fixed"
      width="100%"
      zIndex="1"
      background={getBackgroundColor()}
    >
      <Flex alignItems="center" justifyContent="space-between" my={4}>
        {variants?.navigationButton && (
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="gray"
            variant="outline"
            onClick={toggleSidebar}
            aria-label=""
          />
        )}
        <LinkBox>
          <Link href={isMain ? "/" : "/app"} passHref>
            <Heading bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text">
              <LinkOverlay href="#">ReadIndo</LinkOverlay>
            </Heading>
          </Link>
        </LinkBox>
        <HStack>
          <IconButton
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
          />
          {user ? (
            <LinkBox>
              <LinkOverlay href="/api/auth/logout">
                <Button>Logout</Button>
              </LinkOverlay>
            </LinkBox>
          ) : (
            <LinkBox>
              <LinkOverlay href="/api/auth/login">
                <Button>Login</Button>
              </LinkOverlay>
            </LinkBox>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
