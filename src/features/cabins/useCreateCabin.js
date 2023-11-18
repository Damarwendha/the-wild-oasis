import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin as createEditCabinApi } from "@/services/apiCabins";
import { removeKey } from "@/utils/helpers";

function useCreateCabin(onSuccessFn) {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createEditCabinApi(data),
    mutationKey: "cabins",

    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries("cabins");

      onSuccessFn?.();
    },

    onError: () => {
      toast.error((error) => error.message);
    },
  });

  function createCabin(data) {
    const newData = removeKey(data, "id");
    mutate(newData);
  }

  return { createCabin, isCreating };
}

export { useCreateCabin };
