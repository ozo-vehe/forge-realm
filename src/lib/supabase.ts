import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://ccuovaybodwbcmjahuzt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdW92YXlib2R3YmNtamFodXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTI3MTIsImV4cCI6MjA3NjgyODcxMn0.f0kIeqi4u9nsuT9YVqO--C-Qy7XnLqXTlNaxBpKpC78'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const saveUserAvatar = async (address: string, uri: string[]) => {
  console.log(uri)
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
    if (error) throw error
    
    if(data && data.length < 1) {
      const {data: av, error: er} = await supabase
        .from("users")
        .insert([{address, avatar_metadatas: uri}])
        .select()

      console.log(av)
      console.log(er)
    }
  } catch (error) {
    console.log(error)
  }
}