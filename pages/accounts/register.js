import Layout from "@/components/Layout";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import styles from "@/styles/Login.module.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!, Try again");
      return;
    }
    register({ user: { username, email, password } });
  }

  return (
    <Layout title={"User Registration"}>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            ></input>
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
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={e => {
                setPasswordConfirm(e.target.value);
              }}
            ></input>
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account? <Link href="/accounts/login"> Login here</Link>
        </p>
      </div>
    </Layout>
  );
}
