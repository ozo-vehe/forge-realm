import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://ccuovaybodwbcmjahuzt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdW92YXlib2R3YmNtamFodXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTI3MTIsImV4cCI6MjA3NjgyODcxMn0.f0kIeqi4u9nsuT9YVqO--C-Qy7XnLqXTlNaxBpKpC78'

export const supabase = createClient(supabaseUrl, supabaseKey)