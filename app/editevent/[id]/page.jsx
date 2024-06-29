import EditEventForm from '@/app/components/Forms/EditEventForm';
import { Container } from '@mui/material';

const getEventById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const EditEvent = async ({ params }) => {
  
  const { id } = params;
  const { event } = await getEventById(id);

  return (
    <Container fixed>
      <EditEventForm item={event} />
    </Container>
  )
    ;
}

export default EditEvent