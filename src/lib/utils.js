import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient"; // adjust path if needed

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function updateUserPlan(userId, plan) {
  const { error } = await supabase
    .from('profiles')
    .update({ plan })
    .eq('id', userId);

  if (error) {
    console.error('Failed to update user plan:', error.message);
    throw error;
  }
}
