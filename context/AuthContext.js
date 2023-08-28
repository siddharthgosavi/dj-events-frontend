import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, SetError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn, []);

  //Register User
  const register = async ({ user }) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/accounts/dashboard");
    } else {
      SetError(data.message);
    }
  };

  //Login User
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/accounts/dashboard");
    } else {
      SetError(data.message);
      SetError(null);
    }
  };

  //Logout User
  const logout = async ({ user }) => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST"
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };
  //Check if User

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
