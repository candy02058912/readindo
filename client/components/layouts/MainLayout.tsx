import { Box } from "@chakra-ui/react";
import Header from "@elements/Header/Header";

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <Box>
      <Header isMain={true} />
      {children}
    </Box>
  );
}
