import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchPage({ events }) {
  const searchTerm = useRouter();
  return (
    <Layout title="Search Results">
      <Link href={"/events"}>{">"} Go back</Link>
      <h1>Search Results for {searchTerm.query.term}</h1>
      {events.length === 0 && <h3>No events to Show</h3>}

      {events.map(evt => {
        return <EventItem key={evt.id} event={evt} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  //if you console.log here will displayed in terminal since this is a serverless backend
  const res = await fetch(`${API_URL}/api/events?populate=*&filters[$or][0][name][$contains]=${term}&filters[$or][1][venue][$contains]=${term}&filters[$or][2][description][$contains]=${term}&filters[$or][3][performers][$contains]=${term}`);
  var events = await res.json();
  events = events.data;
  return {
    props: { events }
  };
}
