import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function SingleEventPage({ event }) {
  const myevent = event.data;
  const myeventImage = event.data.attributes.image;
  const deleteEvent = e => {
    console.log("Delete");
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${myevent.id}`}>
            <>
              <FaPencilAlt /> Edit Event
            </>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>

        <span>
          {new Date(myevent.attributes.date).toLocaleDateString("en-US")} at {myevent.attributes.time}{" "}
        </span>

        <h1>{myevent.attributes.name}</h1>
        {myeventImage && (
          <div className={styles.image}>
            <img alt="Event Image" className={styles.myimg} src={myeventImage.data.attributes.url} />
          </div>
        )}
        <h3>Performers</h3>
        <p>{myevent.attributes.performers}</p>
        <h3>Description</h3>
        <p>{myevent.attributes.description}</p>
        <h3>Venue : {myevent.attributes.venue}</h3>
        <p>{myevent.attributes.address}</p>

        <Link href={"/events"} className={styles.back}>
          {" "}
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   const event = events.event;
//   return {
//     props: { event }
//   };
// }

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();

  const paths = events.data.map(evt => ({
    params: { id: new String(evt.id).valueOf() }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const event = await res.json();

  return {
    props: { event }
  };
}
