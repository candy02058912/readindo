import { useBreakpointValue } from "@chakra-ui/react";
import { useGlobal } from "./useGlobal";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export function useSidebar() {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [isSidebarOpen, setSidebarOpen] = useGlobal("isSidebarOpen");
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return { isSidebarOpen, toggleSidebar, variants };
}
