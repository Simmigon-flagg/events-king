// import { Button } from '@mui/joy'
// import React, { useContext } from 'react'
// import TopicsContext from '@/context/TopicsContext'
// import TopicsForm from '@/app/components/Forms/TopicsForm'
import EditTopicForm from '@/app/components/Forms/EditTopicForm';
// import { useRouter } from 'next/navigation';
// const { title, description } = topic;
const getTopicById = async (id) => {
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
  const {id} = params;  
  const {topic} =  await getTopicById(id);

  return (<EditTopicForm topic={topic}/>);
}

export default EditTopic