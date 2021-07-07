import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import "../styles/styles.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { defaultTheme } from "../client/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Index from "pages";

const publicPages = ["/", "/api/auth/[[...index]]"];

function _App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <UserProvider>
      <ChakraProvider theme={defaultTheme}>
        {router.pathname === "/" ? (
          <Index {...pageProps} />
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </UserProvider>
  );
}

export default _App;
