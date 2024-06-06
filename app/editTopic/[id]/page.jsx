import EditTopicForm from '@/app/components/Forms/EditTopicForm';
import { Container } from '@mui/material';


  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
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
const EditTopic = async ({ params }) => {
  // const { topics } = useContext(TopicsContext);
  
  const { id } = params;
  const { topic } = await getTopicById(id);

  return (
    <Container fixed>

      <EditTopicForm item={topic} />
    </Container>
  )
    ;
}

export default EditTopic