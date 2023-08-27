const { default: Image } = require("next/image");
const { default: Link } = require("next/link");
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ event: { id, attributes } }) {
  const event = attributes;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={event.image.data.attributes.formats.thumbnail.url ? event.image.data.attributes.url : "/images/event-default.png"} width={170} height={100} alt="Event Image" />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${id}`}>
          <div className="btn">Details</div>
        </Link>
      </div>
    </div>
  );
}
