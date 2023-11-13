import supabase from "@/services/supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to load cabins data");
  }

  return data;
}
