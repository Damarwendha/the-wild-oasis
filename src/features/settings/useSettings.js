import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

function useSettings() {
  const {
    data: settings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading, isError };
}

export { useSettings };
