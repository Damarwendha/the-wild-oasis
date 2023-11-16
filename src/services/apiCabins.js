import supabase, { SUPABASE_URL } from "@/services/supabase";
import { randomId } from "@/utils/helpers";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to load cabins data");
  }

  return data;
}

async function createEditCabin({ id, image, ...otherValues }) {
  // action gonna be create / edit
  const action = !id ? "create" : "edit";
  const imageName = `${randomId()}-${image.name}`.replaceAll("/", "");
  const imagePath =
    SUPABASE_URL + "/storage/v1/object/public/cabin-images/" + imageName;

  let newData;
  // A) create cabin
  if (action === "create") {
    const { data, error } = await supabase
      .from("cabins")
      .insert([
        {
          ...otherValues,
          image: imagePath,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Failed to create cabin");
    }

    newData = data;
  }

  // B) edit cabin
  if (action === "edit") {
    const { data, error } = await supabase
      .from("cabins")
      .update({
        ...otherValues,
        image: typeof image !== "string" ? imagePath : image,
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error(error);
      throw new Error("Failed to edit cabin");
    }

    newData = data;
  }

  // upload cabin image to storage
  if (typeof image === "object") {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, image);

    if (storageError) {
      // delete cabin if there's an error when uploading image to storage
      await supabase.from("cabins").delete().eq("id", newData.id);

      console.error(storageError);
      throw new Error("Failed when uploading cabin image to storage");
    }
  }
  return newData;
}

async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete cabin");
  }
}

export { getCabins, deleteCabin, createEditCabin };
