import { createEditCabin as createEditCabinApi } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateCabin(onSuccessFn) {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
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

  return { createCabin, isCreating };
}

export { useCreateCabin };
