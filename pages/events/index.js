import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to Show</h3>}

      {events.map(evt => {
        return <EventItem key={evt.id} event={evt} />;
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  //if you console.log here will displayed in terminal since this is a serverless backend
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:ASC`);
  var events = await res.json();
  events = events.data;
  return {
    props: { events },
    revalidate: 1
  };
}
