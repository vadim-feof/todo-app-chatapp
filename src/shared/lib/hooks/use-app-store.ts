import { useStore } from "react-redux";
import { AppStore } from "@app/store";

export const useAppStore = useStore.withTypes<AppStore>()
