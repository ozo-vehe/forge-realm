import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://ccuovaybodwbcmjahuzt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdW92YXlib2R3YmNtamFodXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTI3MTIsImV4cCI6MjA3NjgyODcxMn0.f0kIeqi4u9nsuT9YVqO--C-Qy7XnLqXTlNaxBpKpC78'


interface Metadata {
  animation_url: string;
  attributes: Array<Record<string, any>>;
  background_color: string;
  description: string;
  external_url: string;
  image: string;
  name: string;
  tokenId: string
  uri: string;
  youtube_url: string;
};

interface CreatedCharacter {
  id: string;
  created_at: string;
  avatar: Metadata;
  armor: Metadata;
  shield: Metadata;
  weapon: Metadata | null;
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export const saveUserAvatar = async (address: string, uri: string[]) => {
  console.log(uri)
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
    if (error) throw error

    if (data && data.length < 1) {
      const { data: av, error: er } = await supabase
        .from("users")
        .insert([{ address, avatar_metadatas: uri }])
        .select()

      console.log(av)
      console.log(er)
    }
  } catch (error) {
    console.log(error)
  }
}

export const saveUserCharacter = async (address: `0x${string}`, characterId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("address", address)

  if (error) throw error;
  // If no user exist
  if (data && data.length < 1) {
    const { } = await supabase
      .from("users")
      .insert([{
        address,
        characters: [characterId]
      }])
      .select();
  }
  // If user exist
  else {
    // User exists, update the user's characters array to include the new characterId, avoiding duplicates
    const existingCharacters: string[] = Array.isArray(data[0]?.characters) ? data[0].characters : [];
    // Add characterId if not already present
    let updatedCharacters: string[];
    if (!existingCharacters.includes(characterId)) {
      updatedCharacters = [...existingCharacters, characterId];
      await supabase
        .from("users")
        .update({ characters: updatedCharacters })
        .eq("address", address)
        .select();
    }
  }
}

const getCharacter = async (characterId: string) => {
  try {
    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("id", characterId)
      .single();

    if (error) {
      // Could be not found or actual error
      if (error.code === "PGRST116" /* row not found */) {
        return null;
      } else {
        throw error;
      }
    }

    return data;
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getCreatedCharacter = async (address: string) => {
  // This function fetches the character from the "characters" table by given characterId and address.
  // Returns a single character or null if not found.
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
      .single();

    if (error) {
      // Could be not found or actual error
      if (error.code === "PGRST116" /* row not found */) {
        return null;
      } else {
        throw error;
      }
    }
    if (data) {
      const characters: CreatedCharacter[] = await Promise.all(
        data.characters.map(async (id: string) => (await getCharacter(id)))
      )
      return characters
    }
  } catch (err) {
    console.log('Error fetching created character:', err);
    return null;
  }
}

