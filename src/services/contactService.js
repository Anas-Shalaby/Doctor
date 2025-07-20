import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function submitContactRequest({
  firstName,
  lastName,
  email,
  phone,
  topic,
  message,
}) {
  const { error } = await supabase.from("contact_requests").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      topic,
      message,
    },
  ]);
  return !error;
}
