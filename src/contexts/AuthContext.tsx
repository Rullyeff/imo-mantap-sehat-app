
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthContextType, UserProfile, UserRole } from "@/types/auth.types";
import { 
  fetchUserRole, 
  fetchUserProfile, 
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signOutUser
} from "@/services/auth.service";

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
            fetchUserRole(session.user.id).then(setUserRole);
            fetchUserProfile(session.user.id).then(setProfile);
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
        fetchUserRole(session.user.id).then(setUserRole);
        fetchUserProfile(session.user.id).then(setProfile);
      }
      
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await signInWithEmailAndPassword(email, password);
      
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
      const userData = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        role: role,
      };
      
      const { data, error } = await signUpWithEmailAndPassword(email, password, userData);
      
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
      await signOutUser();
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

// Re-export the UserRole type for convenience
export type { UserRole } from "@/types/auth.types";
