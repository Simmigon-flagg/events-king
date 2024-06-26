import PageTitle from "@/app/components/PageTitle/PageTitle";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import { Container } from "@mui/joy";
import Link from "next/link";
import "./EventDetails.css";
import AddTopicFormDialog from "@/app/components/Dialogs/AddTopicFormDialog";
import { FaArrowLeftLong } from "react-icons/fa6";
import ImageComponent from "@/app/components/ImageComponent/ImageComponent";
import EventTopicsList from "@/app/components/EventTopicsList/EventTopicsList";
import EventTopicsCard from "@/app/components/Cards/EventTopicsCard";
import BrowseSessionDialog from "@/app/components/Dialogs/BrowseSessionDialog";

const getEventById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getImageById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/images/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }
    return response.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
// Getting topics related to the event
const getEventTopics = (event, topics) => {
  return event.topics.map((eventTopicId) =>
    topics.find((topic) => topic._id === eventTopicId)
  );
};

const EventDetails = async ({ params }) => {
  const { topics } = await getTopics();
  const { id } = params;
  const { event } = await getEventById(id);
  const eventTopic = await getEventTopics(event, topics);
  const view = eventTopic?.map((topic) => (
    <div style={{ marginTop: 10 }} key={topic?._id}>
      <EventTopicsCard
        event_id={event?._id}
        eventTopic={eventTopic}
        title={topic?.title}
        description={topic?.description}
        speaker={topic?.speaker}
        date={topic?.date}
        time={topic?.time}
        topic_Id={topic._id} />
    </div>))

  const image = await getImageById(event?.image);
  return (
    <Container fixed>
      <div className="back-arrow">
        <FaArrowLeftLong />
        <span className="text"> <Link href={`/events`}>
          back to Events
        </Link></span>
      </div>
      <PageTitle heading={event.title} subheading={`Event Details`} />
      <div key={event._id}>
        <label className="event-info-label">Title:</label>
        <div className="event-info-text">{event.title}</div>
        <label className="event-info-label">Date:</label>
        <div className="event-info-text">{event.date}</div>
        <label className="event-info-label">Location:</label>
        <div className="event-info-text">{event.location}</div>
        <label className="event-info-label">Host:</label>
        <div className="event-info-text">{event.host}</div>
        <label className="event-info-label">Description:</label>
        <div className="event-info-text">{event.description}</div>
        <label className="event-info-label">Sessions:</label>

        <AddTopicFormDialog text="Create New Session" event_id={event?._id} eventTopic={eventTopic} />
        <BrowseSessionDialog text="ADD SESSION" topics={topics} event={event} />
        <br />
        <br />
        <h4>OR</h4>
        <ImageComponent image={image?.image} />
        {view}
      </div>
      <br />

    </Container>
  );
};

export default EventDetails;
