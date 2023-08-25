const { default: Image } = require("next/image");
const { default: Link } = require("next/link");
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ event }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={event.image ? event.image : "/images/event-default.png"} width={170} height={100} alt="Event Image" />
      </div>
      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <div className="btn">Details</div>
        </Link>
      </div>
    </div>
  );
}
