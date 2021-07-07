import { useBreakpointValue } from "@chakra-ui/react";
import { createGlobalState } from "react-hooks-global-state";

const { useGlobalState } = createGlobalState({ isSidebarOpen: false });

export function useGlobal(key: any) {
  return useGlobalState(key);
}
