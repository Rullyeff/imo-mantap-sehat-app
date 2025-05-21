
import { Session, User } from "@supabase/supabase-js";

export type UserRole = "patient" | "nurse" | "admin" | null;

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}
