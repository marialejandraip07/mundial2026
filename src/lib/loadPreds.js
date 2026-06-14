import convertPreds from "./convertPred";
import { supabase } from "./supabase";

async function loadUserPreds(usuarioId) {
  const { data, error } = await supabase
    .from("predicciones")
    .select("*")
    .eq("usuario_id", usuarioId);

  if (error) {
    console.error(error);
    return {};
  }

  return convertPreds(data || []);
}

export default loadUserPreds;