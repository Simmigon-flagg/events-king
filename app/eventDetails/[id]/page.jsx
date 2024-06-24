import PageTitle from "@/app/components/PageTitle/PageTitle";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import { Container, Button } from "@mui/joy";
import Link from "next/link";
import "./EventDetails.css";
import AddTopicFormDialog from "@/app/components/Dialogs/AddTopicFormDialog";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import ImageComponent from "@/app/components/ImageComponent/ImageComponent";

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
const getEventTopics = async (event, topics) => {
  return await event.topics.map((eventTopicId) => {
    const topicData = topics.map((topic) => {
      if (topic._id === eventTopicId) {
        return topic;
      }
    });
    return topicData[0];
  });
};

const EventDetails = async ({ params }) => {
  const { topics } = await getTopics();
  const { id } = params;
  const { event } = await getEventById(id);
  const eventTopic = await getEventTopics(event, topics);
  const image = await getImageById(event?.image);
  return (
    <Container fixed>
      <div className="back-arrow">
        <FaArrowLeftLong />
        <span className="text"> <Link href={`/events`}>
          back to Events
        </Link></span>
      </div>
      <PageTitle heading={event.title} subheading="Event Details" />
      <div>
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
        <div className="event-info-text">{event.topics}</div>        
        <ImageComponent image={image?.image} />

        {eventTopic.map((topic) => {
          return (
            <div key={topic?._id}>
              {topic?.title}
              {topic?.speaker}
              {topic?.date}
              {topic?.time}
              {topic?.location}
              {topic?.description}
            </div>
          );
        })}
      </div>
      <br />

      {/* <Link href={"/topics"}>
        <Button>Create New Session</Button>
      </Link> */}

      <AddTopicFormDialog text="Create New Session" />

      <br />
      <br />
      <h4>OR</h4>
      <SearchBar items={topics} id={event._id} />
    </Container>
  );
};

export default EventDetails;
