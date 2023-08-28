import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt, FaHome } from "react-icons/fa";
import AuthContext from "context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            <>
              {/* if user is logged in */}{" "}
              <li>
                <Link href={"/events/add"}>Add Event</Link>
              </li>
              <li>
                <Link href={"/accounts/dashboard"}>
                  <FaHome /> Dashboard
                </Link>
              </li>
              <li>
                <button onClick={logout} className="btn-secondary btn-icon">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* if user is logged out */}
              <li>
                <Link href={"/accounts/login"} className="btn-secondary btn-icon">
                  {" "}
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
