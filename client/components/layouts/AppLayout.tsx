import { Box } from "@chakra-ui/react";
import Header from "@elements/Header/Header";
import Sidebar from "@elements/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <Box>
      <Header />
      <Box pt={{ base: 16, sm: 24 }}>
        <Sidebar />
        <Box
          position={{ md: "relative" }}
          left={{ md: "300px" }}
          w={{ md: "calc(100% - 300px)" }}
          px={{ base: 4, md: 12 }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
