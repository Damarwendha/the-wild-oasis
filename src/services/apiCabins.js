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

async function addCabin(newCabin) {
  const imageName = `${randomId()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath =
    SUPABASE_URL + "/storage/v1/object/public/cabin-images/" + imageName;

  // create cabin to database
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Failed to create cabin");
  }

  // upload cabin to storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // delete cabin if there's an error when uploading image to storage
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error("Failed when uploading cabin image to storage");
  }

  return data;
}

async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete cabin");
  }
}

export { getCabins, deleteCabin, addCabin };
