import { FaExclamationTriangle, FaSadTear } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

export default function NotFoundPage() {
  return (
    <Layout title="Page not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>
          <FaSadTear />
          {"\t"}
          Sorry, Page not found!
        </h4>
        <Link href={"/"} className={styles.content}>
          Go back to Home
        </Link>
      </div>
    </Layout>
  );
}
