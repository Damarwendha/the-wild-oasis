import { createEditCabin as createEditCabinApi } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditCabin(onSuccessFn) {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: (data) => createEditCabinApi(data),
    mutationKey: "cabins",

    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries("cabins");

      onSuccessFn?.();
    },

    onError: () => {
      toast.error((error) => error.message);
    },
  });

  return { editCabin, isEditing };
}

export { useEditCabin };
