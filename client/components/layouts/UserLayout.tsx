import { Box } from "@chakra-ui/react";
import Header from "@elements/Header/Header";

type Props = {
  children: React.ReactNode;
};

export function UserLayout({ children }: Props) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}
