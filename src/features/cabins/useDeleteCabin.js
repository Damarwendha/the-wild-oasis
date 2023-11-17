import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "@/services/apiCabins";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),

    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries("cabins");
    },

    onError: (error) => toast.error(error.message),
  });

  return { deleteCabin, isDeleting };
}

export { useDeleteCabin };
