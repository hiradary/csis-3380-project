import { AppStoreContext } from "@/providers/useAppStore";
import { useContext } from "react";

const useAppStore = () => {
  const appStore = useContext(AppStoreContext);
  return appStore;
};

export default useAppStore;
