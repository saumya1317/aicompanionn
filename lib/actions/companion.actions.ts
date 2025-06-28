'use server';
import { createSupabaseClient } from "../supabase";
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("user")
    .insert({ ...formData, author })
    .select()
    .single();

  if (error || !data) {
    console.error("Supabase insert error:", error);
    throw new Error(error?.message || "failed to create companion");
  }

  return data;
};

export const getCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions = {}) => {
  const supabase = createSupabaseClient();
  let query = supabase.from("user").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error) throw new Error(error.message || "failed to fetch companions");

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message || "failed to fetch companion");
  return data;
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .insert({
      companion_id: companionId,
      user_id: userId,
    });

  if (error) throw new Error(error.message);
  return data;
};

export const usersession = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("author", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []) as any[];
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map(({ companions }) => companions) as any[];
};

export const getSessionHistory = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`user:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data || []).map(({ user }) => user);
};

export const getBookmarkedCompanions = async (
  userId: string,
  limit = 10
) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`user:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data || []).map(({ user }) => user);
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();
  let limit = 0;

  if (has({ plan: "premium" })) {
    return true;
  } else if (has({ feature: "2_active_companions" })) {
    limit = 2;
  } else if (has({ feature: "20_active_companions" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("user")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companioncount = data?.length;
  if (companioncount >= limit) {
    return false;
  }
  return true;
};
