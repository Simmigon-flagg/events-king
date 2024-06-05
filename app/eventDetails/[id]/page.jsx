import SearchBar from '@/app/components/SearchBar/SearchBar';
import SearchTopics from '@/app/components/SearchTopics/SearchTopics';
import TopicsList from '@/app/components/TopicsList';
import { Button, Input } from '@mui/material';
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
const EventDetails = async ({ params }) => {
  const { id } = params;
  const { event } = await getEventById(id);
  const { topics } = await getTopics()
  return (
    <>
      <div>EventDetails {id}</div>
      <div>EventDetails {event.title}</div>
      <div>EventDetails {event.date}</div>
      <div>EventDetails {event.location}</div>
      <div>EventDetails {event.host}</div>
      <div>EventDetails {event.description}</div>
      <SearchBar topics={topics}/>
      
   
      <Button variant='contained' >Add Topic</Button>
      <Button variant='contained' >Create Topic</Button>
    </>
  )
}

export default EventDetails