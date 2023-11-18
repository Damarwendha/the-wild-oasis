import { updateSetting as updateSettingApi } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateSetting(onSuccessFn) {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateSettingApi(data),
    mutationKey: "settings",

    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries("settings");

      onSuccessFn?.();
    },

    onError: () => {
      toast.error((error) => error.message);
    },
  });

  return { updateSetting, isUpdating };
}

export { useUpdateSetting };
