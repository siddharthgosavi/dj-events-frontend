import Layout from "@/components/Layout";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Login.module.css";
import AuthContext from "context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Layout title={"User Login"}>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don't have an account? <Link href="/accounts/register"> Register</Link>
        </p>
      </div>
    </Layout>
  );
}
