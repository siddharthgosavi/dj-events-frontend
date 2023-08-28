import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";
import AuthContext from "context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [currUser, setCurrUser] = useState("");

  useEffect(() => {
    if (user) {
      setCurrUser(user.username);
    }
  }, [user]);

  const deleteEvent = async id => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Event Deleted");
        router.push("/accounts/dashboard");
      }
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>{currUser}'s Dashboard</h1>
        <ToastContainer />
        <h3>My Events</h3>
        {events.map(evt => {
          return <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />;
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const events = await res.json();

  return {
    props: { events, token }
  };
}
