import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";
import { useRouter } from "next/router";

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>{evt.name}</Link>
      </h4>
      <div className={styles.controls}>
        <Link legacyBehavior href={`/events/edit/${evt.id}`}>
          <a>
            <FaPencilAlt /> Edit Event
          </a>
        </Link>
        <a href="#" className={styles.delete} onClick={() => handleDelete(evt.id)}>
          <FaTimes /> Delete Event
        </a>
      </div>
    </div>
  );
}
