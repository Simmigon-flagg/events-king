import SearchBar from '@/app/components/SearchBar/SearchBar';
import { Button } from '@mui/material';
import Link from 'next/link';
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

const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store"
    })
    if (!response.ok) {
      throw new Error("Failed to fetch topics")
    }
    return response.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
const getEventTopics = async (event, topics) => {
  return await event.topics.map(eventTopicId => {
    const topicData = topics.map(topic => {
      if (topic._id === eventTopicId) {
        return topic;
      }
    })    
    return topicData[0]
  })  
}

const EventDetails = async ({ params }) => {

  const { topics } = await getTopics()
  const { id } = params;
  const { event } = await getEventById(id);
  const eventTopic = await getEventTopics(event, topics)


  return (
    <>
      <div>EventDetails {event._id}</div>
      <div>EventDetails {event.title}</div>
      <div>EventDetails {event.date}</div>
      <div>EventDetails {event.location}</div>
      <div>EventDetails {event.host}</div>
      <div>EventDetails {event.description}</div>
      <div>Topics at the event {event.topics}</div>
      {eventTopic.map(topic => {
        return (<div key={topic?._id}>
          {topic?.title}
          {topic?.speaker}
          {topic?.date}
          {topic?.time}
          {topic?.location}
          {topic?.description}
        </div>)
      })}


      <SearchBar items={topics} id={event._id} />


      <Link href={"/topics"}>
        <Button variant='contained' >Create Topic</Button>
      </Link>
    </>
  )
}

export default EventDetails