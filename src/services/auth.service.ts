
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "@/types/auth.types";

export const fetchUserRole = async (userId: string): Promise<UserRole> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
    
    return data?.role as UserRole || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUpWithEmailAndPassword = async (
  email: string, 
  password: string, 
  userData: {
    first_name: string;
    last_name: string;
    phone: string;
    role: UserRole;
  }
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
};

export const signOutUser = async () => {
  return await supabase.auth.signOut();
};
