
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export type UserRole = "patient" | "nurse" | "admin" | null;

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id);
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
          setProfile(null);
        }
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }
      
      setUserRole(data?.role as UserRole || null);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Login Gagal",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Login Berhasil",
        description: "Anda berhasil masuk ke IMO MANTAP",
      });
      
      // Redirect will be handled by the auth state change
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: "Terjadi kesalahan saat proses login",
        variant: "destructive",
      });
    }
  };
  
  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    phone: string,
    role: UserRole
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            role: role,
          },
        },
      });
      
      if (error) {
        toast({
          title: "Pendaftaran Gagal",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Pendaftaran Berhasil",
        description: "Akun Anda berhasil dibuat. Silahkan cek email untuk verifikasi.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Terjadi kesalahan saat proses pendaftaran",
        variant: "destructive",
      });
    }
  };
  
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout Berhasil",
        description: "Anda berhasil keluar dari IMO MANTAP",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Logout Gagal",
        description: "Terjadi kesalahan saat proses logout",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AuthContext.Provider value={{
      session,
      user,
      userRole,
      profile,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
