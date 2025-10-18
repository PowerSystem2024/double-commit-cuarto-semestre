/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PartialUserProps } from "../definitions";

interface AuthContextType {
  auth: PartialUserProps | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PartialUserProps | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile', { credentials: 'include' });
        if (res.status === 404) throw new Error('Sin sesión');
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null)
      }
    };
    checkSession();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      throw err;
    }
  };

  const signout = async () => {
    try {
      await fetch("http://localhost:5000/api/signout", {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const deleteUser = async (id :number) => {
    await fetch("http://localhost:5000/user/delete/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
      setUser(data)
    })
    .catch(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ auth: user, signin, signout, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
