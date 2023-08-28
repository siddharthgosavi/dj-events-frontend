import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "brad" });
  const [error, SetError] = useState(null);

  //Register User
  const register = async ({ user }) => {
    console.log("From Context", user);
  };

  //Login User
  const login = async ({ email: identifier, password }) => {
    console.log("From Context", { identifier, password });
  };

  //Logout User
  const logout = async ({ user }) => {
    console.log("From Context", "logout");
  };
  //Check if User

  const checkUserLoggedIn = async ({ user }) => {
    console.log("From Context", "Check");
  };

  return <AuthContext.Provider value={{ user, error, register, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
