// import { parseCookies } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import moment from "moment/moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { parseCookies } from "helpers";

export default function EditEventPage({ event, token }) {
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description
  });

  const [imagePreview, setImagePreview] = useState(event.image ? event.image.formats.thumbnail.url : null);

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(element => element === "");

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      toast.success("event Updated");
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async e => {
    const res = await fetch(`${API_URL}/events/${event.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
    toast.success("Image updated successfully");
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image alt="image" src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image uploaded</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
        <br />
        <br />
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload alt="image" Upload evtId={event.id} token={token} imageUploaded={imageUploaded} />
      </Modal>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" name="performers" id="performers" value={values.performers} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={values.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={moment(values.date).format("yyyy-MM-DD")} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" name="description" id="description" value={values.description} onChange={handleInputChange}></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/${id}`);
  const event = await res.json();

  return {
    props: {
      event,
      token
    }
  };
}
